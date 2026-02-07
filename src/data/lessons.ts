import { generateLessons } from "./lessonGenerator";

export interface Lesson {
  id: string;
  type: 'literacy' | 'math';
  title: string;
  description: string;
  content: any; // Flexible content structure
  unlocks?: string; // ID of lesson it unlocks
  videoUrl?: string; // Optional YouTube URL
}

const manualLessons: Lesson[] = [
  // LITERACY (Manual Examples)
  {
    id: "lit_1",
    type: "literacy",
    title: "Vogais: A, E, I, O, U",
    description: "Aprenda as vogais e seus sons.",
    videoUrl: "https://www.youtube.com/watch?v=d_x5g_sLwQk", // Example: "As Vogais" generic video
    content: {
      instruction: "Qual destas letras é a letra 'A'?",
      options: [
        { id: "1", label: "E", isCorrect: false },
        { id: "2", label: "A", isCorrect: true },
        { id: "3", label: "O", isCorrect: false },
      ]
    },
    unlocks: "lit_2"
  },
  // ... (Keep existing manual lessons if desired, but generator covers most)
];

// Generate 1000+ lessons
const generatedLessons = generateLessons();

// Combine manual and generated (ensure IDs don't clash or handle linking)
export const lessonsData: Lesson[] = [
  ...manualLessons,
  ...generatedLessons
];
