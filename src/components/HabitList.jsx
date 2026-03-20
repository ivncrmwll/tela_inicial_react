import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import HabitCard from "./HabitCard";
import { useHabits } from "../contexts/HabitsContext";

function HabitList() {
    // 1. Consumindo o estado global do Contexto
    const { habits, adicionarHabit, removerHabit, limparHistorico, toggleAtivo } = useHabits();
    const navigate = useNavigate();

    // 2. Estados de UI
    const tituloInputRef = useRef(null);
    const metaInputRef = useRef(null);

    const [form, setForm] = useState({
        novoTitulo: '',
        novaDescricao: '',
        novaMeta: '',
        novaCategoria: ''
    });

    const [erroTitulo, setErroTitulo] = useState('');
    const [erroMeta, setErroMeta] = useState('');

    // 3. Funções e Validações
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'novaMeta') {
            const num = parseInt(value);
            if (num < 1 || num > 7) {
                setErroMeta('A meta deve ser entre 1 e 7 dias.');
            } else {
                setErroMeta('');
            }
        }
        if (name === 'novoTitulo') {
            if (value.length > 0 && value.length < 3) {
                setErroTitulo('O título deve ter pelo menos 3 caracteres.');
            } else {
                setErroTitulo('');
            }
        }
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!form.novoTitulo.trim()) {
            alert('O título do hábito é obrigatório!');
            return;
        }
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
            meta: parseInt(form.novaMeta) || 7,
            ativo: true,
            diasFeitos: 0,
            categoria: form.novaCategoria || 'Geral',
        };

        // Chama a função do Contexto
        adicionarHabit(novoHabit);

        // Reseta o formulário
        setForm({
            novoTitulo: '',
            novaDescricao: '',
            novaMeta: '',
            novaCategoria: ''
        });
        setErroTitulo('');
        tituloInputRef.current?.focus();
        navigate(`/habito/${novoHabit.id}`) // redirecionapara a página de detalhes do novo hábito após salvaer
    };

    if (!habits) return null;

    // 4. Retorno visual (JSX)
    return (
        <section>
            <form onSubmit={handleSubmit} className="habit-form">
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
            onToggle={() => toggleAtivo(habit.id)}
        />
    ))}
</ul>
        </section>
    );
}

export default HabitList;