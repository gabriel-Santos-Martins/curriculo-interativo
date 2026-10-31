import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Experiencia from './components/Experiencia'
import Trajetoria from './components/Trajetoria'
import Projetos from './components/Projetos'
import Competencias from './components/Competencias'
import Contato from './components/Contato'
import projetosJson from './data/projetos.json'
import type { Projeto } from './types'

const projetos = projetosJson as Projeto[]

const SECOES = [
  { id: 'sobre', rotulo: 'Sobre' },
  { id: 'experiencia', rotulo: 'Experiência' },
  { id: 'trajetoria', rotulo: 'Linha do tempo' },
  { id: 'projetos', rotulo: 'Projetos' },
  { id: 'competencias', rotulo: 'Competências' },
  { id: 'contato', rotulo: 'Contato' },
]

function lerProjetoDaUrl() {
  const m = window.location.hash.match(/^#\/projeto\/(.+)$/)
  return m ? decodeURIComponent(m[1]) : null
}

export default function App() {
  const [ativa, setAtiva] = useState('sobre')
  const [selecionado, setSelecionado] = useState<string>(() => lerProjetoDaUrl() ?? 'CGA')

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entradas) => entradas.forEach((e) => e.isIntersecting && setAtiva(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    SECOES.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const aoMudar = () => {
      const p = lerProjetoDaUrl()
      if (p) {
        setSelecionado(p)
        document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' })
      }
    }
    if (lerProjetoDaUrl()) setTimeout(aoMudar, 50)
    window.addEventListener('hashchange', aoMudar)
    return () => window.removeEventListener('hashchange', aoMudar)
  }, [])

  const abrirProjeto = (repo: string) => {
    window.location.hash = `/projeto/${encodeURIComponent(repo)}`
  }

  return (
    <>
      <header className="topo">
        <a href="#sobre" className="marca">
          <span className="marca-iniciais">GM</span>
          <span className="marca-nome">Gabriel Martins</span>
        </a>
        <nav className="topo-nav" aria-label="Seções">
          {SECOES.map((s) => (
            <a key={s.id} href={`#${s.id}`} className={ativa === s.id ? 'ativo' : ''}>
              {s.rotulo}
            </a>
          ))}
        </nav>
      </header>
      <main>
        <Hero projetos={projetos} />
        <Experiencia />
        <Trajetoria projetos={projetos} onAbrir={abrirProjeto} />
        <Projetos projetos={projetos} selecionado={selecionado} onSelecionar={abrirProjeto} />
        <Competencias />
        <Contato />
      </main>
    </>
  )
}
