import { Link } from 'react-router-dom'

function PaginaNaoEncontrada() {
  return (
    <main className="pagina-404">
      <h1>ERROR 404!</h1>
      <p>Esta página não existe. "Apesar de vc estar nela, ela não existe!" :D</p>
      <Link to="/">Voltar para o início, Urgente!</Link>
    </main>
  )
}

export default PaginaNaoEncontrada