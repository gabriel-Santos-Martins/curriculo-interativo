import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import { ROTULO_PAPEL, type Papel, type Projeto } from '../types'

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

// Marcos de carreira exibidos junto dos sistemas.
const MARCOS: Record<string, string> = {
  '2025-05': 'Começo na Corp System (ERP hospitalar)',
  '2026-05': 'Fim do estágio na Corp System',
  '2026-08': 'Entro na equipe de sistemas da Flexibase',
}

function listarMeses(inicio: string, fim: string) {
  const r: string[] = []
  let [a, m] = inicio.split('-').map(Number)
  const [af, mf] = fim.split('-').map(Number)
  while (a < af || (a === af && m <= mf)) {
    r.push(`${a}-${String(m).padStart(2, '0')}`)
    m++
    if (m > 12) { m = 1; a++ }
  }
  return r
}

const nomeMes = (am: string) => {
  const [a, m] = am.split('-')
  return `${MESES[Number(m) - 1]}/${a.slice(2)}`
}

type Filtro = 'todos' | 'meus'

export default function Trajetoria({ projetos, onAbrir }: { projetos: Projeto[]; onAbrir: (repo: string) => void }) {
  const meses = useMemo(() => {
    const primeiro = projetos.map((p) => p.inicio.slice(0, 7)).sort()[0] ?? '2025-05'
    const ultimo = projetos.map((p) => p.ultimaAtividade.slice(0, 7)).sort().at(-1) ?? '2026-10'
    return listarMeses(primeiro < '2025-05' ? primeiro : '2025-05', ultimo)
  }, [projetos])

  const [indice, setIndice] = useState(meses.length - 1)
  const [tocando, setTocando] = useState(false)
  const [filtro, setFiltro] = useState<Filtro>('todos')
  const trilho = useRef<HTMLDivElement>(null)
  const atual = meses[indice]

  useEffect(() => {
    if (!tocando) return
    const t = setInterval(() => {
      setIndice((i) => {
        if (i >= meses.length - 1) { setTocando(false); return i }
        return i + 1
      })
    }, 900)
    return () => clearInterval(t)
  }, [tocando, meses.length])

  useEffect(() => {
    const col = trilho.current?.querySelector<HTMLElement>(`[data-mes="${atual}"]`)
    if (col && trilho.current) {
      trilho.current.scrollTo({ left: col.offsetLeft - trilho.current.clientWidth / 2 + col.clientWidth / 2, behavior: 'smooth' })
    }
  }, [atual])

  const visiveis = projetos.filter((p) => filtro === 'todos' || p.papel !== 'equipe')
  const ate = visiveis.filter((p) => p.inicio.slice(0, 7) <= atual)
  const meusAte = ate.filter((p) => p.papel !== 'equipe').length

  const tocar = () => {
    if (indice >= meses.length - 1) setIndice(0)
    setTocando((t) => !t)
  }

  return (
    <section id="trajetoria" className="secao">
      <div className="secao-cabeca">
        <p className="sobretitulo">Linha do tempo</p>
        <h2>Como o ecossistema Flexibase foi crescendo</h2>
        <p className="secao-intro">
          Cada cartão é um sistema, posicionado no mês do primeiro commit. Aperte o play para ver o ecossistema crescer mês a mês até hoje.
          A etiqueta mostra minha participação em cada um, tirada do histórico do git.
        </p>
      </div>

      <div className="tempo-controles">
        <button className="botao primario redondo" onClick={tocar} aria-label={tocando ? 'Pausar' : 'Reproduzir linha do tempo'}>
          {tocando ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <input
          type="range"
          min={0}
          max={meses.length - 1}
          value={indice}
          onChange={(e) => { setTocando(false); setIndice(Number(e.target.value)) }}
          aria-label="Mês"
        />
        <div className="tempo-contador">
          <strong>{nomeMes(atual)}</strong>
          <span>{ate.length} sistemas · {meusAte} com minha participação</span>
        </div>
        <div className="segmentado" role="group" aria-label="Filtro">
          <button className={filtro === 'todos' ? 'ativo' : ''} onClick={() => setFiltro('todos')}>Todos</button>
          <button className={filtro === 'meus' ? 'ativo' : ''} onClick={() => setFiltro('meus')}>Com minha participação</button>
        </div>
      </div>

      <div className="trilho" ref={trilho}>
        {meses.map((m, i) => {
          const doMes = visiveis.filter((p) => p.inicio.slice(0, 7) === m)
          const futuro = i > indice
          return (
            <div key={m} data-mes={m} className={`tempo-coluna ${futuro ? 'futuro' : ''} ${m === atual ? 'atual' : ''}`}>
              <div className="tempo-mes">{nomeMes(m)}</div>
              {MARCOS[m] && <div className="tempo-marco">{MARCOS[m]}</div>}
              {doMes.map((p) => (
                <motion.button
                  key={p.repo}
                  layout
                  className={`tempo-cartao papel-${p.papel}`}
                  onClick={() => onAbrir(p.repo)}
                  animate={{ opacity: futuro ? 0.18 : 1, y: futuro ? 6 : 0 }}
                >
                  <span className="tempo-sigla">{p.sigla}</span>
                  <span className="tempo-nome">{p.nome}</span>
                  <Etiqueta papel={p.papel} />
                </motion.button>
              ))}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function Etiqueta({ papel }: { papel: Papel }) {
  return <span className={`etiqueta etiqueta-${papel}`}>{ROTULO_PAPEL[papel]}</span>
}
