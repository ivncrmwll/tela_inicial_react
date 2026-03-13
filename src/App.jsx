import './App.css'
import { Logo } from './Logo'
import Header from './components/Header'
import Footer from './components/footer'
import BemVindo from './components/BemVindo'
import SecaoHabitos from './components/SecaoHabitos'
import HabitList from './components/HabitList'

function App() {
    const habits = [
        { id: 1, nome: 'Exercício físico', descricao: 'Praticar atividade física por pelo menos 30 minutos.', meta: 7, ativo: true,  diasFeitos: 7 },
        { id: 2, nome: 'Leitura', descricao: 'Ler um livro ou artigo por pelo menos 20 minutos.', meta: 7, ativo: true,  diasFeitos: 3 },
        { id: 3, nome: 'Meditação', descricao: 'Dedicar 10 minutos para meditar e relaxar a mente.', meta: 7, ativo: false,  diasFeitos: 0 },
        { id: 4, nome: 'Hidratação', descricao: 'Beber pelo menos 2 litros de água por dia.', meta: 7, ativo: true,  diasFeitos: 4 },
        { id: 5, nome: 'Sono de qualidade', descricao: 'Dormir pelo menos 7 horas por noite.', meta: 7, ativo: true,  diasFeitos: 5 },
    ]
return (
<div>
<Logo />
<Header />
<BemVindo nomeUsuario="Ivan ITEAM" totalHabitos={habits.length} />
<SecaoHabitos titulo="Meus Hábitos" descricao="Acompanhe o progresso dos seus hábitos diários." >
<HabitList habits={habits} />
</SecaoHabitos>
<Footer />
</div>
)
}
export default App