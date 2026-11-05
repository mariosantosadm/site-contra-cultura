# Site da Contra Cultura

Site da banda Contra Cultura, feito em [Astro](https://astro.build) e publicado na [Netlify](https://www.netlify.com).

## Onde mudar o conteúdo

Quase tudo fica em `src/data/banda.ts`:

- **Lugares onde a banda tocou** (`lugares`): nome, tipo, cidade, descrição e foto. Campo vazio não aparece no site.
- **Músicas, clipes e integrantes**.
- **Contatos e redes sociais**.

Fotos ficam em `src/assets/`. Para trocar uma foto, substitua o arquivo mantendo o nome, ou importe uma nova no `banda.ts`.

## Rodar no computador

```bash
npm install
npm run dev      # abre em http://localhost:4321
npm run build    # gera a pasta dist/
```

## Publicar na Netlify

1. Na Netlify, clique em **Add new site > Import an existing project** e escolha este repositório.
2. A Netlify lê o `netlify.toml` sozinha (comando `npm run build`, pasta `dist`).
3. O formulário de pedido de show usa o Netlify Forms. Os pedidos aparecem em **Forms** no painel da Netlify, e dá para ativar aviso por e-mail em **Forms > Form notifications**.

Sem repositório, também dá para testar arrastando a pasta `dist/` em https://app.netlify.com/drop.
