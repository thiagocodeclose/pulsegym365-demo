export type SiteMode = 'standard' | 'pulse';

// CodeGym integration constants — update here when going to production
export const codegym = {
  baseUrl: 'https://codegym-bolt.vercel.app',
  gymSlug: 'pulsegym365'
};

export const site = {
  name: 'PulseGym',
  domain: 'www.pulsegym365.com',
  tagline: 'Train Hard. Recover Smart. Belong for Life.',
  subtitle:
    'PulseGym is a complete premium community fitness club with coaching, classes, aquatics, and high-performance training under one roof.',
  addressLine1: '3493 S Garibaldi Way',
  addressLine2: 'Utah 84045',
  address: '3493 S Garibaldi Way, Utah 84045',
  phone: '(801) 555-0148',
  email: 'hello@pulsegym365.com',
  hours: ['Mon-Fri: 5:00 AM - 10:00 PM', 'Sat: 7:00 AM - 8:00 PM', 'Sun: 8:00 AM - 6:00 PM'],
  heroStats: [
    { value: '8', label: 'training zones' },
    { value: '60+', label: 'weekly classes' },
    { value: '4.9', label: 'member rating' },
    { value: 'All-in-one', label: 'fitness club' }
  ]
};

export type TrainingStyle = {
  name: string;
  category: string;
  image: string;
  accent: string;
  fallback: string;
};

export const trainingStyles: TrainingStyle[] = [
  {
    name: 'Pilates',
    category: 'Core and Mobility',
    image: '/images/styles/pilates.jpg',
    accent: 'orange',
    fallback: 'linear-gradient(135deg, rgba(245,124,0,0.78), rgba(43,19,0,0.78))'
  },
  {
    name: 'Yoga',
    category: 'Mind and Body',
    image: '/images/styles/yoga.jpg',
    accent: 'gold',
    fallback: 'linear-gradient(135deg, rgba(244,184,68,0.74), rgba(74,38,0,0.82))'
  },
  {
    name: 'Swimming',
    category: 'Aquatics',
    image: '/images/styles/swimming.jpg',
    accent: 'teal',
    fallback: 'linear-gradient(135deg, rgba(15,183,167,0.7), rgba(1,44,54,0.86))'
  },
  {
    name: 'Boxing',
    category: 'Combat Sports',
    image: '/images/styles/boxing.jpg',
    accent: 'red',
    fallback: 'linear-gradient(135deg, rgba(235,87,87,0.72), rgba(66,10,10,0.86))'
  },
  {
    name: 'Jiu Jitsu',
    category: 'Grappling',
    image: '/images/styles/jiu-jitsu.jpg',
    accent: 'purple',
    fallback: 'linear-gradient(135deg, rgba(142,103,255,0.72), rgba(24,14,53,0.88))'
  },
  {
    name: 'Dance',
    category: 'Cardio and Rhythm',
    image: '/images/styles/dance.jpg',
    accent: 'pink',
    fallback: 'linear-gradient(135deg, rgba(255,95,175,0.72), rgba(73,9,40,0.86))'
  },
  {
    name: 'Spinning',
    category: 'Cycling Studio',
    image: '/images/styles/spinning.jpg',
    accent: 'blue',
    fallback: 'linear-gradient(135deg, rgba(42,109,246,0.74), rgba(9,21,56,0.88))'
  },
  {
    name: 'Strength Training',
    category: 'Gym Floor',
    image: '/images/styles/strength.jpg',
    accent: 'green',
    fallback: 'linear-gradient(135deg, rgba(44,207,114,0.74), rgba(10,45,26,0.88))'
  }
];

export type ClassItem = {
  name: string;
  group: string;
  duration: string;
  level: string;
  capacity: number;
  description: string;
  accent: string;
  coach: string;
  schedule: string;
  image: string;
  fallback: string;
  live?: {
    nextSlot: string;
    openSpots: number;
    status: 'Open' | 'Filling fast' | 'Waitlist';
  };
};

export const featuredClasses: ClassItem[] = [
  {
    name: 'Reformer Pilates',
    group: 'Mind and Body',
    duration: '50 min',
    level: 'All Levels',
    capacity: 12,
    description: 'Precision movement and core strength in a boutique-style reformer room.',
    accent: 'orange',
    coach: 'Sarah Kim',
    schedule: 'Mon, Wed, Fri - 7:00 AM',
    image: '/images/classes/reformer-pilates.jpg',
    fallback: 'linear-gradient(135deg, rgba(245,124,0,0.8), rgba(30,16,2,0.9))',
    live: {
      nextSlot: 'Today - 6:30 PM',
      openSpots: 3,
      status: 'Filling fast'
    }
  },
  {
    name: 'Power Yoga Flow',
    group: 'Mind and Body',
    duration: '45 min',
    level: 'Intermediate',
    capacity: 18,
    description: 'Dynamic flow for mobility, endurance, breathwork, and athletic recovery.',
    accent: 'gold',
    coach: 'Priya Shah',
    schedule: 'Tue, Thu - 6:30 PM',
    image: '/images/classes/power-yoga-flow.jpg',
    fallback: 'linear-gradient(135deg, rgba(244,184,68,0.78), rgba(53,31,0,0.9))',
    live: {
      nextSlot: 'Tomorrow - 7:15 AM',
      openSpots: 7,
      status: 'Open'
    }
  },
  {
    name: 'Rhythm Ride',
    group: 'Cardio and Energy',
    duration: '45 min',
    level: 'Beginner+',
    capacity: 25,
    description: 'Music-driven cycling with intervals, performance coaching, and immersive lighting.',
    accent: 'blue',
    coach: 'Nia Carter',
    schedule: 'Mon, Wed - 5:30 PM',
    image: '/images/classes/rhythm-ride.jpg',
    fallback: 'linear-gradient(135deg, rgba(42,109,246,0.82), rgba(8,17,48,0.9))',
    live: {
      nextSlot: 'Today - 5:30 PM',
      openSpots: 2,
      status: 'Filling fast'
    }
  },
  {
    name: 'Boxing Fundamentals',
    group: 'Combat and Discipline',
    duration: '60 min',
    level: 'Beginner',
    capacity: 16,
    description: 'Footwork, combinations, defense, and conditioning for all fitness levels.',
    accent: 'red',
    coach: 'Marcus Reed',
    schedule: 'Tue, Thu - 7:15 PM',
    image: '/images/classes/boxing-fundamentals.jpg',
    fallback: 'linear-gradient(135deg, rgba(235,87,87,0.82), rgba(57,11,11,0.9))',
    live: {
      nextSlot: 'Tonight - 7:15 PM',
      openSpots: 0,
      status: 'Waitlist'
    }
  },
  {
    name: 'No-Gi Jiu Jitsu',
    group: 'Combat and Discipline',
    duration: '60 min',
    level: 'Intermediate',
    capacity: 20,
    description: 'Movement-based grappling with positional rounds and progression coaching.',
    accent: 'purple',
    coach: 'Kenji Sato',
    schedule: 'Mon, Thu - 8:00 PM',
    image: '/images/classes/no-gi-jiu-jitsu.jpg',
    fallback: 'linear-gradient(135deg, rgba(142,103,255,0.82), rgba(25,15,52,0.9))',
    live: {
      nextSlot: 'Today - 8:00 PM',
      openSpots: 5,
      status: 'Open'
    }
  },
  {
    name: 'Aqua Conditioning',
    group: 'Aquatics',
    duration: '40 min',
    level: 'All Levels',
    capacity: 15,
    description: 'Low-impact resistance and cardio training inside the aquatics center.',
    accent: 'teal',
    coach: 'Emma Flores',
    schedule: 'Sat - 9:00 AM',
    image: '/images/classes/aqua-conditioning.jpg',
    fallback: 'linear-gradient(135deg, rgba(15,183,167,0.82), rgba(4,37,34,0.9))',
    live: {
      nextSlot: 'Saturday - 9:00 AM',
      openSpots: 9,
      status: 'Open'
    }
  },
  {
    name: 'Dance Cardio',
    group: 'Cardio and Energy',
    duration: '45 min',
    level: 'All Levels',
    capacity: 24,
    description: 'High-energy choreography sessions that blend fun and calorie burn.',
    accent: 'pink',
    coach: 'Maya Brooks',
    schedule: 'Fri - 6:00 PM',
    image: '/images/classes/dance-cardio.jpg',
    fallback: 'linear-gradient(135deg, rgba(255,95,175,0.82), rgba(59,8,35,0.9))',
    live: {
      nextSlot: 'Friday - 6:00 PM',
      openSpots: 11,
      status: 'Open'
    }
  },
  {
    name: 'Strength Floor Express',
    group: 'Strength and Performance',
    duration: '30 min',
    level: 'All Levels',
    capacity: 20,
    description: 'Coach-led strength circuit with racks, sleds, and focused programming.',
    accent: 'green',
    coach: 'Diego Alvarez',
    schedule: 'Daily - 12:15 PM',
    image: '/images/classes/strength-floor-express.jpg',
    fallback: 'linear-gradient(135deg, rgba(44,207,114,0.82), rgba(8,38,22,0.9))',
    live: {
      nextSlot: 'Today - 12:15 PM',
      openSpots: 4,
      status: 'Filling fast'
    }
  }
];

export const classFilters = [
  'All',
  'Mind and Body',
  'Aquatics',
  'Combat and Discipline',
  'Cardio and Energy',
  'Strength and Performance'
];

export type Plan = {
  name: string;
  price: string;
  annualPrice?: string;
  badge?: string;
  blurb: string;
  access: string;
  features: string[];
  pulseMeta?: {
    syncLabel: string;
    updateWindow: string;
  };
};

export const plans: Plan[] = [
  {
    name: 'Starter',
    price: '$79/mo',
    annualPrice: '$69/mo billed annually',
    blurb: 'Great for members building consistency with gym floor access and selected classes.',
    access: 'Gym floor + 4 classes/month',
    features: ['Open gym access', '4 classes per month', '1 onboarding session', 'Member portal access'],
    pulseMeta: {
      syncLabel: 'Live pricing',
      updateWindow: 'Updated 8 minutes ago'
    }
  },
  {
    name: 'Classes+',
    price: '$109/mo',
    annualPrice: '$99/mo billed annually',
    badge: 'Best Value',
    blurb: 'Built for members who train often and want flexibility across club studios.',
    access: '8 classes/month + gym floor',
    features: ['8 classes per month', 'Priority booking window', '1 guest pass monthly', 'Wellness orientation'],
    pulseMeta: {
      syncLabel: 'Managed in Pulse',
      updateWindow: 'Auto-synced today'
    }
  },
  {
    name: 'All Access',
    price: '$139/mo',
    annualPrice: '$129/mo billed annually',
    blurb: 'Unlimited classes, full gym floor, and complete access to the PulseGym experience.',
    access: 'Unlimited classes + gym floor',
    features: ['Unlimited classes', 'Priority waitlist access', '2 guest passes monthly', 'Portal and app connected'],
    pulseMeta: {
      syncLabel: 'Auto-updated from system',
      updateWindow: 'Next sync in 15 min'
    }
  },
  {
    name: 'Performance+',
    price: '$199/mo',
    annualPrice: '$189/mo billed annually',
    blurb: 'Premium coaching path with strategy sessions, advanced support, and total club access.',
    access: 'All Access + coaching perks',
    features: ['Monthly strategy session', 'Recovery lounge credits', 'Advanced booking priority', 'Dedicated performance coach'],
    pulseMeta: {
      syncLabel: 'Live pricing',
      updateWindow: 'Updated 3 minutes ago'
    }
  }
];

export const planComparisonRows = [
  { feature: 'Gym floor access', starter: 'Included', classesPlus: 'Included', allAccess: 'Included', performancePlus: 'Included' },
  { feature: 'Monthly classes', starter: '4 classes', classesPlus: '8 classes', allAccess: 'Unlimited', performancePlus: 'Unlimited' },
  { feature: 'Booking priority', starter: 'Standard', classesPlus: 'Priority', allAccess: 'Priority+', performancePlus: 'Top priority' },
  { feature: 'Guest passes', starter: 'None', classesPlus: '1 / month', allAccess: '2 / month', performancePlus: '4 / month' },
  { feature: 'Coaching strategy session', starter: '-', classesPlus: '-', allAccess: '-', performancePlus: 'Included' }
];

export type Trainer = {
  name: string;
  specialty: string;
  bio: string;
  accent: string;
  image: string;
  fallback: string;
};

export const trainers: Trainer[] = [
  {
    name: 'Sarah Kim',
    specialty: 'Pilates and Mobility',
    bio: 'Certified reformer coach focused on control, alignment, and injury-resistant movement.',
    accent: 'orange',
    image: '/images/trainers/sarah-kim.jpg',
    fallback: 'linear-gradient(135deg, rgba(245,124,0,0.8), rgba(52,23,2,0.85))'
  },
  {
    name: 'Marcus Reed',
    specialty: 'Boxing and Conditioning',
    bio: 'Former amateur boxer blending technical coaching with confidence-building conditioning.',
    accent: 'red',
    image: '/images/trainers/marcus-reed.jpg',
    fallback: 'linear-gradient(135deg, rgba(235,87,87,0.8), rgba(55,12,12,0.86))'
  },
  {
    name: 'Priya Shah',
    specialty: 'Yoga and Breathwork',
    bio: 'Leads dynamic and restorative sessions with equal emphasis on strength and recovery.',
    accent: 'gold',
    image: '/images/trainers/priya-shah.jpg',
    fallback: 'linear-gradient(135deg, rgba(244,184,68,0.8), rgba(54,32,0,0.86))'
  },
  {
    name: 'Diego Alvarez',
    specialty: 'Strength and Performance',
    bio: 'Helps members build measurable strength through progressive, coach-led programming.',
    accent: 'green',
    image: '/images/trainers/diego-alvarez.jpg',
    fallback: 'linear-gradient(135deg, rgba(44,207,114,0.8), rgba(8,39,22,0.86))'
  }
];

export type FacilityItem = {
  name: string;
  caption: string;
  accent: string;
  image: string;
  fallback: string;
};

export const facilities: FacilityItem[] = [
  {
    name: 'Pilates Room',
    caption: 'Reformer lines, private coaching spots, and mobility tools.',
    accent: 'orange',
    image: '/images/facilities/pilates-room.jpg',
    fallback: 'linear-gradient(135deg, rgba(245,124,0,0.78), rgba(40,20,3,0.88))'
  },
  {
    name: 'Yoga Room',
    caption: 'Quiet warm room for flows, breathwork, and mobility classes.',
    accent: 'gold',
    image: '/images/facilities/yoga-room.jpg',
    fallback: 'linear-gradient(135deg, rgba(244,184,68,0.78), rgba(41,24,1,0.88))'
  },
  {
    name: 'Aquatics Center',
    caption: 'Lap lanes, conditioning lanes, and guided aquatics sessions.',
    accent: 'teal',
    image: '/images/facilities/aquatics-center.jpg',
    fallback: 'linear-gradient(135deg, rgba(15,183,167,0.78), rgba(3,29,27,0.88))'
  },
  {
    name: 'Combat Room',
    caption: 'Heavy bags, mat space, and evening boxing and grappling blocks.',
    accent: 'red',
    image: '/images/facilities/combat-room.jpg',
    fallback: 'linear-gradient(135deg, rgba(235,87,87,0.78), rgba(44,10,10,0.88))'
  },
  {
    name: 'Dance Studio',
    caption: 'High-energy mirrored studio with rhythm and cardio sessions.',
    accent: 'pink',
    image: '/images/facilities/dance-studio.jpg',
    fallback: 'linear-gradient(135deg, rgba(255,95,175,0.78), rgba(50,8,31,0.88))'
  },
  {
    name: 'Cycling Studio',
    caption: 'Performance bikes, immersive lights, and rhythm-driven coaching.',
    accent: 'blue',
    image: '/images/facilities/cycling-studio.jpg',
    fallback: 'linear-gradient(135deg, rgba(42,109,246,0.78), rgba(8,16,43,0.88))'
  },
  {
    name: 'Strength Floor',
    caption: 'Racks, dumbbells, turf lanes, and functional power stations.',
    accent: 'green',
    image: '/images/facilities/strength-floor.jpg',
    fallback: 'linear-gradient(135deg, rgba(44,207,114,0.78), rgba(7,30,18,0.88))'
  }
];

export const spaces = facilities.map((space) => space.name);

export const testimonials = [
  {
    quote:
      'I came for Pilates and stayed for everything else. The variety and structure made consistency easy.',
    name: 'Amanda R.',
    role: 'Member since 2024'
  },
  {
    quote:
      'PulseGym feels premium without being intimidating. I can lift, box, swim, and recover in one place.',
    name: 'Chris T.',
    role: 'Performance+ member'
  },
  {
    quote:
      'The coaches are legit, the classes are packed with options, and the vibe is always motivating.',
    name: 'Jordan L.',
    role: 'All Access member'
  }
];

export const comparisonRows = [
  {
    item: 'Plans',
    standard: 'Static cards edited manually',
    pulse: 'Live pricing and plan updates from Pulse'
  },
  {
    item: 'Classes',
    standard: 'Static class cards and schedule text',
    pulse: 'Connected schedule preview with spots and timing'
  },
  {
    item: 'Trial Form',
    standard: 'Generic website form',
    pulse: 'Smart lead capture with attribution and routing'
  },
  {
    item: 'Questions',
    standard: 'Contact page only',
    pulse: 'AI chat and guided lead capture experience'
  },
  {
    item: 'Member Access',
    standard: 'Simple login link',
    pulse: 'Connected portal shortcuts for billing and bookings'
  }
];

export const pulseEnhancements = [
  'Live from Pulse badges in conversion blocks',
  'Smart lead routing for trial submissions',
  'Pricing and class previews synced from system',
  'Connected member portal shortcuts',
  'AI chat surface for quick pre-sales questions'
];

export const trialInterestOptions = [
  'All Access',
  'Pilates',
  'Yoga',
  'Swimming',
  'Boxing',
  'Jiu Jitsu',
  'Dance',
  'Spinning',
  'Strength Training'
];

export const integrationModes = [
  {
    title: 'Standard Website',
    summary: 'Classic public website experience with static content and direct contact flow.',
    code: 'Static pricing, static classes, generic contact and trial forms.'
  },
  {
    title: 'Pulse-Powered Website',
    summary: 'Same public website feel, now enhanced with connected conversion and live business blocks.',
    code: 'Live pricing, smart trial routing, dynamic class preview, connected portal.'
  }
];
