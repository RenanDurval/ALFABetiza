"use client";

import MathLesson from "@/components/lessons/MathLesson";
import { useRouter, useSearchParams } from "next/navigation";
import { lessonsData } from "@/data/lessons";
import { useUser } from "@/context/UserContext";
import { use } from "react";

export default function MathLessonPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnPage = searchParams.get('returnPage');
  const { saveProgress } = useUser();

  // Find lesson data
  const lesson = lessonsData.find(l => l.id === resolvedParams.id && l.type === 'math');

  if (!lesson) {
    return <div className="p-8 text-center text-red-500">Lição não encontrada.</div>;
  }

  const handleComplete = async () => {
    // Save progress to Dexie.js
    await saveProgress(lesson.id, 'math', 100);
    
    // Logic to navigate to next lesson or dashboard
    if (lesson.unlocks) {
       // Just a simple check if next exists in data, though for now assuming unlocks key is enough
       router.push(`/lessons/math/${lesson.unlocks}?returnPage=${returnPage || 1}`);
    } else {
       const targetPage = returnPage || 1;
       router.push(`/dashboard?mathPage=${targetPage}`);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-slate-900 flex items-center justify-center p-4 transition-colors">
      <MathLesson 
        title={lesson.title}
        question={lesson.content.question}
        options={lesson.content.options}
        onComplete={handleComplete}
        videoUrl={lesson.videoUrl}
      />
    </div>
  );
}
