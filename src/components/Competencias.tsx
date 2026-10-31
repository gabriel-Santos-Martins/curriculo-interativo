import { competencias } from '../data/perfil'

export default function Competencias() {
  return (
    <section id="competencias" className="secao">
      <div className="secao-cabeca">
        <p className="sobretitulo">Competências</p>
        <h2>Ferramentas que uso para entregar</h2>
      </div>
      <div className="competencias">
        {competencias.map((c) => (
          <div key={c.grupo} className="cartao">
            <h3>{c.grupo}</h3>
            <ul className="chips">
              {c.itens.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
