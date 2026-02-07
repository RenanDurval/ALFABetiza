"use client";

import LiteracyLesson from "@/components/lessons/LiteracyLesson";
import { useRouter, useSearchParams } from "next/navigation";
import { lessonsData } from "@/data/lessons";
import { useUser } from "@/context/UserContext";
import { use, useEffect } from "react";

export default function LiteracyLessonPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnPage = searchParams.get('returnPage');
  const { saveProgress } = useUser();
  
  // Find lesson data
  const lesson = lessonsData.find(l => l.id === resolvedParams.id && l.type === 'literacy');

  if (!lesson) {
    return <div className="p-8 text-center text-red-500">Lição não encontrada.</div>;
  }

  const handleComplete = async () => {
    // Save progress to Dexie.js
    await saveProgress(lesson.id, 'literacy', 100);
    
    // Logic to navigate to next lesson or dashboard
    if (lesson.unlocks) {
       router.push(`/lessons/literacy/${lesson.unlocks}?returnPage=${returnPage || 1}`);
    } else {
       const targetPage = returnPage || 1;
       router.push(`/dashboard?litPage=${targetPage}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4 transition-colors">
      <LiteracyLesson 
        title={lesson.title}
        instruction={lesson.content.instruction}
        options={lesson.content.options}
        onComplete={handleComplete}
        videoUrl={lesson.videoUrl}
        // nextLessonHref provided via handleComplete logic
      />
    </div>
  );
}
