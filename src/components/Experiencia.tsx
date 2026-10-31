import { motion } from 'framer-motion'
import { experiencias, formacao, projetoExterno } from '../data/perfil'

export default function Experiencia() {
  return (
    <section id="experiencia" className="secao">
      <div className="secao-cabeca">
        <p className="sobretitulo">Experiência</p>
        <h2>Do escritório ao chão de fábrica</h2>
      </div>
      <ol className="experiencias">
        {experiencias.map((e, i) => (
          <motion.li
            key={e.empresa}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="exp-periodo">{e.periodo}</div>
            <div className="exp-corpo">
              <h3>{e.cargo}</h3>
              <p className="exp-empresa">{e.empresa}</p>
              <p>{e.descricao}</p>
              {e.itens && (
                <ul className="lista">
                  {e.itens.map((it) => <li key={it}>{it}</li>)}
                </ul>
              )}
              {e.stack && (
                <ul className="chips">
                  {e.stack.map((s) => <li key={s}>{s}</li>)}
                </ul>
              )}
            </div>
          </motion.li>
        ))}
      </ol>

      <div className="grade-2">
        <div className="cartao">
          <h3>Formação</h3>
          {formacao.map((f) => (
            <p key={f.titulo}>
              <strong>{f.titulo}</strong>
              <br />
              <span className="discreto">{f.instituicao} · {f.periodo}</span>
            </p>
          ))}
        </div>
        <div className="cartao">
          <h3>{projetoExterno.nome}</h3>
          <p>{projetoExterno.descricao}</p>
          <ul className="chips">
            {projetoExterno.stack.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}
