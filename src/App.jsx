import './App.css'
import { Logo } from './Logo'
import Header from './components/Header'
import Footer from './components/Footer' // Corrigido: Letra maiúscula
import BemVindo from './components/BemVindo'
import SecaoHabitos from './components/SecaoHabitos'
import HabitList from './components/HabitList'
import { HabitsProvider } from './contexts/HabitsContext'

function App() {
    return (
        <HabitsProvider>
            <div>
                <Logo />
                <Header titulo="My Daily Habits" descricao="Construindo uma rotina saudável todos os dias." />
                
                {/* Corrigido: Removida a prop totalHabitos */}
                <BemVindo nomeUsuario="Ivan ITEAM" /> 
                
                <SecaoHabitos titulo="Meus Hábitos" descricao="Acompanhe o progresso dos seus hábitos diários." >
                    {/* Corrigido: Removida a prop habits={habits} */}
                    <HabitList /> 
                </SecaoHabitos>
                
                <Footer />
            </div>
        </HabitsProvider>
    )
}
export default App