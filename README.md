# The Geek Awaken — site

Site/blog de **cultura geek** (jogos, animes, mangás, filmes e séries) em **React**, com posts em destaque, listagem por categoria, página de cada postagem e um **painel de edição** para criar publicações com texto formatado e imagens. O conteúdo é guardado no **Firebase** e o site é publicado na **Netlify**.

## Funcionalidades

- Página inicial com carrossel (*slideshow*), reviews recentes e posts por categoria
- Categorias: `jogos`, `animes`, `mangas`, `filmes`, `series`
- Páginas de post em destaque (`/postFront`), post (`/postView`) e categoria (`/postCatView`)
- Área de edição, aberta por um modal de login, para criar/editar posts com **editor de texto rico** (Draft.js) e **upload de imagens**
- Layout responsivo com Material-UI

## Conceitos técnicos

**SPA com React Router.** Rotas client-side (`BrowserRouter`); o arquivo `netlify.toml` reescreve qualquer caminho para `/index.html` para o roteamento funcionar após recarregar a página.

**Firebase como backend (BaaS).**

- *Realtime Database* guarda os posts (`posts/feed`, `posts/postsFront`)
- *Storage* guarda as imagens enviadas
- As regras do banco e do Storage exigem usuário autenticado (`database.rules.json`, `storage.rules`)

**Editor rico (Draft.js).** O conteúdo é editado em `EditorTexto` e persistido para ser renderizado nas páginas de leitura.

**Deploy contínuo na Netlify.** O comando de build é `CI=false react-scripts build`; as rotas são tratadas por `_redirects`/`netlify.toml`.

## Stack

React 16 · React Router 5 · Material-UI 4 · Draft.js · Firebase 7 (Realtime Database, Storage, Functions) · Netlify

## Estrutura

```
src/
  App.js                 # home: slide, reviews, categorias e modal de login/edição
  routes.js              # rotas
  firebase.js            # inicialização do Firebase (config lida do .env)
  components/            # menuBar, slide, catPosts, reviewsR, editorTexto, imageUpload, drawer
  pages/                 # postFrontView, postView, postCatView
functions/               # Cloud Functions (esqueleto)
database.rules.json      # regras do Realtime Database
storage.rules            # regras do Storage
netlify.toml             # redirecionamento SPA
```

## Como executar

```bash
yarn install
yarn start        # http://localhost:3000
yarn build        # gera build/ para produção
```

Para usar seu próprio backend, crie um projeto no [Firebase](https://console.firebase.google.com/), copie `.env.example` para `.env` e preencha as variáveis `REACT_APP_FIREBASE_*` (o `.env` é ignorado pelo Git). Na Netlify, cadastre as mesmas variáveis em *Site settings → Environment variables*.

## Observações

- A configuração web do Firebase vem do `.env`. Ela é um identificador público; a segurança vem das **regras** do banco e do Storage — mantenha-as restritivas.
- A pasta `build/` versionada contém a configuração antiga já compilada; remova-a do Git e gere um novo build a partir do `.env`.
- O login do modal de edição é validado **apenas no navegador**, então não protege o conteúdo; a proteção real deve vir do Firebase Authentication combinado com as regras do banco.
- As regras do Firestore (`firestore.rules`) estão abertas para leitura e escrita; como o projeto usa o Realtime Database, restrinja-as ou remova-as.
- A pasta `node_modules/` está versionada neste repositório; o ideal é removê-la do Git e mantê-la no `.gitignore`.
