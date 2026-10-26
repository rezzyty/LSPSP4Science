import { EarthLayer, RockInfo, SoilInfo, QuestionFillBlank, QuestionJudging, QuestionMC } from '../types/game';

export const EARTH_LAYERS: EarthLayer[] = [
  {
    id: 'crust',
    nameEn: 'Crust',
    nameZh: '地殼',
    depthEn: '0 – 70 km',
    depthZh: '0 – 70 公里',
    tempEn: 'Up to ~500°C',
    tempZh: '最高約 500°C',
    compositionEn: 'Mainly made of rocks (granite, basalt, sedimentary rocks)',
    compositionZh: '主要由岩石組成（花崗岩、玄武岩、沉積岩等）',
    featuresEn: [
      'The outermost layer of the Earth',
      'The layer where we live and build cities',
      'Divided into many plates of different sizes (not a single piece!)',
      'Broken rocks form soil through exposure to wind and rain'
    ],
    featuresZh: [
      '地球最外層',
      '我們居住和建造城市的層面',
      '分裂成許多大小不同的板塊（並非完整一整塊！）',
      '岩石經風吹雨打分解形成土壤'
    ],
    color: '#10b981',
    bgGradient: 'from-emerald-700 via-emerald-600 to-amber-700'
  },
  {
    id: 'mantle',
    nameEn: 'Mantle',
    nameZh: '地幔',
    depthEn: '70 – 2,900 km',
    depthZh: '70 – 2,900 公里',
    tempEn: '1,000°C – 3,700°C',
    tempZh: '1,000°C – 3,700°C',
    compositionEn: 'Semi-solid rock containing hot flowing magma',
    compositionZh: '半固體岩石，含有高溫流動的岩漿',
    featuresEn: [
      'Located directly below the crust',
      'Contains hot flowing magma',
      'Magma flow causes the crustal plates to move slowly',
      'Plate collision causes earthquakes and volcanic eruptions'
    ],
    featuresZh: [
      '位於地殼的正下方',
      '含有高溫、緩慢流動的岩漿',
      '岩漿流動推動地殼板塊緩慢移動',
      '板塊移動和碰撞會引發地震和火山爆發'
    ],
    color: '#f97316',
    bgGradient: 'from-amber-600 via-orange-600 to-red-600'
  },
  {
    id: 'core',
    nameEn: 'Core',
    nameZh: '地核',
    depthEn: '2,900 – 6,370 km',
    depthZh: '2,900 – 6,370 公里',
    tempEn: 'Extremely high (up to 6,000°C)',
    tempZh: '極高溫（高達 6,000°C）',
    compositionEn: 'Mainly made up of metals (iron and nickel)',
    compositionZh: '主要由金屬組成（鐵和鎳）',
    featuresEn: [
      'The centre of the Earth',
      'Temperature is extremely high (as hot as the Sun’s surface!)',
      'Mainly made up of dense metals',
      'Divided into outer liquid core and inner solid core'
    ],
    featuresZh: [
      '地球的最中心部分',
      '溫度極高（熱如太陽表面！）',
      '主要由重金屬（鐵、鎳）構成',
      '分為外液態核與內固態核'
    ],
    color: '#eab308',
    bgGradient: 'from-orange-500 via-amber-500 to-yellow-300'
  }
];

export const ROCKS_DATA: RockInfo[] = [
  {
    id: 'granite',
    nameEn: 'Granite',
    nameZh: '花崗岩',
    type: 'igneous',
    typeNameEn: 'Igneous Rock',
    typeNameZh: '火成岩',
    formationEn: 'Formed when magma cools slowly deep underground and hardens.',
    formationZh: '岩漿在地底緩慢冷卻並凝固硬化而成。',
    hardness: 3,
    grainSize: 'large',
    grainSizeEn: 'Largest visible mineral grains (quartz, feldspar, mica)',
    grainSizeZh: '顆粒最大，肉眼可見明顯晶體（石英、長石、雲母）',
    usesEn: 'Building materials: outdoor staircases, pillars, monuments, kitchen countertops',
    usesZh: '建築材料：戶外石階、石柱、紀念碑、廚房石面',
    colorEn: 'Spotted light grey, pinkish, or white with dark specks',
    colorZh: '淺灰、微粉紅夾雜黑色斑點',
    visualColor: '#d1d5db',
    texturePattern: 'granite-speckled'
  },
  {
    id: 'basalt',
    nameEn: 'Basalt',
    nameZh: '玄武岩',
    type: 'igneous',
    typeNameEn: 'Igneous Rock',
    typeNameZh: '火成岩',
    formationEn: 'Formed when volcanic magma cools rapidly on the Earth’s surface.',
    formationZh: '火山岩漿噴出地表快速冷卻凝固而成。',
    hardness: 3,
    grainSize: 'fine',
    grainSizeEn: 'Fine grains (cooled rapidly)',
    grainSizeZh: '細小顆粒（快速冷凝）',
    usesEn: 'Road paving, cobblestone pathways, railway ballast',
    usesZh: '鋪設路面、石子路、鐵路碎石道碴',
    colorEn: 'Dark grey to black',
    colorZh: '深灰至黑色',
    visualColor: '#374151',
    texturePattern: 'basalt-dense'
  },
  {
    id: 'sandstone',
    nameEn: 'Sandstone',
    nameZh: '砂岩',
    type: 'sedimentary',
    typeNameEn: 'Sedimentary Rock',
    typeNameZh: '沉積岩',
    formationEn: 'Formed by the sedimentation of sand grains transported by rivers and pressed over millions of years.',
    formationZh: '河流搬運的沙粒沉積在水底，經歲月重壓膠結而成。',
    hardness: 3,
    grainSize: 'medium',
    grainSizeEn: 'Medium sand grains, rough sandpaper feel',
    grainSizeZh: '中等沙粒，觸感粗糙如砂紙',
    usesEn: 'Building materials, exterior walls, decorative building stones',
    usesZh: '建築材料、建築物外牆、裝飾石材',
    colorEn: 'Yellow, brown, or reddish',
    colorZh: '黃色、黃褐色或淺紅棕色',
    visualColor: '#d97706',
    texturePattern: 'sandstone-gritty'
  },
  {
    id: 'shale',
    nameEn: 'Shale',
    nameZh: '頁岩',
    type: 'sedimentary',
    typeNameEn: 'Sedimentary Rock',
    typeNameZh: '沉積岩',
    formationEn: 'Formed by thin layers of mud and silt deposited in calm waters and pressed.',
    formationZh: '泥沙在平靜水域沉積，受壓形成具明顯層理的薄片狀岩石。',
    hardness: 3,
    grainSize: 'fine',
    grainSizeEn: 'Very fine clay particles in visible sheets/layers',
    grainSizeZh: '極細黏土微粒，呈明顯頁片狀薄層',
    usesEn: 'Bricks, ceramic tiles, cement manufacturing',
    usesZh: '燒製磚塊、陶瓷地磚、水泥原料',
    colorEn: 'Dark grey to brownish black',
    colorZh: '灰黑或深灰色',
    visualColor: '#4b5563',
    texturePattern: 'shale-sheets'
  },
  {
    id: 'marble',
    nameEn: 'Marble',
    nameZh: '大理岩',
    type: 'metamorphic',
    typeNameEn: 'Metamorphic Rock',
    typeNameZh: '變質岩',
    formationEn: 'Formed when limestone changes under high temperature and high pressure.',
    formationZh: '石灰岩在高溫和高壓的環境下改變結構變質而成。',
    hardness: 2,
    grainSize: 'medium',
    grainSizeEn: 'Interlocking calcite crystals with smooth polish',
    grainSizeZh: '互扣方解石結晶，打磨後光滑具光澤',
    usesEn: 'Artistic sculptures, polished floor tiles, temple statues, hotel lobbies',
    usesZh: '藝術雕塑（如雕像）、光滑地板磚、廟宇雕像、豪華大堂',
    colorEn: 'White, cream, or patterned with elegant mineral veins',
    colorZh: '純白、米白或帶有天然美麗花紋',
    visualColor: '#f3f4f6',
    texturePattern: 'marble-veins'
  },
  {
    id: 'gneiss',
    nameEn: 'Gneiss',
    nameZh: '片麻岩',
    type: 'metamorphic',
    typeNameEn: 'Metamorphic Rock',
    typeNameZh: '變質岩',
    formationEn: 'Formed when granite or sedimentary rock transforms under extreme heat and pressure.',
    formationZh: '花崗岩或沉積岩在極端高溫高壓下變質，礦物重新排列。',
    hardness: 2,
    grainSize: 'large',
    grainSizeEn: 'Coarse crystals arranged in distinct banded stripes',
    grainSizeZh: '粗大結晶，排成深淺交替的明顯條紋',
    usesEn: 'Decorative building stone, curbs, landscape walls',
    usesZh: '裝飾石材、路緣石、園林石牆',
    colorEn: 'Banded alternating light and dark stripes (zebra-like)',
    colorZh: '深淺色相間的條紋狀',
    visualColor: '#78716c',
    texturePattern: 'gneiss-banded'
  }
];

export const SOIL_DATA: SoilInfo[] = [
  {
    id: 'sandy',
    nameEn: 'Sandy Soil',
    nameZh: '沙土',
    particleSize: 'largest',
    particleSizeRank: 3,
    drainageCapacity: 'highest',
    drainageRank: 3,
    nutrientRetention: 'lower',
    suitablePlantEn: 'Cactus (needs dry soil, quick drainage)',
    suitablePlantZh: '仙人掌（喜乾爽、需去水極快）',
    plantEmoji: '🌵',
    color: '#fbbf24',
    descriptionEn: 'Has the largest particles. Water passes through very quickly (highest drainage capacity), but holds the least nutrients.',
    descriptionZh: '顆粒最大，排水能力最高（水流迅速滲透流走），但保肥能力最低。'
  },
  {
    id: 'loam',
    nameEn: 'Loam',
    nameZh: '壤土',
    particleSize: 'medium-sized',
    particleSizeRank: 2,
    drainageCapacity: 'moderate',
    drainageRank: 2,
    nutrientRetention: 'moderate',
    suitablePlantEn: 'Roses & Garden Flowers (needs balanced water & nutrients)',
    suitablePlantZh: '玫瑰花與一般花卉（水份與養分平衡）',
    plantEmoji: '🌹',
    color: '#92400e',
    descriptionEn: 'Has medium-sized particles with moderate drainage and moderate nutrient retention. The most ideal soil for growing flowers like roses!',
    descriptionZh: '顆粒粗幼適中，排水能力適中，保肥能力適中，是種植玫瑰花和絕大多數植物最理想的土壤！'
  },
  {
    id: 'clay',
    nameEn: 'Clay Soil',
    nameZh: '黏土',
    particleSize: 'smallest',
    particleSizeRank: 1,
    drainageCapacity: 'lowest',
    drainageRank: 1,
    nutrientRetention: 'higher',
    suitablePlantEn: 'Lotus / Water Lily / Rice (needs water retention)',
    suitablePlantZh: '荷花／睡蓮／水稻（喜潮濕多水）',
    plantEmoji: '🪷',
    color: '#713f12',
    descriptionEn: 'Has the smallest particles packed tightly. Water drains very slowly (lowest drainage capacity), but retains nutrients very well.',
    descriptionZh: '顆粒最小且緊密貼合，排水能力最低（最易積水），保肥能力較高。'
  }
];

export const SOIL_COMPONENTS = [
  {
    id: 'particles',
    nameEn: 'Soil particles of different sizes',
    nameZh: '不同大小的土壤微粒',
    icon: 'grain',
    evidenceEn: 'Observed under magnifying glass and by sieving through mesh',
    evidenceZh: '用放大鏡觀察及用篩網篩分'
  },
  {
    id: 'humus',
    nameEn: 'Animal and plant matter',
    nameZh: '動植物碎屑（有機質）',
    icon: 'leaf',
    evidenceEn: 'Decayed leaves and tiny twigs float when stirred in water',
    evidenceZh: '加水攪拌時浮於水面的枯葉和植物纖維'
  },
  {
    id: 'water',
    nameEn: 'Water',
    nameZh: '水分',
    icon: 'droplet',
    evidenceEn: 'Moist weight decreases when heated or dried on a scale',
    evidenceZh: '土壤帶有濕氣，電子磅量秤烘乾前後重量有差'
  },
  {
    id: 'air',
    nameEn: 'Air',
    nameZh: '空氣',
    icon: 'wind',
    evidenceEn: 'Bubbles escape when dry soil is placed into water',
    evidenceZh: '把乾泥土放進水中時會冒出氣泡'
  }
];

export const FILL_BLANK_QUESTIONS: QuestionFillBlank[] = [
  {
    id: 'fb-1',
    code: 'SE4a_u1_02k_002_2',
    textEn: 'The structure of the Earth is made up of three layers. From the inside to the outside, they are the [BLANK_1], the [BLANK_2] and the [BLANK_3].',
    textZh: '地球的結構由三個圈層組成。由內至外分別是 [BLANK_1]、[BLANK_2] 和 [BLANK_3]。',
    answers: [
      ['core', '地核'],
      ['mantle', '地幔'],
      ['crust', '地殼']
    ],
    optionsEn: ['core', 'mantle', 'crust', 'plate', 'soil', 'magma'],
    optionsZh: ['地核', '地幔', '地殼', '板塊', '土壤', '岩漿'],
    hintEn: 'Remember: inside is the hottest, middle is flowing magma, outermost is where we live!',
    hintZh: '提示：最中心極高溫、中間是岩漿、最外層是我們居住的陸地！',
    explanationEn: 'From inside to outside: Core -> Mantle -> Crust. (From outside to inside would be: Crust -> Mantle -> Core).',
    explanationZh: '由內至外排列為：地核 -> 地幔 -> 地殼。（由外至內則是：地殼 -> 地幔 -> 地核）。'
  },
  {
    id: 'fb-2',
    code: 'SE4a_u1_02k_003_1',
    textEn: 'The centre of the Earth is the [BLANK_1]. The temperature is extremely high.',
    textZh: '地球的中心是 [BLANK_1]，溫度極高。',
    answers: [['core', '地核']],
    optionsEn: ['core', 'mantle', 'crust', 'magma'],
    optionsZh: ['地核', '地幔', '地殼', '岩漿'],
    hintEn: 'It is made mainly of metals (iron and nickel) and is thousands of degrees hot.',
    hintZh: '主要由金屬構成，溫度高達數千度。',
    explanationEn: 'The centre of the Earth is the core, where temperatures reach up to 6,000°C.',
    explanationZh: '地球的中心是地核，溫度可達 6,000°C。'
  },
  {
    id: 'fb-3',
    code: 'SE4a_u1_02k_005_1',
    textEn: 'We live on the [BLANK_1]. It is the outermost layer of the Earth.',
    textZh: '我們生活在 [BLANK_1] 上，它是地球的最外層。',
    answers: [['crust', '地殼']],
    optionsEn: ['crust', 'mantle', 'core', 'plate'],
    optionsZh: ['地殼', '地幔', '地核', '板塊'],
    hintEn: 'This rocky outer shell supports oceans, land, trees, and cities.',
    hintZh: '這個堅硬岩石外殼孕育了海洋、陸地與城市。',
    explanationEn: 'The crust is the thin, solid outermost layer of Earth where all human civilization exists.',
    explanationZh: '地殼是地球最外層的固態硬殼，人類生活在地殼表面。'
  },
  {
    id: 'fb-4',
    code: 'SE4a_u1_02k_006_1',
    textEn: 'The crust is mainly made up of [BLANK_1].',
    textZh: '地殼主要由 [BLANK_1] 組成。',
    answers: [['rocks', 'rock', '岩石']],
    optionsEn: ['rocks', 'water', 'metals', 'plastics'],
    optionsZh: ['岩石', '水分', '金屬', '塑料'],
    hintEn: 'They can be classified into igneous, sedimentary, and metamorphic types.',
    hintZh: '可分為火成岩、沉積岩和變質岩三大類。',
    explanationEn: 'The Earth’s crust is predominantly composed of various types of rocks.',
    explanationZh: '地殼主要由各類岩石構成。'
  },
  {
    id: 'fb-5',
    code: 'SE4a_u1_02k_007_1',
    textEn: 'The mantle contains hot flowing [BLANK_1].',
    textZh: '地幔含有高溫流動的 [BLANK_1]。',
    answers: [['magma', '岩漿']],
    optionsEn: ['magma', 'water', 'oil', 'ice'],
    optionsZh: ['岩漿', '水', '石油', '冰'],
    hintEn: 'Molten liquid rock underground that erupts as lava in volcanoes.',
    hintZh: '地底深處熔化的高溫流體，噴出火山時即為熔岩。',
    explanationEn: 'The mantle consists of semi-molten rock containing hot flowing magma.',
    explanationZh: '地幔含有高溫流動的岩漿。'
  },
  {
    id: 'fb-6',
    code: 'SE4a_u1_02k_009_1',
    textEn: 'The crust is the outermost layer of the Earth. It is divided into [BLANK_1] of different sizes.',
    textZh: '地殼是地球的最外層，它分裂成大小不同的 [BLANK_1]。',
    answers: [['plates', 'plate', '板塊']],
    optionsEn: ['plates', 'continents', 'islands', 'blocks'],
    optionsZh: ['板塊', '大洲', '島嶼', '碎塊'],
    hintEn: 'Tectonic pieces fitting like a giant cracked eggshell or jigsaw puzzle.',
    hintZh: '如同破裂蛋殼或拼圖板塊。',
    explanationEn: 'The Earth crust is not a continuous unbroken shell; it is fragmented into tectonic plates.',
    explanationZh: '地殼並非完整一整塊，而是分成多個大小不一的板塊。'
  },
  {
    id: 'fb-7',
    code: 'SE4a_u1_02k_010_1',
    textEn: 'The movement and collision of plates may cause [BLANK_1] and [BLANK_2].',
    textZh: '板塊的移動和碰撞可能會引發 [BLANK_1] 和 [BLANK_2]。',
    answers: [
      ['earthquakes', 'volcanic eruptions', 'earthquake', 'volcanoes', '地震', '火山爆發'],
      ['volcanic eruptions', 'earthquakes', 'volcanic eruption', 'volcanoes', '火山爆發', '地震']
    ],
    optionsEn: ['earthquakes', 'volcanic eruptions', 'rainbows', 'typhoons', 'sandstorms'],
    optionsZh: ['地震', '火山爆發', '彩虹', '颱風', '沙塵暴'],
    hintEn: 'When the ground shakes violently or molten rock bursts through mountains.',
    hintZh: '地面劇烈晃動或地下熔岩衝出地表。',
    explanationEn: 'Plate movements and collisions release energy causing earthquakes, and create fractures causing volcanic eruptions.',
    explanationZh: '板塊互相擠壓碰撞會導致地面震動（地震）及岩漿湧出（火山爆發）。'
  },
  {
    id: 'fb-8',
    code: 'SE4a_u1_02k_013_1',
    textEn: 'Some rocks break into pieces after many years of exposure to wind and rain, forming [BLANK_1].',
    textZh: '有些岩石經長年累月的風吹雨打分解破裂，形成 [BLANK_1]。',
    answers: [['soil', '土壤', '泥土']],
    optionsEn: ['soil', 'magma', 'diamonds', 'metals'],
    optionsZh: ['土壤', '岩漿', '鑽石', '金屬'],
    hintEn: 'Plants grow their roots in this soft ground material.',
    hintZh: '植物在這種鬆軟的地面物質中扎根生長。',
    explanationEn: 'Weathering of solid rock by wind and rain breaks rock down into soil particles over long periods.',
    explanationZh: '岩石受風化侵蝕分解，與動植物腐殖質混合形成土壤。'
  },
  {
    id: 'fb-9',
    code: 'SE4a_u1_02k_014_1',
    textEn: 'Rocks can be divided into three types according to how they are formed: [BLANK_1], [BLANK_2] and [BLANK_3].',
    textZh: '按形成過程，岩石可分為三大類：[BLANK_1]、[BLANK_2] 和 [BLANK_3]。',
    answers: [
      ['igneous rock', 'igneous rocks', '火成岩'],
      ['sedimentary rock', 'sedimentary rocks', '沉積岩'],
      ['metamorphic rock', 'metamorphic rocks', '變質岩']
    ],
    optionsEn: ['igneous rocks', 'sedimentary rocks', 'metamorphic rocks', 'sandy soil', 'magma'],
    optionsZh: ['火成岩', '沉積岩', '變質岩', '沙土', '岩漿'],
    hintEn: 'Magma cooling, water sediments deposited, and rocks changed by heat/pressure.',
    hintZh: '岩漿冷凝、水中沉積、高溫高壓變質。',
    explanationEn: 'The three rock groups by formation process are Igneous, Sedimentary, and Metamorphic rocks.',
    explanationZh: '三大類岩石分別是：火成岩、沉積岩和變質岩。'
  },
  {
    id: 'fb-10',
    code: 'SE4a_u1_02k_015_1',
    textEn: 'Rocks formed when magma cools and hardens are called [BLANK_1].',
    textZh: '岩漿冷卻並凝固硬化後形成的岩石稱為 [BLANK_1]。',
    answers: [['igneous rocks', 'igneous rock', '火成岩']],
    optionsEn: ['igneous rocks', 'sedimentary rocks', 'metamorphic rocks', 'clay'],
    optionsZh: ['火成岩', '沉積岩', '變質岩', '黏土'],
    hintEn: 'Examples include granite and basalt.',
    hintZh: '常見例子包括花崗岩和玄武岩。',
    explanationEn: 'Igneous rocks (like granite and basalt) form directly from the cooling and solidification of molten rock (magma).',
    explanationZh: '岩漿冷凝後硬化形成的岩石就是火成岩（如花崗岩、玄武岩）。'
  },
  {
    id: 'fb-11',
    code: 'SE4a_u1_02k_016_1',
    textEn: 'Rocks formed when different types of rocks change their structures under high pressure and high temperature are called [BLANK_1].',
    textZh: '不同種類岩石在高溫和高壓下改變內部結構所形成的岩石稱為 [BLANK_1]。',
    answers: [['metamorphic rocks', 'metamorphic rock', '變質岩']],
    optionsEn: ['metamorphic rocks', 'igneous rocks', 'sedimentary rocks', 'loam'],
    optionsZh: ['變質岩', '火成岩', '沉積岩', '壤土'],
    hintEn: 'Examples include marble and gneiss.',
    hintZh: '例子有大理岩和片麻岩。',
    explanationEn: 'Metamorphic rocks form when pre-existing rocks undergo extreme heat and pressure beneath the crust.',
    explanationZh: '在高溫高壓下變質重組的岩石是變質岩（如大理岩、片麻岩）。'
  },
  {
    id: 'fb-12',
    code: 'SE4a_u1_02k_017_1',
    textEn: 'Rocks formed by the sedimentation of rock pieces and soil transported down by water are called [BLANK_1].',
    textZh: '由水流搬運沉積下來的岩石碎屑和泥沙固化而成的岩石稱為 [BLANK_1]。',
    answers: [['sedimentary rocks', 'sedimentary rock', '沉積岩']],
    optionsEn: ['sedimentary rocks', 'igneous rocks', 'metamorphic rocks', 'sand'],
    optionsZh: ['沉積岩', '火成岩', '變質岩', '沙粒'],
    hintEn: 'Examples include sandstone and shale.',
    hintZh: '例子有砂岩和頁岩。',
    explanationEn: 'Sedimentary rocks are built layer-by-layer from mineral sediment deposited in water bodies.',
    explanationZh: '在流水搬運下沉積並壓實固結的岩石是沉積岩（如砂岩、頁岩）。'
  },
  {
    id: 'fb-13',
    code: 'SE4a_u1_02k_019_1',
    textEn: 'According to the size of particles from small to large, we can divide soil into [BLANK_1], [BLANK_2] and [BLANK_3].',
    textZh: '按照顆粒大小由小至大排列，土壤可分為 [BLANK_1]、[BLANK_2] 和 [BLANK_3]。',
    answers: [
      ['clay soil', 'clay', '黏土'],
      ['loam', '壤土'],
      ['sandy soil', 'sand', '沙土']
    ],
    optionsEn: ['clay soil', 'loam', 'sandy soil', 'granite', 'gravel'],
    optionsZh: ['黏土', '壤土', '沙土', '花崗岩', '礫石'],
    hintEn: 'Smallest = fine powder; medium = balanced garden earth; largest = gritty beach particles.',
    hintZh: '最小：粉末狀緊密；中等：花園肥沃泥；最大：粗糙砂礫。',
    explanationEn: 'Particle size from smallest to largest: Clay soil (smallest) < Loam (medium) < Sandy soil (largest).',
    explanationZh: '由小至大：黏土（最小）-> 壤土（中等）-> 沙土（最大）。'
  },
  {
    id: 'fb-14',
    code: 'SE4a_u1_02k_020_1',
    textEn: 'Among sandy soil, loam and clay soil, [BLANK_1] has the best drainage capacity, [BLANK_2] has the worst drainage capacity, and [BLANK_3] has moderate drainage capacity.',
    textZh: '在沙土、壤土和黏土中，[BLANK_1] 的排水能力最高，[BLANK_2] 的排水能力最低，而 [BLANK_3] 的排水能力適中。',
    answers: [
      ['sandy soil', 'sand', '沙土'],
      ['clay soil', 'clay', '黏土'],
      ['loam', '壤土']
    ],
    optionsEn: ['sandy soil', 'clay soil', 'loam', 'basalt'],
    optionsZh: ['沙土', '黏土', '壤土', '玄武岩'],
    hintEn: 'Water trickles through big sand grains fastest; clay traps water tightly; loam is balanced.',
    hintZh: '粗大沙粒隙縫多水流最快；黏土細密最易積水；壤土適中。',
    explanationEn: 'Sandy soil drains best (highest), Clay soil drains worst (lowest), and Loam has moderate drainage.',
    explanationZh: '排水能力：沙土最高（最好），黏土最低（最弱），壤土適中。'
  }
];

export const JUDGING_QUESTIONS: QuestionJudging[] = [
  {
    id: 'jd-1',
    code: 'SE4a_u1_04k_001_1',
    statementEn: 'The outermost layer of the Earth is the crust.',
    statementZh: '地球最外層是地殼。',
    isCorrect: true,
    explanationEn: 'Correct! The crust is the solid, thin outermost layer of the Earth.',
    explanationZh: '正確！地殼是地球最外層的固態岩石層。'
  },
  {
    id: 'jd-2',
    code: 'SE4a_u1_04k_002_1',
    statementEn: 'The mantle contains hot flowing magma.',
    statementZh: '地幔含有高溫流動的岩漿。',
    isCorrect: true,
    explanationEn: 'Correct! The mantle is beneath the crust and contains hot, slow-flowing magma.',
    explanationZh: '正確！地幔位於地殼下方，含有高溫流動的岩漿。'
  },
  {
    id: 'jd-3',
    code: 'SE4a_u1_04k_003_1',
    statementEn: 'The centre of the Earth is the mantle, which has a very high temperature.',
    statementZh: '地球的中心是地幔，具有極高的溫度。',
    isCorrect: false,
    explanationEn: 'False! The centre of the Earth is the CORE (not the mantle).',
    explanationZh: '錯誤！地球的中心是「地核」，而不是地幔。'
  },
  {
    id: 'jd-4',
    code: 'SE4a_u1_04k_004_1',
    statementEn: 'The centre of the Earth is the crust. It is mainly made up of rocks.',
    statementZh: '地球的中心是地殼，主要由岩石組成。',
    isCorrect: false,
    explanationEn: 'False! The crust is the outermost layer, while the core is at the centre.',
    explanationZh: '錯誤！地殼是地球的最外層，地球中心是地核。'
  },
  {
    id: 'jd-5',
    code: 'SE4a_u1_04k_005_1',
    statementEn: 'The crust is mainly made up of a complete piece of rock.',
    statementZh: '地殼主要是由完整一整塊岩石組成的。',
    isCorrect: false,
    explanationEn: 'False! The crust is NOT a single piece; it is fractured into many tectonic plates of different sizes.',
    explanationZh: '錯誤！地殼並非完整一整塊，而是分裂成許多大小不同的板塊。'
  },
  {
    id: 'jd-6',
    code: 'SE4a_u1_04k_006_1',
    statementEn: 'Plates move slowly when the magma in the mantle flows.',
    statementZh: '當地幔中的岩漿流動時，板塊會緩慢移動。',
    isCorrect: true,
    explanationEn: 'Correct! Convection currents in the mantle’s flowing magma drive the movement of crustal plates.',
    explanationZh: '正確！地幔岩漿緩慢流動，推動上方的地殼板塊緩慢移動。'
  },
  {
    id: 'jd-7',
    code: 'SE4a_u1_04k_007_1',
    statementEn: 'Earthquake is a natural phenomenon caused by plate movement and collision.',
    statementZh: '地震是由板塊移動和碰撞所引起的自然現象。',
    isCorrect: true,
    explanationEn: 'Correct! Plate friction and collision cause the ground to shake violently as earthquakes.',
    explanationZh: '正確！板塊互相擠壓碰撞引發劇烈震動，造成地震。'
  },
  {
    id: 'jd-8',
    code: 'SE4a_u1_04k_008_1',
    statementEn: 'Shale is a kind of igneous rock.',
    statementZh: '頁岩是一種火成岩。',
    isCorrect: false,
    explanationEn: 'False! Shale is a SEDIMENTARY rock formed from compacted mud and clay in water.',
    explanationZh: '錯誤！頁岩是「沉積岩」，由水底細泥沙層層壓實沉積而成。'
  },
  {
    id: 'jd-9',
    code: 'SE4a_u1_04k_009_2',
    statementEn: 'Both marble and gneiss are sedimentary rocks.',
    statementZh: '大理岩和片麻岩都是沉積岩。',
    isCorrect: false,
    explanationEn: 'False! Both marble and gneiss are METAMORPHIC rocks formed under high temperature and pressure.',
    explanationZh: '錯誤！大理岩和片麻岩都是「變質岩」，在高溫高壓下變質而成。'
  },
  {
    id: 'jd-10',
    code: 'SE4a_u1_04k_011_1',
    statementEn: 'Sandy soil has the weakest drainage capacity, while clay soil has the strongest drainage capacity.',
    statementZh: '沙土的排水能力最弱，而黏土的排水能力最強。',
    isCorrect: false,
    explanationEn: 'False! The opposite is true: Sandy soil has the STRONGEST (highest) drainage, while Clay soil has the WEAKEST (lowest) drainage.',
    explanationZh: '錯誤！恰好相反：沙土排水能力最強（最高），黏土排水能力最弱（最低）。'
  },
  {
    id: 'jd-11',
    code: 'SE4a_u1_04k_012_custom',
    statementEn: 'Granite is an igneous rock and has the largest visible grain size among granite, sandstone, and marble.',
    statementZh: '花崗岩是火成岩，在花崗岩、砂岩與大理岩中具有最大的可見顆粒。',
    isCorrect: true,
    explanationEn: 'Correct! Granite cools slowly underground, creating large visible mineral crystal grains.',
    explanationZh: '正確！花崗岩在地底深處緩慢冷卻，形成粗大肉眼可見的礦物結晶。'
  },
  {
    id: 'jd-12',
    code: 'SE4a_u1_04k_013_custom',
    statementEn: 'We should collect and take beautiful rocks home when visiting the Hong Kong Geopark.',
    statementZh: '參觀香港地質公園時，我們應該把美麗的岩石帶回家作紀念。',
    isCorrect: false,
    explanationEn: 'False! Rocks and soil are precious natural resources. We must cherish and protect them—never take rocks from geoparks!',
    explanationZh: '錯誤！岩石是珍貴的自然資源，參觀地質公園時絕不可私自帶走岩石，必須好好保護！'
  }
];

export const ATTITUDE_MC_QUESTIONS: QuestionMC[] = [
  {
    id: 'mc-1',
    code: 'SE4a_u1_01a_001_hk',
    questionEn: 'How should we properly cherish and protect Earth’s rocks and soil resources? (Select all that apply)',
    questionZh: '我們應該如何珍惜和保護地球上的岩石和土壤資源？（可選多於一項）',
    optionsEn: [
      { id: 'A', text: 'Do not litter or dump toxic waste into soil' },
      { id: 'B', text: 'Do not take away rocks when visiting the Hong Kong Geopark' },
      { id: 'C', text: 'Plant vegetation to prevent soil erosion from wind and rain' },
      { id: 'D', text: 'Chisel rock formations to engrave our names' }
    ],
    optionsZh: [
      { id: 'A', text: '不亂扔垃圾或化學廢物污染土壤' },
      { id: 'B', text: '參觀香港地質公園時，絕不私自撿走岩石' },
      { id: 'C', text: '多種植綠色植被，防止水土流失' },
      { id: 'D', text: '在自然岩石上刻字留下姓名留念' }
    ],
    correctAnswers: ['A', 'B', 'C'],
    explanationEn: 'Rocks and soil take thousands of years to form. We must never damage or take rocks from protected geoparks, and never pollute the soil!',
    explanationZh: '岩石和土壤是珍貴資源，需歷經漫長歲月形成。我們必須嚴格遵守地質公園規則、不取走岩石，不污染土壤。'
  },
  {
    id: 'mc-2',
    code: 'SE4a_u1_01a_002_hk',
    questionEn: 'Which type of rock is commonly used for carving detailed artistic sculptures, and why?',
    questionZh: '哪種岩石常用於雕刻精美的藝術雕塑？原因是什麼？',
    optionsEn: [
      { id: 'A', text: 'Marble (Metamorphic rock) - moderate hardness and smooth polish' },
      { id: 'B', text: 'Shale (Sedimentary rock) - crumbly and splits into sheets' },
      { id: 'C', text: 'Basalt (Igneous rock) - dark and extremely porous' },
      { id: 'D', text: 'Sandstone (Sedimentary rock) - loose grains that fall apart easily' }
    ],
    optionsZh: [
      { id: 'A', text: '大理岩（變質岩）—— 硬度適中且打磨後光潔純美' },
      { id: 'B', text: '頁岩（沉積岩）—— 易碎成薄片' },
      { id: 'C', text: '玄武岩（火成岩）—— 質地過於粗硬沉黑' },
      { id: 'D', text: '砂岩（沉積岩）—— 沙粒容易脫落' }
    ],
    correctAnswers: ['A'],
    explanationEn: 'Marble is a metamorphic rock with moderate hardness (2 stars) that polishes into lustrous white surfaces, making it world-famous for sculptures and hotel decor.',
    explanationZh: '大理岩（變質岩）硬度適中（2星），打磨後光滑具光澤，非常適合精細藝術雕刻。'
  },
  {
    id: 'mc-3',
    code: 'SE4a_u1_01a_003_hk',
    questionEn: 'Hong Kong student Carson wants to plant a desert cactus and a rose in his school garden. Which soil should he choose for each?',
    questionZh: '香港小學生家俊想在校園園圃種植沙漠仙人掌和玫瑰花，他應分別選擇哪種土壤？',
    optionsEn: [
      { id: 'A', text: 'Cactus in Sandy Soil (drains quickly); Rose in Loam (balanced water & nutrients)' },
      { id: 'B', text: 'Cactus in Clay Soil; Rose in Sandy Soil' },
      { id: 'C', text: 'Both in Clay Soil because it holds water longest' },
      { id: 'D', text: 'Both in Sandy Soil because it has zero nutrients' }
    ],
    optionsZh: [
      { id: 'A', text: '仙人掌種在沙土（排水快不易爛根）；玫瑰種在壤土（水分與養分均衡）' },
      { id: 'B', text: '仙人掌種在黏土；玫瑰種在沙土' },
      { id: 'C', text: '兩者皆種在黏土，因保水力最高' },
      { id: 'D', text: '兩者皆種在沙土，因完全沒有養分' }
    ],
    correctAnswers: ['A'],
    explanationEn: 'Cacti thrive in sandy soil because high drainage prevents root rot. Roses thrive in loam because it balances moisture and rich nutrients.',
    explanationZh: '仙人掌喜乾燥，需排水最好的沙土；玫瑰花喜濕潤且需要充足養分，最適合排水與養分適中的壤土。'
  }
];
