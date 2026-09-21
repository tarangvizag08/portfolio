/**
 * Single source of truth for every word on the site.
 * Edit here — components read from this file and never hardcode copy.
 */

export type Link = { label: string; href: string };
export type Stat = { value: number; suffix?: string; prefix?: string; label: string; decimals?: number };

export const identity = {
  name: 'Tarang Gupta',
  role: 'Electronics & Communication Engineering — VIT Chennai',
  positioning:
    'I work on radar and wireless signal chains, RTL for silicon, and the embedded systems in between — and I spend the other half of my time running things on the ground.',
  email: 'tarangvizag@gmail.com',
  linkedin: 'https://linkedin.com/in/tarang-gupta',
  github: 'https://github.com/tarangvizag08',
  resume: '/resume.pdf',
} as const;

export const navSections: Link[] = [
  { label: 'About', href: '#about' },
  { label: 'Research', href: '#research' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Skills', href: '#skills' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export const about = {
  /* First person, his voice. Facts only from the brief. */
  bio: [
    "I'm a B.Tech Electronics and Communication Engineering student at VIT Chennai, graduating May 2027. Most of my technical work sits in three places: radar and SAR signal processing, Wi-Fi 7 wireless systems, and VLSI/RTL chip design — with embedded systems and applied ML filling the gaps between them.",
    "The other half of the last three years went into running real things. I founded BL!NK and did the customer discovery myself before writing any product. I handled registration and on-ground coordination for 1,000+ visiting attendees across four days of Vibrance '25. I ran end-to-end recruitment as Senior HR for Voice-IT Club.",
    "Both halves matter to me. A design that works on paper and a process that survives a queue of 400 people at 9am are the same kind of problem — you find where it breaks before it breaks.",
  ],
  education: [
    {
      school: 'VIT University, Chennai',
      qualification: 'B.Tech, Electronics and Communication Engineering',
      detail: 'CGPA 8.97 / 10',
      period: 'Expected May 2027',
    },
    {
      school: "St. Joseph's School, Shaktinagar",
      qualification: 'CBSE',
      detail: 'Class XII — 9.0 / 10  ·  Class X — 9.2 / 10',
      period: '2021 – 2023',
    },
  ],
  portrait: {
    src: '/photos/photo-01-park-tree-portrait.jpg',
    alt: 'Tarang Gupta standing outdoors beside a tree in a park.',
  },
} as const;

export const research = [
  {
    title: 'Wi-Fi 7 MU-MIMO Transceiver for Real-Time Aerial Swarm Coordination',
    venue: 'IETE Journal of Research',
    status: 'Under Review',
    role: 'Co-author',
    period: 'Dec 2025 – Present',
    description:
      'Simulated a 4×8 MU-MIMO downlink (IEEE 802.11be, 320 MHz, 4096-QAM) in MATLAB WLAN Toolbox for four-robot swarm coordination under NLOS conditions.',
    stat: { value: 11.5, decimals: 1, suffix: ' Gbps', label: 'peak aggregate throughput at SNR > 42 dB' } as Stat,
  },
  {
    title: 'Real-Time AI Audio Upscaling for Bandwidth-Constrained Wireless Links',
    venue: 'IEEE ANTS 2026, IIT Roorkee',
    status: 'Submitted / Under Review',
    role: 'Co-author · Samsung PRISM, Samsung R&D Bangalore',
    period: 'June 2025 – Present',
    description:
      'Designed a deep learning pipeline (ATC-TFiLM architecture, VCTK corpus) restoring speech quality from low-bitrate wireless inputs under real-time latency constraints; deployed on-device via TFLite.',
    // No numeric result is published for this one yet, so it gets a plain
    // highlight rather than an invented CountUp figure.
    highlight: 'Deployed on-device via TFLite, under real-time latency constraints.',
  },
] as const;

export const projects = [
  {
    title: 'India RISC-V Chip Tapeout',
    result: 'Selected for a nationally competitive, government-backed silicon tapeout program.',
    org: 'Chip-to-Startup (C2S) Program, Government of India · VIT Chennai',
    period: 'Apr – Oct 2025',
    node: 'SCL 180nm node',
    tags: ['Verilog HDL', 'RTL Design', 'Synopsys Design Compiler', 'Functional Verification'],
    bullets: [
      'Completed RTL design and functional verification of core processor pipeline stages.',
      'Synthesized the design in Synopsys Design Compiler for the SCL 180nm node.',
    ],
  },
  {
    title: 'PolarVerify — PolSAR-Based Ship Detection',
    result: 'Detected 6 of 7 target ships with strong clutter suppression on RADARSAT-2 quad-pol imagery.',
    org: 'Radar Systems course project (BECE311L)',
    period: 'Jan 2026 – Present',
    node: 'RADARSAT-2 quad-pol',
    tags: ['Python', 'PolSAR', 'CA-CFAR', 'scikit-learn', 'NumPy/SciPy'],
    bullets: [
      'Two-stage physics-guided detection pipeline combining Cloude–Pottier eigenvalue decomposition with CA-CFAR.',
      'Used coherency-matrix features (entropy, anisotropy) as SVM inputs.',
      'Automated end-to-end in Python.',
    ],
  },
  {
    title: 'RIMUS — Autonomous Multi-Sensor Safety Rover',
    result: 'Two-tier obstacle response: instant emergency stop plus graduated slow-down, with no motor overshoot.',
    org: 'Embedded C Programming course project',
    period: 'Jan – Apr 2026',
    node: 'Arduino Mega + ESP8266',
    tags: ['Embedded C', 'Arduino Mega', 'ESP8266', 'H-Bridge', 'JSON API'],
    bullets: [
      'IR bumper for instant emergency stops, plus a servo-scanned ultrasonic sensor for gradual slow-down.',
      'Active H-bridge braking to eliminate motor overshoot.',
      'Separate ESP8266 sensor node hosting an embedded web server with a live JSON API.',
      'Polls DHT11/MQ-2 sensors with threshold-based hazard escalation.',
    ],
  },
  {
    title: 'EMG-Based Robotic Arm',
    result: 'Robotic arm mimicking hand motion in real time from electromyographic signals.',
    org: 'Embedded Systems mini project',
    period: 'Nov 2024',
    node: 'Microcontroller-driven',
    tags: ['Embedded C', 'Analog Signal Conditioning', 'ADC', 'Servo Control'],
    bullets: [
      'Analog signal conditioning and amplification of raw EMG input.',
      'ADC-based digitization feeding real-time control logic.',
      'Servo actuation for finger and wrist motion.',
    ],
  },
] as const;

export const experience = [
  {
    role: 'Research Intern — Samsung PRISM',
    org: 'Samsung R&D Institute India, Bangalore',
    period: 'July 2025 – Apr 2026',
    description: [
      'Built an audio bandwidth-extension framework and ran quantitative evaluation balancing quality against compute cost.',
      'Co-authored the resulting IEEE ANTS 2026 submission.',
    ],
  },
  {
    role: 'Industrial Intern — NTPC Limited',
    org: 'Singrauli Super Thermal Power Station (SSTPS)',
    period: '20 May – 20 June 2026',
    description: [
      'A month on the floor of a 2,000 MW thermal plant: studied the Honeywell DCS, marshalling cabinets routing field-instrument signals to the control room, and process interlock/alarm logic on plant control panels.',
      'Examined UPS, battery bank, and static voltage & frequency converter systems, plus plant network architecture.',
    ],
  },
] as const;

export const leadership = [
  {
    role: 'Founder',
    org: 'BL!NK',
    period: 'Aug 2025 – Present',
    description:
      'Early-stage student engagement platform. Ran customer discovery from scratch — interviewing students, parents, and educators to test whether the problem was real before building. Pivoted from selling learning content to a gamified ecosystem built around consistency and accountability; now in validation and community building.',
  },
  {
    role: 'Registration & Organizing Committee',
    org: "Vibrance '25, VIT Chennai's cultural fest",
    period: 'Feb – Mar 2025',
    description:
      'Managed participant registration and on-ground coordination across four days for 1,000+ attendees from other colleges — verification, entry flow, and real-time query resolution under continuous walk-in load.',
  },
  {
    role: 'Senior HR',
    org: 'Voice-IT Club, VIT Chennai',
    period: 'Sep 2023 – Mar 2025',
    description:
      'End-to-end recruitment: campus hiring drives, screening, interviews. Built the onboarding and documentation process.',
  },
  {
    role: 'Knowledge Strategist & Content Lead',
    org: 'BBQC Quiz Club, VIT Chennai',
    period: 'Sep 2023 – Present',
    description:
      'Designed question banks used across 10+ inter-collegiate and campus events; led team preparation and strategy sessions for competitive rounds.',
  },
  {
    role: 'Logistics & Hospitality Lead',
    org: 'TEDxVITChennai',
    period: 'July 2024 – July 2025',
    description:
      'Led logistics and hospitality across 3+ major events: speaker coordination, venue setup, vendor management, budgeting, and hospitality for international delegates.',
  },
  {
    role: 'Marketing & Social Media Intern',
    org: 'ACM VIT Chennai',
    period: '2024 – 25',
    description: '',
  },
  {
    role: 'HR Associate',
    org: 'Sangam Cultural Club',
    period: '2023 – 24',
    description: '',
  },
] as const;

export const heroStats: Stat[] = [
  { value: 11.5, decimals: 1, suffix: ' Gbps', label: 'Wi-Fi 7 peak throughput' },
  { value: 1000, suffix: '+', label: "Vibrance '25 attendees handled" },
  { value: 8.97, decimals: 2, suffix: ' / 10', label: 'CGPA' },
];

export const skills = [
  {
    group: 'Languages & HDL',
    items: ['C', 'Embedded C', 'Python', 'Verilog HDL', 'MATLAB', 'Assembly', 'Java'],
  },
  {
    group: 'Tools & EDA',
    items: [
      'Synopsys Design Compiler',
      'LTSpice',
      'MATLAB & Toolboxes',
      'OptiSystem',
      'Git',
      'Linux (Ubuntu)',
      'Cisco Packet Tracer',
      'NumPy/SciPy',
      'scikit-learn',
      'TFLite',
    ],
  },
  {
    group: 'Domains',
    items: [
      'VLSI & SoC Design',
      'RISC-V Architecture',
      'Embedded Systems',
      'Baseband DSP',
      'MU-MIMO / IEEE 802.11be',
      'RF Front-End Design',
      'PolSAR Radar',
    ],
  },
] as const;

export const certifications = [
  'AI Engineering Professional Certificate — IBM (Coursera, 2026)',
  'Embedded Systems Design — Maven Silicon (2026)',
] as const;

export const gallery = [
  {
    src: '/photos/photo-02-disneyland-starwars.jpg',
    alt: 'Tarang at the Star Wars area of Disneyland.',
    caption: 'Galaxy’s Edge, Disneyland',
    height: 900,
  },
  {
    src: '/photos/photo-03-golden-gate-bridge.jpg',
    alt: 'The Golden Gate Bridge in San Francisco seen across the bay.',
    caption: 'Golden Gate, San Francisco',
    height: 620,
  },
  {
    src: '/photos/photo-04-grand-canyon.jpg',
    alt: 'The layered rock walls of the Grand Canyon.',
    caption: 'Grand Canyon',
    height: 780,
  },
  {
    src: '/photos/photo-05-riverside-town.jpg',
    alt: 'A riverside town with buildings lining the waterfront.',
    caption: 'Riverside town',
    height: 700,
  },
  {
    src: '/photos/photo-06-victoria-memorial-kolkata.jpg',
    alt: 'The Victoria Memorial in Kolkata, a white marble domed building.',
    caption: 'Victoria Memorial, Kolkata',
    height: 860,
  },
] as const;

export const achievements = [
  'Smart India Hackathon — advanced to the college round, top 100 teams from 800+ entries',
  'Third Prize — panel discussion on sustainable energy, Energy Conservation Week',
  'Campus Ambassador — IIM Ahmedabad (2024–25)',
  'InQuizzitive — IIM Kozhikode Backwaters 2025',
  'Round 2 Qualifier — "AI Blueprint for Bharat" & NationBuilding Case Study Competition 2025',
] as const;
