import { useEffect, useState, useRef } from "react";
import HabitCard from "./HabitCard";

// 1. Lista padrão movida para fora para não ser recriada a cada renderização
const HABITOS_PADRAO = [
    { id: 1, titulo: 'Exercício físico', descricao: 'Praticar atividade física...', meta: 7, ativo: true, diasFeitos: 7, categoria: 'Saúde' },
    { id: 2, titulo: 'Leitura', descricao: 'Ler um livro ou artigo...', meta: 7, ativo: true, diasFeitos: 3, categoria: 'Desenvolvimento Pessoal' },
    { id: 3, titulo: 'Meditação', descricao: 'Dedicar 10 minutos...', meta: 7, ativo: false, diasFeitos: 0, categoria: 'Bem-estar' },
    { id: 4, titulo: 'Hidratação', descricao: 'Beber pelo menos 2 litros...', meta: 7, ativo: true, diasFeitos: 4, categoria: 'Saúde' },
    { id: 5, titulo: 'Sono de qualidade', descricao: 'Dormir pelo menos 7 horas...', meta: 7, ativo: true, diasFeitos: 5, categoria: 'Saúde' },
];

function HabitList() {
    // 2. Agrupamento de Estados (States)
    const tituloInputRef = useRef(null);
    const metaInputRef = useRef(null);
    
    const [habits, setHabits] = useState(() => {
        const storedHabits = localStorage.getItem('my-daily-habits');
        if (!storedHabits) return HABITOS_PADRAO;
        try {
            return JSON.parse(storedHabits);
        } catch {
            return HABITOS_PADRAO;
        }
    });

    const [form, setForm] = useState({
        novoTitulo: '',
        novaDescricao: '',
        novaMeta: '',
        novaCategoria: ''
    });

    const [erroTitulo, setErroTitulo] = useState('');
    const [erroMeta, setErroMeta] = useState('');
        
    // 3. Agrupamento de Efeitos (Effects)
    useEffect(() => {
        localStorage.setItem('my-daily-habits', JSON.stringify(habits));
    }, [habits]);

    // 4. Agrupamento de Funções
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'novaMeta') {
            const num = parseInt(value)
            if (num < 1 || num > 7) {
                setErroMeta('A meta deve ser entre 1 e 7 dias.')
            } else {
                setErroMeta('')
            }
        }
        if (name === 'novoTitulo') {
            // Valida comprimento mínimo em tempo real
            if (value.length > 0 && value.length < 3) {
                setErroTitulo('O título deve ter pelo menos 3 caracteres.');
            } else {
                setErroTitulo('');
            }
        }

        setForm(prev => ({ ...prev, [name]: value }));
    };
          
    const removerHabit = (id) => {
        setHabits(habits.filter((habit) => habit.id !== id));
    };

    const limparHistorico = () => {
        localStorage.removeItem('my-daily-habits');
        setHabits([]);
    };

    const adicionarHabit = (event) => {
        event.preventDefault();

        if (!form.novoTitulo.trim()) {
            alert('O título do hábito é obrigatório!');
            return;
        }
        // Bloqueia se há erro de validação
        if (erroTitulo) {
            tituloInputRef.current?.focus();
            return;
        }
        if (erroMeta) {
            metaInputRef.current?.focus();
            return;
        }

        const novoHabit = {
            id: String(Date.now()),
            titulo: form.novoTitulo,
            descricao: form.novaDescricao,
            meta: Number(form.novaMeta) || 7,
            ativo: true,
            diasFeitos: 0,
            categoria: form.novaCategoria || 'Geral',
        };

        setHabits([...habits, novoHabit]);   
        setForm({
            novoTitulo: '',
            novaDescricao: '',
            novaMeta: '',
            novaCategoria: ''
        });

        // Devolve o foco para o campo nome — useRef em ação
        tituloInputRef.current?.focus();
    };

    // 5. Retorno visual (JSX)
    return (
        <section>
            <form onSubmit={adicionarHabit} className="habit-form">
                <div>
                    <label>
                        Título do hábito *
                        <input type="text" name="novoTitulo" value={form.novoTitulo} onChange={handleChange} ref={tituloInputRef} required />
                    </label>
                    {erroTitulo && <p style={{ color: 'red', fontSize: '0.8rem' }} className="error">{erroTitulo}</p>}
                </div>
                <div>
                    <label>
                        Descrição
                        <input type="text" name="novaDescricao" value={form.novaDescricao} onChange={handleChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Meta (dias)
                        <input type="number" name="novaMeta" value={form.novaMeta} onChange={handleChange} min="1" ref={metaInputRef} />
                    </label>
                    {erroMeta && <p style={{ color: 'red', fontSize: '0.8rem' }} className="error">{erroMeta}</p>}
                </div>
                <div>
                    <label>
                        Categoria
                        <input type="text" name="novaCategoria" value={form.novaCategoria} onChange={handleChange} />
                    </label>
                </div>
                <button type="submit">Adicionar Hábito</button>
            </form>

            <button onClick={limparHistorico} style={{ marginBottom: '16px' }}>Limpar Histórico</button>

            <ul>
                {habits.length === 0 && <p>Você ainda não tem hábitos cadastrados. Comece a criar seus hábitos agora!</p>}
                
                {habits.map((habit) => (
                    <HabitCard
                        key={habit.id}
                        titulo={habit.titulo}
                        descricao={habit.descricao}
                        meta={habit.meta}
                        ativo={habit.ativo}
                        diasFeitos={habit.diasFeitos}
                        categoria={habit.categoria}
                        onRemover={() => removerHabit(habit.id)}
                    />
                ))}
            </ul>
        </section>
    );
}

export default HabitList;