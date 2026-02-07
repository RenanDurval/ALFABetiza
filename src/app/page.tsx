"use client";

import { useLanguage } from "@/context/LanguageContext";
import { BookOpen, Calculator, Globe } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const { t, locale, setLocale } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-primary font-bold text-2xl">
            <BookOpen className="w-8 h-8" />
            <span>ALFABetiza</span>
          </div>
          

          <div className="flex items-center gap-4">
             <ThemeToggle />
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-full px-3 py-1">
              <Globe className="w-4 h-4 text-slate-500" />
              <select 
                value={locale} 
                onChange={(e) => setLocale(e.target.value as any)}
                className="bg-transparent border-none text-sm focus:ring-0 cursor-pointer text-slate-700 font-medium"
              >
                <option value="pt">Português</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="bg-blue-50 py-20 px-4 text-center">
          <div className="container mx-auto max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold text-blue-900 mb-6">
              {t("welcome")}
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              {t("slogan")}
            </p>
            <Link href="/login" className="inline-block bg-secondary hover:bg-amber-600 text-white font-bold text-xl py-4 px-10 rounded-full shadow-lg transform transition hover:scale-105 active:scale-95">
              {t("start")}
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Literacy Card */}
            <Link href="/login" className="block">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition text-center group cursor-pointer h-full">
                <div className="w-16 h-16 bg-blue-100 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">{t("literacy")}</h2>
                <p className="text-slate-600 mb-6">
                  Aprenda o alfabeto, sílabas e leitura de textos do dia a dia como placas e mensagens.
                </p>
                 <span className="text-primary font-bold group-hover:underline">Acessar Aulas &rarr;</span>
              </div>
            </Link>

            {/* Math Card */}
            <Link href="/login" className="block">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition text-center group cursor-pointer h-full">
                <div className="w-16 h-16 bg-amber-100 text-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                   <Calculator className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">{t("math")}</h2>
                <p className="text-slate-600 mb-6">
                   Domine números, contagem, troco e medidas essenciais para sua independência.
                </p>
                <span className="text-secondary font-bold group-hover:underline">Acessar Aulas &rarr;</span>
              </div>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center">
        <div className="container mx-auto px-4">
          <p>{t("footer")}</p>
        </div>
      </footer>
    </div>
  );
}
