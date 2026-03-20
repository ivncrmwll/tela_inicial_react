function HabitCard({
  titulo,
  descricao = '',
  meta,
  ativo = true,
  diasFeitos = 0,
  categoria = 'Geral',
  onRemover,
  onToggle // Nova prop
}) {
  const metaAtingida = diasFeitos >= meta;
  const mensagemMeta = metaAtingida
    ? 'Meta atingida! Parabéns!'
    : `Faltam ${meta - diasFeitos} dia(s) para atingir a meta.`;

  return (
    <div className={`habit-card ${ativo ? 'ativo' : 'inativo'}`}>
      <h3>{titulo}</h3>
      <span>{ativo ? '✅ Ativo' : '⏸️ Pausado'}</span>
      
      {descricao && <p>{descricao}</p>}
      
      <div>
        <p><strong>Progresso:</strong> {diasFeitos} de {meta} dias</p>
        <small>Categoria: {categoria || 'Geral'}</small>
      </div>

      <p className={metaAtingida ? 'congrats' : undefined}>
        {metaAtingida ? '🏆 ' : ''}
        {mensagemMeta}
        {metaAtingida ? ' 🎉' : ''}
      </p>

      {/* Novo botão de Toggle */}
      {onToggle && (
        <button type="button" onClick={onToggle} style={{ marginRight: '8px' }}>
          {ativo ? 'Pausar' : 'Ativar'}
        </button>
      )}

      {onRemover && (
        <button type="button" onClick={onRemover}>
          Remover
        </button>
      )}

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
        onToggle={() => toggleAtivo(habit.id)} /* Nova linha */
    />
))}
    </div>
  );
}

export default HabitCard;