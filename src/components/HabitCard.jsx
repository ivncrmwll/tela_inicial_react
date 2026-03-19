function HabitCard({
  titulo,
  descricao = '',
  meta,
  ativo = true,
  diasFeitos = 0,
  categoria = '',
  onRemover
}) {
  const metaAtingida = diasFeitos >= meta;

  return (
    <div className={`habit-card ${ativo ? 'ativo' : 'inativo'}`}>
      <h3>{titulo}</h3>
      <span>{ativo ? '✅ Ativo' : '⏸️ Pausado'}</span>
      
      {descricao && <p>{descricao}</p>}
      
      <div>
        <p><strong>Progresso:</strong> {diasFeitos} de {meta} dias</p>
        <small>Categoria: {categoria || 'Geral'}</small>
      </div>

      {metaAtingida && (
        <p className="congrats">🏆 Meta atingida! Parabéns! 🎉</p>
      )}

      {onRemover && (
        <button type="button" onClick={onRemover}>
          Remover
        </button>
      )}
    </div>
  );
}

export default HabitCard;