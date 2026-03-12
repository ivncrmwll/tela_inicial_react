    const BemVindo = ({ nomeUsuario, totalHabitos }) => {
        const nomeFormatado = nomeUsuario.toUpperCase()
        const mensagem = totalHabitos > 0
            ? `Você tem ${totalHabitos} hábitos para acompanhar.`
            : 'Você ainda não tem hábitos cadastrados. Comece a criar seus hábitos agora!'
        return (
            <div>
                <h2>Bem-vindo, {nomeFormatado}!</h2>
                <p>{mensagem}</p>
            </div>
        )
    }
    export default BemVindo 