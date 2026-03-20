import { createContext, useState, useEffect, useContext } from "react";

export const HabitsContext = createContext(null);

export function HabitsProvider({ children }) {
  const [habits, setHabits] = useState(() => {
    const stored = localStorage.getItem('my-daily-habits');
    if (!stored) return [
      { id: 1, titulo: 'Exercício',  descricao: 'Treino de força',   categoria: 'Saúde',  meta: 5, ativo: true,  diasFeitos: 5 },
      { id: 2, titulo: 'Leitura',    descricao: 'Livro ou artigo',   categoria: 'Estudo', meta: 7, ativo: true,  diasFeitos: 3 },
      { id: 3, titulo: 'Meditação',  descricao: 'Respiração e foco', categoria: 'Saúde',  meta: 7, ativo: false, diasFeitos: 0 },
      { id: 4, titulo: 'Hidratação', descricao: 'Beber 2L de água',  categoria: 'Saúde',  meta: 7, ativo: true,  diasFeitos: 6 },
    ];
    try { return JSON.parse(stored) } catch { return [] }
  });

  useEffect(() => {
    localStorage.setItem('my-daily-habits', JSON.stringify(habits));
  }, [habits]);

  const adicionarHabit = (novoHabit) => setHabits(prev => [...prev, novoHabit]);
  const removerHabit = (id) => setHabits(prev => prev.filter(h => h.id !== id));
  const limparHistorico = () => setHabits([]);
  const toggleAtivo = (id) => setHabits(prev => prev.map(h => h.id === id ? { ...h, ativo: !h.ativo } : h));

  return (
    <HabitsContext.Provider value={{ habits, adicionarHabit, removerHabit, limparHistorico, toggleAtivo }}>
      {children}
    </HabitsContext.Provider>
  );
}

export function useHabits() {
  return useContext(HabitsContext);
}