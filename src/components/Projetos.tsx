import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react'
import { Etiqueta } from './Trajetoria'
import type { Projeto } from '../types'

const ORDEM_PAPEL = { criei: 0, codev: 1, contribui: 2, equipe: 3 }

const fmtData = (d: string) => {
  const [a, m] = d.split('-')
  return `${m}/${a}`
}

type Props = { projetos: Projeto[]; selecionado: string; onSelecionar: (repo: string) => void }

export default function Projetos({ projetos, selecionado, onSelecionar }: Props) {
  const [busca, setBusca] = useState('')

  const lista = useMemo(() => {
    const q = busca.trim().toLowerCase()
    return projetos
      .filter((p) => !q || `${p.sigla} ${p.nome} ${p.categoria} ${p.stack.join(' ')}`.toLowerCase().includes(q))
      .sort((a, b) => ORDEM_PAPEL[a.papel] - ORDEM_PAPEL[b.papel] || a.inicio.localeCompare(b.inicio))
  }, [projetos, busca])

  const projeto = projetos.find((p) => p.repo === selecionado) ?? projetos[0]
  const meus = lista.filter((p) => p.papel !== 'equipe')
  const equipe = lista.filter((p) => p.papel === 'equipe')

  return (
    <section id="projetos" className="secao">
      <div className="secao-cabeca">
        <p className="sobretitulo">Projetos</p>
        <h2>Um sistema por aba: por que nasceu, como se usa e como ele é por dentro</h2>
      </div>

      <div className="projetos">
        <aside className="projetos-nav" aria-label="Projetos">
          <label className="busca">
            <Search size={16} />
            <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar sistema ou tecnologia" />
          </label>
          <Grupo titulo="Com minha participação" itens={meus} ativo={projeto?.repo} onSelecionar={onSelecionar} />
          <Grupo titulo="Ecossistema da equipe" itens={equipe} ativo={projeto?.repo} onSelecionar={onSelecionar} />
        </aside>

        <AnimatePresence mode="wait">
          {projeto && (
            <motion.article
              key={projeto.repo}
              className="projeto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <Detalhe projeto={projeto} />
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

function Grupo({ titulo, itens, ativo, onSelecionar }: { titulo: string; itens: Projeto[]; ativo?: string; onSelecionar: (r: string) => void }) {
  if (!itens.length) return null
  return (
    <div className="nav-grupo">
      <p className="nav-titulo">{titulo} <span>{itens.length}</span></p>
      <ul>
        {itens.map((p) => (
          <li key={p.repo}>
            <button className={p.repo === ativo ? 'ativo' : ''} onClick={() => onSelecionar(p.repo)} aria-current={p.repo === ativo}>
              <span className="nav-sigla">{p.sigla}</span>
              <span className="nav-nome">{p.nome}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Detalhe({ projeto: p }: { projeto: Projeto }) {
  const [aberta, setAberta] = useState<number | null>(null)

  return (
    <>
      <header className="projeto-cabeca">
        <div className="projeto-titulos">
          <span className="projeto-sigla">{p.sigla}</span>
          <h3>{p.nome}</h3>
          <p className="projeto-resumo">{p.resumo}</p>
        </div>
        <dl className="projeto-meta">
          <div><dt>Minha participação</dt><dd><Etiqueta papel={p.papel} /></dd></div>
          <div><dt>Área</dt><dd>{p.categoria}</dd></div>
          <div><dt>Período</dt><dd>{fmtData(p.inicio)} – {fmtData(p.ultimaAtividade)}</dd></div>
          <div><dt>Status</dt><dd>{p.status}</dd></div>
          {p.commits && p.papel !== 'equipe' && (
            <div><dt>Meus commits</dt><dd>{p.commits.meus} de {p.commits.total}</dd></div>
          )}
        </dl>
      </header>

      {p.video ? (
        <figure className="projeto-video">
          <video src={p.video} poster={p.poster ?? undefined} controls preload="metadata" playsInline />
          <figcaption>Passada rápida pelo sistema, com dados fictícios</figcaption>
        </figure>
      ) : p.prints[0] ? (
        <figure className="projeto-video">
          <button className="sem-botao" onClick={() => setAberta(0)}>
            <img src={p.prints[0].src} alt={p.prints[0].legenda} />
          </button>
          {p.prints[0].legenda && <figcaption>{p.prints[0].legenda}</figcaption>}
        </figure>
      ) : (
        <div className="projeto-sem-tela">
          {p.temUI ? 'Telas em preparação' : 'Sistema sem interface: atua nos bastidores do ecossistema'}
        </div>
      )}

      <div className="projeto-corpo">
        <section>
          <h4>Por que ele nasceu</h4>
          <p>{p.problema}</p>
          {p.impacto && <p className="impacto"><strong>Resultado:</strong> {p.impacto}</p>}
        </section>

        {p.comoUsa.length > 0 && (
          <section>
            <h4>Como se usa</h4>
            <ol className="passos">
              {p.comoUsa.map((passo, i) => <li key={i}>{passo}</li>)}
            </ol>
          </section>
        )}

        {p.funcionalidades.length > 0 && (
          <section>
            <h4>O que ele faz</h4>
            <ul className="lista">
              {p.funcionalidades.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </section>
        )}

        <section>
          <h4>Quem usa</h4>
          <p>{p.usuarios}</p>
          <h4>Tecnologias</h4>
          <ul className="chips">
            {p.stack.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </section>
      </div>

      {p.prints.length > 0 && (
        <section className="galeria">
          <h4>Telas ({p.prints.length})</h4>
          <ul>
            {p.prints.map((pr, i) => (
              <li key={pr.src}>
                <button className="sem-botao" onClick={() => setAberta(i)}>
                  <img src={pr.src} alt={pr.legenda} loading="lazy" />
                </button>
                {pr.legenda && <span>{pr.legenda}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {aberta !== null && <Lightbox prints={p.prints} indice={aberta} onMudar={setAberta} />}
    </>
  )
}

function Lightbox({ prints, indice, onMudar }: { prints: Projeto['prints']; indice: number; onMudar: (i: number | null) => void }) {
  const ir = (d: number) => onMudar((indice + d + prints.length) % prints.length)
  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      ref={(el) => el?.focus()}
      onClick={() => onMudar(null)}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onMudar(null)
        if (e.key === 'ArrowRight') ir(1)
        if (e.key === 'ArrowLeft') ir(-1)
      }}
    >
      <figure onClick={(e) => e.stopPropagation()}>
        <img src={prints[indice].src} alt={prints[indice].legenda} />
        <figcaption>{prints[indice].legenda} <span>{indice + 1}/{prints.length}</span></figcaption>
      </figure>
      <button className="lb-fechar" aria-label="Fechar" onClick={() => onMudar(null)}><X /></button>
      {prints.length > 1 && (
        <>
          <button className="lb-ant" aria-label="Anterior" onClick={(e) => { e.stopPropagation(); ir(-1) }}><ChevronLeft /></button>
          <button className="lb-prox" aria-label="Próxima" onClick={(e) => { e.stopPropagation(); ir(1) }}><ChevronRight /></button>
        </>
      )}
    </div>
  )
}
