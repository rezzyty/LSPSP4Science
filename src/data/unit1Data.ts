import {
  ChapterMeta,
  MCQuestion,
  BlankQuestion,
  JudgingQuestion,
  MatchingQuestion,
  ReorderingQuestion
} from '../types/curriculum';

export const CHAPTERS_META: ChapterMeta[] = [
  {
    id: 'all',
    title: 'Unit 1: About the Earth (Full Review)',
    subtitle: 'Comprehensive Practice Across All Chapters',
    description: 'Master all concepts from Chapter 1, Chapter 2, and Chapter 3 in one complete practice arena.',
    icon: '🌍',
    topics: ['Earth Structure', 'Movement & Seasons', 'Weather & Global Warming']
  },
  {
    id: 'ch1',
    title: 'Chapter 1: Structure of the Earth',
    subtitle: 'Crust, Mantle, Core, Rocks & Soil',
    description: 'Explore the 3 Earth layers, tectonic plate collisions, igneous/sedimentary/metamorphic rocks, and soil drainage.',
    icon: '🌋',
    topics: ['Three Layers', 'Tectonic Plates', '3 Rock Types', 'Soil Science & Geoparks']
  },
  {
    id: 'ch2',
    title: 'Chapter 2: Movement of the Earth',
    subtitle: 'Rotation, Revolution, Shadows & Seasons',
    description: 'Understand how Earth rotates on its tilted axis causing day/night and shadow changes, and revolves around the Sun creating seasons.',
    icon: '☀️',
    topics: ['24h Rotation & Axis', 'Day & Night Cycle', 'Sundials & Shadows', 'Revolution & 4 Seasons']
  },
  {
    id: 'ch3',
    title: 'Chapter 3: Weather and Climate',
    subtitle: 'HK Observatory, Global Climates & Carbon Footprints',
    description: 'Learn the difference between weather and climate, global comparisons, greenhouse gases, and daily actions to reduce carbon footprints.',
    icon: '⛅',
    topics: ['Weather vs Climate', 'HK Observatory Indicators', 'Global Warming Effects', 'Carbon Footprint Reductions']
  }
];

// 1. SE4a_u1_01: Multiple Choice Questions (Knowledge & Attitudes)
export const MC_QUESTIONS: MCQuestion[] = [
  // Chapter 1 Questions
  {
    id: 'mc-1',
    code: 'SE4a_u1_01k_001_1',
    chapter: 'ch1',
    category: 'knowledge',
    question: 'Which of these items is the most similar to the structure of the Earth?',
    options: [
      { id: 'A', text: 'Watermelon' },
      { id: 'B', text: 'Apple' },
      { id: 'C', text: 'Boiled egg' },
      { id: 'D', text: 'Table tennis ball' }
    ],
    correctAnswers: ['C'],
    explanation: 'A boiled egg is the most similar to the Earth: the shell represents the thin outer crust, the egg white represents the thick mantle, and the yolk represents the central core.'
  },
  {
    id: 'mc-2',
    code: 'SE4a_u1_01k_002_1',
    chapter: 'ch1',
    category: 'knowledge',
    question: 'What is the Earth’s crust mainly made up of?',
    options: [
      { id: 'A', text: 'Magma' },
      { id: 'B', text: 'Rocks' },
      { id: 'C', text: 'Soil' },
      { id: 'D', text: 'Sand' }
    ],
    correctAnswers: ['B'],
    explanation: 'The Earth’s crust is a solid rocky outer layer mainly made up of various rocks (such as granite, basalt, sandstone, and marble).'
  },
  {
    id: 'mc-3',
    code: 'SE4a_u1_01k_003_1',
    chapter: 'ch1',
    category: 'knowledge',
    question: 'What is the centre of the Earth?',
    options: [
      { id: 'A', text: 'Rocks' },
      { id: 'B', text: 'Earth’s crust' },
      { id: 'C', text: 'Earth’s mantle' },
      { id: 'D', text: 'Earth’s core' }
    ],
    correctAnswers: ['D'],
    explanation: 'The core is the innermost central layer of the Earth. It has extremely high temperatures and is mainly made up of heavy metals.'
  },
  {
    id: 'mc-4',
    code: 'SE4a_u1_01k_004_2',
    chapter: 'ch1',
    category: 'knowledge',
    question: 'Which of these descriptions about the structure of the Earth is correct?',
    options: [
      { id: 'A', text: 'The Earth’s crust is the centre of the Earth.' },
      { id: 'B', text: 'The Earth’s core is the outermost layer of the Earth.' },
      { id: 'C', text: 'The Earth’s mantle is mainly made up of rocks.' },
      { id: 'D', text: 'The Earth’s core is mainly made up of metals. The temperature is extremely high.' }
    ],
    correctAnswers: ['D'],
    explanation: 'Option D is completely correct. The core is in the centre, mainly composed of iron and nickel metals, with temperatures up to 6,000°C.'
  },
  {
    id: 'mc-5',
    code: 'SE4a_u1_01k_007_1',
    chapter: 'ch1',
    category: 'knowledge',
    question: 'What natural phenomena may plate movement and collision cause? (There can be more than one answer.)',
    options: [
      { id: 'A', text: 'Heavy rain' },
      { id: 'B', text: 'Lightnings' },
      { id: 'C', text: 'Earthquakes' },
      { id: 'D', text: 'Volcanic eruptions' }
    ],
    correctAnswers: ['C', 'D'],
    isMultipleSelection: true,
    explanation: 'When tectonic plates move and collide with one another, seismic vibrations cause earthquakes, and fractures allow deep magma to gush out causing volcanic eruptions.'
  },
  {
    id: 'mc-6',
    code: 'SE4a_u1_01k_008_1',
    chapter: 'ch1',
    category: 'knowledge',
    question: 'What type of rock is basalt?',
    options: [
      { id: 'A', text: 'Igneous rock' },
      { id: 'B', text: 'Sedimentary rock' },
      { id: 'C', text: 'Metamorphic rock' },
      { id: 'D', text: 'None of the above' }
    ],
    correctAnswers: ['A'],
    explanation: 'Basalt is an igneous rock formed when volcanic magma erupts onto the surface and cools rapidly.'
  },
  {
    id: 'mc-7',
    code: 'SE4a_u1_01k_009_1',
    chapter: 'ch1',
    category: 'knowledge',
    question: 'What characteristic of the soil can you observe by using a sieve to sieve the soil?',
    options: [
      { id: 'A', text: 'Whether it contains water' },
      { id: 'B', text: 'Whether it contains air' },
      { id: 'C', text: 'The particle size' },
      { id: 'D', text: 'The weight' }
    ],
    correctAnswers: ['C'],
    explanation: 'Sieving dry soil through a mesh separates the soil into different particle sizes (coarse grains on top, fine particles passing through).'
  },
  {
    id: 'mc-8',
    code: 'SE4a_u1_01k_010_1',
    chapter: 'ch1',
    category: 'knowledge',
    question: 'Which type of soil has the smallest particles: sandy soil, loam or clay soil?',
    options: [
      { id: 'A', text: 'Sandy soil' },
      { id: 'B', text: 'Loam' },
      { id: 'C', text: 'Clay soil' },
      { id: 'D', text: 'Not sure' }
    ],
    correctAnswers: ['C'],
    explanation: 'Clay soil has the smallest, finest particles packed tightly together.'
  },
  {
    id: 'mc-9',
    code: 'SE4a_u1_01k_011_1',
    chapter: 'ch1',
    category: 'knowledge',
    question: 'Which type of soil has the best drainage capacity: sandy soil, loam or clay soil?',
    options: [
      { id: 'A', text: 'Sandy soil' },
      { id: 'B', text: 'Loam' },
      { id: 'C', text: 'Clay soil' },
      { id: 'D', text: 'Not sure' }
    ],
    correctAnswers: ['A'],
    explanation: 'Sandy soil has the largest particles with large pore spaces between them, allowing water to drain out the fastest (best drainage capacity).'
  },

  // Chapter 2 Questions
  {
    id: 'mc-10',
    code: 'SE4a_u1_01k_012_1',
    chapter: 'ch2',
    category: 'knowledge',
    question: 'Imagine a torch represents the Sun and shines on a globe. When Hong Kong on the globe is facing and shone by the Sun, what time of the day is it in Hong Kong?',
    options: [
      { id: 'A', text: 'Noon' },
      { id: 'B', text: 'Evening' },
      { id: 'C', text: 'Midnight' },
      { id: 'D', text: 'Not sure' }
    ],
    correctAnswers: ['A'],
    explanation: 'When Hong Kong is directly facing the torch (Sun), it receives direct illumination, representing daytime / noon.'
  },
  {
    id: 'mc-11',
    code: 'SE4a_u1_01k_013_2',
    chapter: 'ch2',
    category: 'knowledge',
    question: 'Which of these descriptions about the Earth is correct? (There can be more than one answer.)',
    options: [
      { id: 'A', text: 'It takes around 24 hours for the Earth to rotate once.' },
      { id: 'B', text: 'The Sun moves around the Earth.' },
      { id: 'C', text: 'The cycle of day and night is caused by the rotation of the Earth.' },
      { id: 'D', text: 'The imaginary axis of the Earth is tilted.' }
    ],
    correctAnswers: ['A', 'C', 'D'],
    isMultipleSelection: true,
    explanation: 'A, C, and D are correct. B is incorrect because the Earth moves around the Sun, not the Sun around the Earth.'
  },
  {
    id: 'mc-12',
    code: 'SE4a_u1_01k_014_1',
    chapter: 'ch2',
    category: 'knowledge',
    question: 'Which of these descriptions about the Earth’s rotation is correct? (There can be more than one answer.)',
    options: [
      { id: 'A', text: 'The Earth keeps rotating around the axis every day.' },
      { id: 'B', text: 'The Earth’s axis is real. It passes through the North Pole and the South Pole.' },
      { id: 'C', text: 'We see sunrise and sunset because the Earth rotates.' },
      { id: 'D', text: 'It takes around 365 days for the Earth to rotate once.' }
    ],
    correctAnswers: ['A', 'C'],
    isMultipleSelection: true,
    explanation: 'A and C are correct. B is wrong because the axis is IMAGINARY (not a real physical stick). D is wrong because rotation takes 24 hours; revolution takes 365 days.'
  },
  {
    id: 'mc-13',
    code: 'SE4a_u1_01k_016_2',
    chapter: 'ch2',
    category: 'knowledge',
    question: 'How long does it take for the Earth to rotate once?',
    options: [
      { id: 'A', text: '12 hours' },
      { id: 'B', text: '24 hours' },
      { id: 'C', text: '1 month' },
      { id: 'D', text: '1 year' }
    ],
    correctAnswers: ['B'],
    explanation: 'The Earth takes around 24 hours (1 full day) to complete one rotation on its axis.'
  },
  {
    id: 'mc-14',
    code: 'SE4a_u1_01k_017_1',
    chapter: 'ch2',
    category: 'knowledge',
    question: 'What changes in the length of a shadow can you notice from morning to noon?',
    options: [
      { id: 'A', text: 'The shadow becomes longer.' },
      { id: 'B', text: 'The shadow becomes shorter.' },
      { id: 'C', text: 'The shadow becomes longer first and then shorter.' },
      { id: 'D', text: 'The shadow becomes shorter first and then longer.' }
    ],
    correctAnswers: ['B'],
    explanation: 'In the morning the Sun is low so shadows are long. As the Sun rises overhead towards noon, the shadows become shorter.'
  },
  {
    id: 'mc-15',
    code: 'SE4a_u1_01k_019_1',
    chapter: 'ch2',
    category: 'knowledge',
    question: 'How long does it take for the Earth to complete one revolution?',
    options: [
      { id: 'A', text: '1 hour' },
      { id: 'B', text: '1 month' },
      { id: 'C', text: '1 day' },
      { id: 'D', text: '1 year' }
    ],
    correctAnswers: ['D'],
    explanation: 'One complete revolution of the Earth around the Sun takes 1 year (about 365 days).'
  },
  {
    id: 'mc-16',
    code: 'SE4a_u1_01k_020_1',
    chapter: 'ch2',
    category: 'knowledge',
    question: 'When the northern hemisphere receives overhead sunlight, what season is it in Hong Kong?',
    options: [
      { id: 'A', text: 'Spring' },
      { id: 'B', text: 'Summer' },
      { id: 'C', text: 'Autumn' },
      { id: 'D', text: 'Winter' }
    ],
    correctAnswers: ['B'],
    explanation: 'Hong Kong is in the northern hemisphere. When the northern hemisphere receives overhead sunlight, it receives the most concentrated heat, making it summer.'
  },
  {
    id: 'mc-17',
    code: 'SE4a_u1_01k_021_1',
    chapter: 'ch2',
    category: 'knowledge',
    question: 'When the northern hemisphere receives slanted sunlight, what season is it in Hong Kong?',
    options: [
      { id: 'A', text: 'Spring' },
      { id: 'B', text: 'Summer' },
      { id: 'C', text: 'Autumn' },
      { id: 'D', text: 'Winter' }
    ],
    correctAnswers: ['D'],
    explanation: 'When the northern hemisphere receives slanted sunlight, heat is spread out over a larger area and temperatures drop, making it winter in Hong Kong.'
  },
  {
    id: 'mc-18',
    code: 'SE4a_u1_01k_022_1',
    chapter: 'ch2',
    category: 'knowledge',
    question: 'When the northern hemisphere receives overhead sunlight, what season is it in Melbourne in the southern hemisphere?',
    options: [
      { id: 'A', text: 'Spring' },
      { id: 'B', text: 'Summer' },
      { id: 'C', text: 'Autumn' },
      { id: 'D', text: 'Winter' }
    ],
    correctAnswers: ['D'],
    explanation: 'The northern and southern hemispheres experience opposite seasons. When it is summer in the northern hemisphere, it is winter in Melbourne (southern hemisphere).'
  },
  {
    id: 'mc-19',
    code: 'SE4a_u1_01k_023_1',
    chapter: 'ch2',
    category: 'knowledge',
    question: 'Which of these descriptions about the revolution of the Earth is correct?',
    options: [
      { id: 'A', text: 'The Earth moves around the Sun.' },
      { id: 'B', text: 'It takes around 24 hours for the Earth to complete one full revolution.' },
      { id: 'C', text: 'When the Earth moves to different locations during a revolution, the temperature in the southern hemisphere remains the same.' },
      { id: 'D', text: 'When the Earth is moving around the Sun, the southern hemisphere and the northern hemisphere receive sunlight at the same angle.' }
    ],
    correctAnswers: ['A'],
    explanation: 'Revolution is the motion of the Earth orbiting around the Sun once every 365 days.'
  },

  // Chapter 3 Questions
  {
    id: 'mc-20',
    code: 'SE4a_u1_01k_weather',
    chapter: 'ch3',
    category: 'knowledge',
    question: 'What can you use to describe the weather of a place? (There can be more than one answer.)',
    options: [
      { id: 'A', text: 'Temperature' },
      { id: 'B', text: 'Relative humidity' },
      { id: 'C', text: 'Rainfall' },
      { id: 'D', text: 'Climate' }
    ],
    correctAnswers: ['A', 'B', 'C'],
    isMultipleSelection: true,
    explanation: 'Temperature, relative humidity, and rainfall describe short-term weather conditions. Climate refers to average conditions over a long period.'
  },
  {
    id: 'mc-21',
    code: 'SE4a_u1_01k_026_1',
    chapter: 'ch3',
    category: 'knowledge',
    question: 'When it is summer in Hong Kong, which of these places is in summer too? (There can be more than one answer.)',
    options: [
      { id: 'A', text: 'Beijing' },
      { id: 'B', text: 'Shanghai' },
      { id: 'C', text: 'Singapore' },
      { id: 'D', text: 'Canberra' }
    ],
    correctAnswers: ['A', 'B', 'C'],
    isMultipleSelection: true,
    explanation: 'Beijing, Shanghai, and Singapore are all in the northern hemisphere or on the equator. Canberra is in the southern hemisphere (where it is winter).'
  },
  {
    id: 'mc-22',
    code: 'SE4a_u1_01k_027_1',
    chapter: 'ch3',
    category: 'knowledge',
    question: 'When it is summer in Hong Kong, which of these places is in winter?',
    options: [
      { id: 'A', text: 'Beijing' },
      { id: 'B', text: 'Shanghai' },
      { id: 'C', text: 'Singapore' },
      { id: 'D', text: 'Canberra' }
    ],
    correctAnswers: ['D'],
    explanation: 'Canberra is located in Australia in the southern hemisphere, having opposite seasons from Hong Kong.'
  },
  {
    id: 'mc-23',
    code: 'SE4a_u1_01k_028_1',
    chapter: 'ch3',
    category: 'knowledge',
    question: 'Which of these places do not have four distinct seasons?',
    options: [
      { id: 'A', text: 'Beijing' },
      { id: 'B', text: 'Shanghai' },
      { id: 'C', text: 'Singapore' },
      { id: 'D', text: 'Canberra' }
    ],
    correctAnswers: ['C'],
    explanation: 'Singapore is very close to the equator, so it stays hot and humid throughout the year without four distinct seasons.'
  },
  {
    id: 'mc-24',
    code: 'SE4a_u1_01k_030_1',
    chapter: 'ch3',
    category: 'knowledge',
    question: 'Which of these activities cause the amount of carbon dioxide in the Earth’s atmosphere to increase sharply? (There can be more than one answer.)',
    options: [
      { id: 'A', text: 'Deforestation' },
      { id: 'B', text: 'Factories giving out waste gas' },
      { id: 'C', text: 'Cars giving out waste gas' },
      { id: 'D', text: 'Planting a lot of trees' }
    ],
    correctAnswers: ['A', 'B', 'C'],
    isMultipleSelection: true,
    explanation: 'Deforestation reduces trees that absorb CO2, while vehicle exhaust and factory emissions release huge amounts of CO2.'
  },
  {
    id: 'mc-25',
    code: 'SE4a_u1_01k_031_1',
    chapter: 'ch3',
    category: 'knowledge',
    question: 'Which of these is NOT an effect of global warming?',
    options: [
      { id: 'A', text: 'Melting glaciers' },
      { id: 'B', text: 'Rising sea levels' },
      { id: 'C', text: 'Desertification' },
      { id: 'D', text: 'Excessive use of fuels such as coal and oil' }
    ],
    correctAnswers: ['D'],
    explanation: 'Excessive use of fuels is the human CAUSE of global warming, whereas melting glaciers, rising sea levels, and desertification are the EFFECTS.'
  },

  // Values & Attitudes Questions (SE4a_u1_01a)
  {
    id: 'mc-26',
    code: 'SE4a_u1_01a_001_1',
    chapter: 'ch3',
    category: 'attitudes',
    question: 'What should we do to slow down global warming? (There can be more than one answer.)',
    options: [
      { id: 'A', text: 'Do not waste food' },
      { id: 'B', text: 'Use single-use utensils' },
      { id: 'C', text: 'Turn off electrical appliances that are not in use' },
      { id: 'D', text: 'Only buy what we need' }
    ],
    correctAnswers: ['A', 'C', 'D'],
    isMultipleSelection: true,
    explanation: 'Saving electricity, avoiding food waste, and mindful shopping all reduce greenhouse gas emissions and personal carbon footprints.'
  },
  {
    id: 'mc-27',
    code: 'SE4a_u1_01a_002_2',
    chapter: 'ch3',
    category: 'attitudes',
    question: 'What should we avoid doing to slow down global warming? (There can be more than one answer.)',
    options: [
      { id: 'A', text: 'Save electricity' },
      { id: 'B', text: 'Waste food' },
      { id: 'C', text: 'Use single-use utensils' },
      { id: 'D', text: 'Take public transport' }
    ],
    correctAnswers: ['B', 'C'],
    isMultipleSelection: true,
    explanation: 'We should avoid wasting food and avoid using disposable/single-use utensils.'
  },
  {
    id: 'mc-28',
    code: 'SE4a_u1_01a_003_1',
    chapter: 'ch3',
    category: 'attitudes',
    question: 'What should we avoid doing to reduce carbon footprints? (There can be more than one answer.)',
    options: [
      { id: 'A', text: 'Use single-use utensils' },
      { id: 'B', text: 'Use electrical appliances that save energy' },
      { id: 'C', text: 'Buy things that we do not practically need' },
      { id: 'D', text: 'Travel in private cars and taxis' }
    ],
    correctAnswers: ['A', 'C', 'D'],
    isMultipleSelection: true,
    explanation: 'To reduce carbon footprints, we should avoid disposable utensils, avoid impulse shopping, and avoid private car transport.'
  }
];

// 2. SE4a_u1_02: Fill in the Blanks Questions (Knowledge & Understanding)
export const BLANK_QUESTIONS: BlankQuestion[] = [
  // Chapter 1 Questions
  {
    id: 'fb-1',
    code: 'SE4a_u1_02k_002_2',
    chapter: 'ch1',
    sentence: 'The structure of the Earth is made up of three layers. From the inside to the outside, they are the [BLANK_1], the [BLANK_2] and the [BLANK_3].',
    answers: [['core'], ['mantle'], ['crust']],
    wordBank: ['core', 'mantle', 'crust', 'plate', 'magma', 'soil'],
    hint: 'Pay close attention to direction: from INSIDE to OUTSIDE!',
    explanation: 'From the inside to the outside: Core -> Mantle -> Crust.'
  },
  {
    id: 'fb-2',
    code: 'SE4a_u1_02k_003_1',
    chapter: 'ch1',
    sentence: 'The centre of the Earth is the [BLANK_1]. The temperature is extremely high.',
    answers: [['core']],
    wordBank: ['core', 'crust', 'mantle', 'plate'],
    hint: 'It is the hottest central part of the Earth.',
    explanation: 'The centre of the Earth is the core, with temperatures up to 6,000°C.'
  },
  {
    id: 'fb-3',
    code: 'SE4a_u1_02k_005_1',
    chapter: 'ch1',
    sentence: 'We live on the [BLANK_1]. It is the outermost layer of the Earth.',
    answers: [['crust']],
    wordBank: ['crust', 'core', 'mantle', 'magma'],
    hint: 'The thin rocky surface supporting land, cities, and oceans.',
    explanation: 'The crust is the outermost solid layer of the Earth where we live.'
  },
  {
    id: 'fb-4',
    code: 'SE4a_u1_02k_006_1',
    chapter: 'ch1',
    sentence: 'The crust is mainly made up of [BLANK_1].',
    answers: [['rocks', 'rock']],
    wordBank: ['rocks', 'metals', 'plastics', 'magma'],
    hint: 'Hard mineral formations like granite, sandstone, and marble.',
    explanation: 'The Earth’s crust is predominantly composed of various types of rocks.'
  },
  {
    id: 'fb-5',
    code: 'SE4a_u1_02k_007_1',
    chapter: 'ch1',
    sentence: 'The mantle contains hot flowing [BLANK_1].',
    answers: [['magma']],
    wordBank: ['magma', 'water', 'oil', 'soil'],
    hint: 'Molten rock underground that erupts from volcanoes.',
    explanation: 'The mantle contains hot, viscous flowing magma.'
  },
  {
    id: 'fb-6',
    code: 'SE4a_u1_02k_009_1',
    chapter: 'ch1',
    sentence: 'The crust is the outermost layer of the Earth. It is divided into [BLANK_1] of different sizes.',
    answers: [['plates', 'plate']],
    wordBank: ['plates', 'continents', 'oceans', 'crystals'],
    hint: 'Tectonic pieces like a giant jigsaw puzzle.',
    explanation: 'The crust is broken into many tectonic plates of different sizes.'
  },
  {
    id: 'fb-7',
    code: 'SE4a_u1_02k_010_1',
    chapter: 'ch1',
    sentence: 'The movement and collision of plates may cause [BLANK_1] and [BLANK_2].',
    answers: [
      ['earthquakes', 'volcanic eruptions', 'volcanoes'],
      ['volcanic eruptions', 'earthquakes', 'volcanoes']
    ],
    wordBank: ['earthquakes', 'volcanic eruptions', 'typhoons', 'rainbows'],
    hint: 'Ground shaking and molten rock spewing from mountains.',
    explanation: 'Plate collision causes earthquakes and volcanic eruptions.'
  },
  {
    id: 'fb-8',
    code: 'SE4a_u1_02k_013_1',
    chapter: 'ch1',
    sentence: 'Some rocks break into pieces after many years of exposure to wind and rain, forming [BLANK_1].',
    answers: [['soil']],
    wordBank: ['soil', 'magma', 'metals', 'diamonds'],
    hint: 'Soft earth that plants grow in.',
    explanation: 'Weathering from wind and rain breaks solid rocks down into soil.'
  },
  {
    id: 'fb-9',
    code: 'SE4a_u1_02k_014_1',
    chapter: 'ch1',
    sentence: 'Rocks can be divided into three types according to how they are formed: [BLANK_1], [BLANK_2] and [BLANK_3].',
    answers: [
      ['igneous rock', 'igneous rocks'],
      ['sedimentary rock', 'sedimentary rocks'],
      ['metamorphic rock', 'metamorphic rocks']
    ],
    wordBank: ['igneous rock', 'sedimentary rock', 'metamorphic rock', 'sandy soil', 'loam'],
    hint: 'Formed from magma, water sedimentation, or heat/pressure alteration.',
    explanation: 'The three types of rocks by formation process are igneous rock, sedimentary rock, and metamorphic rock.'
  },
  {
    id: 'fb-10',
    code: 'SE4a_u1_02k_015_1',
    chapter: 'ch1',
    sentence: 'Rocks formed when magma cools and hardens are called [BLANK_1].',
    answers: [['igneous rocks', 'igneous rock']],
    wordBank: ['igneous rocks', 'sedimentary rocks', 'metamorphic rocks', 'soil'],
    hint: 'Examples include granite and basalt.',
    explanation: 'Rocks formed from cooled magma are called igneous rocks.'
  },
  {
    id: 'fb-11',
    code: 'SE4a_u1_02k_016_1',
    chapter: 'ch1',
    sentence: 'Rocks formed when different types of rocks change their structures under high pressure and high temperature are called [BLANK_1].',
    answers: [['metamorphic rocks', 'metamorphic rock']],
    wordBank: ['metamorphic rocks', 'igneous rocks', 'sedimentary rocks', 'clay'],
    hint: 'Examples include marble and gneiss.',
    explanation: 'Rocks changed under extreme heat and pressure are called metamorphic rocks.'
  },
  {
    id: 'fb-12',
    code: 'SE4a_u1_02k_017_1',
    chapter: 'ch1',
    sentence: 'Rocks formed by the sedimentation of rock pieces and soil transported down by water are called [BLANK_1].',
    answers: [['sedimentary rocks', 'sedimentary rock']],
    wordBank: ['sedimentary rocks', 'igneous rocks', 'metamorphic rocks', 'sand'],
    hint: 'Examples include sandstone and shale.',
    explanation: 'Rocks built up from mineral deposits and sediments under water are called sedimentary rocks.'
  },
  {
    id: 'fb-13',
    code: 'SE4a_u1_02k_018_1',
    chapter: 'ch1',
    sentence: 'The components of soil include animal and plant matter, [BLANK_1], [BLANK_2] and [BLANK_3].',
    answers: [
      ['soil particles', 'water', 'air'],
      ['water', 'soil particles', 'air'],
      ['air', 'soil particles', 'water']
    ],
    wordBank: ['soil particles', 'water', 'air', 'magma', 'plastic'],
    hint: 'The 4 components of soil: organic matter, mineral grains, liquid, and gas.',
    explanation: 'Soil components include soil particles, animal and plant matter, water, and air.'
  },
  {
    id: 'fb-14',
    code: 'SE4a_u1_02k_019_1',
    chapter: 'ch1',
    sentence: 'According to the size of particles from small to large, we can divide soil into [BLANK_1], [BLANK_2] and [BLANK_3].',
    answers: [['clay soil'], ['loam'], ['sandy soil']],
    wordBank: ['clay soil', 'loam', 'sandy soil', 'granite', 'gravel'],
    hint: 'Order: Smallest -> Medium -> Largest.',
    explanation: 'From small to large particle size: clay soil < loam < sandy soil.'
  },
  {
    id: 'fb-15',
    code: 'SE4a_u1_02k_020_1',
    chapter: 'ch1',
    sentence: 'Among sandy soil, loam and clay soil, [BLANK_1] has the best drainage capacity, [BLANK_2] has the worst drainage capacity and [BLANK_3] has moderate drainage capacity.',
    answers: [['sandy soil'], ['clay soil'], ['loam']],
    wordBank: ['sandy soil', 'clay soil', 'loam', 'basalt'],
    hint: 'Best drainage = sand; worst drainage = clay; moderate = loam.',
    explanation: 'Sandy soil has the best drainage capacity, clay soil has the worst, and loam has moderate drainage capacity.'
  },

  // Chapter 2 Questions
  {
    id: 'fb-16',
    code: 'SE4a_u1_02k_021_1',
    chapter: 'ch2',
    sentence: 'The Earth rotates on an imaginary [BLANK_1] that passes through the North Pole and South Pole every day.',
    answers: [['axis']],
    wordBank: ['axis', 'equator', 'orbit', 'crust'],
    hint: 'The line around which a spinning body turns.',
    explanation: 'The Earth rotates on its imaginary axis passing through the North and South Poles.'
  },
  {
    id: 'fb-17',
    code: 'SE4a_u1_02k_022_1',
    chapter: 'ch2',
    sentence: 'The Earth [BLANK_1] continuously. This causes the cycle of day and night.',
    answers: [['rotates', 'spins']],
    wordBank: ['rotates', 'revolves', 'stops', 'shines'],
    hint: 'Spinning around its own axis.',
    explanation: 'Earth’s rotation causes day (facing Sun) and night (facing away).'
  },
  {
    id: 'fb-18',
    code: 'SE4a_u1_02k_023_1',
    chapter: 'ch2',
    sentence: 'It takes around [BLANK_1] hours for the Earth to rotate once.',
    answers: [['24', 'twenty-four']],
    wordBank: ['24', '12', '365', '48'],
    hint: 'Hours in one full day.',
    explanation: 'The Earth takes around 24 hours to complete one rotation.'
  },
  {
    id: 'fb-19',
    code: 'SE4a_u1_02k_024_1',
    chapter: 'ch2',
    sentence: 'At different times of the day, the [BLANK_1] and [BLANK_2] of the shadows formed in the sunlight change.',
    answers: [
      ['length', 'direction'],
      ['direction', 'length']
    ],
    wordBank: ['length', 'direction', 'weight', 'temperature'],
    hint: 'How long they are, and which way they point.',
    explanation: 'Shadows change in both length and direction throughout the day.'
  },
  {
    id: 'fb-20',
    code: 'SE4a_u1_02k_025_1',
    chapter: 'ch2',
    sentence: 'In the past, people knew the time by observing the [BLANK_1] of objects. The device for observing shadows is called a sundial.',
    answers: [['shadows', 'shadow']],
    wordBank: ['shadows', 'colours', 'weights', 'temperatures'],
    hint: 'Dark silhouettes cast by blocking sunlight.',
    explanation: 'Sundials tell time by measuring the position and length of shadows.'
  },
  {
    id: 'fb-21',
    code: 'SE4a_u1_02k_027_1',
    chapter: 'ch2',
    sentence: 'The Earth moves around the [BLANK_1]. This is called revolution.',
    answers: [['sun', 'Sun']],
    wordBank: ['sun', 'Moon', 'Mars', 'axis'],
    hint: 'The central star of our solar system.',
    explanation: 'The Earth revolves around the Sun.'
  },
  {
    id: 'fb-22',
    code: 'SE4a_u1_02k_029_1',
    chapter: 'ch2',
    sentence: 'It takes [BLANK_1] for the Earth to revolve around the Sun once.',
    answers: [['one year', 'about 365 days', '365 days', '1 year']],
    wordBank: ['one year', '24 hours', '1 month', '10 years'],
    hint: '365 days = 1 complete calendar year.',
    explanation: 'One complete revolution takes 1 year (about 365 days).'
  },
  {
    id: 'fb-23',
    code: 'SE4a_u1_02k_030_1',
    chapter: 'ch2',
    sentence: 'As the Earth’s axis is [BLANK_1], the angle of sunlight hitting the Earth changes on different days. This causes the changes of [BLANK_2].',
    answers: [
      ['tilted', 'seasons'],
      ['slanted', 'seasons']
    ],
    wordBank: ['tilted', 'seasons', 'straight', 'clouds', 'weather'],
    hint: 'Leaning at an angle, causing spring, summer, autumn, winter.',
    explanation: 'The tilted axis and revolution cause the four seasons.'
  },

  // Chapter 3 Questions
  {
    id: 'fb-24',
    code: 'SE4a_u1_02k_032_1',
    chapter: 'ch3',
    sentence: 'We can know the coldness and the hotness of the weather by the [BLANK_1] announced by the Hong Kong Observatory.',
    answers: [['temperature']],
    wordBank: ['temperature', 'rainfall', 'wind speed', 'climate'],
    hint: 'Measured in degrees Celsius (°C).',
    explanation: 'Temperature describes the hotness and coldness of the weather.'
  },
  {
    id: 'fb-25',
    code: 'SE4a_u1_02k_033_1',
    chapter: 'ch3',
    sentence: 'We can know the dryness and the wetness of the weather by the [BLANK_1] announced by the Hong Kong Observatory.',
    answers: [['relative humidity', 'humidity']],
    wordBank: ['relative humidity', 'temperature', 'wind speed', 'rainfall'],
    hint: 'Percentage of water vapor in the air.',
    explanation: 'Relative humidity measures dryness and wetness in the air.'
  },
  {
    id: 'fb-26',
    code: 'SE4a_u1_02k_034_1',
    chapter: 'ch3',
    sentence: 'Humans use large amounts of fuels like [BLANK_1] and [BLANK_2]. This releases large amounts of greenhouse gases.',
    answers: [
      ['gas', 'oil', 'coal'],
      ['oil', 'gas', 'coal']
    ],
    wordBank: ['gas', 'oil', 'wood', 'solar energy'],
    hint: 'Fossil fuels used in power plants and vehicles.',
    explanation: 'Burning fossil fuels like gas and oil emits massive amounts of greenhouse gases.'
  },
  {
    id: 'fb-27',
    code: 'SE4a_u1_02k_035_1',
    chapter: 'ch3',
    sentence: 'Humans use large amounts of fuels like gas and oil. This releases large amounts of [BLANK_1] and causes global warming.',
    answers: [['carbon dioxide', 'greenhouse gases']],
    wordBank: ['carbon dioxide', 'oxygen', 'nitrogen', 'water vapor'],
    hint: 'CO2, the primary greenhouse gas emitted by burning fuels.',
    explanation: 'Fossil fuel combustion releases carbon dioxide, causing global warming.'
  },
  {
    id: 'fb-28',
    code: 'SE4a_u1_02k_036_1',
    chapter: 'ch3',
    sentence: 'Carbon dioxide is a greenhouse gas. It [BLANK_1] the heat from releasing from the Earth’s surface and causes a rise in the Earth’s temperature.',
    answers: [['blocks', 'traps']],
    wordBank: ['blocks', 'releases', 'cools', 'absorbs'],
    hint: 'Acts like a blanket or greenhouse glass.',
    explanation: 'Carbon dioxide blocks heat from escaping into space, warming the Earth.'
  }
];

// 3. SE4a_u1_04: Judging Questions (True ✓ / False ✗)
export const JUDGING_QUESTIONS: JudgingQuestion[] = [
  // Chapter 1 Questions
  {
    id: 'jd-1',
    code: 'SE4a_u1_04k_001_1',
    chapter: 'ch1',
    category: 'knowledge',
    statement: 'The outermost layer of the Earth is the crust.',
    isCorrect: true,
    explanation: 'Correct! The crust is the solid, thin outermost layer of the Earth.'
  },
  {
    id: 'jd-2',
    code: 'SE4a_u1_04k_002_1',
    chapter: 'ch1',
    category: 'knowledge',
    statement: 'The mantle contains hot flowing magma.',
    isCorrect: true,
    explanation: 'Correct! The mantle lies beneath the crust and contains hot flowing magma.'
  },
  {
    id: 'jd-3',
    code: 'SE4a_u1_04k_003_1',
    chapter: 'ch1',
    category: 'knowledge',
    statement: 'The centre of the Earth is the mantle, which has a very high temperature.',
    isCorrect: false,
    explanation: 'False! The centre of the Earth is the CORE, not the mantle.'
  },
  {
    id: 'jd-4',
    code: 'SE4a_u1_04k_004_1',
    chapter: 'ch1',
    category: 'knowledge',
    statement: 'The centre of the Earth is the crust. It is mainly made up of rocks. The temperature is very high.',
    isCorrect: false,
    explanation: 'False! The crust is the outermost layer where we live, not the centre.'
  },
  {
    id: 'jd-5',
    code: 'SE4a_u1_04k_005_1',
    chapter: 'ch1',
    category: 'knowledge',
    statement: 'The crust is mainly made up of a complete piece of rock.',
    isCorrect: false,
    explanation: 'False! The crust is not a single complete piece; it is fractured into many tectonic plates of different sizes.'
  },
  {
    id: 'jd-6',
    code: 'SE4a_u1_04k_006_1',
    chapter: 'ch1',
    category: 'knowledge',
    statement: 'Plates move slowly when the magma in the mantle flows.',
    isCorrect: true,
    explanation: 'Correct! Convection currents in the flowing magma slowly carry the crustal plates above.'
  },
  {
    id: 'jd-7',
    code: 'SE4a_u1_04k_007_1',
    chapter: 'ch1',
    category: 'knowledge',
    statement: 'Earthquake is a natural phenomenon caused by plate movement and collision.',
    isCorrect: true,
    explanation: 'Correct! When plates collide or rub against each other, the energy release causes the ground to shake (earthquake).'
  },
  {
    id: 'jd-8',
    code: 'SE4a_u1_04k_008_1',
    chapter: 'ch1',
    category: 'knowledge',
    statement: 'Shale is a kind of igneous rock.',
    isCorrect: false,
    explanation: 'False! Shale is a SEDIMENTARY rock formed from thin mud and silt layers deposited in calm water.'
  },
  {
    id: 'jd-9',
    code: 'SE4a_u1_04k_009_2',
    chapter: 'ch1',
    category: 'knowledge',
    statement: 'Both marble and gneiss are sedimentary rocks.',
    isCorrect: false,
    explanation: 'False! Both marble and gneiss are METAMORPHIC rocks formed under intense heat and pressure.'
  },
  {
    id: 'jd-10',
    code: 'SE4a_u1_04k_011_1',
    chapter: 'ch1',
    category: 'knowledge',
    statement: 'Different kinds of soil have different drainage capacities. Sandy soil has the weakest drainage capacity, while clay soil has the strongest drainage capacity.',
    isCorrect: false,
    explanation: 'False! The opposite is true: Sandy soil has the STRONGEST (highest) drainage, and clay soil has the WEAKEST (lowest).'
  },

  // Chapter 2 Questions
  {
    id: 'jd-11',
    code: 'SE4a_u1_04k_012_1',
    chapter: 'ch2',
    category: 'knowledge',
    statement: 'The Earth rotates on a real axis every day.',
    isCorrect: false,
    explanation: 'False! The Earth’s axis is an IMAGINARY line, not a physical object.'
  },
  {
    id: 'jd-12',
    code: 'SE4a_u1_04k_013_1',
    chapter: 'ch2',
    category: 'knowledge',
    statement: 'We can see the Sun rising and setting every day because of the Earth’s rotation.',
    isCorrect: true,
    explanation: 'Correct! As the Earth spins from west to east, the Sun appears to rise in the east and set in the west.'
  },
  {
    id: 'jd-13',
    code: 'SE4a_u1_04k_014_1',
    chapter: 'ch2',
    category: 'knowledge',
    statement: 'During the day, the length of a shadow changes at different times. However, the direction of the shadow does not change.',
    isCorrect: false,
    explanation: 'False! BOTH the length and the direction change throughout the day as the Sun changes position.'
  },
  {
    id: 'jd-14',
    code: 'SE4a_u1_04k_015_1',
    chapter: 'ch2',
    category: 'knowledge',
    statement: 'A sundial is a device that people in the past used to tell the time by observing the shadow.',
    isCorrect: true,
    explanation: 'Correct! Sundials track the shadow cast by sunlight to indicate the time of day.'
  },
  {
    id: 'jd-15',
    code: 'SE4a_u1_04k_016_1',
    chapter: 'ch2',
    category: 'knowledge',
    statement: 'The Earth moves around the Moon. This is called revolution.',
    isCorrect: false,
    explanation: 'False! The Earth moves around the SUN (and the Moon orbits the Earth).'
  },
  {
    id: 'jd-16',
    code: 'SE4a_u1_04k_017_1',
    chapter: 'ch2',
    category: 'knowledge',
    statement: 'Day and night repeats regularly because the Sun moves around the Earth.',
    isCorrect: false,
    explanation: 'False! Day and night repeats because the EARTH rotates on its own axis, not because the Sun moves around Earth.'
  },
  {
    id: 'jd-17',
    code: 'SE4a_u1_04k_018_1',
    chapter: 'ch2',
    category: 'knowledge',
    statement: 'When the northern hemisphere receives overhead sunlight, it is winter in the northern hemisphere and summer in the southern hemisphere.',
    isCorrect: false,
    explanation: 'False! Overhead sunlight delivers high heat, causing SUMMER in the northern hemisphere and winter in the southern hemisphere.'
  },
  {
    id: 'jd-18',
    code: 'SE4a_u1_04k_019_1',
    chapter: 'ch2',
    category: 'knowledge',
    statement: 'There is a leap year once in every 5 years.',
    isCorrect: false,
    explanation: 'False! A leap year occurs once every 4 years (because an astronomical year is approximately 365.25 days).'
  },

  // Chapter 3 Questions
  {
    id: 'jd-19',
    code: 'SE4a_u1_04k_021_1',
    chapter: 'ch3',
    category: 'knowledge',
    statement: 'Climate is the average weather condition of a place over a longer period of time.',
    isCorrect: true,
    explanation: 'Correct! Climate represents regular patterns of temperature, rainfall, and humidity over 30 years or more.'
  },
  {
    id: 'jd-20',
    code: 'SE4a_u1_04k_022_2',
    chapter: 'ch3',
    category: 'knowledge',
    statement: 'Singapore and Beijing have a similar climate because they are both in the northern hemisphere.',
    isCorrect: false,
    explanation: 'False! Singapore is equatorial (hot and wet year-round), while Beijing has cold snowy winters and hot summers.'
  },
  {
    id: 'jd-21',
    code: 'SE4a_u1_04k_024_1',
    chapter: 'ch3',
    category: 'knowledge',
    statement: 'Melting of land ice causes sea levels to rise.',
    isCorrect: true,
    explanation: 'Correct! When glaciers and ice sheets on land melt, the added water flows into oceans and causes sea levels to rise.'
  },
  {
    id: 'jd-22',
    code: 'SE4a_u1_04k_025_1',
    chapter: 'ch3',
    category: 'knowledge',
    statement: 'Carbon dioxide blocks the heat from releasing from the Earth’s surface and causes global warming.',
    isCorrect: true,
    explanation: 'Correct! Carbon dioxide is a greenhouse gas that traps thermal radiation, heating the Earth.'
  },
  {
    id: 'jd-23',
    code: 'SE4a_u1_04k_026_1',
    chapter: 'ch3',
    category: 'knowledge',
    statement: 'Carbon footprints are the amount of greenhouse gases produced in some human activities.',
    isCorrect: true,
    explanation: 'Correct! Carbon footprints quantify greenhouse gas emissions produced by our daily habits, travel, and electricity use.'
  },
  {
    id: 'jd-24',
    code: 'SE4a_u1_04a_001_1',
    chapter: 'ch1',
    category: 'attitudes',
    statement: 'Rocks and soil are precious resources. We should cherish and protect them.',
    isCorrect: true,
    explanation: 'Correct! Rocks and soil take thousands of years to form; we must protect geoparks and prevent soil pollution.'
  },
  {
    id: 'jd-25',
    code: 'SE4a_u1_04a_002_1',
    chapter: 'ch3',
    category: 'attitudes',
    statement: 'Due to global warming, the number of days with very hot weather is increasing. We should pay attention to the Very Hot Weather Warning and take protective measures against the heat.',
    isCorrect: true,
    explanation: 'Correct! Stay hydrated and take heatstroke prevention measures during Very Hot Weather Warnings.'
  },
  {
    id: 'jd-26',
    code: 'SE4a_u1_04a_004_1',
    chapter: 'ch3',
    category: 'attitudes',
    statement: 'Wilson thinks that one’s influence is limited so he does not reduce his carbon footprints in daily life.',
    isCorrect: false,
    explanation: 'False! Every individual’s actions matter. When everyone adopts low-carbon habits, we can slow down global warming.'
  }
];

// 4. SE4a_u1_07: Matching Questions (Knowledge & Understanding)
export const MATCHING_QUESTIONS: MatchingQuestion[] = [
  // Chapter 1 Questions
  {
    id: 'match-1',
    code: 'SE4a_u1_07k_001_1',
    chapter: 'ch1',
    title: 'Match Earth Layers with Features',
    instruction: 'Match each of the Earth’s layers with its correct feature.',
    pairs: [
      { id: '1', label: '1. Crust', correctTargetIds: ['D'] },
      { id: '2', label: '2. Mantle', correctTargetIds: ['A'] },
      { id: '3', label: '3. Core', correctTargetIds: ['B'] }
    ],
    targets: [
      { id: 'A', description: 'It contains hot flowing magma.' },
      { id: 'B', description: 'It is the centre of the Earth. It is mainly made up of metals. The temperature is very high.' },
      { id: 'C', description: 'It is made up of different types of gases. It surrounds the Earth.' },
      { id: 'D', description: 'It is the outermost layer of the Earth. It is mainly made up of rocks and is divided into many plates.' }
    ],
    explanation: 'Crust = outermost layer made of rocks and plates (D); Mantle = contains hot flowing magma (A); Core = centre of Earth, metals, very high temperature (B).'
  },
  {
    id: 'match-2',
    code: 'SE4a_u1_07k_002_1',
    chapter: 'ch1',
    title: 'Characteristics of Earth’s Layers',
    instruction: 'Select all characteristics that apply to each layer.',
    pairs: [
      { id: '1', label: '1. Characteristics of the crust', correctTargetIds: ['A', 'E'] },
      { id: '2', label: '2. Characteristics of the mantle', correctTargetIds: ['C'] },
      { id: '3', label: '3. Characteristics of the core', correctTargetIds: ['B', 'D'] }
    ],
    targets: [
      { id: 'A', description: 'Mainly made up of rocks' },
      { id: 'B', description: 'Mainly made up of metals' },
      { id: 'C', description: 'Contains hot flowing magma' },
      { id: 'D', description: 'The centre of the Earth' },
      { id: 'E', description: 'The outermost layer of the Earth' }
    ],
    explanation: 'Crust is made of rocks (A) and is outermost (E); Mantle contains magma (C); Core is in the centre (D) and made of metals (B).'
  },
  {
    id: 'match-3',
    code: 'SE4a_u1_07k_003_1',
    chapter: 'ch1',
    title: 'Parts of the Crust & Their Characteristics',
    instruction: 'Match each part of the crust with its characteristics.',
    pairs: [
      { id: '1', label: '1. Plates', correctTargetIds: ['C', 'D'] },
      { id: '2', label: '2. Rocks', correctTargetIds: ['A'] },
      { id: '3', label: '3. Soil', correctTargetIds: ['B'] }
    ],
    targets: [
      { id: 'A', description: 'Formed when magma gushing out from volcanoes cools and hardens' },
      { id: 'B', description: 'Its components are water, air, animal and plant matter, and soil particles' },
      { id: 'C', description: 'Slowly move with the flow of magma in the mantle' },
      { id: 'D', description: 'Their movements and collisions can cause earthquakes or volcanic eruptions' }
    ],
    explanation: 'Plates move slowly with mantle magma (C) and collide to cause earthquakes (D); Rocks form from magma cooling (A); Soil is composed of water, air, humus, and particles (B).'
  },
  {
    id: 'match-4',
    code: 'SE4a_u1_07k_004_1',
    chapter: 'ch1',
    title: 'Types of Rocks and Formation Processes',
    instruction: 'Match the rock types with how they are formed.',
    pairs: [
      { id: '1', label: '1. Igneous rocks', correctTargetIds: ['B'] },
      { id: '2', label: '2. Sedimentary rocks', correctTargetIds: ['C'] },
      { id: '3', label: '3. Metamorphic rocks', correctTargetIds: ['A'] }
    ],
    targets: [
      { id: 'A', description: 'They are formed when different types of rocks change their structures under high pressure and high temperature.' },
      { id: 'B', description: 'They are formed when magma cools and hardens.' },
      { id: 'C', description: 'They are formed by the sedimentation of rock pieces and soil transported down by water.' }
    ],
    explanation: 'Igneous = magma cools & hardens (B); Sedimentary = sedimentation by water (C); Metamorphic = high temperature and pressure changes (A).'
  },
  {
    id: 'match-5',
    code: 'SE4a_u1_07k_006_2',
    chapter: 'ch1',
    title: 'Common Rocks and Visual Characteristics',
    instruction: 'Match each common rock with its visual features.',
    pairs: [
      { id: '1', label: '1. Granite', correctTargetIds: ['A'] },
      { id: '2', label: '2. Sandstone', correctTargetIds: ['B'] },
      { id: '3', label: '3. Marble', correctTargetIds: ['C'] }
    ],
    targets: [
      { id: 'A', description: 'Usually with patches of pink, grey, and other colours (coarse grains)' },
      { id: 'B', description: 'Usually orange and grey, looks like different sizes of sand glued together' },
      { id: 'C', description: 'Usually grey or white with beautiful stripes (smooth polish for sculptures)' }
    ],
    explanation: 'Granite has speckled coarse crystals (A); Sandstone feels gritty like glued sand (B); Marble is smooth white with decorative veins/stripes (C).'
  },
  {
    id: 'match-6',
    code: 'SE4a_u1_07k_007_1',
    chapter: 'ch1',
    title: 'Soil Types and Agricultural Properties',
    instruction: 'Match the soil types with their characteristics and plant suitability.',
    pairs: [
      { id: '1', label: '1. Sandy soil', correctTargetIds: ['A', 'D'] },
      { id: '2', label: '2. Loam', correctTargetIds: ['C'] },
      { id: '3', label: '3. Clay soil', correctTargetIds: ['B'] }
    ],
    targets: [
      { id: 'A', description: 'Its particles are the largest among the three types of soil.' },
      { id: 'B', description: 'It keeps nutrients the best among the three types of soil.' },
      { id: 'C', description: 'It is suitable for growing most kinds of plants (like roses).' },
      { id: 'D', description: 'It is suitable for growing cacti (fast drainage).' }
    ],
    explanation: 'Sandy soil = largest particles (A) and suitable for cacti (D); Loam = suitable for most plants (C); Clay = keeps nutrients best (B).'
  },

  // Chapter 2 Questions
  {
    id: 'match-7',
    code: 'SE4a_u1_07k_008_1',
    chapter: 'ch2',
    title: 'Phenomena Caused by Rotation vs Revolution',
    instruction: 'Match Earth’s motions with the phenomena they cause.',
    pairs: [
      { id: '1', label: '1. Earth’s rotation', correctTargetIds: ['A', 'C'] },
      { id: '2', label: '2. Earth’s revolution', correctTargetIds: ['B', 'D'] }
    ],
    targets: [
      { id: 'A', description: 'The day-night cycle' },
      { id: 'B', description: 'Change of seasons' },
      { id: 'C', description: 'The change in the length and direction of a shadow at different times of the day' },
      { id: 'D', description: 'The change in the angle of sunlight that the northern and southern hemispheres receive' }
    ],
    explanation: 'Rotation causes the day-night cycle (A) and changing shadows (C). Revolution causes seasonal changes (B) and shifting sunlight angles (D).'
  },
  {
    id: 'match-8',
    code: 'SE4a_u1_07s_001_1',
    chapter: 'ch2',
    title: 'Torch & Globe Day/Night Experiment Model',
    instruction: 'In the rotation experiment, match each model component with what it represents.',
    pairs: [
      { id: '1', label: '1. Torch', correctTargetIds: ['D'] },
      { id: '2', label: '2. Globe', correctTargetIds: ['A'] },
      { id: '3', label: '3. Puppet at Hong Kong is bright', correctTargetIds: ['C'] },
      { id: '4', label: '4. Puppet at Hong Kong is dark', correctTargetIds: ['B'] }
    ],
    targets: [
      { id: 'A', description: 'The Earth' },
      { id: 'B', description: 'It is night in Hong Kong' },
      { id: 'C', description: 'It is day in Hong Kong' },
      { id: 'D', description: 'The Sun' }
    ],
    explanation: 'Torch = Sun (D); Globe = Earth (A); Bright puppet = daytime in HK (C); Dark puppet = night in HK (B).'
  },

  // Chapter 3 Questions
  {
    id: 'match-9',
    code: 'SE4a_u1_07k_012_1',
    chapter: 'ch3',
    title: 'Comparing Cities with Hong Kong Climate',
    instruction: 'Match Beijing, Singapore, and Canberra with their relationship to Hong Kong.',
    pairs: [
      { id: '1', label: '1. Beijing', correctTargetIds: ['C', 'D'] },
      { id: '2', label: '2. Singapore', correctTargetIds: ['B'] },
      { id: '3', label: '3. Canberra', correctTargetIds: ['A'] }
    ],
    targets: [
      { id: 'A', description: 'It is in a different hemisphere from Hong Kong (southern hemisphere).' },
      { id: 'B', description: 'It is nearer to the equator than Hong Kong.' },
      { id: 'C', description: 'It has similar annual temperature changes with Hong Kong (warmer in June-August).' },
      { id: 'D', description: 'It has a distinct rainy season and dry season like Hong Kong.' }
    ],
    explanation: 'Beijing has similar summer peaks and distinct seasons (C, D); Singapore is near equator (B); Canberra is in southern hemisphere (A).'
  },
  {
    id: 'match-10',
    code: 'SE4a_u1_07k_014_2',
    chapter: 'ch3',
    title: 'Causes vs Effects of Rising Sea Levels',
    instruction: 'Classify items into causes or effects of sea level rise.',
    pairs: [
      { id: '1', label: '1. Causes of rising sea levels', correctTargetIds: ['B', 'D'] },
      { id: '2', label: '2. Effects of rising sea levels', correctTargetIds: ['A', 'C'] }
    ],
    targets: [
      { id: 'A', description: 'More frequent storm surges' },
      { id: 'B', description: 'Global warming' },
      { id: 'C', description: 'Low-lying coastal areas being flooded' },
      { id: 'D', description: 'Melting of land ice' }
    ],
    explanation: 'Causes: global warming (B) and melting land ice (D). Effects: coastal flooding (C) and storm surges (A).'
  },
  {
    id: 'match-11',
    code: 'SE4a_u1_07a_002_1',
    chapter: 'ch3',
    title: 'Human Activities and Climate Impact',
    instruction: 'Match human activities with their relationship to global warming.',
    pairs: [
      { id: '1', label: '1. Recycle food waste', correctTargetIds: ['B'] },
      { id: '2', label: '2. Drive private cars', correctTargetIds: ['A'] },
      { id: '3', label: '3. Factories giving out waste gas', correctTargetIds: ['D'] },
      { id: '4', label: '4. Plant trees', correctTargetIds: ['C'] }
    ],
    targets: [
      { id: 'A', description: 'Increases personal carbon footprints' },
      { id: 'B', description: 'Reduces carbon footprints from food waste' },
      { id: 'C', description: 'Absorbs carbon dioxide' },
      { id: 'D', description: 'Releases large amounts of carbon footprints in production process' }
    ],
    explanation: 'Recycling food reduces food footprints (B); Driving cars increases personal footprint (A); Factory emissions release carbon footprints (D); Trees absorb CO2 (C).'
  }
];

// 5. SE4a_u1_08: Reordering Questions (Knowledge & Processes)
export const REORDERING_QUESTIONS: ReorderingQuestion[] = [
  // Chapter 1 Questions
  {
    id: 'ro-1',
    code: 'SE4a_u1_08k_001_1',
    chapter: 'ch1',
    title: 'Order of Earth’s Concentric Layers',
    instruction: 'Put the layers of the Earth in order from the OUTSIDE to the INSIDE.',
    items: [
      { id: 'A', text: 'Mantle' },
      { id: 'B', text: 'Core' },
      { id: 'C', text: 'Crust' }
    ],
    correctOrder: ['C', 'A', 'B'],
    explanation: 'From the outside to the inside: Crust (C) -> Mantle (A) -> Core (B).'
  },
  {
    id: 'ro-2',
    code: 'SE4a_u1_08k_002_1',
    chapter: 'ch1',
    title: 'Formation Process of Volcanic Igneous Rock',
    instruction: 'Put the formation processes of volcanic rocks in the correct sequence.',
    items: [
      { id: 'A', text: 'Magma gushes out of a volcano.' },
      { id: 'B', text: 'It causes a volcanic eruption.' },
      { id: 'C', text: 'Plates move and collide with one another.' },
      { id: 'D', text: 'Rocks are formed when magma cools and hardens.' }
    ],
    correctOrder: ['C', 'B', 'A', 'D'],
    explanation: 'Sequence: Plates move and collide (C) -> Causes volcanic eruption (B) -> Magma gushes out (A) -> Magma cools and hardens into rock (D).'
  },

  // Chapter 2 Questions
  {
    id: 'ro-3',
    code: 'SE4a_u1_08s_001_2',
    chapter: 'ch2',
    title: 'Steps for Observing and Recording Shadows',
    instruction: 'Put the steps of observing and recording shadows with a sundial in the correct order.',
    items: [
      { id: 'A', text: 'Every hour, mark the position of the top of the shadow on the paper and record the time.' },
      { id: 'B', text: 'Measure the length of the line with a ruler. Record the results.' },
      { id: 'C', text: 'After recording, draw a line between the top of each shadow and the point where the pencil is stood.' },
      { id: 'D', text: 'Find an open area. Use a compass to find the north. Align the north on the paper with the north on the compass.' }
    ],
    correctOrder: ['D', 'A', 'C', 'B'],
    explanation: 'Scientific procedure: Set up compass and paper alignment (D) -> Mark top of shadow every hour (A) -> Draw connecting lines (C) -> Measure with ruler and record (B).'
  },

  // Chapter 3 Questions
  {
    id: 'ro-4',
    code: 'SE4a_u1_18k_001_2',
    chapter: 'ch3',
    title: 'Mantle Magma Convection & Earthquake Cycle',
    instruction: 'Put the steps of magma thermal convection inside the Earth in the correct order.',
    items: [
      { id: 'A', text: 'The magma rises from the lower mantle to the upper mantle.' },
      { id: 'B', text: 'The core produces immense heat.' },
      { id: 'C', text: 'The cooler magma sinks back down to the lower mantle.' },
      { id: 'D', text: 'The magma cools and spreads out in the upper mantle.' }
    ],
    correctOrder: ['B', 'A', 'D', 'C'],
    explanation: 'Convection cycle: Heat from core (B) -> Magma rises (A) -> Magma cools and spreads out horizontally (D) -> Heavy cooled magma sinks back down (C).'
  }
];
