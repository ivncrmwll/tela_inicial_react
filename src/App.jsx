import './App.css'
import Footer from './components/footer'
import { Logo } from './Logo'
import Header from './components/Header'
import BemVindo from './components/BemVindo'

function App() {
return (
<div>
<Logo />
<Header
titulo="Meus Hábitos Diários"
descricao="Gerencie seus hábitos diários de forma simples e visual." />

<BemVindo nomeUsuario="Ivan ITEAM" totalHabitos={5} />
<Footer />
</div>
)
}
export default App