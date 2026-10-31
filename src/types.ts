export type Papel = 'criei' | 'codev' | 'contribui' | 'equipe'

export type Projeto = {
  repo: string
  nome: string
  sigla: string
  categoria: string
  resumo: string
  problema: string
  comoUsa: string[]
  funcionalidades: string[]
  usuarios: string
  impacto: string | null
  stack: string[]
  status: string
  temUI: boolean
  tipo: string
  papel: Papel
  commits: { meus: number; total: number } | null
  inicio: string
  ultimaAtividade: string
  prints: { src: string; legenda: string }[]
  video: string | null
  poster: string | null
}

export const ROTULO_PAPEL: Record<Papel, string> = {
  criei: 'Criei',
  codev: 'Co-desenvolvi',
  contribui: 'Contribuí',
  equipe: 'Ecossistema da equipe',
}
