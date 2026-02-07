"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useUser } from "@/context/UserContext";
import { lessonsData } from "@/data/lessons";
import { BookOpen, Calculator, CheckCircle, Lock, Play, LogOut, ChevronLeft, ChevronRight, Home, Star, Trophy, Zap, Users } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { useState, useEffect } from "react";

import { Suspense } from "react";

const ITEMS_per_PAGE = 20;

function DashboardContent() {
  const { t } = useLanguage();
  const { currentUser, userProgress, logout } = useUser();
  const router = useRouter();
  
  // Get pagination from URL
  const searchParams = useSearchParams();
  const litPage = Number(searchParams.get('litPage')) || 1;
  const mathPage = Number(searchParams.get('mathPage')) || 1;

  const updatePage = (type: 'literacy' | 'math', newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (type === 'literacy') params.set('litPage', newPage.toString());
    if (type === 'math') params.set('mathPage', newPage.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  if (!currentUser) {
    if (typeof window !== 'undefined') router.push('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const renderPagination = (type: 'literacy' | 'math', currentPage: number, totalItems: number) => {
    const totalPages = Math.ceil(totalItems / ITEMS_per_PAGE);
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center items-center gap-4 mt-6">
        <button 
          onClick={() => updatePage(type, Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 transition"
          aria-label="Página Anterior"
        >
          <ChevronLeft className="w-6 h-6 text-slate-600 dark:text-slate-300" />
        </button>
        <span className="font-bold text-slate-600 dark:text-slate-300">
          Página {currentPage} de {totalPages}
        </span>
        <button 
          onClick={() => updatePage(type, Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 transition"
          aria-label="Próxima Página"
        >
          <ChevronRight className="w-6 h-6 text-slate-600 dark:text-slate-300" />
        </button>
      </div>
    );
  };

  const renderModule = (
    type: 'literacy' | 'math', 
    title: string, 
    icon: any, 
    colorClass: string, 
    iconBg: string,
    currentPage: number,
  ) => {
    const allLessons = lessonsData.filter(l => l.type === type);
    const startIdx = (currentPage - 1) * ITEMS_per_PAGE;
    const currentLessons = allLessons.slice(startIdx, startIdx + ITEMS_per_PAGE);
    
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-6">
          <div className={`${iconBg} p-3 rounded-xl`}>
            {icon}
          </div>
          <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200">{title}</h2>
          <span className="ml-auto text-sm font-medium text-slate-400 bg-slate-100 dark:bg-slate-700 py-1 px-3 rounded-full">
            {allLessons.length} Lições
          </span>
        </div>
        
        <div className="space-y-4 flex-1">
          {currentLessons.map((lesson, index) => {
            const isCompleted = userProgress.some(p => p.lessonId === lesson.id);
            const globalIndex = startIdx + index;
            const previousLesson = globalIndex > 0 ? allLessons[globalIndex - 1] : null;
            const isLocked = previousLesson && !userProgress.some(p => p.lessonId === previousLesson.id);

            if (isLocked) {
              return (
                <div key={lesson.id} className="border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 rounded-xl p-4 flex justify-between items-center opacity-75">
                  <div>
                    <h3 className="font-bold text-slate-400 dark:text-slate-500">{lesson.title}</h3>
                    <p className="text-sm text-slate-400 dark:text-slate-500">{t("locked")}</p>
                  </div>
                  <Lock className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                </div>
              );
            }

            return (
              <Link key={lesson.id} href={`/lessons/${type}/${lesson.id}?returnPage=${currentPage}`} className="block">
                <div className={`border rounded-xl p-4 transition cursor-pointer flex justify-between items-center group
                  ${isCompleted 
                    ? 'border-green-100 bg-green-50 dark:bg-green-900/20 dark:border-green-800' 
                    : 'border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-blue-500 hover:shadow-md'
                  }
                `}>
                  <div>
                    <h3 className={`font-bold transition-colors ${isCompleted ? 'text-green-800 dark:text-green-400' : 'text-slate-800 dark:text-slate-200 group-hover:text-primary dark:group-hover:text-blue-400'}`}>
                      {lesson.title}
                    </h3>
                    <p className={`text-sm ${isCompleted ? 'text-green-600 dark:text-green-500' : 'text-slate-500 dark:text-slate-400'}`}>
                      {isCompleted ? (
                        <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> {t("completed")}</span>
                      ) : (
                        lesson.description
                      )}
                    </p>
                  </div>
                  {isCompleted ? (
                     <span className="text-green-600 dark:text-green-500 font-bold text-sm hover:underline">Revisar</span>
                  ) : (
                    <Play className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-primary dark:group-hover:text-blue-400" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
        
        {renderPagination(type, currentPage, allLessons.length)}
      </div>
    );
  };

  const getLevelTitle = (level: number) => {
    if (level <= 1) return "Novato";
    if (level <= 5) return "Explorador";
    if (level <= 10) return "Aventureiro";
    if (level <= 20) return "Mestre";
    return "Lenda";
  };

  const currentLevel = currentUser.level || 1;
  const currentPoints = currentUser.points || 0;
  const POINTS_PER_LEVEL = 100;
  const nextLevelPoints = currentLevel * POINTS_PER_LEVEL;
  const progress = ((currentPoints % POINTS_PER_LEVEL) / POINTS_PER_LEVEL) * 100;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6 transition-colors font-sans">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="flex items-center gap-4">
                <Link href="/" className="p-3 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-primary transition" title="Início do App">
                   <Home className="w-6 h-6" />
                </Link>
                <Link href="/login" className="p-3 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-primary transition" title="Trocar Usuário">
                   <Users className="w-6 h-6" />
                </Link>
                <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{t("dashboard")}</h1>
             </div>
             
             <div className="flex items-center gap-4">
               <ThemeToggle />
               <button 
                 onClick={handleLogout}
                 className="p-2 text-slate-400 hover:text-red-500 transition"
                 title="Sair"
               >
                 <LogOut className="w-6 h-6" />
               </button>
             </div>
          </div>

          {/* Gamification Card */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-center gap-6">
            <div className="text-6xl animate-bounce">
              {currentUser.avatar}
            </div>
            
            <div className="flex-1 w-full">
              <div className="flex justify-between items-center mb-2">
                <div>
                   <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{currentUser.name}</h2>
                   <p className="text-sm font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1">
                     <Trophy className="w-4 h-4" /> {getLevelTitle(currentLevel)} &bull; Nível {currentLevel}
                   </p>
                </div>
                <div className="text-right">
                   <p className="text-2xl font-black text-amber-400 flex items-center justify-end gap-1">
                     {currentPoints} <Star className="w-6 h-6 fill-amber-400" />
                   </p>
                   <p className="text-xs text-slate-400 dark:text-slate-500">Total de Estrelas</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-4 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-1000 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-center mt-1 text-slate-400 dark:text-slate-500">
                Faltam {POINTS_PER_LEVEL - (currentPoints % POINTS_PER_LEVEL)} estrelas para o Nível {currentLevel + 1}
              </p>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {renderModule('literacy', t("literacy"), <BookOpen className="w-6 h-6 text-primary dark:text-blue-300" />, 'text-primary', 'bg-blue-100 dark:bg-blue-900/50', litPage)}
          {renderModule('math', t("math"), <Calculator className="w-6 h-6 text-secondary dark:text-amber-300" />, 'text-secondary', 'bg-amber-100 dark:bg-amber-900/50', mathPage)}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
