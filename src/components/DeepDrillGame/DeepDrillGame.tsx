import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Language } from '../../types/game';
import { sound } from '../../utils/soundManager';
import confetti from 'canvas-confetti';
import { Compass, Flame, Shield, Award, RotateCcw, Play, Pause, ChevronRight, CheckCircle2, AlertTriangle } from 'lucide-react';

interface DeepDrillGameProps {
  language: Language;
}

type GameState = 'title' | 'playing' | 'checkpoint' | 'gameover' | 'victory';

interface CheckpointData {
  titleEn: string;
  titleZh: string;
  questionEn: string;
  questionZh: string;
  optionsEn: string[];
  optionsZh: string[];
  correctIdx: number;
  explanationEn: string;
  explanationZh: string;
  rewardEn: string;
  rewardZh: string;
}

export const DeepDrillGame: React.FC<DeepDrillGameProps> = ({ language }) => {
  const isEn = language === 'en';
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // High-level game state
  const [gameState, setGameState] = useState<GameState>('title');
  const [depth, setDepth] = useState<number>(0); // 0 to 6370 km
  const [hull, setHull] = useState<number>(100);
  const [score, setScore] = useState<number>(0);
  const [currentLayerName, setCurrentLayerName] = useState<string>('Crust');
  const [combo, setCombo] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeCheckpoint, setActiveCheckpoint] = useState<CheckpointData | null>(null);
  const [checkpointResult, setCheckpointResult] = useState<{ answered: boolean; correct: boolean } | null>(null);

  // Engine refs for 60fps loop isolation
  const gameRef = useRef({
    state: 'title' as GameState,
    isPaused: false,
    playerX: 400,
    playerY: 150,
    vx: 0,
    vy: 0,
    depth: 0,
    hull: 100,
    score: 0,
    combo: 1,
    cameraShake: 0,
    hitFlash: 0,
    keys: { left: false, right: false, up: false, down: false, space: false },
    rocks: [] as Array<{
      x: number;
      y: number;
      radius: number;
      type: 'rock' | 'magma' | 'canister' | 'metal' | 'geopark';
      label: string;
      labelZh: string;
      color: string;
      collected: boolean;
      points: number;
      hazard: boolean;
    }>,
    particles: [] as Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      color: string;
      size: number;
    }>,
    lastTime: performance.now(),
    checkpointsTriggered: {
      soil: false,
      crust: false,
      mantle: false
    }
  });

  // Checkpoints definition covering full Chapter 1 knowledge
  const CHECKPOINTS: Record<string, CheckpointData> = {
    soil: {
      titleEn: 'Soil Science Checkpoint (0-5 km)',
      titleZh: '土壤科學檢查站 (0-5 公里)',
      questionEn: 'Which soil type has the HIGHEST drainage capacity and is best for cacti?',
      questionZh: '哪種土壤的「排水能力最高」（去水最快），且最適合種植仙人掌？',
      optionsEn: [
        'Clay Soil (Smallest particles, lowest drainage)',
        'Sandy Soil (Largest particles, highest drainage)',
        'Loam (Medium-sized particles, moderate drainage)',
        'Granite Bedrock (Solid rock layer)'
      ],
      optionsZh: [
        '黏土（顆粒最小，排水能力最低）',
        '沙土（顆粒最大，排水能力最高）',
        '壤土（顆粒粗幼適中，排水能力適中）',
        '花崗岩底岩（堅硬岩石層）'
      ],
      correctIdx: 1,
      explanationEn: 'Sandy soil has the largest particle size and largest pore spaces, allowing water to drain the fastest. Perfect for desert cacti!',
      explanationZh: '沙土顆粒最大、隙縫最多，排水能力最高，最適合需要乾爽土壤的沙漠仙人掌！',
      rewardEn: 'Hull Repaired + 500 Bonus Points!',
      rewardZh: '裝甲修復 + 500 額外探測積分！'
    },
    crust: {
      titleEn: 'Tectonic & Rock Vault Checkpoint (70 km)',
      titleZh: '地殼板塊與岩石檢查站 (70 公里)',
      questionEn: 'How are igneous rocks like Granite formed in the Earth’s crust?',
      questionZh: '地殼中的火成岩（例如花崗岩）是如何形成的？',
      optionsEn: [
        'Sedimentation of rock pieces & mud by river water',
        'Magma cools and hardens underground or on surface',
        'Rocks change structure under high pressure and heat',
        'Wind and rain breaking rocks into soft soil'
      ],
      optionsZh: [
        '流水搬運岩石碎屑和泥沙沉積壓實',
        '高溫岩漿冷卻並凝固硬化而成',
        '在高溫高壓下改變內部結晶結構變質',
        '經風吹雨打分解成為鬆軟土壤'
      ],
      correctIdx: 1,
      explanationEn: 'Igneous rocks (like Granite and Basalt) are formed when hot molten magma cools and solidifies.',
      explanationZh: '火成岩（如花崗岩、玄武岩）是由高溫熔化的岩漿冷卻並凝固硬化形成的！',
      rewardEn: 'Thermal Shield Boost + 800 Bonus Points!',
      rewardZh: '熱防護罩增強 + 800 探測積分！'
    },
    mantle: {
      titleEn: 'Mantle Core Boundary Checkpoint (2,900 km)',
      titleZh: '地幔與地核邊界站 (2,900 公里)',
      questionEn: 'What is the centre of the Earth (Core) mainly made up of, and what is its temperature?',
      questionZh: '地球的最中心（地核）主要由什麼組成？其溫度如何？',
      optionsEn: [
        'Liquid water and air; cool 20°C',
        'Mainly made up of metals (iron and nickel); extremely high temperature',
        'Solid ice crystals; freezing -50°C',
        'Loose sand and rose loam; warm 100°C'
      ],
      optionsZh: [
        '液態水與空氣；涼爽 20°C',
        '主要由金屬（鐵和鎳）組成；溫度極高（達數千度）',
        '固態冰晶；嚴寒 -50°C',
        '鬆散沙土與養分壤土；溫暖 100°C'
      ],
      correctIdx: 1,
      explanationEn: 'The core is the centre of the Earth, mainly composed of heavy metals (iron and nickel) with temperatures exceeding 5,000°C!',
      explanationZh: '地核位於地球最中心，主要由重金屬（鐵和鎳）構成，溫度極高，高達數千度（如同太陽表面）！',
      rewardEn: 'Core Stabilizer Activated + 1,200 Bonus Points!',
      rewardZh: '核心穩定器啟動 + 1,200 探測積分！'
    }
  };

  // Start / Restart game
  const startGame = useCallback(() => {
    sound.playClick();
    const g = gameRef.current;
    g.state = 'playing';
    g.isPaused = false;
    g.playerX = 400;
    g.playerY = 120;
    g.vx = 0;
    g.vy = 0;
    g.depth = 0;
    g.hull = 100;
    g.score = 0;
    g.combo = 1;
    g.cameraShake = 0;
    g.hitFlash = 0;
    g.checkpointsTriggered = { soil: false, crust: false, mantle: false };
    g.rocks = [];
    g.particles = [];

    // Spawn initial entities
    spawnWave(g, 0);

    setGameState('playing');
    setDepth(0);
    setHull(100);
    setScore(0);
    setCombo(1);
    setIsPaused(false);
    setActiveCheckpoint(null);
    setCheckpointResult(null);
  }, []);

  const spawnWave = (g: typeof gameRef.current, currentDepth: number) => {
    g.rocks = [];
    const count = 12;

    for (let i = 0; i < count; i++) {
      const rx = 100 + Math.random() * 600;
      const ry = 180 + i * 45 + Math.random() * 20;

      if (currentDepth < 70) {
        // Soil & Crust Zone
        if (Math.random() < 0.4) {
          // Beneficial Collectible
          const items = [
            { label: 'Granite (Igneous)', labelZh: '花崗岩 (火成岩)', color: '#94a3b8' },
            { label: 'Sandstone (Sedimentary)', labelZh: '砂岩 (沉積岩)', color: '#d97706' },
            { label: 'Marble (Metamorphic)', labelZh: '大理岩 (變質岩)', color: '#f8fafc' },
            { label: 'Loam Soil Canister', labelZh: '壤土標本罐', color: '#10b981' },
            { label: 'Soil Water Droplet', labelZh: '土壤水分', color: '#38bdf8' }
          ];
          const choice = items[Math.floor(Math.random() * items.length)];
          g.rocks.push({
            x: rx,
            y: ry,
            radius: 18,
            type: 'canister',
            label: choice.label,
            labelZh: choice.labelZh,
            color: choice.color,
            collected: false,
            points: 100,
            hazard: false
          });
        } else {
          // Tectonic obstacle
          g.rocks.push({
            x: rx,
            y: ry,
            radius: 22,
            type: 'rock',
            label: 'Tectonic Plate Fault',
            labelZh: '板塊斷裂岩塊',
            color: '#64748b',
            collected: false,
            points: 0,
            hazard: true
          });
        }
      } else if (currentDepth < 2900) {
        // Mantle Zone
        if (Math.random() < 0.45) {
          g.rocks.push({
            x: rx,
            y: ry,
            radius: 18,
            type: 'canister',
            label: 'Thermal Crystal',
            labelZh: '地幔晶體',
            color: '#fbbf24',
            collected: false,
            points: 150,
            hazard: false
          });
        } else {
          g.rocks.push({
            x: rx,
            y: ry,
            radius: 24,
            type: 'magma',
            label: 'Hot Flowing Magma Vent',
            labelZh: '高溫流動岩漿流',
            color: '#ef4444',
            collected: false,
            points: 0,
            hazard: true
          });
        }
      } else {
        // Core Zone
        if (Math.random() < 0.5) {
          g.rocks.push({
            x: rx,
            y: ry,
            radius: 20,
            type: 'metal',
            label: 'Nickel-Iron Ore',
            labelZh: '鐵鎳金屬精核',
            color: '#f59e0b',
            collected: false,
            points: 200,
            hazard: false
          });
        } else {
          g.rocks.push({
            x: rx,
            y: ry,
            radius: 26,
            type: 'magma',
            label: 'Magnetic Solar Surge',
            labelZh: '地核極端熱壓流',
            color: '#fb923c',
            collected: false,
            points: 0,
            hazard: true
          });
        }
      }
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const g = gameRef.current;
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') g.keys.left = true;
      if (e.code === 'KeyD' || e.code === 'ArrowRight') g.keys.right = true;
      if (e.code === 'KeyW' || e.code === 'ArrowUp') g.keys.up = true;
      if (e.code === 'KeyS' || e.code === 'ArrowDown') g.keys.down = true;
      if (e.code === 'Space') {
        g.keys.space = true;
        if (g.state === 'title') {
          startGame();
        }
      }
      if (e.code === 'Escape') {
        if (g.state === 'playing') {
          g.isPaused = !g.isPaused;
          setIsPaused(g.isPaused);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const g = gameRef.current;
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') g.keys.left = false;
      if (e.code === 'KeyD' || e.code === 'ArrowRight') g.keys.right = false;
      if (e.code === 'KeyW' || e.code === 'ArrowUp') g.keys.up = false;
      if (e.code === 'KeyS' || e.code === 'ArrowDown') g.keys.down = false;
      if (e.code === 'Space') g.keys.space = false;
    };

    const handleBlur = () => {
      gameRef.current.keys = { left: false, right: false, up: false, down: false, space: false };
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, [startGame]);

  // Main 60fps Game Loop
  useEffect(() => {
    let animId: number;

    const loop = (now: number) => {
      const g = gameRef.current;
      const rawDt = (now - g.lastTime) / 1000;
      g.lastTime = now;
      const dt = Math.min(rawDt, 0.05);

      const canvas = canvasRef.current;
      if (canvas && g.state === 'playing' && !g.isPaused) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          updateSimulation(g, dt);
          renderScene(ctx, g, canvas.width, canvas.height);
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const updateSimulation = (g: typeof gameRef.current, dt: number) => {
    // Movement handling
    const speed = 280;
    let targetVx = 0;
    let targetVy = 0;

    if (g.keys.left) targetVx -= speed;
    if (g.keys.right) targetVx += speed;
    if (g.keys.up) targetVy -= speed * 0.7;
    if (g.keys.down) targetVy += speed * 1.3;

    // Smooth inertia
    g.vx += (targetVx - g.vx) * 0.15;
    g.vy += (targetVy - g.vy) * 0.15;

    g.playerX += g.vx * dt;
    g.playerY += g.vy * dt;

    // Boundaries
    const minX = 60;
    const maxX = 740;
    if (g.playerX < minX) {
      g.playerX = minX;
      g.vx = 0;
    }
    if (g.playerX > maxX) {
      g.playerX = maxX;
      g.vx = 0;
    }
    if (g.playerY < 80) g.playerY = 80;
    if (g.playerY > 480) g.playerY = 480;

    // Descent rate based on engine thrust
    const descentSpeed = g.keys.down ? 360 : 180;
    g.depth += descentSpeed * dt * 4; // km per second

    // Sync HUD state every few frames
    if (Math.floor(g.depth) !== depth) {
      setDepth(Math.min(6370, Math.floor(g.depth)));
    }

    // Determine current layer
    let layer = 'Crust (地殼)';
    if (g.depth >= 70 && g.depth < 2900) {
      layer = 'Mantle (地幔)';
    } else if (g.depth >= 2900) {
      layer = 'Core (地核)';
    }
    setCurrentLayerName(layer);

    // Check Checkpoints triggers
    if (g.depth >= 30 && !g.checkpointsTriggered.soil) {
      g.checkpointsTriggered.soil = true;
      triggerCheckpoint(CHECKPOINTS.soil);
      return;
    }
    if (g.depth >= 70 && !g.checkpointsTriggered.crust) {
      g.checkpointsTriggered.crust = true;
      triggerCheckpoint(CHECKPOINTS.crust);
      return;
    }
    if (g.depth >= 2900 && !g.checkpointsTriggered.mantle) {
      g.checkpointsTriggered.mantle = true;
      triggerCheckpoint(CHECKPOINTS.mantle);
      return;
    }

    // Victory check
    if (g.depth >= 6370) {
      g.state = 'victory';
      setGameState('victory');
      sound.playVictory();
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      return;
    }

    // Update rocks & hazards position (scrolling up to simulate descent)
    const scrollSpeed = 160 + (g.keys.down ? 100 : 0);
    g.rocks.forEach((r) => {
      r.y -= scrollSpeed * dt;
    });

    // Check collisions
    const playerRadius = 22;
    for (const r of g.rocks) {
      if (r.collected) continue;
      const dx = g.playerX - r.x;
      const dy = g.playerY - r.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < playerRadius + r.radius) {
        r.collected = true;

        if (r.hazard) {
          // Hazard hit
          g.hull = Math.max(0, g.hull - 15);
          g.combo = 1;
          g.cameraShake = 12;
          g.hitFlash = 0.3;
          sound.playRumble();
          setHull(g.hull);
          setCombo(1);

          // Particles
          spawnBurst(g, r.x, r.y, '#ef4444', 16);

          if (g.hull <= 0) {
            g.state = 'gameover';
            setGameState('gameover');
            sound.playWrong();
            return;
          }
        } else {
          // Item collected
          g.score += r.points * g.combo;
          g.combo = Math.min(8, g.combo + 1);
          sound.playRockClink();
          setScore(g.score);
          setCombo(g.combo);

          // Particles
          spawnBurst(g, r.x, r.y, r.color, 12);
        }
      }
    }

    // Remove offscreen rocks and spawn new wave
    g.rocks = g.rocks.filter((r) => r.y > -50);
    if (g.rocks.length < 5) {
      spawnWave(g, g.depth);
    }

    // Particle update
    g.particles.forEach((p) => {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life += dt;
    });
    g.particles = g.particles.filter((p) => p.life < p.maxLife);

    // Camera shake decay
    if (g.cameraShake > 0) g.cameraShake = Math.max(0, g.cameraShake - dt * 25);
    if (g.hitFlash > 0) g.hitFlash = Math.max(0, g.hitFlash - dt * 2);
  };

  const spawnBurst = (g: typeof gameRef.current, x: number, y: number, color: string, count: number) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = 60 + Math.random() * 140;
      g.particles.push({
        x,
        y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        life: 0,
        maxLife: 0.3 + Math.random() * 0.3,
        color,
        size: 3 + Math.random() * 4
      });
    }
  };

  const triggerCheckpoint = (checkpoint: CheckpointData) => {
    sound.playCorrect();
    const g = gameRef.current;
    g.state = 'checkpoint';
    setGameState('checkpoint');
    setActiveCheckpoint(checkpoint);
    setCheckpointResult(null);
  };

  const handleAnswerCheckpoint = (optionIdx: number) => {
    if (!activeCheckpoint || checkpointResult) return;
    const isCorrect = optionIdx === activeCheckpoint.correctIdx;
    const g = gameRef.current;

    if (isCorrect) {
      sound.playCorrect();
      g.hull = Math.min(100, g.hull + 30);
      g.score += 800;
      setHull(g.hull);
      setScore(g.score);
    } else {
      sound.playWrong();
      g.hull = Math.max(10, g.hull - 15);
      setHull(g.hull);
    }

    setCheckpointResult({ answered: true, correct: isCorrect });
  };

  const resumeAfterCheckpoint = () => {
    sound.playClick();
    const g = gameRef.current;
    g.state = 'playing';
    setGameState('playing');
    setActiveCheckpoint(null);
    setCheckpointResult(null);
  };

  const renderScene = (ctx: CanvasRenderingContext2D, g: typeof gameRef.current, width: number, height: number) => {
    ctx.save();

    // Camera Shake
    if (g.cameraShake > 0) {
      const ox = (Math.random() - 0.5) * g.cameraShake;
      const oy = (Math.random() - 0.5) * g.cameraShake;
      ctx.translate(ox, oy);
    }

    // Background Gradient based on Earth Layer Depth
    let topColor = '#1e293b';
    let bottomColor = '#0f172a';

    if (g.depth < 70) {
      // Crust: Brownish/slate rock strata
      topColor = '#451a03';
      bottomColor = '#1e293b';
    } else if (g.depth < 2900) {
      // Mantle: Deep orange-red glowing magma
      topColor = '#7c2d12';
      bottomColor = '#450a0a';
    } else {
      // Core: Radiant golden-yellow metallic plasma
      topColor = '#78350f';
      bottomColor = '#b45309';
    }

    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, topColor);
    bgGrad.addColorStop(1, bottomColor);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Geological strata lines (moving up)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 2;
    const offset = (g.depth * 3) % 40;
    for (let y = -offset; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y + 10);
      ctx.stroke();
    }

    // Draw Falling Items / Hazards
    g.rocks.forEach((r) => {
      if (r.collected) return;

      ctx.save();
      ctx.translate(r.x, r.y);

      if (r.hazard) {
        // Hazard rock / magma vent
        ctx.fillStyle = r.color;
        ctx.shadowColor = r.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(0, 0, r.radius, 0, Math.PI * 2);
        ctx.fill();

        // Cracks
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-r.radius * 0.5, -r.radius * 0.3);
        ctx.lineTo(0, 0);
        ctx.lineTo(r.radius * 0.4, r.radius * 0.5);
        ctx.stroke();
      } else {
        // Collectible Science Specimen / Canister
        ctx.fillStyle = r.color;
        ctx.shadowColor = r.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.roundRect(-r.radius, -r.radius, r.radius * 2, r.radius * 2, 6);
        ctx.fill();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Icon shine
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.beginPath();
        ctx.arc(-r.radius * 0.4, -r.radius * 0.4, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Specimen Label text
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.shadowBlur = 3;
      ctx.shadowColor = '#000000';
      ctx.fillText(isEn ? r.label : r.labelZh, 0, r.radius + 12);

      ctx.restore();
    });

    // Draw Particles
    g.particles.forEach((p) => {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      const alpha = 1 - p.life / p.maxLife;
      ctx.globalAlpha = Math.max(0, alpha);
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1.0;

    // Draw "Terra-Drill 4" Exploration Vessel
    ctx.save();
    ctx.translate(g.playerX, g.playerY);

    // Thruster flame when moving
    if (g.keys.up || g.keys.down || g.keys.left || g.keys.right) {
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(-10, -25);
      ctx.lineTo(10, -25);
      ctx.lineTo(0, -38 - Math.random() * 8);
      ctx.closePath();
      ctx.fill();
    }

    // Hull (Aerodynamic drill capsule)
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.ellipse(0, 0, 18, 26, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Front Rotating Drill Cone
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.moveTo(-12, 18);
    ctx.lineTo(12, 18);
    ctx.lineTo(0, 36);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#94a3b8';
    ctx.stroke();

    // Cockpit dome window
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(0, -5, 8, 0, Math.PI * 2);
    ctx.fill();

    // P4 Astronaut Pilot reflection
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(-2, -7, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Hit Flash
    if (g.hitFlash > 0) {
      ctx.fillStyle = `rgba(239, 68, 68, ${g.hitFlash})`;
      ctx.fillRect(0, 0, width, height);
    }

    ctx.restore();
  };

  return (
    <div className="relative w-full h-[620px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col select-none">
      {/* HUD Top Bar (Unobstructed, low occlusion) */}
      <div className="absolute top-0 left-0 right-0 z-20 px-4 py-2.5 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between text-xs text-white">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-bold">
            <Compass className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400">{isEn ? 'Depth:' : '探測深度:'}</span>
            <span className="font-mono text-amber-300 font-bold text-sm tabular-nums">
              {depth.toLocaleString()} / 6,370 km
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700">
            <span className="text-slate-400">{isEn ? 'Layer:' : '當前圈層:'}</span>
            <span className="font-bold text-emerald-400">{currentLayerName}</span>
          </div>
        </div>

        {/* Hull & Score */}
        <div className="flex items-center gap-4">
          {/* Hull Integrity */}
          <div className="flex items-center gap-1.5">
            <Shield className={`w-4 h-4 ${hull < 30 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`} />
            <div className="w-24 h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div
                className={`h-full transition-all duration-200 ${
                  hull > 60 ? 'bg-emerald-500' : hull > 30 ? 'bg-amber-500' : 'bg-rose-500'
                }`}
                style={{ width: `${hull}%` }}
              />
            </div>
            <span className="font-mono text-[11px] tabular-nums font-bold">{hull}%</span>
          </div>

          {/* Score */}
          <div className="flex items-center gap-1 font-bold">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="font-mono text-sm text-amber-300 tabular-nums">{score}</span>
            {combo > 1 && (
              <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold">
                {combo}x
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main 60fps Canvas */}
      <canvas
        ref={canvasRef}
        width={800}
        height={560}
        className="w-full h-full object-cover block cursor-crosshair"
      />

      {/* Floating Mini Controls Hint (Single flat line) */}
      <div className="absolute bottom-2 left-4 right-4 z-20 flex items-center justify-between pointer-events-none text-[11px] text-slate-400/90 font-medium">
        <span>{isEn ? 'WASD / Arrow Keys to Steer Drill · Esc to Pause' : 'WASD / 方向鍵 駕駛鑽探機 · Esc 暫停'}</span>
        <span>{isEn ? 'Collect Rock & Soil Specimens · Avoid Fault Fractures' : '採集岩石與土壤樣本 · 避開板塊裂隙'}</span>
      </div>

      {/* SCREEN: TITLE SCREEN */}
      {gameState === 'title' && (
        <div className="absolute inset-0 z-30 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white">
          <div className="max-w-md w-full space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-emerald-500 flex items-center justify-center mx-auto shadow-xl text-3xl">
              🚀
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">
                {isEn ? 'Sub-Terra Expedition' : '地底鑽探大冒險'}
              </h1>
              <p className="text-sm text-amber-400 font-semibold mt-1">
                {isEn ? 'Journey to the Centre of the Earth' : '深入地球核心 6,370 公里奇幻之旅'}
              </p>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {isEn
                  ? 'Pilot the Terra-Drill 4 submersible from the Earth’s surface through the Crust, the flowing magma of the Mantle, and all the way to the metallic Core!'
                  : '駕駛「大地鑽探四號」潛航機，穿透地殼、採集三大類岩石與土壤標本，穿越高溫地幔岩漿，直達金屬地核中心！'}
              </p>
            </div>

            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-left text-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isEn ? 'Core Objectives:' : '任務目標：'}</span>
              </div>
              <ul className="text-slate-300 space-y-1 pl-6 list-disc text-[11px]">
                <li>{isEn ? 'Mine Igneous, Sedimentary & Metamorphic rocks' : '採集火成岩、沉積岩與變質岩標本'}</li>
                <li>{isEn ? 'Collect 4 soil components (particles, organic, water, air)' : '收集土壤四大成分（微粒、動植物碎屑、水、空氣）'}</li>
                <li>{isEn ? 'Pass 3 Chapter Checkpoints to unlock drill upgrades' : '通過三大課堂知識檢查站獲得鑽機防護升級'}</li>
              </ul>
            </div>

            <button
              onClick={startGame}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>{isEn ? 'Launch Drill Mission (Space / Enter)' : '啟動鑽探任務 (空白鍵 / Enter)'}</span>
            </button>
          </div>
        </div>
      )}

      {/* SCREEN: CHECKPOINT POPUP */}
      {gameState === 'checkpoint' && activeCheckpoint && (
        <div className="absolute inset-0 z-40 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/50 rounded-2xl p-6 max-w-lg w-full shadow-2xl text-white space-y-4 animate-scale-up">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>{isEn ? activeCheckpoint.titleEn : activeCheckpoint.titleZh}</span>
            </div>

            <h3 className="text-base font-bold text-white leading-snug">
              {isEn ? activeCheckpoint.questionEn : activeCheckpoint.questionZh}
            </h3>

            {/* Options list */}
            <div className="space-y-2 pt-2">
              {(isEn ? activeCheckpoint.optionsEn : activeCheckpoint.optionsZh).map((opt, idx) => {
                const isSelected = checkpointResult?.answered;
                const isCorrect = idx === activeCheckpoint.correctIdx;

                let btnStyle = 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700';
                if (isSelected) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                  } else {
                    btnStyle = 'bg-slate-800/40 border-slate-800 text-slate-500';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={!!checkpointResult}
                    onClick={() => handleAnswerCheckpoint(idx)}
                    className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isSelected && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Result feedback */}
            {checkpointResult && (
              <div
                className={`p-3 rounded-xl text-xs space-y-1.5 border ${
                  checkpointResult.correct
                    ? 'bg-emerald-950/60 border-emerald-700 text-emerald-200'
                    : 'bg-rose-950/60 border-rose-700 text-rose-200'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5">
                  {checkpointResult.correct ? '🎉 ' + (isEn ? 'Correct Analysis!' : '分析正確！') : '⚠️ ' + (isEn ? 'Incorrect Analysis' : '分析錯誤')}
                </div>
                <p className="text-[11px] leading-relaxed">
                  {isEn ? activeCheckpoint.explanationEn : activeCheckpoint.explanationZh}
                </p>
                <div className="pt-2 text-right">
                  <button
                    onClick={resumeAfterCheckpoint}
                    className="px-4 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>{isEn ? 'Resume Descent' : '繼續下潛'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SCREEN: GAME OVER */}
      {gameState === 'gameover' && (
        <div className="absolute inset-0 z-40 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-6 text-center text-white">
          <div className="max-w-md w-full space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto text-2xl">
              💥
            </div>
            <h2 className="text-xl font-black text-rose-400">
              {isEn ? 'Drill Hull Breached!' : '鑽探機裝甲受損過重！'}
            </h2>
            <p className="text-xs text-slate-400">
              {isEn
                ? `You reached a depth of ${depth} km. Avoid tectonic plate fissures and hot magma flows to reach the core!`
                : `你成功下潛至 ${depth} 公里深度。請避開板塊斷層裂縫與高溫岩漿流，方能直達地核！`}
            </p>
            <button
              onClick={startGame}
              className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isEn ? 'Reboot Terra-Drill 4' : '重啟大地鑽探機'}</span>
            </button>
          </div>
        </div>
      )}

      {/* SCREEN: VICTORY */}
      {gameState === 'victory' && (
        <div className="absolute inset-0 z-40 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-6 text-center text-white">
          <div className="max-w-md w-full space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto text-3xl">
              🏆
            </div>
            <div>
              <h2 className="text-2xl font-black text-amber-400">
                {isEn ? 'Mission Complete: Core Reached!' : '任務圓滿成功：抵達地核中心！'}
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                {isEn
                  ? 'Congratulations! You navigated from the rocky crust through the magma mantle into the molten metallic core (6,370 km)!'
                  : '太棒了！你成功從地殼岩石層，穿過高溫流動的地幔岩漿，直達 6,370 公里深處的金屬地核中心！'}
              </p>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-around text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">{isEn ? 'Final Score' : '最終得分'}</span>
                <span className="text-lg font-bold text-amber-400 font-mono">{score}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">{isEn ? 'Depth' : '探測深度'}</span>
                <span className="text-lg font-bold text-emerald-400 font-mono">6,370 km</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">{isEn ? 'Grade' : '探險評級'}</span>
                <span className="text-lg font-bold text-cyan-400 font-mono">P4 Master</span>
              </div>
            </div>

            <button
              onClick={startGame}
              className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isEn ? 'Play Again' : '再玩一次'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
