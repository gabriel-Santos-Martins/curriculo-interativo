# Gabriel dos Santos Martins · Currículo interativo

Carta de apresentação interativa: quem sou, minha experiência, uma linha do tempo do ecossistema de sistemas internos da Flexibase e uma aba por sistema explicando **por que ele nasceu**, **como se usa**, com **telas reais** e um **vídeo curto** de cada um.

## O que tem aqui

- **Sobre e experiência**: resumo, destaques de impacto (ex.: ata de ~2 dias para ~5 minutos no CGA) e trajetória.
- **Linha do tempo**: os sistemas posicionados no mês do primeiro commit, com play para ver o ecossistema crescer mês a mês. Cada cartão diz minha participação, tirada do histórico do git: *Criei*, *Co-desenvolvi*, *Contribuí* ou *Ecossistema da equipe*.
- **Projetos**: navegação por aba, com busca, problema que motivou o sistema, passo a passo de uso, funcionalidades, tecnologias, galeria de telas e vídeo.

## Sobre as telas e os vídeos

Os sistemas são internos. Para este currículo, cada um foi executado **localmente, com dados fictícios**, sem acesso a nenhum ambiente de produção:

- capturas e gravações feitas com Playwright, com o navegador bloqueando qualquer host fora de `localhost`;
- sistemas que usam Supabase rodaram sobre um "mini Supabase" local (Postgres portátil + PostgREST + mocks de auth e storage), sem Docker;
- o app de tablet (React Native) foi executado no navegador com react-native-web;
- os vídeos (até 1:30) foram montados e renderizados com [HyperFrames](https://github.com/heygen-com/hyperframes) a partir das gravações reais.

Nomes de pessoas, órgãos, máquinas e valores que aparecem nas telas são inventados. O código-fonte dos sistemas **não** está neste repositório.

## Rodar localmente

```bash
npm install
npm run dev
```

Build estático (funciona em qualquer hospedagem, inclusive GitHub Pages, por usar caminhos relativos):

```bash
npm run build
```

## Stack

React 19, TypeScript, Vite, Framer Motion e Lucide.
