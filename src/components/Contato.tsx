import { Mail, Phone } from 'lucide-react'
import { Github, Linkedin } from './Icones'
import { perfil } from '../data/perfil'

export default function Contato() {
  return (
    <section id="contato" className="secao contato">
      <h2>Vamos conversar?</h2>
      <p>Estou aberto a oportunidades em desenvolvimento full stack e produtos com IA.</p>
      <div className="contato-links">
        <a className="botao primario" href={`mailto:${perfil.email}`}><Mail size={18} /> {perfil.email}</a>
        <a className="botao" href={`tel:+55${perfil.telefone.replace(/\D/g, '')}`}><Phone size={18} /> {perfil.telefone}</a>
        <a className="botao" href={perfil.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn</a>
        <a className="botao" href={perfil.github} target="_blank" rel="noreferrer"><Github size={18} /> GitHub</a>
      </div>
      <p className="rodape">
        Os sistemas da Flexibase são internos. Todas as telas e vídeos desta página foram gravados com os sistemas rodando localmente, com dados fictícios.
      </p>
    </section>
  )
}
