import HabitCard from "./HabitCard";
function HabitList({ habits }) {
    // Guard clause 1: protege contra undefined ou null
    if (!habits) return <p>Carregando hábitos...</p>
    // Guard clause 2: mensagem amigável para lista vazia
    if (habits.length === 0) return <p>Você ainda não tem hábitos cadastrados. Comece a criar seus hábitos agora!</p>
    return (
        <ul>
            {habits.map(habit => (
                <HabitCard
                    key={habit.id}
                    titulo={habit.titulo}
                    descricao={habit.descricao}
                    meta={habit.meta}
                    ativo={habit.ativo}
                    diasFeitos={habit.diasFeitos}
                    categoria={habit.categoria}
                />
            ))}

        </ul>
    )
}

export default HabitList