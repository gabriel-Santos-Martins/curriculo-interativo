import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Github, Linkedin } from './Icones'
import { perfil } from '../data/perfil'
import type { Projeto } from '../types'

export default function Hero({ projetos }: { projetos: Projeto[] }) {
  const capa = projetos.find((p) => p.repo === 'TPM')?.prints[0] ?? projetos.find((p) => p.prints.length)?.prints[0]

  return (
    <section id="sobre" className="hero">
      <div className="hero-texto">
        <motion.p className="sobretitulo" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          Carta de apresentação interativa
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          {perfil.nome}
        </motion.h1>
        <motion.p className="hero-titulo" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          {perfil.titulo}
        </motion.p>
        <motion.p className="hero-sub" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          {perfil.subtitulo}
        </motion.p>
        <p className="hero-resumo">{perfil.resumo}</p>
        <ul className="hero-contatos">
          <li><MapPin size={16} /> {perfil.local}</li>
          <li><a href={`mailto:${perfil.email}`}><Mail size={16} /> {perfil.email}</a></li>
          <li><a href={`tel:+55${perfil.telefone.replace(/\D/g, '')}`}><Phone size={16} /> {perfil.telefone}</a></li>
          <li><a href={perfil.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a></li>
          <li><a href={perfil.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a></li>
        </ul>
        <div className="hero-acoes">
          <a className="botao primario" href="#projetos">Ver os sistemas</a>
          <a className="botao" href="#trajetoria">Linha do tempo</a>
        </div>
      </div>

      <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
        {capa ? (
          <div className="janela">
            <div className="janela-barra"><span /><span /><span /></div>
            <img src={capa.src} alt={capa.legenda || 'Tela de um dos sistemas'} />
          </div>
        ) : (
          <div className="janela janela-vazia">GM</div>
        )}
      </motion.div>

      <ul className="destaques">
        {perfil.destaques.map((d) => (
          <li key={d.rotulo}>
            <strong>{d.valor}</strong>
            <span>{d.rotulo}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
