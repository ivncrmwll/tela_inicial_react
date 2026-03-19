    const BemVindo = ({ nomeUsuario, totalHabitos }) => {
        const dataAtual = new Date()
        const hora = dataAtual.getHours()
        const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite'

        const nomeFormatado = nomeUsuario.toUpperCase()
        const mensagem = totalHabitos > 0
            ? `Você tem ${totalHabitos} hábitos para acompanhar.`
            : 'Você ainda não tem hábitos cadastrados. Comece a criar seus hábitos agora!'
        const dataFormatada = dataAtual.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
        const horaFormatada = dataAtual.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

        return (
            <div>
                <h2>{saudacao} {nomeFormatado}, Seja bem-vindo!</h2>
                <p>{mensagem}</p>
                <p>Vamos juntos construir uma rotina de hábitos saudável! 💪</p>
                <p>Hoje é {dataFormatada}, às {horaFormatada}.</p>
            </div>
        )
    }
    export default BemVindo