function HabitCard({ titulo, descricao, meta, ativo = true, diasFeitos = 0, categoria = 'Geral' }) {
    const metaAtingida = diasFeitos >= meta
    const mensagemMeta = metaAtingida ? 'Meta atingida! Parabéns!' : `${diasFeitos} de ${meta} dias concluídos`

    return (
        <div className={`habit-card ${ativo ? 'ativo' : 'inativo'}`}>
            <h3>{titulo}</h3>
            <p>{descricao}</p>
            <p>{mensagemMeta}</p>
            <p>Meta: {meta} dias</p>
            <p>Dias feitos: {diasFeitos}</p>
            <small>Categoria: {categoria}</small>

            {/* Ternário: dois resultados possíveis */}
     <span>{ativo ? 'Ativo' : 'Pausado'}</span>

     {/* &&: um resultado ou nada */}
     {metaAtingida && (<p className="congrats">🎉 Parabéns por alcançar sua meta! 🎉</p>)}
        </div>
    )
}
export default HabitCard