export interface LevelConfig {
  id: number;
  name: string;
  environment: string;
  backgroundColor: string;
  floorColor: string;
  objective: string;
  prankItem: {
    type: string;
    name: string;
    position: { x: number; y: number };
  };
  target: {
    type: string;
    name: string;
    position: { x: number; y: number };
  };
  npc: {
    type: string;
    name: string;
    startPosition: { x: number; y: number };
    patrolPath?: { x: number; y: number }[];
    animation: string;
  };
  props: Array<{
    type: string;
    position: { x: number; y: number };
    width?: number;
    height?: number;
  }>;
  obstacles: Array<{
    position: { x: number; y: number };
    width: number;
    height: number;
  }>;
  escapeZone: {
    position: { x: number; y: number };
    width: number;
    height: number;
  };
}

export const LEVELS: LevelConfig[] = [
  {
    id: 1,
    name: "Classroom Whisper",
    environment: "Modern Classroom",
    backgroundColor: "#FFF8E7",
    floorColor: "#F5E6D3",
    objective: "Pass the note to your crush",
    prankItem: {
      type: "note",
      name: "Love Note",
      position: { x: -100, y: -150 }
    },
    target: {
      type: "student",
      name: "Crush",
      position: { x: 150, y: -150 }
    },
    npc: {
      type: "teacher",
      name: "Teacher",
      startPosition: { x: 0, y: -350 },
      animation: "writing"
    },
    props: [
      { type: "whiteboard", position: { x: 0, y: -380 }, width: 200, height: 120 },
      { type: "student-desk", position: { x: -120, y: -180 }, width: 70, height: 60 },
      { type: "student-desk", position: { x: 130, y: -180 }, width: 70, height: 60 },
      { type: "student-desk", position: { x: -120, y: -50 }, width: 70, height: 60 },
      { type: "student-desk", position: { x: 130, y: -50 }, width: 70, height: 60 }
    ],
    obstacles: [
      { position: { x: -80, y: -340 }, width: 150, height: 20 }
    ],
    escapeZone: {
      position: { x: -300, y: 80 },
      width: 80,
      height: 100
    }
  },
  {
    id: 2,
    name: "Office Escape",
    environment: "Modern Office",
    backgroundColor: "#E8F4F8",
    floorColor: "#D4E8EE",
    objective: "Sneak out without boss noticing",
    prankItem: {
      type: "briefcase",
      name: "Briefcase",
      position: { x: -200, y: -100 }
    },
    target: {
      type: "exit-door",
      name: "Exit Door",
      position: { x: 280, y: -50 }
    },
    npc: {
      type: "boss",
      name: "Boss",
      startPosition: { x: 100, y: -250 },
      animation: "sitting"
    },
    props: [
      { type: "desk", position: { x: 80, y: -270 }, width: 120, height: 80 },
      { type: "desk", position: { x: -150, y: -200 }, width: 100, height: 70 },
      { type: "chair", position: { x: 90, y: -220 }, width: 50, height: 50 }
    ],
    obstacles: [
      { position: { x: -30, y: -100 }, width: 120, height: 20 },
      { position: { x: 150, y: -180 }, width: 80, height: 20 }
    ],
    escapeZone: {
      position: { x: 280, y: -80 },
      width: 70,
      height: 120
    }
  },
  {
    id: 3,
    name: "Library Kiss",
    environment: "Cozy Library",
    backgroundColor: "#F8F0E3",
    floorColor: "#E8D7C3",
    objective: "Sneak a kiss without being caught",
    prankItem: {
      type: "courage",
      name: "Courage",
      position: { x: -150, y: -100 }
    },
    target: {
      type: "crush-spot",
      name: "Kiss Moment",
      position: { x: 120, y: -180 }
    },
    npc: {
      type: "librarian",
      name: "Librarian",
      startPosition: { x: -200, y: -300 },
      animation: "patrol"
    },
    props: [
      { type: "bookshelf", position: { x: -220, y: -200 }, width: 80, height: 180 },
      { type: "bookshelf", position: { x: 220, y: -150 }, width: 80, height: 180 },
      { type: "table", position: { x: 0, y: -150 }, width: 120, height: 80 }
    ],
    obstacles: [
      { position: { x: -200, y: -180 }, width: 60, height: 20 },
      { position: { x: 180, y: -130 }, width: 20, height: 150 }
    ],
    escapeZone: {
      position: { x: 280, y: 50 },
      width: 70,
      height: 100
    }
  },
  {
    id: 4,
    name: "The Gym Flex",
    environment: "Modern Gym",
    backgroundColor: "#1A1A2E",
    floorColor: "#16213E",
    objective: "Fake reps without trainer noticing",
    prankItem: {
      type: "dumbbell",
      name: "Heavy Weight",
      position: { x: -180, y: -200 }
    },
    target: {
      type: "bench",
      name: "Weight Bench",
      position: { x: 0, y: -180 }
    },
    npc: {
      type: "trainer",
      name: "Trainer",
      startPosition: { x: 150, y: -250 },
      animation: "patrol"
    },
    props: [
      { type: "bench", position: { x: 0, y: -200 }, width: 100, height: 60 },
      { type: "mirror", position: { x: 250, y: -200 }, width: 100, height: 200 }
    ],
    obstacles: [
      { position: { x: -180, y: -120 }, width: 70, height: 20 }
    ],
    escapeZone: {
      position: { x: -290, y: 50 },
      width: 80,
      height: 100
    }
  },
  {
    id: 5,
    name: "Bedroom Sneak-In",
    environment: "Dark Hallway",
    backgroundColor: "#2C2C3E",
    floorColor: "#1F1F2E",
    objective: "Get to room without waking parents",
    prankItem: {
      type: "shoes",
      name: "Your Shoes",
      position: { x: -250, y: 100 }
    },
    target: {
      type: "bedroom-door",
      name: "Your Room",
      position: { x: 250, y: -150 }
    },
    npc: {
      type: "parent",
      name: "Parent",
      startPosition: { x: 100, y: -250 },
      animation: "sleeping"
    },
    props: [
      { type: "door", position: { x: 80, y: -270 }, width: 80, height: 140 }
    ],
    obstacles: [
      { position: { x: -50, y: -20 }, width: 20, height: 100 }
    ],
    escapeZone: {
      position: { x: 250, y: -180 },
      width: 70,
      height: 120
    }
  },
  {
    id: 6,
    name: "Shopping Mall Crush",
    environment: "Bright Mall",
    backgroundColor: "#FFF9F0",
    floorColor: "#F5EDE0",
    objective: "Wave at crush without friend seeing",
    prankItem: {
      type: "confidence",
      name: "Confidence",
      position: { x: -200, y: -100 }
    },
    target: {
      type: "crush-wave",
      name: "Your Crush",
      position: { x: 150, y: -200 }
    },
    npc: {
      type: "friend",
      name: "Protective Friend",
      startPosition: { x: 180, y: -180 },
      animation: "watching"
    },
    props: [
      { type: "bench", position: { x: -100, y: -50 }, width: 100, height: 50 }
    ],
    obstacles: [
      { position: { x: -20, y: -120 }, width: 120, height: 20 }
    ],
    escapeZone: {
      position: { x: -280, y: 80 },
      width: 80,
      height: 100
    }
  },
  {
    id: 7,
    name: "Beach Photo Moment",
    environment: "Sunny Beach",
    backgroundColor: "#87CEEB",
    floorColor: "#F4E4C1",
    objective: "Take selfie without lifeguard noticing",
    prankItem: {
      type: "phone",
      name: "Smartphone",
      position: { x: -150, y: -100 }
    },
    target: {
      type: "selfie-spot",
      name: "Perfect Spot",
      position: { x: 100, y: -150 }
    },
    npc: {
      type: "lifeguard",
      name: "Lifeguard",
      startPosition: { x: 200, y: -300 },
      animation: "watching"
    },
    props: [
      { type: "umbrella", position: { x: 120, y: -180 }, width: 80, height: 100 }
    ],
    obstacles: [
      { position: { x: 50, y: -100 }, width: 20, height: 80 }
    ],
    escapeZone: {
      position: { x: -290, y: 50 },
      width: 80,
      height: 100
    }
  },
  {
    id: 8,
    name: "College Dorm Sneak",
    environment: "Dorm Corridor",
    backgroundColor: "#2E3A4E",
    floorColor: "#1F2937",
    objective: "Get past RA after curfew",
    prankItem: {
      type: "student-id",
      name: "Student ID",
      position: { x: -220, y: -80 }
    },
    target: {
      type: "dorm-door",
      name: "Your Dorm",
      position: { x: 260, y: -100 }
    },
    npc: {
      type: "ra",
      name: "RA",
      startPosition: { x: 50, y: -200 },
      animation: "patrol"
    },
    props: [
      { type: "door", position: { x: 260, y: -130 }, width: 70, height: 120 }
    ],
    obstacles: [
      { position: { x: -50, y: -130 }, width: 80, height: 20 }
    ],
    escapeZone: {
      position: { x: 260, y: -130 },
      width: 70,
      height: 120
    }
  },
  {
    id: 9,
    name: "Restaurant Kitchen Sneak",
    environment: "Professional Kitchen",
    backgroundColor: "#F5F5F5",
    floorColor: "#E0E0E0",
    objective: "Steal cupcake without chef seeing",
    prankItem: {
      type: "cupcake",
      name: "Delicious Cupcake",
      position: { x: 180, y: -250 }
    },
    target: {
      type: "exit-kitchen",
      name: "Kitchen Exit",
      position: { x: -260, y: -50 }
    },
    npc: {
      type: "chef",
      name: "Head Chef",
      startPosition: { x: 100, y: -280 },
      animation: "cooking"
    },
    props: [
      { type: "counter", position: { x: 150, y: -270 }, width: 150, height: 70 },
      { type: "stove", position: { x: 80, y: -300 }, width: 80, height: 60 },
      { type: "fridge", position: { x: -200, y: -200 }, width: 90, height: 140 }
    ],
    obstacles: [
      { position: { x: 50, y: -250 }, width: 20, height: 100 }
    ],
    escapeZone: {
      position: { x: -280, y: -80 },
      width: 80,
      height: 120
    }
  },
  {
    id: 10,
    name: "Rooftop Goodbye",
    environment: "City Rooftop",
    backgroundColor: "#1E3A5F",
    floorColor: "#2C4A6E",
    objective: "Say goodbye without guard noticing",
    prankItem: {
      type: "goodbye",
      name: "Final Words",
      position: { x: -100, y: -180 }
    },
    target: {
      type: "romantic-spot",
      name: "Romantic Spot",
      position: { x: 150, y: -220 }
    },
    npc: {
      type: "guard",
      name: "Security Guard",
      startPosition: { x: -220, y: -250 },
      animation: "patrol"
    },
    props: [
      { type: "railing", position: { x: 200, y: -230 }, width: 150, height: 20 }
    ],
    obstacles: [
      { position: { x: -200, y: -180 }, width: 80, height: 20 }
    ],
    escapeZone: {
      position: { x: -290, y: 80 },
      width: 80,
      height: 100
    }
  }
];

export function getLevelConfig(levelId: number): LevelConfig {
  return LEVELS[levelId - 1] || LEVELS[0];
}
