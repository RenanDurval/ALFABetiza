import { Lesson } from "./lessons";

export function generateLessons(): Lesson[] {
  const lessons: Lesson[] = [];

// --- LITERACY (500 Lessons) ---
  const vogais = ['A', 'E', 'I', 'O', 'U'];
  const consoantes = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'V', 'X', 'Z'];

  // 1. Identify Letters (100 lessons)
  for (let i = 0; i < 100; i++) {
    const target = (i % 2 === 0) ? vogais[i % 5] : consoantes[i % 17];
    // Video: "As Letras do Alfabeto" (Generic)
    const video = "https://www.youtube.com/watch?v=QA3GgJ9d3Tk"; 
    
    lessons.push({
      id: `lit_gen_${i}`,
      type: 'literacy',
      title: `Nível ${Math.floor(i / 10) + 1} - Letra ${target}`,
      description: `Encontre a letra ${target}.`,
      videoUrl: video,
      content: {
        instruction: `Qual destas é a letra '${target}'?`,
        options: [
          // ... options logic stays same
          { id: "1", label: i % 3 === 0 ? '1' : 'B', isCorrect: false },
          { id: "2", label: target, isCorrect: true },
          { id: "3", label: i % 5 === 0 ? 'X' : '2', isCorrect: false },
        ].sort(() => Math.random() - 0.5)
      }
    });
  }

  // 2. Syllables (400 lessons)
  for (let i = 100; i < 500; i++) {
     // Video: "Sílabas para crianças"
     const video = "https://www.youtube.com/watch?v=JmC-h_c1g90"; 
     
     lessons.push({
      id: `lit_gen_${i}`,
      type: 'literacy',
      title: `Nível ${Math.floor(i / 10) + 1} - Sílabas`,
      description: `Prática de sílabas ${i}.`,
      videoUrl: video,
      content: {
        instruction: `Qual forma 'BA'?`,
        options: [
          { id: "1", label: "BO", isCorrect: false },
          { id: "2", label: "BA", isCorrect: true },
          { id: "3", label: "BE", isCorrect: false },
        ].sort(() => Math.random() - 0.5)
      }
    });
  }


  // --- MATH (500 Lessons) ---
  
  // 1. Counting (100 lessons)
  for (let i = 0; i < 100; i++) {
    const count = (i % 10) + 1;
    const icons = "🍎".repeat(count);
    // Video: "Aprenda a contar de 1 a 10"
    const video = "https://www.youtube.com/watch?v=E-0XzI1jG84";
    
    lessons.push({
      id: `math_gen_${i}`,
      type: 'math',
      title: `Nível ${Math.floor(i / 10) + 1} - Contar`,
      description: `Conte os objetos.`,
      videoUrl: video,
      content: {
        question: `Quantas maçãs? ${icons}`,
        options: [
          { id: "1", label: `${count + 1}`, isCorrect: false },
          { id: "2", label: `${count}`, isCorrect: true },
          { id: "3", label: `${count - 1 === 0 ? 9 : count - 1}`, isCorrect: false },
        ].sort(() => Math.random() - 0.5)
      }
    });
  }

  // 2. Addition (200 lessons)
  for (let i = 100; i < 300; i++) {
    const a = Math.floor(Math.random() * 20);
    const b = Math.floor(Math.random() * 20);
    const sum = a + b;
    // Video: "Adição para crianças"
    const video = "https://www.youtube.com/watch?v=Q9sL9_4wz5w";

    lessons.push({
      id: `math_gen_${i}`,
      type: 'math',
      title: `Soma: ${a} + ${b}`,
      description: `Resolva a soma.`,
      videoUrl: video,
      content: {
        question: `Quanto é ${a} + ${b}?`,
        options: [
          { id: "1", label: `${sum + 1}`, isCorrect: false },
          { id: "2", label: `${sum}`, isCorrect: true },
          { id: "3", label: `${sum - 1}`, isCorrect: false },
        ].sort(() => Math.random() - 0.5)
      }
    });
  }
  
  // 3. Subtraction (200 lessons)
    for (let i = 300; i < 500; i++) {
    const a = Math.floor(Math.random() * 20) + 10;
    const b = Math.floor(Math.random() * 10);
    const res = a - b;
    // Video: "Subtração para crianças"
    const video = "https://www.youtube.com/watch?v=8_yT_ed6y9E";

    lessons.push({
      id: `math_gen_${i}`,
      type: 'math',
      title: `Subtração: ${a} - ${b}`,
      description: `Resolva a subtração.`,
      videoUrl: video,
      content: {
        question: `Quanto é ${a} - ${b}?`,
        options: [
          { id: "1", label: `${res + 2}`, isCorrect: false },
          { id: "2", label: `${res}`, isCorrect: true },
          { id: "3", label: `${res - 1}`, isCorrect: false },
        ].sort(() => Math.random() - 0.5)
      }
    });
  }

  // 3. Word Completion (200 lessons)
  for (let i = 500; i < 700; i++) {
     const words = [
       { full: "CASA", missing: "C_SA", answer: "A", options: ["E", "A", "O"] },
       { full: "GATO", missing: "G_TO", answer: "A", options: ["I", "A", "U"] },
       { full: "BOLA", missing: "BOL_", answer: "A", options: ["E", "O", "A"] },
       { full: "PATO", missing: "PA_O", answer: "T", options: ["P", "T", "V"] },
       { full: "DADO", missing: "_ADO", answer: "D", options: ["B", "D", "T"] },
     ];
     const word = words[i % words.length];
     
     lessons.push({
      id: `lit_gen_${i}`,
      type: 'literacy',
      title: `Complete: ${word.missing}`,
      description: `Qual letra falta?`,
      videoUrl: "https://www.youtube.com/watch?v=1W3bH7hFqNw", // Vowels/Words song
      content: {
        instruction: `Complete a palavra: ${word.missing}`,
        options: word.options.map((opt, idx) => ({
          id: `${idx}`,
          label: opt,
          isCorrect: opt === word.answer
        })).sort(() => Math.random() - 0.5)
      }
    });
  }

  // 4. Rhymes (100 lessons)
  for (let i = 700; i < 800; i++) {
     const rhymes = [
       { q: "MÃO", a: "PÃO", opts: ["PÉ", "PÃO", "SOL"] },
       { q: "GATO", a: "PATO", opts: ["CÃO", "PATO", "BOI"] },
       { q: "ANEL", a: "PAPEL", opts: ["CÉU", "PAPEL", "MAR"] },
       { q: "FOGO", a: "JOGO", opts: ["LUA", "JOGO", "RIO"] },
     ];
     const rhyme = rhymes[i % rhymes.length];
     
     lessons.push({
      id: `lit_gen_${i}`,
      type: 'literacy',
      title: `Rimas: ${rhyme.q}`,
      description: `O que rima com ${rhyme.q}?`,
      videoUrl: "https://www.youtube.com/watch?v=33a5DQUhGj8", // Rhymes song
      content: {
        instruction: `O que rima com ${rhyme.q}?`,
        options: rhyme.opts.map((opt, idx) => ({
          id: `${idx}`,
          label: opt,
          isCorrect: opt === rhyme.a
        })).sort(() => Math.random() - 0.5)
      }
    });
  }


  // --- MATH (500 Lessons) ---
  
  // ... (Keep existing Counting/Add/Sub logic, adjusting indices if needed)
  
  // 4. Money (100 lessons)
  for (let i = 500; i < 600; i++) {
    // 0 = 1 Real, 1 = 5 Reais, 2 = 10 Reais
    const moneyValues = [1, 5, 10, 20, 50, 100];
    const target = moneyValues[i % moneyValues.length];
    
    lessons.push({
      id: `math_gen_${i}`,
      type: 'math',
      title: `Dinheiro: Nota de ${target}`,
      description: `Identifique a nota de ${target} reais.`,
      videoUrl: "https://www.youtube.com/watch?v=9_Vp3y2w3uM", // Money video
      content: {
        question: `Qual nota vale ${target} reais?`,
        options: [
          { id: "1", label: `R$ ${target}`, isCorrect: true },
          { id: "2", label: `R$ ${target === 1 ? 10 : 1}`, isCorrect: false },
          { id: "3", label: `R$ ${target === 5 ? 20 : 5}`, isCorrect: false },
        ].sort(() => Math.random() - 0.5)
      }
    });
  }

  // 5. Sequences (100 lessons)
  for (let i = 600; i < 700; i++) {
    const start = Math.floor(i / 10) + 1;
    const seq = [start, start + 1, start + 2, "?"];
    const answer = start + 3;
    
    lessons.push({
      id: `math_gen_${i}`,
      type: 'math',
      title: `Sequência: ${start}, ${start+1}, ...`,
      description: `Complete a sequência.`,
      videoUrl: "https://www.youtube.com/watch?v=xeGf4h79mX8", // Numbers sequence
      content: {
        question: `Qual o próximo número? ${start}, ${start+1}, ${start+2}, ...`,
        options: [
          { id: "1", label: `${answer}`, isCorrect: true },
          { id: "2", label: `${answer + 2}`, isCorrect: false },
          { id: "3", label: `${answer - 1}`, isCorrect: false },
        ].sort(() => Math.random() - 0.5)
      }
    });
  }

  return lessons;
}
