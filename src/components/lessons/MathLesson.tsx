import { useState } from "react";
import { CheckCircle, XCircle, ArrowRight, Video, X, Volume2, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTTS } from "@/hooks/useTTS";

interface Option {
  id: string;
  label: string;
  isCorrect: boolean;
}

interface MathLessonProps {
  title: string;
  question: string;
  options: Option[];
  onComplete: () => void;
  videoUrl?: string;
}

export default function MathLesson({ title, question, options, onComplete, videoUrl }: MathLessonProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const router = useRouter();
  const { speak } = useTTS();

  const handleSelect = (optionId: string) => {
    setSelectedOption(optionId);
    const correct = options.find(o => o.id === optionId)?.isCorrect || false;
    setIsCorrect(correct);
    
    if (correct) {
      speak("Muito bem! Resposta correta.");
    } else {
      speak("Ops. Tente outra vez.");
    }
  };
  
  const getEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-amber-500 p-6 text-white flex justify-between items-center">
          <h1 className="text-2xl font-bold">{title}</h1>
           <div className="flex gap-2">
             <button onClick={() => router.back()} className="text-white/80 hover:text-white" aria-label="Fechar Lição">
               Fechar
             </button>
           </div>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
           {videoUrl && (
             <div className="mb-8">
               <button 
                 onClick={() => setShowVideo(true)}
                 className="w-full max-w-sm mx-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg border-b-4 border-blue-700 active:border-b-0 active:translate-y-1 transition flex items-center justify-center gap-3"
               >
                 <Video className="w-8 h-8" />
                 <span className="text-xl">ASSISTIR AULA AGORA</span>
               </button>
               <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Dica: Assista o vídeo antes de responder!</p>
             </div>
           )}

           <div className="mb-8 relative inline-block">
             <button 
                onClick={() => speak(question)}
                className="absolute -right-16 top-1/2 -translate-y-1/2 p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full hover:scale-110 transition shadow-sm"
                title="Ouvir pergunta"
                aria-label="Ouvir pergunta"
             >
               <Volume2 className="w-6 h-6" />
             </button>
             <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{question}</h2>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                disabled={isCorrect === true}
                className={`
                  aspect-square rounded-2xl text-5xl font-bold transition-all transform hover:scale-105
                  ${selectedOption === option.id
                    ? option.isCorrect
                      ? 'bg-green-500 text-white ring-4 ring-green-200'
                      : 'bg-red-500 text-white ring-4 ring-red-200'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-amber-900/30 border-2 border-slate-200 dark:border-slate-600'
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback Footer */}
        {selectedOption && (
          <div className={`p-6 ${isCorrect ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'} flex justify-between items-center animate-in slide-in-from-bottom-4`}>
            <div className="flex items-center gap-3">
              {isCorrect ? (
                <div className="flex items-center gap-3">
                   <div className="bg-green-500 p-2 rounded-full text-white">
                      <CheckCircle className="w-8 h-8" />
                   </div>
                   <div>
                      <p className="text-xl font-bold text-green-700 dark:text-green-300">Correto! Muito bem!</p>
                      <p className="text-sm font-bold text-amber-500 flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-500" /> +10 ESTRELAS
                      </p>
                   </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                   <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                   <span className="text-xl font-bold text-red-700 dark:text-red-300">Tente de novo!</span>
                </div>
              )}
            </div>
            
            {isCorrect && (
              <button
                onClick={onComplete}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition shadow-lg hover:shadow-green-500/30"
              >
                Continuar <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
      </div>

       {/* Video Modal */}
      {showVideo && videoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-black rounded-2xl overflow-hidden shadow-2xl w-full max-w-4xl aspect-video relative">
            <button 
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10 transition"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe 
              src={getEmbedUrl(videoUrl)} 
              title="Explicação da Lição"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
