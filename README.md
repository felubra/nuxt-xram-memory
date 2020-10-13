# Site do xRAM-Memory

Este é o site para o projeto xRAM-Memory, um mecanismo de busca e arquivo de notícias sobre assuntos determinados assuntos da política.

## Entidades de dados

As peças de conteúdo do site podem ser divididas em:
- Entidades de conteúdo:
  - News (Notícia): uma notícia arquivada.
  - Document (Documento): um documento, que pode ser uma imagem, uma captura de notícia em pdf ou um arquivo em formato diverso
  - Page (Página estática): uma página com conteúdo em HTML arbitrário
  - Album (Álbum de fotos): um conjunto de Documentos do tipo imagem com uma página associada
- Entidades de taxonomia (classificação do conteúdo):
  - Keyword (Palavra-chave): uma simples palavra usada para descrever um conteúdo, exemplos: prisão, polícia federal, operação etc.
  - Subject (Assunto): um tópico que pode ter um texto descritivo e estar em destaque no site, por exemplo: "A prisão do presidente Temer".


## Estrutura do projeto

O site foi feito em [Nuxt.js](https://nuxtjs.org/), um framework para criação de sites em Vue.js.
A seguinte estrutura de arquivos foi adotada na pasta `src`:

```
├── assets
│   └── styles - estilos em formato dos processadores Sass e Stylus
├── components - os componentes em Vue utilizados no site
│   ├── common - componentes utilizados em vários locais
│   ├── home - componentes utilizados na página inicial
│   ├── nav - componentes de navegação
│   ├── news - componentes para exibição de informações de notícias
│   ├── search - componentes usados na página de busca
│   └── viewers - componentes para visualização de arquivos
├── config - configuração estática, com algumas constantes utilizadas por todo site
├── data-sources - serviços para busca de dados via HTTP
│   └── api - serviço para comunicação com a API em Django
├── layouts - componentes de layout, encapsulam os outros, utilizados pelas páginas
├── middleware - funções executadas a cada transição de página do site
├── pages - componentes vue que encapsulam as páginas do site
│   ├── album
│   │   └── _album_id.vue - página de um Álbum de Fotos, uma coleção de imagens
│   ├── contact.vue - página de contato
│   ├── document
│   │   └── _document_id.vue - página para um Documento individual, aberto num visualizador
│   ├── images.vue - página com os Álbuns de Fotos
│   ├── index.vue - página inicial
│   ├── news
│   │   └── _slug.vue - página individual de uma Notícia
│   ├── search.vue - página de pesquisa
│   ├── _slug.vue - página para uma Página Estática
│   ├── subject
│   │   └── _slug.vue - página de um Assunto
│   ├── subjects - página com os Assuntos e as Palavras-chave
│   └── subjects.vue - página com Assuntos e Palavras-chave
├── plugins
│   ├── contrib - componentes/bibliotecas de terceiros
│   └── custom - componentes/bibliotecas próprios/customizados
├── static - arquivos estáticos (imagens, favicons e metadados do site)
└── store - uma store Vuex
```

A pasta `test` conterá os testes automatizados, ainda não implementados nesta etapa do projeto.

## Rodando o projeto

### Localmente

Por padrão, o site espera que os seguintes serviços estejam rodando nos endereços abaixo:

- Backend em Django (API): `http://localhost:8000`
- Serviço relay de mensagens de contato: `http://localhost:3001`

O arquivo `.env.dist` é um template para um arquivo `.env` que deverá ser copiado para a pasta `./src`. Este arquivo permite configurar o endereço dos serviços acima tanto em *client-side* ou *server-side*, além de outras configurações - o arquivo está documentado e possui valores padrão.

O arquivo `.env` não é necessário para iniciar o site a menos que você queira alterar os valores padrão.

Uma vez configurado, o site pode ser iniciado em desenvolvimento com os comandos abaixo. O site rodará por padrão em `http://localhost:3000`

```bash
yarn dev
```
ou
```bash
npm run dev
```

Às vezes é interessante iniciar o site em modo SPA (*server side rendering* desabilitado) para ter uma visibilidade melhor dos erros, além de depurar código no navegador com mais facilidade. Para isso, rode:

```bash
yarn dev:spa
```
ou
```bash
npm run dev:spa
```

### Via Docker