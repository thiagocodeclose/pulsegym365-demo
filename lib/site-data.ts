export const site = {
  name: 'PulseGym',
  domain: 'www.pulsegym365.com',
  tagline: 'One Club. Every Way to Train.',
  subtitle:
    'A premium full-service fitness club with Pilates, Yoga, Swimming, Boxing, Jiu Jitsu, Dance, Spinning, and a high-performance gym floor.',
  address: '3493 S Garibaldi Way, Utah 84045',
  phone: '(801) 555-0148',
  email: 'hello@pulsegym365.com',
  hours: [
    'Mon-Fri: 5:00 AM - 10:00 PM',
    'Sat: 7:00 AM - 8:00 PM',
    'Sun: 8:00 AM - 6:00 PM'
  ],
  heroStats: [
    { value: '8', label: 'training zones' },
    { value: '60+', label: 'weekly classes' },
    { value: '4.9', label: 'member rating' },
    { value: '1', label: 'demo gym website' }
  ]
};

export type ClassItem = {
  name: string;
  group: string;
  duration: string;
  level: string;
  capacity: number;
  description: string;
  accent: string;
  schedule: string;
};

export const featuredClasses: ClassItem[] = [
  {
    name: 'Reformer Pilates',
    group: 'Mind & Body',
    duration: '50 min',
    level: 'All Levels',
    capacity: 12,
    description: 'Precision movement, core strength, posture, and control in a premium Pilates studio.',
    accent: 'orange',
    schedule: 'Mon, Wed, Fri · 7:00 AM'
  },
  {
    name: 'Power Yoga Flow',
    group: 'Mind & Body',
    duration: '45 min',
    level: 'Intermediate',
    capacity: 18,
    description: 'Dynamic vinyasa practice built for mobility, endurance, breath, and recovery.',
    accent: 'gold',
    schedule: 'Tue, Thu · 6:30 PM'
  },
  {
    name: 'Rhythm Ride',
    group: 'Cardio & Energy',
    duration: '45 min',
    level: 'Beginner+',
    capacity: 25,
    description: 'Music-driven cycling with coaching, intervals, and high-energy lighting.',
    accent: 'blue',
    schedule: 'Mon, Wed · 5:30 PM'
  },
  {
    name: 'Boxing Fundamentals',
    group: 'Combat & Discipline',
    duration: '60 min',
    level: 'Beginner',
    capacity: 16,
    description: 'Technique, conditioning, footwork, combinations, and confidence-building drills.',
    accent: 'red',
    schedule: 'Tue, Thu · 7:15 PM'
  },
  {
    name: 'No-Gi Jiu Jitsu',
    group: 'Combat & Discipline',
    duration: '60 min',
    level: 'Intermediate',
    capacity: 20,
    description: 'Movement-based grappling with live coaching, positional rounds, and smart progression.',
    accent: 'purple',
    schedule: 'Mon, Thu · 8:00 PM'
  },
  {
    name: 'Aqua Conditioning',
    group: 'Aquatics',
    duration: '40 min',
    level: 'All Levels',
    capacity: 15,
    description: 'Low-impact pool training that improves endurance, coordination, and recovery.',
    accent: 'teal',
    schedule: 'Sat · 9:00 AM'
  },
  {
    name: 'Dance Cardio',
    group: 'Cardio & Energy',
    duration: '45 min',
    level: 'All Levels',
    capacity: 24,
    description: 'Feel-good choreography and cardio conditioning in a vibrant studio environment.',
    accent: 'pink',
    schedule: 'Fri · 6:00 PM'
  },
  {
    name: 'Strength Floor Express',
    group: 'Strength & Performance',
    duration: '30 min',
    level: 'All Levels',
    capacity: 20,
    description: 'Coach-led strength circuit using racks, dumbbells, sleds, and smart programming.',
    accent: 'green',
    schedule: 'Daily · 12:15 PM'
  }
];

export type Plan = {
  name: string;
  price: string;
  badge?: string;
  blurb: string;
  access: string;
  features: string[];
};

export const plans: Plan[] = [
  {
    name: 'Starter',
    price: '$79/mo',
    blurb: 'Great for members building a habit with gym floor access and selected weekly classes.',
    access: 'Gym floor + selected classes',
    features: [
      'Strength floor access',
      '4 classes per month',
      'Member portal access',
      'Intro session included'
    ]
  },
  {
    name: 'All Access',
    price: '$129/mo',
    badge: 'Most Popular',
    blurb: 'The best fit for members who want flexibility across Pilates, Yoga, Cycling, Aquatics, and more.',
    access: 'Unlimited classes + gym floor',
    features: [
      'Unlimited classes',
      'Priority booking',
      '1 guest pass per month',
      'App + portal access'
    ]
  },
  {
    name: 'Performance+',
    price: '$199/mo',
    blurb: 'Premium coaching experience with full club access, recovery perks, and advanced booking benefits.',
    access: 'Full club + premium support',
    features: [
      'Unlimited everything',
      'Monthly PT strategy session',
      'Premium locker perks',
      'Priority waitlist access'
    ]
  }
];

export type Trainer = {
  name: string;
  specialty: string;
  bio: string;
  accent: string;
};

export const trainers: Trainer[] = [
  {
    name: 'Sarah Kim',
    specialty: 'Pilates & Mobility',
    bio: 'Certified reformer coach focused on control, alignment, injury prevention, and strong foundations.',
    accent: 'orange'
  },
  {
    name: 'Marcus Reed',
    specialty: 'Boxing & Conditioning',
    bio: 'Former amateur boxer blending technique, confidence, and smart conditioning for every level.',
    accent: 'red'
  },
  {
    name: 'Priya Shah',
    specialty: 'Yoga & Breathwork',
    bio: 'Guides Power Yoga, Flow, and restorative sessions with equal emphasis on strength and reset.',
    accent: 'gold'
  },
  {
    name: 'Diego Alvarez',
    specialty: 'Strength & Athletic Performance',
    bio: 'Helps members get stronger with structured, coach-led programming across the full gym floor.',
    accent: 'green'
  }
];

export const spaces = [
  'Reformer Pilates Studio',
  'Yoga Room',
  'Aquatics Center',
  'Combat Room',
  'Dance Studio',
  'Cycling Studio',
  'Strength Floor',
  'Recovery Lounge'
];

export const integrationModes = [
  {
    title: 'Universal Script',
    summary: 'One script tag injects the enabled Pulse widgets into the website automatically.',
    code: '<script src="https://app.pulse.com/w/pulsegym.js"></script>'
  },
  {
    title: 'Individual Widgets',
    summary: 'Drop specific dynamic blocks like Pricing, Schedule, or AI Chat into selected pages.',
    code: '<div data-pulse="pricing" data-gym="pulsegym"></div>'
  },
  {
    title: 'Hosted Pages',
    summary: 'Use direct dynamic pages for trial, pricing, classes, or portal access from ads and QR codes.',
    code: 'https://www.pulsegym365.com/free-trial'
  },
  {
    title: 'Native Form Bridge',
    summary: 'Keep the gym website form and send the lead into Pulse with attribution, consent, and context.',
    code: 'POST /api/public/form-bridge'
  }
];

export const testimonials = [
  {
    quote:
      'I came for Pilates and stayed for everything else. The schedule, coaches, and variety make it incredibly easy to stay consistent.',
    name: 'Amanda R.',
    role: 'Member since 2024'
  },
  {
    quote:
      'PulseGym feels premium without being intimidating. I can lift, box, swim, and still recover well in the same club.',
    name: 'Chris T.',
    role: 'Performance+ member'
  },
  {
    quote:
      'The trial flow is simple, the member portal is clear, and the class variety actually makes the website feel alive.',
    name: 'Jordan L.',
    role: 'New member'
  }
];
