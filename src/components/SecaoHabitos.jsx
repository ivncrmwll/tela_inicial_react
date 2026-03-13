function SecaoHabitos({ titulo, descricao, children }) {
    return (
        <section>
            <h2>{titulo}</h2>
            <p>{descricao}</p>
            <div className="lista-habitos">
            {/* Aqui serão renderizados os hábitos */}
            {children}
        </div>
        </section>
    )
}

export default SecaoHabitos