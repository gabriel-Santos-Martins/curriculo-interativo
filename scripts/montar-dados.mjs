// Junta o levantamento de cada repo (D:/repositorio/levantamento/*.json), as datas do git,
// o papel do Gabriel e as mídias capturadas em src/data/projetos.json.
import fs from 'node:fs'
import path from 'node:path'

const LEV = 'D:/repositorio/levantamento'
const MIDIA = path.resolve('public/midia')

// Papel no projeto, a partir da autoria no histórico do git.
const PAPEL = {
  CGA: 'criei', CGR: 'criei', GFB: 'criei', oee: 'criei',
  TPM: 'codev', SISTEMAS: 'codev',
  PC: 'contribui', PMC: 'contribui', SSO: 'contribui', GDR: 'contribui', LICITA2: 'contribui',
  'Flexibase-SSO-iNSTALL': 'contribui', 'flexibase-ci': 'contribui',
}

const datas = Object.fromEntries(
  fs.readFileSync(path.join(LEV, '_datas.tsv'), 'utf8').trim().split('\n').map((l) => {
    const [repo, inicio, fim] = l.trim().split('\t')
    return [repo, { inicio, ultimaAtividade: fim }]
  }),
)
const commits = fs.existsSync(path.join(LEV, '_commits.json')) ? JSON.parse(fs.readFileSync(path.join(LEV, '_commits.json'), 'utf8')) : {}
const ajustes = fs.existsSync(path.join(LEV, '_ajustes.json')) ? JSON.parse(fs.readFileSync(path.join(LEV, '_ajustes.json'), 'utf8')) : {}
// Textos revisados para leitura pública (prevalecem sobre o levantamento bruto).
const textos = fs.existsSync(path.join(LEV, '_textos.json')) ? JSON.parse(fs.readFileSync(path.join(LEV, '_textos.json'), 'utf8')) : {}
const legendas = fs.existsSync(path.join(LEV, '_legendas.json')) ? JSON.parse(fs.readFileSync(path.join(LEV, '_legendas.json'), 'utf8')) : {}

// Página pública: tira URLs, hosts internos, IPs e caminhos de servidor de todo texto.
const INTERNO = /(https?:\/\/\S+|\b[\w.-]+\.flexibase\.com\.br\S*|\bdev0\d\b|\b\d{1,3}(\.\d{1,3}){3}(:\d+)?\b|\b[\w-]+\.(local|lan|internal)\b)/gi
const limpar = (t) =>
  typeof t !== 'string' ? t : t
    .replace(/\s*\([^()]*?(https?:|flexibase\.com\.br|dev0\d|README|\.md\b|commit|workflow|\d{1,3}\.\d{1,3}\.\d{1,3})[^()]*\)/gi, '')
    .replace(/\s*\(inferido\)/gi, '')
    .replace(INTERNO, '')
    .replace(/\b(segundo |conforme )?(o )?README(\/PROJECT)?( (explica|resume|cita|diz|documentam?|registra))?( que)?[:,]?\s*/gi, '')
    .replace(/(^|[.!?]\s+)([a-zà-ú])/g, (_, a, b) => a + b.toUpperCase())
    .replace(/\s+([,.;:])/g, '$1').replace(/\s{2,}/g, ' ').trim()
const limparTudo = (v) => (Array.isArray(v) ? v.map(limparTudo) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, limparTudo(x)])) : limpar(v))
const STATUS = ['em produção', 'em desenvolvimento', 'descontinuado']
const status = (s) => STATUS.find((x) => String(s ?? '').toLowerCase().startsWith(x)) ?? (/produ/i.test(s) ? 'em produção' : 'não informado')

const projetos = Object.keys(datas).map((repo) => {
  const arq = path.join(LEV, `${repo}.json`)
  const lev = { ...(fs.existsSync(arq) ? JSON.parse(fs.readFileSync(arq, 'utf8')) : { repo, nome: repo, sigla: repo }), ...ajustes[repo], ...textos[repo] }
  const dir = path.join(MIDIA, repo)
  const arquivos = fs.existsSync(dir) ? fs.readdirSync(dir).sort() : []
  const prints = arquivos
    .filter((f) => /\.(png|jpe?g|webp)$/i.test(f) && !f.startsWith('poster'))
    .map((f) => ({ src: `midia/${repo}/${f}`, legenda: legendas[repo]?.[f] ?? legendas[repo]?.[f.replace(/\.\w+$/, '.png')] ?? '' }))
  const video = arquivos.find((f) => f.endsWith('.mp4'))
  const poster = arquivos.find((f) => f.startsWith('poster'))
  return {
    repo,
    nome: lev.nome,
    sigla: lev.sigla ?? repo,
    categoria: lev.categoria ?? 'Outro',
    resumo: lev.resumo ?? '',
    problema: lev.problema ?? '',
    comoUsa: lev.comoUsa ?? [],
    funcionalidades: lev.funcionalidades ?? [],
    usuarios: lev.usuarios ?? '',
    impacto: lev.impacto ?? null,
    stack: (lev.stack ?? []).map((s) => s.replace(/[\s,]*\bdev0\d\b/gi, '').replace(/\(\s*\)/g, '').trim()),
    status: status(lev.status),
    temUI: lev.rodarLocal?.temUI ?? false,
    tipo: lev.rodarLocal?.tipo ?? 'web',
    papel: PAPEL[repo] ?? 'equipe',
    commits: commits[repo] ?? null,
    ...datas[repo],
    prints,
    video: video ? `midia/${repo}/${video}` : null,
    poster: poster ? `midia/${repo}/${poster}` : prints[0]?.src ?? null,
  }
})

const TEXTOS = ["nome", "resumo", "problema", "comoUsa", "funcionalidades", "usuarios", "impacto"]
for (const p of projetos) for (const k of TEXTOS) p[k] = limparTudo(p[k])
// A sigla já aparece à parte em todo lugar: "CGA – Gerador…" vira "Gerador…".
for (const p of projetos) p.nome = p.nome.replace(/^[\w\s()-]{2,16}?\s+[–—-]\s+/, '')
projetos.sort((a, b) => a.inicio.localeCompare(b.inicio))
fs.writeFileSync('src/data/projetos.json', JSON.stringify(projetos, null, 2))
console.log(`${projetos.length} projetos, ${projetos.filter((p) => p.prints.length).length} com prints, ${projetos.filter((p) => p.video).length} com vídeo`)
