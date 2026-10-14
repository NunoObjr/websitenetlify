# The Geek Awaken — site

Site/blog de **cultura geek** (jogos, animes, mangás, filmes e séries) em **React**, com posts em destaque, listagem por categoria, página de cada postagem e um **painel de edição** para criar publicações com texto formatado e imagens. O conteúdo é guardado no **Firebase** e o site é publicado na **Netlify**.

## Funcionalidades

- Página inicial com carrossel (*slideshow*), reviews recentes e posts por categoria
- Categorias: `jogos`, `animes`, `mangas`, `filmes`, `series`
- Páginas de post em destaque (`/postFront`), post (`/postView`) e categoria (`/postCatView`)
- Área autenticada para criar/editar posts com **editor de texto rico** (Draft.js) e **upload de imagens**
- Layout responsivo com Material-UI

## Conceitos técnicos

**SPA com React Router.** Rotas client-side (`BrowserRouter`); o arquivo `netlify.toml` reescreve qualquer caminho para `/index.html` para o roteamento funcionar após recarregar a página.

**Firebase como backend (BaaS).**

- *Realtime Database* guarda os posts (`posts/feed`, `posts/postsFront`)
- *Storage* guarda as imagens enviadas
- *Authentication* controla quem pode editar
- Regras do banco/storage exigem usuário autenticado (`database.rules.json`, `storage.rules`)

**Editor rico (Draft.js).** O conteúdo é editado em `EditorTexto` e persistido para ser renderizado nas páginas de leitura.

**Deploy contínuo na Netlify.** O comando de build é `CI=false react-scripts build`; as rotas são tratadas por `_redirects`/`netlify.toml`.

## Stack

React 16 · React Router 5 · Material-UI 4 · Draft.js · Firebase 7 (Realtime Database, Storage, Auth, Functions) · Netlify

## Estrutura

```
src/
  App.js                 # home: slide, reviews, categorias e modal de login/edição
  routes.js              # rotas
  firebase.js            # inicialização do Firebase
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

Para usar seu próprio backend, crie um projeto no [Firebase](https://console.firebase.google.com/) e substitua a configuração em `src/firebase.js` (de preferência lendo de variáveis `REACT_APP_*`).

## Observações

- As chaves web do Firebase são identificadores públicos; a segurança vem das **regras** do banco e do Storage — mantenha-as restritivas.
- A pasta `node_modules/` está versionada neste repositório; o ideal é removê-la do Git e mantê-la no `.gitignore`.
