// Dados pessoais e de carreira, a partir do currículo (iFood GenAI).

export const perfil = {
  nome: 'Gabriel dos Santos Martins',
  titulo: 'Desenvolvedor Full Stack · Engenharia de Software',
  subtitulo: 'Construo produtos com IA que tiram processos do papel e colocam no chão de fábrica.',
  local: 'Goiânia - GO',
  email: 'gabrieldosm12@gmail.com',
  telefone: '(62) 98408-7143',
  linkedin: 'https://linkedin.com/in/gabriel-santos-782289258',
  github: 'https://github.com/gabriel-Santos-Martins',
  resumo:
    'Sou estudante de Engenharia de Software (formatura prevista em jul/2027), com experiência full stack em Java, Spring Boot, Angular, JavaScript, Next.js e React Native. Coloquei sistemas em uso real numa fábrica, do levantamento com o usuário ao deploy, e trabalho no dia a dia com Claude Code, Codex, Skills e Spec-Driven Development (SDD). Meu foco é transformar processos manuais em ferramentas simples que as pessoas realmente usam.',
  destaques: [
    { valor: '2 dias → 5 min', rotulo: 'para gerar uma ata (CGA)' },
    { valor: '2–5 min', rotulo: 'por recibo, sem lote mensal (CGR)' },
    { valor: '41', rotulo: 'sistemas no ecossistema Flexibase' },
    { valor: 'IA no dia a dia', rotulo: 'Claude Code · Codex · Skills · SDD' },
  ],
}

export type Experiencia = {
  cargo: string
  empresa: string
  periodo: string
  inicio: string // AAAA-MM
  fim: string | null
  descricao: string
  itens?: string[]
  stack?: string[]
}

export const experiencias: Experiencia[] = [
  {
    cargo: 'Estagiário de Desenvolvimento Full Stack',
    empresa: 'Flexibase (fábrica de móveis)',
    periodo: '08/2026 – atual',
    inicio: '2026-08',
    fim: null,
    descricao:
      'Integrante de uma equipe recém-criada para desenvolver sistemas internos da produção e do corporativo. Atuação ponta a ponta: backend, frontend, testes, banco de dados e implantação em produção. Desenvolvimento com agentes de IA (Claude Code, Codex), Skills e SDD. Também treina os usuários nos sistemas entregues e coleta feedback para guiar as melhorias.',
    itens: [
      'CGA – Gerador de Atas Automático: de ~2 dias para ~5 minutos por ata, com padronização visual.',
      'CGR – Criador e Gerenciador de Recibos: emissão em 2 a 5 minutos, com bloqueio de dados faltando.',
      'TPM – Gestão de Manutenção de Máquinas (~95%, em treinamento), com os módulos POM e OEE.',
      'GFB (Echo) – Coletor de Feedbacks para medir a adoção dos sistemas após os treinamentos.',
    ],
    stack: ['JavaScript', 'Next.js', 'React', 'React Native', 'Node.js', 'PostgreSQL', 'Docker'],
  },
  {
    cargo: 'Estagiário de Desenvolvimento e Suporte de Sistemas',
    empresa: 'Corp System',
    periodo: '05/2025 – 05/2026',
    inicio: '2025-05',
    fim: '2026-05',
    descricao:
      'Desenvolvimento e manutenção de um ERP hospitalar em Java (Spring Boot, Angular), com APIs REST, PostgreSQL/MySQL, Git e Linux. Correção de bugs, manutenção evolutiva e testes (Postman), em equipe pequena.',
    stack: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'MySQL', 'Linux'],
  },
  {
    cargo: 'Auxiliar de Escritório / Menor Aprendiz',
    empresa: 'Saga Concessionária',
    periodo: '05/2022 – 04/2025',
    inicio: '2022-05',
    fim: '2025-04',
    descricao: 'Rotinas administrativas, organização documental e atendimento interno.',
  },
]

export const formacao = [
  { titulo: 'Bacharelado em Engenharia de Software', instituicao: 'Unigoiás', periodo: '2023 – jul/2027 (previsão)' },
  { titulo: 'System Design', instituicao: 'Gustavo Galego', periodo: 'concluído em set/2026 · 5 h' },
]

export const competencias = [
  { grupo: 'Desenvolvimento com IA', itens: ['Claude Code', 'Codex', 'Skills', 'Spec-Driven Development (SDD)'] },
  {
    grupo: 'Linguagens e frameworks',
    itens: ['Java', 'Spring Boot', 'Angular', 'JavaScript', 'TypeScript', 'Next.js', 'React', 'React Native', 'Python', 'HTML5', 'CSS3'],
  },
  { grupo: 'Dados e infraestrutura', itens: ['PostgreSQL', 'MySQL', 'Docker', 'Linux (Ubuntu)', 'Git/GitHub', 'AWS (fundamentos)'] },
  { grupo: 'Engenharia', itens: ['APIs REST', 'Testes (Postman)', 'Arquitetura em camadas', 'System Design'] },
  { grupo: 'Produto', itens: ['Levantamento com usuários', 'Treinamento', 'Coleta de feedback', 'Métricas de impacto'] },
]

export const projetoExterno = {
  nome: 'MKar Master — ERP para oficinas mecânicas',
  descricao:
    'Projeto freelance, usado no TCC e em manutenção. Módulos de estoque, financeiro, ordens de serviço, clientes e veículos, com APIs REST e arquitetura em camadas.',
  stack: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'Docker'],
}
