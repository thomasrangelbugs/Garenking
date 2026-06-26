# Deploy na Netlify

## Opcao 1: arrastar pasta (mais rapido)
1. Acesse https://app.netlify.com/drop
2. Arraste a pasta do projeto inteira (`Garen`)
3. A Netlify publica automaticamente

## Opcao 2: via repositorio Git
1. Suba o projeto para GitHub/GitLab/Bitbucket
2. Na Netlify: **Add new site** -> **Import an existing project**
3. Selecione o repositorio
4. Confirmar configuracao:
   - Build command: (vazio)
   - Publish directory: `.`
5. Clique em **Deploy site**

## Arquivo de configuracao
- O projeto ja inclui `netlify.toml` com:
  - publish da raiz do projeto
  - redirect SPA para `index.html`
  - headers de cache e seguranca
