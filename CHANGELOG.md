Changelog
=========


(não publicado)
---------------

Corrigido
~~~~~~~~~
- Correção na geração do changelog. [Felipe Lube de Bragança]

Outros
~~~~~~
- Documentação de .env.dist. [Felipe Lube de Bragança]
- Reorganização de arquivos e remoção de não usados. [Felipe Lube de
  Bragança]


0.6.1 (2020-10-12)
------------------

Corrigido
~~~~~~~~~
- Só mostre a porcentagem se o número for finito. [Felipe Lube de
  Bragança]


0.6.0 (2020-10-12)
------------------

Adicionado
~~~~~~~~~~
- Pesquisa local com ElasticLunr (#109) [Felipe Lube de Bragança]

  BREAKING CHANGE

  close #95
  * feat: LocalSearchBase: estado e funções para alterar a busca e os filtros

  * feat: LocalSearchDropDown e LocalSearchInput: manipulação básica de estado

  * chore: página de testes para novos componentes

  * feat: funcionalidade para carregamento do índice

  * feat: suporte à filtragem básica

  * feat: fluxo de registro de um componente-filtro junto ao componente-base

  * feat: filtragem de resultados sem reatividade com outros filtros
  - valores dos filtros apenas reagem à busca textual
  - filtragem usando d3-array.groups()
  - passagem de estado para componente filho
  - uso de v-model em LoalSearchInput
  - adicionado campo de assuntos na página de teste

  * feat: suporte a notação de ponto para definir campos-filho

  * refat: ajustes em NewsGrid para o novo formato

  * feat: disponibilize os resultados de busca como um scpedSlot

  * feat: adicione mais filtros e uma lista com os resultados

  * feat: exiba todos os resultados se o usuário não pesquisou por nada

  * feat: remova uma seleção para uma opção que já não existe mais

  * feat: filtros respeitam escolha de outros filtros

  * chore: temporariamente importe todos os componentes de element-ui

  * feat: utilize componentes element-ui: LocalSearchDropDown
  - susbtitua select padrão por el-select
  - suporte a múltiplos valores
  - exibição de tags compacta

  * feat: habilidade de filtrar valores em LocalSearchDropDown

  * feat: prop para placeholder em LocalSearchInput

  * feat: contagem de resultados

  * refat: simplificação da arquitetura com acesso direto aos dados
  - 2-way data binding com searchState e filterState
  - computed prop para filtros de fato com alguma seleção

  * feat: função para limpar o estado da busca e dos filtros

  * refat: transforme filterDataSources numa computed prop

  * chore: documentação básica

  * feat: utilize query-string para processar query strings

  * feat: LocalSearchBase: suporte à definição inicial do estado

  * feat: defina o estado inicial dos filtros de busca pela url

  * refat: substitua função renderizadora por template

  * feat: computed props helpers de estado

  * feat: estrutura básica do controle de estado dos componentes

  * chore: atualizações em nuxt e em @nuxt/axios

  * chore: remova setTimeout usado para testes

  * chore: atualize nuxt e @nuxt/axios

  * fix: corrija a largura dos containers, que devem ocupar 100%

  * feat: adicione o contador de resultados

  * feat: ajustes no contador de resultados
  - computed prop para o texto principal
  - remoção de componentes e estilos não mais usados

  * style: posicionamento básico dos componentes de pesquisa

  * fix: Filtre itens vazios em filterDataSources

  * fix: centralize itens na lista

  * feat: remova botão limpar

  * chore: atualização do element-ui

  * fix: remova placeholder hardcoded

  * feat: defina a linguagem do element-ui

  * Revert "fix: Filtre itens vazios em filterDataSources"

  This reverts commit 47894bf.

  * feat: labels e ordenação correta dos filtros

  * chore: substitua a página de busca pela nova desenvolvida

  * feat: suporte à definição do estado de busca

  * feat: preencha a busca textual com base nos parâmetros da url

  * feat: fonte de dados alterada para nuvem de tags da página inicial
  - as informações serão buscadas do backend em Django ao invés do ES

  * fix: link na nuvem de tags deve usar o texto da palavra
  - situação até que #102 seja implementada

  * feat: readicione o componente de pesquisa na página inicial

  * chore: início da utilização de webworkers

  * feat: carregamento do índice e retorno de resultados filtrados da base

  * chore: tentativa de otimização com Object.freeze

  * feat: componente para encapsular os filtros

  * feat: ajustes no layout dos filtros

  * chore: alteração no nome do arquivo de índice

  * feat: suporte à pesquisa com e sem acentos

  * feat: página do assunto deve pegar itens do backend em Django

  * chore: remoção do reactive-base
  - remoção do plugin
  - remoção dos componentes
  - não utilização dos componentes

  * fix: passe booleano corretamente para prop

  * refat: dados são repassados ao HomeTagCloud via props
  - o componente não fará a busca pelos dados

  * chore: correção em grafia de mensagem

  * refat: carregamento dos dados para a nuvem de tags pelas páginas

  * feat: mensagem de erro para páginas vazias padronizada

  * feat: enxugamento dos componentes carregados do element-ui

  * feat: estilização dos componentes tal como antes com o ReactiveSearch

  * feat: LocalSearchInput - passe slots do pai para o filho

  * fix: use o ícone de pesquisa do material-design

  * fix: não mostre o link para exibir filtros em desktop

  * feat: permita alterar o label dos options em LocalSearchDropDown
  - utilização de uma função customizada passada via props

  * fix: adicione a diretiva Loading

  * fix: inclua Notification

  * feat: pesquisa feita com webworker (#103)

  * feat: mova o trabalho pesado para a webworker [wip]
  - Pesquisa textual funcionando
  - FIltros desabilitados

  * feat: mova o trabalho pesado para a webworker [wip]
  - Retorno dos filtros
  - Webworker também manterá estado dos componentes filhos

  * feat: otimizações para reduzir uso de memória

  * fix: remova filtragem no dropdown para evitar carregamento do teclado em mobile

  * feat: rolagem infinita na lista de notícias

  * chore: atualização para o nuxt 2.14.3

  * fix: ajustes no layout da página de pesquisa

  * refat: otimização nos imports e configuração do lunr na hook created

  * feat: parametrize a url do índice numa variável ambiente

  * feat: cronômetro para as pesquisas

  * fix: ajuste no estilo das tags dos selects

  * fix: correção no cálculo do desvio padrão com utilização de d3-array

  * fix: filtros reagem apenas ao campo texto completo e não aos próprios

  * feat: NewsGrid: slot para quando sem dados

  * refat: simplifique indexState com constantes numéricas

  * chore: atualização da configuração do eslint

  * feat: progresso de download do índice

  * fix: eslint e correção na lista infinita de notícias

  * fix: crite a web worker antes em beforeCreate

  * refat: permita passar o índice já baixado para o componente

  * feat: suporte à ordenação dos resultados (#104)

  * feat: suporte à ordenação [wip]
  - ordene as notícias por data de publicação por padrão

  * chore: atualização do nuxt para 2.14.4

  * feat: ordenação dos resultados

  * fix: instale a diretiva infinite-scroll globalmente para corrigir SSR

  * fix: correção no carregamento das configurações do ElasticLunr

  * fix: adicione o git, necessário para pegar alguns repositórios

  * fix: não registre plugins vue dentro de funções exportadas

  * fix: inclua worker-plugin dentro de dependencies

  * chore: remoção de console.log

  * chore: renomeie variável

  * refat: migração de @/utils para um plugin com suporte a runtimeConfig

  * chore: remoção de console.log

  * chore: renomeie variável

  * refat: migração do uso de variáveis ambiente para runtimeConfig [wip]

  * refat: migração de @/utils para um plugin com suporte a rutimeConfig

  * fix: correção em apiURL (runtimeConfig)

  * chore: adicione variáveis opcionais do navegador

  * refat: use variáveis para dar override em SSR ao invés do cliente

  * chore: atualização em .env.dist

  * fix: refatoração na página de busca para resolver problemas

  close #105

  -  indique com mais clareza (problemas no layout) o seu carregamento
  - acerte a mensagem de sem resultados com botão para reiniciar a busca
  - organize os componentes no código do template

  * chore: Limpeza no código e utilização do Repository Pattern
  - use a syntaxe do syulus para os estilos
  - Encapsule métodos de chamada à API em objetos (Repository Pattern)
  - atualização (das configurações) do

      - refatorações simples
      - renomeações de variável
      - remoção de códigi não usado
      - pequenas adições de documentação
      - aderência às regras atualizadas do eslint-plugin-vue
      - remoção de props não usadas
      - remoção de arquivos README
      - remoção de estado não usado na store
  - utilize versão no rodapé definida nas configurações
- Pesquisa local com ElasticLunr (#109) [Felipe Lube de Bragança]

  BREAKING CHANGE

  close #95
  * feat: LocalSearchBase: estado e funções para alterar a busca e os filtros

  * feat: LocalSearchDropDown e LocalSearchInput: manipulação básica de estado

  * chore: página de testes para novos componentes

  * feat: funcionalidade para carregamento do índice

  * feat: suporte à filtragem básica

  * feat: fluxo de registro de um componente-filtro junto ao componente-base

  * feat: filtragem de resultados sem reatividade com outros filtros
  - valores dos filtros apenas reagem à busca textual
  - filtragem usando d3-array.groups()
  - passagem de estado para componente filho
  - uso de v-model em LoalSearchInput
  - adicionado campo de assuntos na página de teste

  * feat: suporte a notação de ponto para definir campos-filho

  * refat: ajustes em NewsGrid para o novo formato

  * feat: disponibilize os resultados de busca como um scpedSlot

  * feat: adicione mais filtros e uma lista com os resultados

  * feat: exiba todos os resultados se o usuário não pesquisou por nada

  * feat: remova uma seleção para uma opção que já não existe mais

  * feat: filtros respeitam escolha de outros filtros

  * chore: temporariamente importe todos os componentes de element-ui

  * feat: utilize componentes element-ui: LocalSearchDropDown
  - susbtitua select padrão por el-select
  - suporte a múltiplos valores
  - exibição de tags compacta

  * feat: habilidade de filtrar valores em LocalSearchDropDown

  * feat: prop para placeholder em LocalSearchInput

  * feat: contagem de resultados

  * refat: simplificação da arquitetura com acesso direto aos dados
  - 2-way data binding com searchState e filterState
  - computed prop para filtros de fato com alguma seleção

  * feat: função para limpar o estado da busca e dos filtros

  * refat: transforme filterDataSources numa computed prop

  * chore: documentação básica

  * feat: utilize query-string para processar query strings

  * feat: LocalSearchBase: suporte à definição inicial do estado

  * feat: defina o estado inicial dos filtros de busca pela url

  * refat: substitua função renderizadora por template

  * feat: computed props helpers de estado

  * feat: estrutura básica do controle de estado dos componentes

  * chore: atualizações em nuxt e em @nuxt/axios

  * chore: remova setTimeout usado para testes

  * chore: atualize nuxt e @nuxt/axios

  * fix: corrija a largura dos containers, que devem ocupar 100%

  * feat: adicione o contador de resultados

  * feat: ajustes no contador de resultados
  - computed prop para o texto principal
  - remoção de componentes e estilos não mais usados

  * style: posicionamento básico dos componentes de pesquisa

  * fix: Filtre itens vazios em filterDataSources

  * fix: centralize itens na lista

  * feat: remova botão limpar

  * chore: atualização do element-ui

  * fix: remova placeholder hardcoded

  * feat: defina a linguagem do element-ui

  * Revert "fix: Filtre itens vazios em filterDataSources"

  This reverts commit 47894bfc9d625705364f2a2d1a0687a3627380aa.

  * feat: labels e ordenação correta dos filtros

  * chore: substitua a página de busca pela nova desenvolvida

  * feat: suporte à definição do estado de busca

  * feat: preencha a busca textual com base nos parâmetros da url

  * feat: fonte de dados alterada para nuvem de tags da página inicial
  - as informações serão buscadas do backend em Django ao invés do ES

  * fix: link na nuvem de tags deve usar o texto da palavra
  - situação até que #102 seja implementada

  * feat: readicione o componente de pesquisa na página inicial

  * chore: início da utilização de webworkers

  * feat: carregamento do índice e retorno de resultados filtrados da base

  * chore: tentativa de otimização com Object.freeze

  * feat: componente para encapsular os filtros

  * feat: ajustes no layout dos filtros

  * chore: alteração no nome do arquivo de índice

  * feat: suporte à pesquisa com e sem acentos

  * feat: página do assunto deve pegar itens do backend em Django

  * chore: remoção do reactive-base
  - remoção do plugin
  - remoção dos componentes
  - não utilização dos componentes

  * fix: passe booleano corretamente para prop

  * refat: dados são repassados ao HomeTagCloud via props
  - o componente não fará a busca pelos dados

  * chore: correção em grafia de mensagem

  * refat: carregamento dos dados para a nuvem de tags pelas páginas

  * feat: mensagem de erro para páginas vazias padronizada

  * feat: enxugamento dos componentes carregados do element-ui

  * feat: estilização dos componentes tal como antes com o ReactiveSearch

  * feat: LocalSearchInput - passe slots do pai para o filho

  * fix: use o ícone de pesquisa do material-design

  * fix: não mostre o link para exibir filtros em desktop

  * feat: permita alterar o label dos options em LocalSearchDropDown
  - utilização de uma função customizada passada via props

  * fix: adicione a diretiva Loading

  * fix: inclua Notification

  * feat: pesquisa feita com webworker (#103)

  * feat: mova o trabalho pesado para a webworker [wip]
  - Pesquisa textual funcionando
  - FIltros desabilitados

  * feat: mova o trabalho pesado para a webworker [wip]
  - Retorno dos filtros
  - Webworker também manterá estado dos componentes filhos

  * feat: otimizações para reduzir uso de memória

  * fix: remova filtragem no dropdown para evitar carregamento do teclado em mobile

  * feat: rolagem infinita na lista de notícias

  * chore: atualização para o nuxt 2.14.3

  * fix: ajustes no layout da página de pesquisa

  * refat: otimização nos imports e configuração do lunr na hook created

  * feat: parametrize a url do índice numa variável ambiente

  * feat: cronômetro para as pesquisas

  * fix: ajuste no estilo das tags dos selects

  * fix: correção no cálculo do desvio padrão com utilização de d3-array

  * fix: filtros reagem apenas ao campo texto completo e não aos próprios

  * feat: NewsGrid: slot para quando sem dados

  * refat: simplifique indexState com constantes numéricas

  * chore: atualização da configuração do eslint

  * feat: progresso de download do índice

  * fix: eslint e correção na lista infinita de notícias

  * fix: crite a web worker antes em beforeCreate

  * refat: permita passar o índice já baixado para o componente

  * feat: suporte à ordenação dos resultados (#104)

  * feat: suporte à ordenação [wip]
  - ordene as notícias por data de publicação por padrão

  * chore: atualização do nuxt para 2.14.4

  * feat: ordenação dos resultados

  * fix: instale a diretiva infinite-scroll globalmente para corrigir SSR

  * fix: correção no carregamento das configurações do ElasticLunr

  * fix: adicione o git, necessário para pegar alguns repositórios

  * fix: não registre plugins vue dentro de funções exportadas

  * fix: inclua worker-plugin dentro de dependencies

  * chore: remoção de console.log

  * chore: renomeie variável

  * refat: migração de @/utils para um plugin com suporte a runtimeConfig

  * chore: remoção de console.log

  * chore: renomeie variável

  * refat: migração do uso de variáveis ambiente para runtimeConfig [wip]

  * refat: migração de @/utils para um plugin com suporte a rutimeConfig

  * fix: correção em apiURL (runtimeConfig)

  * chore: adicione variáveis opcionais do navegador

  * refat: use variáveis para dar override em SSR ao invés do cliente

  * chore: atualização em .env.dist

  * fix: refatoração na página de busca para resolver problemas

  close #105

  -  indique com mais clareza (problemas no layout) o seu carregamento
  - acerte a mensagem de sem resultados com botão para reiniciar a busca
  - organize os componentes no código do template

  * chore: Limpeza no código e utilização do Repository Pattern
  - use a syntaxe do syulus para os estilos
  - Encapsule métodos de chamada à API em objetos (Repository Pattern)
  - atualização (das configurações) do

      - refatorações simples
      - renomeações de variável
      - remoção de códigi não usado
      - pequenas adições de documentação
      - aderência às regras atualizadas do eslint-plugin-vue
      - remoção de props não usadas
      - remoção de arquivos README
      - remoção de estado não usado na store
  - utilize versão no rodapé definida nas configurações
- Use o runtimeConfig do Nuxt 2.13+ [Felipe Lube de Bragança]

  * chore(docker): use a variante lts-alpine

  * chore(docker): ignore a cópia de arquivos do docker para a imagem

  * feat(docker): mais um estágio para uma imagem de desenvolvimento

  * chore: atualização de @nuxtjs/axios para suportar runtimeConfig

  * feat: utilize parcialmente a nova runtimeConfig
  - permita substituir o baseURL nos browsers quando em cliente
  - utilize sempre API_URL quando em SSR
- Multi stage build (#99) [Felipe Lube de Bragança]

  * chore(docker): use a variante lts-alpine

  * chore(docker): ignore a cópia de arquivos do docker para a imagem

  * feat(docker): mais um estágio para uma imagem de desenvolvimento

Corrigido
~~~~~~~~~
- Atualização dos endpoints rest (#110) [Felipe Lube de Bragança]

  * fix: não renderize componentes interativos em SSR

  * fix: correção nos endpoints de Página

  * fix: atualização dos endpoints de taxonomia
- Não renderize componentes interativos em SSR. [Felipe Lube de
  Bragança]
- Centralize a mensagem de sem resultados; estilo do botão primário.
  [Felipe Lube de Bragança]
- Utilize o mesmo estilo de botão no formulário de contato. [Felipe Lube
  de Bragança]
- Correção de tipo de initialSubjects. [Felipe Lube de Bragança]

Outros
~~~~~~
- Atualização para a versão 0.6.0. [Felipe Lube de Bragança]
- Desabilite telemetria. [Felipe Lube de Bragança]
- Desabilite telemetria. [Felipe Lube de Bragança]
- Ignore mais pastas no dockerignore. [Felipe Lube de Bragança]
- Chore: mova "@nuxtjs/vuetify" de devDependencies. [Felipe Lube de
  Bragança]
- Chore: atualização do nuxt e do @nuxt/axios. [Felipe Lube de Bragança]

Não categorizado
~~~~~~~~~~~~~~~~
- Merge branch 'dev' of github.com:felubra/nuxt-xram-memory into dev.
  [Felipe Lube de Bragança]
- Revert "feat: pesquisa local com ElasticLunr (#109)" [Felipe Lube de
  Bragança]

  This reverts commit b6a2da956a6130fa5dd494bd61a2bca9306badaa.
- Merge branch 'dev' of github.com:felubra/nuxt-xram-memory into dev.
  [Felipe Lube de Bragança]
- Merge branch 'dev' of github.com:felubra/nuxt-xram-memory into dev.
  [Felipe Lube de Bragança]


0.5.6 (2020-05-28)
------------------

Adicionado
~~~~~~~~~~
- Remova o título da página do documento; bump version. [Felipe]


0.5.5 (2020-05-27)
------------------

Outros
~~~~~~
- Chore(deps): atualização de pacotes. [Felipe]

Não categorizado
~~~~~~~~~~~~~~~~
- Refat: remoção de palavras-chave dos detalhes da notícia; bump
  version. [Felipe]


0.5.4 (2020-03-30)
------------------

Corrigido
~~~~~~~~~
- Evite imagens 'esticadas' em Card. [Felipe]


0.5.3 (2020-03-30)
------------------

Adicionado
~~~~~~~~~~
- HomeTagCloud: não faça cálculos se não houver agregações. [Felipe]

Corrigido
~~~~~~~~~
- Correção em palavra. [Felipe]

Outros
~~~~~~
- Aumente a versão. [Felipe]


0.5.2 (2020-01-13)
------------------

Corrigido
~~~~~~~~~
- Correção no texto by e nos links em footer. [Felipe Lube de Bragança]
- Fix (close #74): só mostre a imagem quando ela tiver sido carregada
  pelo visualizador. [Felipe Lube de Bragança]

Outros
~~~~~~
- Versão 0.5.2. [Felipe Lube de Bragança]


0.5.1 (2020-01-13)
------------------

Adicionado
~~~~~~~~~~
- "(capa)" como failback para descrição de documento com uma página.
  [Felipe]

Corrigido
~~~~~~~~~
- Fix (close #72): correção nos links de download do documento. [Felipe]
- Mantenha o aspecto da imagem da visualização da captura. [Felipe]
- Use a fonte sem serifa padrão. [Felipe]
- Atributo autocomplete correto. [Felipe]

Não categorizado
~~~~~~~~~~~~~~~~
- Merge tag '0.5.0' into dev. [Felipe]

  Versão 0.5.0


0.5.0 (2020-01-12)
------------------

Corrigido
~~~~~~~~~
- Readicione a fonte Vollkorn e remova a Cabin. [Felipe]

Outros
~~~~~~
- Versão 0.5.0. [Felipe]


0.4.9 (2020-01-10)
------------------

Adicionado
~~~~~~~~~~
- Microtext - permita definir posição da seta, esquerda ou direita.
  [Felipe Lube de Bragança]
- Desabilite autocompletar nos campos (nos navegadores que respeitam)
  [Felipe Lube de Bragança]
- Use a nova página de contato. [Felipe Lube de Bragança]
- #57 a imagem na página da notícia deve carregar suavemente. [Felipe
  Lube de Bragança]
- #57 imagens na lista de resultados devem ter altura pré definida -
  imagem em que houver erro na requisição será removida. [Felipe Lube de
  Bragança]
- Répica da página de contato com o vuetify. [Felipe Lube de Bragança]
- Feat (vuetify): use v-btn em _document_id. [Felipe Lube de Bragança]
- Feat (vuetify): substitua el-button em BackButton. [Felipe Lube de
  Bragança]
- Feat (vuetify): substitua el-image em NewsInfo. [Felipe Lube de
  Bragança]
- Adicione Vuetify. [Felipe Lube de Bragança]
- Ordene pela data de publicação. [Felipe Lube de Bragança]

Corrigido
~~~~~~~~~
- Utilize a fonte definida na variável da folha de estilos. [Felipe Lube
  de Bragança]
- Adequação dos elementos de formulário ao estilo do site - remova a
  animação da borda quando em foco - remova a animação do label quando
  em foco - defina o tamho e o corpotamento do label quando em foco.
  [Felipe Lube de Bragança]
- Texto em maíscula nos lábels do formulário de contato. [Felipe Lube de
  Bragança]
- Dê espaçamento entre os inputs do formulário. [Felipe Lube de
  Bragança]
- Padronize os labels com a fonte usada. [Felipe Lube de Bragança]
- #57 cores constantes na barra de menus - remoção da cor da borda do
  link. [Felipe Lube de Bragança]
- Force a cor de fundo do botão de submit. [Felipe Lube de Bragança]
- #57 fixe no código as dimensões da imagen do logo para evitar 'pulos'
  [Felipe Lube de Bragança]
- #57 remova 'pulo' na barra de navegação, que estava duplicadaa.
  [Felipe Lube de Bragança]
- Correções na imagem de captura - mostre o estado carregando...
  inicialmente - não ultrapasse a borda do link. [Felipe Lube de
  Bragança]
- (SubjectPicker) correção nos scroll dos links. [Felipe Lube de
  Bragança]
- Fix (SubjectPicker):  id do link da inicial. [Felipe Lube de Bragança]
- Só renderize o spacer se for necessário. [Felipe Lube de Bragança]
- O BackButtom deve ser gerado com um router-link. [Felipe Lube de
  Bragança]
- Fix (SubjectPicker):  id do link da inicial. [Felipe Lube de Bragança]
- Só renderize o spacer se for necessário. [Felipe Lube de Bragança]
- #61 corrija a fonte no select de ordenação. [Felipe Lube de Bragança]
- #61 corrija a exibição do select do filtro. [Felipe Lube de Bragança]

Outros
~~~~~~
- Atualize a versão. [Felipe Lube de Bragança]
- Atualização de pacotes. [Felipe Lube de Bragança]
- Atualize o vuetify para 1.9.1. [Felipe Lube de Bragança]
- Atualize o ano no rodapé. [Felipe Lube de Bragança]
- Merge branch 'issue-57' into dev. [Felipe Lube de Bragança]
- Remoção de componentes não mais usados do element-ui. [Felipe Lube de
  Bragança]
- Adicione vuelidate. [Felipe Lube de Bragança]

Não categorizado
~~~~~~~~~~~~~~~~
- Style (close #68): ordenação dos filtros, resultados de pesquisa e
  seletor na página de pesquisa. [Felipe Lube de Bragança]
- Style: barra de pesquisa - cor do placholder quando usado com filtro.
  [Felipe Lube de Bragança]
- Style: ajustes estéticos diversos - tamanho da fonte do filtro
  selecionado - tamanho da fonta na barra de pesquisa - cor do ícone do
  drop-down - reduza o tamanho do botão voltar. [Felipe Lube de
  Bragança]
- Style: #57 barra de pesquisa com aparência idêntica ao dos filtros na
  página de pesquisa. [Felipe Lube de Bragança]
- Style: #57 estilize a barra de pesquisa em foco. [Felipe Lube de
  Bragança]
- Style: animação dos filtros. [Felipe Lube de Bragança]
- Merge branch 'issue-57' of https://github.com/felubra/nuxt-xram-memory
  into issue-57. [Felipe Lube de Bragança]
- Merge branch 'issue-57' of https://github.com/felubra/nuxt-xram-memory
  into issue-57. [Felipe Lube de Bragança]
- Merge branch 'issue-61' into dev. [Felipe Lube de Bragança]
- Merge branch 'dev' into issue-61. [Felipe Lube de Bragança]


0.4.8 (2020-01-03)
------------------

Adicionado
~~~~~~~~~~
- Ligue a imagem na página da notícia ao documento correspondente *
  closes #37. [Felipe Lube de Bragança]
- Ordenação das notícias na lista de resultados (#66) [Felipe Lübe de
  Bragança]

  * feat: ordene pela data de publicação

  * fix: #61 corrija a exibição do select do filtro

  * fix: #61 corrija a fonte no select de ordenação
- Não mostre a notificação de cookies para robôs de busca. [Felipe Lube
  de Bragança]
- #60 use um adaptador de cache para o axios. [Felipe Lube de Bragança]
- DocumentViewer: entre em tela inteira no modo paisagem. [Felipe Lube
  de Bragança]
- Barra de progresso até que paginas de um documento sejam geradas.
  [Felipe Lube de Bragança]
- [wip] componente para visualizar documentos. [Felipe Lube de Bragança]
- #57 Menu: itens, logotipo e layout do menu carregam suavemente.
  [Felipe Lube de Bragança]
- #57 diversas melhorias na interface. [Felipe Lube de Bragança]
- Adicione informações de desenvolvimento ao rodapé - versão -
  desenvolvedor - ajuste a separação entre os itens. [Felipe Lube de
  Bragança]
- Links para iniciais na página de assuntos. [Felipe Lube de Bragança]
- Feat (HomeTagCloud): permita definir tamanho base para fonte. [Felipe
  Lube de Bragança]
- Feat (ui): espaçamento e melhor separador para label. [Felipe Lube de
  Bragança]
- Ajuste o microtexto para 12px. [Felipe Lube de Bragança]
- Altere a fonte sans-serif para Roboto. [Felipe Lube de Bragança]

Corrigido
~~~~~~~~~
- Centralize o texto e a imagem da página da notícia no cabeçalho.
  [Felipe Lube de Bragança]
- Resultados - centralize o ordenador em caso de não resultados. [Felipe
  Lube de Bragança]
- Importe viewerjs como componente. [Felipe Lube de Bragança]
- Failback para caso a api de páginas não esteja disponível. [Felipe
  Lube de Bragança]
- Defina um id válido para uma elemento g em D3TagCloud. [Felipe Lube de
  Bragança]
- Correções na página de erro - alinhe os elementos para o começo do
  container - defina a palavra failback como '500' ao invés de erro.
  [Felipe Lube de Bragança]
- Não use a imagem no tamanho original no visualizador. [Felipe Lube de
  Bragança]
- Destrua o componente viewerjs antes de destruir DocumentViewer.
  [Felipe Lube de Bragança]
- Remoção de transição inútil. [Felipe Lube de Bragança]
- Tipo correto para a prop size-delta. [Felipe Lube de Bragança]
- Adicione/corrija títulos em páginas. [Felipe Lube de Bragança]
- Fix (SubjectPicker): não faça requisições à toa. [Felipe Lube de
  Bragança]
- Desabilite a barra de progresso para cada req. do axios. [Felipe Lube
  de Bragança]
- Defina a cor dos links com classe nuxt-link. [Felipe Lube de Bragança]
- Melhorias na legibilidade do texto de descrição. [Felipe Lube de
  Bragança]
- Remova um label inútil. [Felipe Lube de Bragança]
- Fix (getMediaUrl): não retorne nada se não for informado um path.
  [Felipe Lube de Bragança]
- Fix (notícia): melhorias na página quando sem imagem. [Felipe Lube de
  Bragança]
- #57 transição suave de cores. [Felipe Lube de Bragança]
- #57 mensagem/botão de recomeçar deve estar em fonte sans-serif.
  [Felipe Lube de Bragança]
- #57 correção do estado hover do filtro. [Felipe Lube de Bragança]
- Remoção de estlo escondido de elementos. [Felipe Lube de Bragança]
- Remoção de transição inútil. [Felipe Lube de Bragança]
- Só renderize o spacer se for necessário. [Felipe Lube de Bragança]
- Fix (Contact): correção no tamanho da mensagem de erro. [Felipe Lube
  de Bragança]
- Contadores zerados. [Felipe Lube de Bragança]

Outros
~~~~~~
- Linting. [Felipe]
- Remoção de bibliotecas não usadas com deprecação do componente pdf.
  [Felipe Lube de Bragança]
- Remova componentes não mais usados. [Felipe Lube de Bragança]
- Atualização do element-ui. [Felipe Lube de Bragança]
- Atualização e ajustes para o appbaseio/reactivesearch-vue 1.0.0-rc.1.
  [Felipe Lube de Bragança]

Não categorizado
~~~~~~~~~~~~~~~~
- Merge pull request #64 from felubra/issue-60. [Felipe Lübe de
  Bragança]

  feat: close #60 use um adaptador de cache para o axios
- Merge pull request #62 from felubra/issue-58. [Felipe Lübe de
  Bragança]

  feat: visualização das páginas de um PDF como imagens
- Refat: renomeie computed props para nome mais significativos. [Felipe
  Lube de Bragança]
- Refat: simplificação da página do Álbum - uso do componente
  DocumentViewer - dropado suporte a diversos tamanhos de imagem de
  acordo com resolução da tela. [Felipe Lube de Bragança]
- Refat: simplifique o contrato de DocumentViewer - DocumentViewer
  recebe um array de imagens já carregadas - A página do documento fica
  encarregada de buscar as páginas. [Felipe Lube de Bragança]
- Style: remoção de espaço denecessário. [Felipe Lube de Bragança]
- Revert "chore: atualização do element-ui" [Felipe Lube de Bragança]

  This reverts commit c51ae83e1376630376f179d409a15a4f9a40b366.
- Style: diminua a nuvem de tags na página de assuntos. [Felipe Lube de
  Bragança]
- Refat: ajuste na cor do microtexto e renomeação e variável. [Felipe
  Lube de Bragança]
- Refat (Subject): reutilize o componente ResultStats. [Felipe Lube de
  Bragança]
- Refat: use a nova sintaxe para scoped-slots. [Felipe Lube de Bragança]


0.4.7 (2019-10-29)
------------------

Corrigido
~~~~~~~~~
- Suporte para vue-dragscroll ssr. [Felipe Lube de Bragança]

Não categorizado
~~~~~~~~~~~~~~~~
- Revert "drag-scroll" [Felipe Lube de Bragança]

  This reverts commit dbe4d045868a2a3439fc13b8b5693bd4ffd54e55.
- Drag-scroll. [Felipe Lube de Bragança]


0.4.6 (2019-10-29)
------------------

Corrigido
~~~~~~~~~
- Defina uma data de expiração para o cookie GDPR (closes #56) [Felipe
  Lube de Bragança]


0.4.5 (2019-09-05)
------------------

Corrigido
~~~~~~~~~
- Use <client-only> ao invés de <no-ssr>, que será deprecado. [Felipe
  Lube de Bragança]
- NewsInfo: não exiba campos que não tem informações. [Felipe Lube de
  Bragança]
- Correção na cor do fundo do visualizador de documentos. [Felipe Lube
  de Bragança]

Outros
~~~~~~
- Atualização de pacotes. [Felipe Lube de Bragança]


0.4.4 (2019-08-18)
------------------

Corrigido
~~~~~~~~~
- Remova laço duplo com duas imagens para cada captura em NewsInfo.
  [Felipe Lube de Bragança]
- Correção no link do jornal. [Felipe Lube de Bragança]


0.4.3 (2019-08-18)
------------------

Adicionado
~~~~~~~~~~
- Coloque um label no botão para baixar documento (fixes #55) [Felipe
  Lube de Bragança]

Corrigido
~~~~~~~~~
- Importe corretamente as variáveis do tema customizado do element-ui.
  [Felipe Lube de Bragança]


0.4.2 (2019-07-30)
------------------

Adicionado
~~~~~~~~~~
- Atualização do favicon. [Felipe Lube de Bragança]

Corrigido
~~~~~~~~~
- Não provoque um erro se houver falha ao buscar páginas publicadas na
  página inicial. [Felipe Lube de Bragança]
- Esconda corretamente o SubjectPicker se não houver dados. [Felipe Lube
  de Bragança]
- Não permita que o middleware interrompa o site em caso de erro.
  [Felipe Lube de Bragança]
- ThumbnailForDocument deve retornar uma string vazia em caso de erro.
  [Felipe Lube de Bragança]
- Correção no indicador de navegação nos controles. [Felipe Lube de
  Bragança]

Outros
~~~~~~
- Otimize carregamento do v-viewer somente nas páginas necessárias.
  [Felipe Lube de Bragança]
- Carregue apenas o que for usado do element-ui. [Felipe Lube de
  Bragança]
- Carregue o vue-recaptcha sobre demanda. [Felipe Lube de Bragança]
- Otimize o carregamento do ReactiveSearch importando apenas os
  componentes necessários. [Felipe Lube de Bragança]
- Image-webpack-loader para otimizar imagens. [Felipe Lube de Bragança]
- Redução do tamanho dos arquivos do logo. [Felipe Lube de BraganÃa]

Não categorizado
~~~~~~~~~~~~~~~~
- Refat: padronização das funções asyncData. [Felipe Lube de Bragança]
- Merge branch 'dev' of https://github.com/felubra/nuxt-xram-memory into
  dev. [Felipe Lube de Bragança]


0.4.1 (2019-07-27)
------------------

Adicionado
~~~~~~~~~~
- SubjectPicker: permita selcionar inicial inicial. [Felipe Lube de
  Bragança]

Corrigido
~~~~~~~~~
- Mensgam de erro em português para nenhum item encontrado. [Felipe Lube
  de Bragança]
- Selecione uma inicial inicial na página de assuntos. [Felipe Lube de
  Bragança]
- Não monitore initials imediatamente para evitar subjectsForInitial
  vazio. [Felipe Lube de Bragança]

Outros
~~~~~~
- Atualize a versao para 0.4.0. [Felipe Lube de Bragança]


0.4.0 (2019-07-27)
------------------

Adicionado
~~~~~~~~~~
- Nomeie todas as páginas. [Felipe Lube de Bragança]
- Já carregue os assuntos iniciais para o picker. [Felipe Lube de
  Bragança]
- Exiba uma mensagem de sobre uso de cookies. [Felipe Lube de Bragança]
- Defina a cor principal do element-ui para o estilo do site. [Felipe
  Lube de Bragança]
- Correções nas classes das páginas, botão voltar. [Felipe Lube de
  Bragança]
- Pequeno componente para botão voltar. [Felipe Lube de Bragança]
- Entre no modo tela inteira em paisagem na página do álbum. [Felipe
  Lube de Bragança]
- Permita recomeçar se a pesquisa não der resultados. [Felipe Lube de
  Bragança]
- Adicione license-checker para pegar info sobre as licenças usadas.
  [Felipe Lube de Bragança]
- Permita esconder/exibir os fltros em mobile para melhor uso do espaço.
  [Felipe Lube de Bragança]
- Permita definir classes adicionais para o componente microtexto.
  [Felipe Lube de Bragança]
- Separação dos controles de navgeação em componente à parte. [Felipe
  Lube de Bragança]
- Definição de variável para tamaho desktop. [Felipe Lube de Bragança]
- Faça uma pesquisa fuzzi. [Felipe Lube de Bragança]
- Microtextos, títulos de seção, devem ser negritados. [Felipe Lube de
  Bragança]
- (wip) componente à parte para lista de todos os assuntos. [Felipe Lube
  de Bragança]
- (wip) página de 'todos os assuntos' [Felipe Lube de Bragança]
- (wip): página de todos os assuntos. [Felipe Lube de Bragança]
- Defina o nome do novo layout. [Felipe Lube de Bragança]
- Use o mais semântico section como elemento pai das páginas. [Felipe
  Lube de Bragança]
- Acerto nos espaçamentos internos. [Felipe Lube de Bragança]
- Somente mostre a página inicial depois de carregar um bloco de página
  em destaque. [Felipe Lube de Bragança]
- Separação da página de busca e da página inicial. [Felipe Lube de
  Bragança]
- Animações na nuvem de tags mais suves. [Felipe Lube de Bragança]
- Adicione o filtro assuntos na página de busca. [Felipe Lube de
  Bragança]
- Carregue as páginas antes de exibir a barra de navegação / abrir rota.
  [Felipe Lube de Bragança]
- Use constantes para definir tipos de conteúdo. [Felipe Lube de
  Bragança]
- Estado da busca na página inicial guardado na store. [Felipe Lube de
  Bragança]
- Acertos na lista de cartões. [Felipe Lube de Bragança]
- Exiba o jornal no cartão, se for uma notícia. [Felipe Lube de
  Bragança]
- Cor para link em estado ativo. [Felipe Lube de Bragança]
- Adicione transições à nuvem de tags. [Felipe Lube de Bragança]
- Página de imagens. [Felipe Lube de Bragança]
- Simplifique o componente de visualização do documento. [Felipe Lube de
  Bragança]
- Página do assunto. [Felipe Lube de Bragança]
- Estado sem assuntos para a página de assuntos. [Felipe Lube de
  Bragança]
- Páginas assuntos e Imagens: exiba uma mensagem amigável em caso de
  erro. [Felipe Lube de Bragança]
- Utilização do componnete NewCard. [Felipe Lube de Bragança]
- Um único cartão para mandar em todos. [Felipe Lube de Bragança]
- Use o NewsCard na lista de álbuns. [Felipe Lube de Bragança]
- Suporte a itens que usam o campo name como título. [Felipe Lube de
  Bragança]
- Página de álbuns/imagens. [Felipe Lube de Bragança]
- Use o ImageCard para todo tipo de documento. [Felipe Lube de Bragança]
- Efeitos de hover sobre o cartão. [Felipe Lube de Bragança]
- Utilização do componente Microtext. [Felipe Lube de Bragança]
- Componente Microtext em js puro, com suporte a tag customizada.
  [Felipe Lube de Bragança]
- [wip] Página do álbum. [Felipe Lube de Bragança]
- Remoção do antigo layout padrão. [Felipe Lube de Bragança]
- Suporte a cartão de imagem pequeno. [Felipe Lube de Bragança]
- Suporte ao cartão de álbum. [Felipe Lube de Bragança]
- Adicione elementos de cabeçalho e rodapé. [Felipe Lube de Bragança]
- Página de assuntos. [Felipe Lube de Bragança]
- Filtro sanitizeOnlyText. [Felipe Lube de Bragança]
- Descrição no cartão do assunto. [Felipe Lube de Bragança]
- Cartão com aparência unificada a do cartão de assunto. [Felipe Lube de
  Bragança]
- SubjectCard: suporte para cartão grande. [Felipe Lube de Bragança]
- Cartão do Assunto. [Felipe Lube de Bragança]
- Compatibilidade com o componente de imagens. [Felipe Lube de Bragança]
- Estilo para lista de campos. [Felipe Lube de Bragança]
- Página do documento deve exibir uma imagem ao invés de carregar o pdf
  direto. [Felipe Lube de Bragança]
- Modo de pré-visualização do arquivo do documento. [Felipe Lube de
  Bragança]
- Remova o pulo de margem da lista de resultados. [Felipe Lube de
  Bragança]
- (closes #13) animação para filtro ativo pela url. [Felipe Lube de
  Bragança]
- Diretiva para determinar o tamanho da imagem no cartão masonry.
  [Felipe Lube de Bragança]
- NewsGrid: dê um tempo entre a inserção de cada cartão. [Felipe Lube de
  Bragança]
- Ajustes no layout de NewsInfo. [Felipe Lube de Bragança]
- Evite o 'pulo' dos itens do menu com uma barra de scroll sempre
  visível. [Felipe Lube de Bragança]
- Transições entre páginas. [Felipe Lube de Bragança]
- Exiba o logo mesmo na página inicial. [Felipe Lube de Bragança]
- [wip] página da notícia. [Felipe Lube de Bragança]
- Novas variáveis para. [Felipe Lube de Bragança]
- Substitua opacidade por um filtro preto e branco para um cartão
  inativo. [Felipe Lube de Bragança]
- Ajustes finais no design dos filtros. [Felipe Lube de Bragança]
- Utilize a página inicial como rota para a seleção da palavra. [Felipe
  Lube de Bragança]
- Página inicial reativa aos parâmetros de busca e estilização. [Felipe
  Lube de Bragança]
- Filtros de busca na página inicial [wip] [Felipe Lube de Bragança]
- Componentes separados para tipos diferentes de item. [Felipe Lube de
  Bragança]
- Variáveis relacionadas ao cartão. [Felipe Lube de Bragança]
- Exiba a descrição do item no cartão. [Felipe Lube de Bragança]
- [wip] grid masonry para os resultados de busca na página inicial.
  [Felipe Lube de Bragança]
- Componente NewsGrid para exibir as notícias num estilo masonry.
  [Felipe Lube de Bragança]
- Adicione use a biblioteca vue-masonry. [Felipe Lube de Bragança]
- [wip] páginainicial com suporte ao modo de pesquisa. [Felipe Lube de
  Bragança]
- Remova as barras de scroll de .ql-editor. [Felipe Lube de Bragança]
- Novo design da página inicial. [Felipe Lube de Bragança]
- Layout para página índice. [Felipe Lube de Bragança]
- TeaserBlock: link centralizado por padrão. [Felipe Lube de Bragança]
- Suporte ao navbar fixo depois do scroll. [Felipe Lube de Bragança]
- Aumento no tamanho do logo. [Felipe Lube de Bragança]
- Ajustes no rodapé. [Felipe Lube de Bragança]
- Ajustes no componente da página. [Felipe Lube de Bragança]
- Ajuste no microtexto. [Felipe Lube de Bragança]
- Suporte à páginas com largura total. [Felipe Lube de Bragança]
- Estilo global de microtexto. [Felipe Lube de Bragança]
- Layout novo. [Felipe Lube de Bragança]
- Atualização da página de erro. [Felipe Lube de Bragança]
- Remoção de main.css em desuso com a folha stylus. [Felipe Lube de
  Bragança]
- Finalização do compoenente barra de menu. [Felipe Lube de Bragança]
- Microtext: use variáveis stylus. [Felipe Lube de Bragança]
- Finalização do componente de rodapé. [Felipe Lube de Bragança]
- Separação da folha de estilos, blocos e variáveis. [Felipe Lube de
  Bragança]
- Variável para a fonte do menu. [Felipe Lube de Bragança]
- Uso de fonte normal nos títulos. [Felipe Lube de Bragança]
- Definição e uso de var com largura máxima. [Felipe Lube de Bragança]
- Suporte ao arrastamento dos itens escondidos da barar de navegação.
  [Felipe Lube de Bragança]
- Mostre o ícone do menu somente se itens da barra estiverem não
  visíveis. [Felipe Lube de Bragança]
- Distribua igualmente os itens da barra de menu. [Felipe Lube de
  Bragança]
- (store): estados para a busca na navbar. [Felipe Lube de Bragança]
- Página para teste de componentes. [Felipe Lube de Bragança]
- [WIP] componente de barra de navegação. [Felipe Lube de Bragança]
- [WIP] componente de microtexto. [Felipe Lube de Bragança]
- [WIP] componente de rodapé. [Felipe Lube de Bragança]
- Variáveis padrão de estilo. [Felipe Lube de Bragança]
- Suporte à folha de estilos Stylus. [Felipe Lube de Bragança]
- Carregue a fonte Vollkorn SC, usada nos títulos. [Felipe Lube de
  Bragança]
- Layout centralizado, links abaixo da caixa de pesquisa. [Felipe Lube
  de Bragança]
- Posicionamento e estilo dos links na página inicial. [Felipe Lube de
  Bragança]
- TeaserBlock: props para exibição e posicionamento do link. [Felipe
  Lube de Bragança]
- Componente de rodapé. [Felipe Lube de Bragança]
- Navbar: prop para exibir o menu. [Felipe Lube de Bragança]
- Filtro xss: permita a tag br. [Felipe Lube de Bragança]
- Links na barra superior da página inicial. [Felipe Lube de Bragança]
- Deixe as palavras-chave em minúsculo na lista de filtros closes #50.
  [Felipe Lube de Bragança]
- Suporte para textos de chamada de página customizados closes #48.
  [Felipe Lube de Bragança]
- Exiba notícias associadas ao documento. [Felipe Lube de Bragança]
- Closes #32 link para a versão arquivada da notícia. [Felipe Lube de
  Bragança]
- Atualização dos labels de pesquisa. [Felipe Lube de Bragança]
- Separe o link da notífica do link do jornal. [Felipe Lube de Bragança]
- ResultCard: suporte para ambas notícias e documentos. [Felipe Lube de
  Bragança]
- Adicione um campo tipo de objeto na página de pesquisa. [Felipe Lube
  de Bragança]
- (closes #1) Pesquisa sobre dois índices, notícia e documento. [Felipe
  Lube de Bragança]
- (closes #41) suporte a favicons ao lado do nome de jornais; eslint.
  [Felipe Lube de Bragança]
- (closes #41) suporte à favicons ao lado do nome de jornais. [Felipe
  Lube de Bragança]
- Melhorias estéticas na listagem de notícias. [Felipe Lube de Bragança]
- Feat (closes #35): adicione favicons. [Felipe Lube de Bragança]
- (closes #38) usar hashs ao invés de ids nas urls da API. [Felipe Lube
  de Bragança]
- Não execute o container como root. [Felipe Lube de Bragança]
- Conexões autenticadas ao servidor do ElasticSearch. [Felipe Lube de
  Bragança]
- Otimizações na geração da imagem do docker. [Felipe Lube de Bragança]
- Atualizaçao da imagem docker com inclusao de ARG para o build
  funcionar. [Felipe Lube de Bragança]
- Template para o arquivo .env. [Felipe Lube de Bragança]
- Closes #7: throttle para componentes de pesquisa. [Felipe Lube de
  Bragança]

Corrigido
~~~~~~~~~
- Remoção de código não usado. [Felipe Lube de Bragança]
- Remoção de console.log. [Felipe Lube de Bragança]
- Acerto no tamanho do botão de download. [Felipe Lube de Bragança]
- Aparência de botão em link. [Felipe Lube de Bragança]
- Utilize o estilo de ícone do google. [Felipe Lube de Bragança]
- Somente esconda o logo na página inicial se mobile. [Felipe Lube de
  Bragança]
- Acerto nos grids de assuntos e imagens. [Felipe Lube de Bragança]
- Correções no carregamento da pré-visualização na página da notícia.
  [Felipe Lube de Bragança]
- Não permita cliques no logo escondido. [Felipe Lube de Bragança]
- Correção no selector de navegação. [Felipe Lube de Bragança]
- Mostre os assuntos somente depois de carregar iniciais e assuntos.
  [Felipe Lube de Bragança]
- Acerto na lista de álbuns em mobile. [Felipe Lube de Bragança]
- Acerto na indiciação da barra de navegação. [Felipe Lube de Bragança]
- Correção na largura máxma da página da notícia. [Felipe Lube de
  Bragança]
- Não use margem na figura da página de notícias. [Felipe Lube de
  Bragança]
- Centralize a lista de assuntos em mobile. [Felipe Lube de Bragança]
- Ajuste na navbar; não exiba o logo na página inicial. [Felipe Lube de
  Bragança]
- Não esconda as listas combo. [Felipe Lube de Bragança]
- Centralze o número de resultados. [Felipe Lube de Bragança]
- Não deixe o foco na barra de pesquisa por padrão para evitar teclados.
  [Felipe Lube de Bragança]
- Largura máxima para todos os cartões. [Felipe Lube de Bragança]
- Correção na cor da letra inicial. [Felipe Lube de Bragança]
- Volte com o alerta na parte de cima do formulário de contato. [Felipe
  Lube de Bragança]
- Correção em idFor() [Felipe Lube de Bragança]
- Remoção de código não usado. [Felipe Lube de Bragança]
- Correção em prop fuzziness. [Felipe Lube de Bragança]
- Não renderize o bloco de descrição se o assunto não tiver descrição.
  [Felipe Lube de Bragança]
- Correção no link para a palavra-chave na pasta da notícia. [Felipe
  Lube de Bragança]
- Correção na mudança na ordem dos itens dos controles de navegação.
  [Felipe Lube de Bragança]
- Correção na cor da borda da navbar. [Felipe Lube de Bragança]
- Conserto na navbar. [Felipe Lube de Bragança]
- Coreção nas margens da página. [Felipe Lube de Bragança]
- Acerto no tamanho das letras do picker. [Felipe Lube de Bragança]
- Correção na margem da página inicial. [Felipe Lube de Bragança]
- NewsGrid: largura dos itens em mobile deve ser 100% [Felipe Lube de
  Bragança]
- Não use parâmetros de url para a pesquisa na página inicial. [Felipe
  Lube de Bragança]
- Página de assuntos: exiba ao menos a nuvem de palavras-chave. [Felipe
  Lube de Bragança]
- Acertos no estilo da página 'Todos Assuntos' [Felipe Lube de Bragança]
- Limpeza no código. [Felipe Lube de Bragança]
- Deixe a nuvem mais para cima em mobile. [Felipe Lube de Bragança]
- Correção em retrocesso nos efeitos das palavras da nuvem. [Felipe Lube
  de Bragança]
- Correção sobre o pulo da barra de navegação. [Felipe Lube de Bragança]
- Use constantes. [Felipe Lube de Bragança]
- Remoção de página hardcoded. [Felipe Lube de Bragança]
- Corrija a rota para a página individual do assunto. [Felipe Lube de
  Bragança]
- Mensagem de erro para arquivos desconhecidos, acerto na página do
  documento. [Felipe Lube de Bragança]
- Coerência com estilos do v-viewer. [Felipe Lube de Bragança]
- Defina corretamente a chave de componentes filhos. [Felipe Lube de
  Bragança]
- Acertos na página de assuntos. [Felipe Lube de Bragança]
- Acerto no texto de descrição do cartão. [Felipe Lube de Bragança]
- Ajustes na imagem da notícia. [Felipe Lube de Bragança]
- Ajustes na imagem da captura. [Felipe Lube de Bragança]
- Ajustes na listagem de assuntos e palavras-chave. [Felipe Lube de
  Bragança]
- Defina a cor dos links em estados ativos. [Felipe Lube de Bragança]
- Remoção de código não usado, alinhamento do grid. [Felipe Lube de
  Bragança]
- Alinhamento do grid na página inicial. [Felipe Lube de Bragança]
- Correção no fundo, que deve ser preto. [Felipe Lube de Bragança]
- Alinhamento dos itens deverá ser feito externamente. [Felipe Lube de
  Bragança]
- Correção na página inicial. [Felipe Lube de Bragança]
- Substitua o masonry por trasições css3. [Felipe Lube de Bragança]
- Hack para tentar resolver o pulo do masonry. [Felipe Lube de Bragança]
- Esconda o grid masonry imediatamente antes da destruição da página.
  [Felipe Lube de Bragança]
- Correção na classe da imagem oculta no álbum. [Felipe Lube de
  Bragança]
- Centralize verticalmente apenas a página de contato. [Felipe Lube de
  Bragança]
- Retorne com o título da página. [Felipe Lube de Bragança]
- Acerto no layout da página do Assunto. [Felipe Lube de Bragança]
- Não use o componente resize-sensor em SSR. [Felipe Lube de Bragança]
- Use o componente Microtexto na contagem de resultados. [Felipe Lube de
  Bragança]
- Use um grid css para listar os álbuns. [Felipe Lube de Bragança]
- Correção em nome de classe. [Felipe Lube de Bragança]
- Acerto no espaçamento do NewsGrid. [Felipe Lube de Bragança]
- Acerto na margem do microtexto. [Felipe Lube de Bragança]
- Correção em nome de computed prop. [Felipe Lube de Bragança]
- Remoção de prop inválida. [Felipe Lube de Bragança]
- Correção na cor do microtexto. [Felipe Lube de Bragança]
- Remoção de página não usada. [Felipe Lube de Bragança]
- Largura do cartão será definida por seu container. [Felipe Lube de
  Bragança]
- Acerto na largura dos cartões em NewsGrid. [Felipe Lube de Bragança]
- Correção no layout do cartão. [Felipe Lube de Bragança]
- Uso do componente de microtexto. [Felipe Lube de Bragança]
- Correção na largura do cartão. [Felipe Lube de Bragança]
- Correções na página do álbum - remoção do aside inútil - definição do
  título - transição suave antes de sair da página. [Felipe Lube de
  Bragança]
- Consertos na responsividade da página e do cartão de assuntos. [Felipe
  Lube de Bragança]
- Correção no nome da classe, componente Microtext. [Felipe Lube de
  Bragança]
- Centrelize o logo na barra de navegação. [Felipe Lube de Bragança]
- Correção na função cardImageDimensions. [Felipe Lube de Bragança]
- Correções no componente microtext. [Felipe Lube de Bragança]
- Correções no layout. [Felipe Lube de Bragança]
- Não use a diretiva quando desncessário. [Felipe Lube de Bragança]
- Correção no layout do bloco main. [Felipe Lube de Bragança]
- Navbar deve ficar acima de tudo. [Felipe Lube de Bragança]
- (active-filter-animation) use o valor, não a expressão. [Felipe Lube
  de Bragança]
- Definição do tamaho do logo em px. [Felipe Lube de Bragança]
- Remoção do DynamicRangeSlider, que está bugado segundo #53. [Felipe
  Lube de Bragança]
- Correção na relação entre os filtros na página inicial. [Felipe Lube
  de Bragança]
- Remoção de classe não usada. [Felipe Lube de Bragança]
- Correção no validador de linkPosition. [Felipe Lube de Bragança]
- Adicione uma cor para o microtexto. [Felipe Lube de Bragança]
- Adicione uma cor para o estilo microtext. [Felipe Lube de Bragança]
- Posicionamento do HomeTagCloud deve ser definido externamente. [Felipe
  Lube de Bragança]
- Correção na margem automática do rodapé. [Felipe Lube de Bragança]
- Não centralize logotipo por padrão. [Felipe Lube de Bragança]
- Diminiução do tamanho do h1. [Felipe Lube de Bragança]
- Fundo transparente para barra de pesquisa. [Felipe Lube de Bragança]
- Correção no tamanho do texto no bloco de chamada. [Felipe Lube de
  Bragança]
- Alinhe a margem do bloco de chamada com link de chamada. [Felipe Lube
  de Bragança]
- Não inclua o captcha se o formulário não estiver disponível. [Felipe
  Lube de Bragança]
- Adicione um 'por-favor' na mensagem de erro. [Felipe Lube de Bragança]
- Não renderize o formulário de contato em ssr. [Felipe Lube de
  Bragança]
- Mostre a data correta de upload do documento. [Felipe Lube de
  Bragança]
- Não renderize componentes/páginas com o reactiveSearch em SSR. [Felipe
  Lube de Bragança]
- ResultCard: considere a prop showLabel. [Felipe Lube de Bragança]
- Closes #39 filtros devem ficar abertos por padrão em desktop. [Felipe
  Lube de Bragança]
- Closes #28: formulário de contato na vertical. [Felipe Lube de
  Bragança]
- Suba a nuvem de tags (closes #45) [Felipe Lube de Bragança]
- Corrija a geração do label em ResultCard. [Felipe Lube de Bragança]
- NewsInfo: failback para caso haja falha na obtenção dos documentos.
  [Felipe Lube de Bragança]
- Não exiba a nuvem na página de erro em ssr. [Felipe Lube de Bragança]
- Retorno com valores failback para variáveis ambiente. [Felipe Lube de
  Bragança]
- (closes #29) Ordem constante dos elementos na página inicial. [Felipe
  Lube de Bragança]
- Correção no link de contato no menu. [Felipe Lube de Bragança]
- Especifique o usuario pelo uid, nao pelo nome (inexistente) [Felipe
  Lube de Bragança]
- Adicione variaveis ambiente para o ssr funcionar. [Felipe Lube de
  Bragança]

Outros
~~~~~~
- Atualização de pacotes. [Felipe Lube de Bragança]
- Remoção de arquivo não mais usado. [Felipe Lube de Bragança]
- Remoção de arquivo não usado. [Felipe Lube de Bragança]
- Substituição  do velho DocumentPreview pelo novo. [Felipe Lube de
  Bragança]
- Remoção de arquivo não usado. [Felipe Lube de Bragança]
- Mova os componentes de navegação para uma pasta própria. [Felipe Lube
  de Bragança]
- Renomação do componente NewCard. [Felipe Lube de Bragança]
- Remoção de layout não usado. [Felipe Lube de Bragança]
- Pasta para componentes da página inicial. [Felipe Lube de Bragança]
- Atualização de pacotes. [Felipe Lube de Bragança]
- Atualização do nuxt para 2.8.0. [Felipe Lube de Bragança]
- Atualize o nuxt para v2.6.3. [Felipe Lube de Bragança]
- Renomeie arquivos. [Felipe Lube de Bragança]
- Eslint. [Felipe Lube de Bragança]

Não categorizado
~~~~~~~~~~~~~~~~
- Refat: remoção de mensagem de copyright. [Felipe Lube de Bragança]
- Refat: retorno do menu. [Felipe Lube de Bragança]
- Refat: refatoração do menu em tela inteira. [Felipe Lube de Bragança]
- Refat: componete substitui página 'Todos os Assuntos' [Felipe Lube de
  Bragança]
- Refat: consolide a porcentagem do efeito preto-e-branco numa variável.
  [Felipe Lube de Bragança]
- Refat: redesign dos cartões página assuntos; atualização do enpoint na
  API. [Felipe Lube de Bragança]
- Refat: padronize, numa classe só, as páginas centralizadas. [Felipe
  Lube de Bragança]
- Refat: fim do componente AbstractPage. [Felipe Lube de Bragança]
- Merge branch 'new-design' of github.com:felubra/nuxt-xram-memory into
  new-design. [Felipe Lube de Bragança]
- Refat: limpeza da página índice e reorganização em sub-componentes.
  [Felipe Lube de Bragança]
- Refat: obsolete o reactiveMixin por um componente já configurado.
  [Felipe Lube de Bragança]
- Refat: remoção do vue-masonry. [Felipe Lube de Bragança]
- Refat: sintaxe es6, mais curta. [Felipe Lube de Bragança]
- Refat: mova a doretiva cardImageDimensions para utils. [Felipe Lube de
  Bragança]
- Refat: mova a transição 'fade' para a folha de estilos global. [Felipe
  Lube de Bragança]
- [wip] [Felipe Lube de Bragança]
- Refat: mova urlOrRoute para utils. [Felipe Lube de Bragança]
- Refat: encapsule a nuvem de tags num componente próprio. [Felipe Lube
  de Bragança]
- Refat: páginas padrão na store, ao invés de hardcoded no componente.
  [Felipe Lube de Bragança]
- Merge pull request #44 from felubra/document_in_index. [Felipe Lübe de
  Bragança]

  Pesquise também documentos no índice


0.3.0 (2019-04-23)
------------------

Adicionado
~~~~~~~~~~
- Imagem docker. [Felipe Lube de Bragança]
- Feat: use @nuxtjs/dotenv para acessar diretamente process.env. [Felipe
  Lube de Bragança]
- Página de contato com formulário com validação e recaptcha. [Felipe
  Lube de Bragança]

Corrigido
~~~~~~~~~
- Remoção de variáveis e funções não utilizadas. [Felipe Lube de
  Bragança]
- Remoção de configuração da url do ES. [Felipe Lube de Bragança]
- Correção na definição da classe da barra de pesquisa. [Felipe Lube de
  Bragança]
- Fix (Ccntact): correção no fluxo de validação; mensagem de
  indisponibilidade. [Felipe Lube de Bragança]
- Correção na mensagem na página de erro. [Felipe Lube de Bragança]

Outros
~~~~~~
- Adicione um changelog e a configuração para gerá-lo. [Felipe Lube de
  Bragança]

Não categorizado
~~~~~~~~~~~~~~~~
- Merge branch 'dev' of github.com:felubra/nuxt-xram-memory into dev.
  [Felipe Lube de Bragança]


0.2.0 (2019-04-18)
------------------

Adicionado
~~~~~~~~~~
- Album: descrição da foto e botões de navegação. [Felipe Lube de
  Bragança]
- Visualização básica das fotos no álbum. [Felipe Lube de Bragança]
- Traduza o texto para status de carregamento. [Felipe Lube de Bragança]
- Adicione botão para baixar a foto. [Felipe Lube de Bragança]
- Seleção da melhor foto de acordo com a resolução do dispositivo.
  [Felipe Lube de Bragança]
- Feat(wip): página do álbum. [Felipe Lube de Bragança]

Corrigido
~~~~~~~~~
- GetMediaUrl: toda a lógica dentro do bloco try. [Felipe Lube de
  Bragança]

Outros
~~~~~~
- Atualização do nuxt para 2.6.1. [Felipe Lube de Bragança]
- Atualização do reactivesearch. [Felipe Lube de Bragança]
- Padronização de estilos para a sidebar. [Felipe Lube de Bragança]


0.1.0 (2019-04-12)
------------------

Adicionado
~~~~~~~~~~
- Alteração no layout da página do documento - botão de download
  flutuante - detalhes do arquivo na parte inferior. [Felipe Lube de
  Bragança]
- Padronização dos estilos dos links. [Felipe Lube de Bragança]
- Texto dos resultados em português. [Felipe Lube de Bragança]
- Alteração no layout da página do documento - botão de download
  flutuante - detalhes do arquivo na parte inferior. [Felipe Lube de
  Bragança]
- Correção nos carregamento dos componentes de visualizaçao. [Felipe
  Lube de Bragança]
- Redirecione para o aequivo se em ssr. [Felipe Lube de Bragança]
- Remova o componente ReactiveBase do layout padrão. [Felipe Lube de
  Bragança]
- Coloque páginas em destaque na geração estática. [Felipe Lube de
  Bragança]
- Não utilize os componentes ReactiveSearch em ssr. [Felipe Lube de
  Bragança]
- Tentativa de carregamento dinâmico do componente de pdf. [Felipe Lube
  de Bragança]
- Simplificação dos estilos dos componentes. [Felipe Lube de Bragança]
- Simplificação dos componentes de visualização - incorporação da lógica
  na página do documento. [Felipe Lube de Bragança]
- Estilo especial para AbstractPage na página do documento. [Felipe Lube
  de Bragança]
- Função santizadora centralizada. [Felipe Lube de Bragança]
- Deixe o componente AbstractPage mais leve, caberá ao instanceador
  limpar o conteúdo. [Felipe Lube de Bragança]
- Utilização do componente AbstractPage como wrapper em todas as
  páginas. [Felipe Lube de Bragança]
- Expansão do componente AbstractPage com suporta a aside - renderização
  de slots se houver conteúdo neles. [Felipe Lube de Bragança]
- Página de erro: palavra grande na nuvem com o código de erro. [Felipe
  Lube de Bragança]
- D3TagCloud: permita a definição de uma cor por palavra. [Felipe Lube
  de Bragança]
- NewsInfo: remoção do box-shadow das capturas. [Felipe Lube de
  Bragança]
- Exibição de múltiplas páginas no componente do pdf. [Felipe Lube de
  Bragança]
- Clicar fora do menu fecha ele. [Felipe Lube de Bragança]
- Refatoração do componente de nuvem. [Felipe Lübe de Bragança]

  feat: refatoração do componente de nuvem
- Cores dos filtros selecionados casando com o estilo do site. [Felipe
  Lube de Bragança]
- Cores globais para os links. [Felipe Lube de Bragança]
- Utilização do componente de nuvem na página de erro. [Felipe Lube de
  Bragança]
- Simplificação do componente da nuvem - página inicial é responsável
  pelos dados da nuvem - componente de nuvem apenas recebe as palavras -
  suporte à configuração das cores do componente - alteração nas cores.
  [Felipe Lube de Bragança]
- NewsCard: reestilização e simplificação. [Felipe Lube de Bragança]
- Filtro xss: permita elementos de lista e citações. [Felipe Lube de
  Bragança]
- Filtro xss: permita imagens no formato de Data URLs. [Felipe Lube de
  Bragança]
- NewsCard: limpeza xss. [Felipe Lube de Bragança]
- Refatoração do controle de nuvem - inserção no dom usando o vue (data-
  aware) - sensor de tamanho redimensiona a nuvem - efeito :hover nas
  palavras - alterações no cálculo do desvio padrão para palavras
  maiores - componente não é renderizado no servidor - alteração nas
  cores das palavras - alteração na quantidade de palavras. [Felipe Lube
  de Bragança]
- Layout desktop e pequenas correções. [Felipe Lübe de Bragança]
- Página básica para erros. [Felipe Lube de Bragança]
- Autofoco nas barras de pesquisa ReactiveSearch. [Felipe Lube de
  Bragança]
- Logo acima da barra de pesquisa na página inicial. [Felipe Lube de
  Bragança]
- Não exiba o logo na navbar na página inicial. [Felipe Lube de
  Bragança]
- Tamanho alternativo para o logo. [Felipe Lube de Bragança]
- Títulos nas páginas. [Felipe Lube de Bragança]
- Layout horizontal o visualizador de documento pdf em desktop. [Felipe
  Lube de Bragança]
- GetMediaUrl verifica se entrada já é url. [Felipe Lube de Bragança]
- Substituição do StatciPage pelo AbstractPage - utilização do
  AbstractPage na página da notícia. [Felipe Lube de Bragança]
- Englobe o cartão da notícia num link. [Felipe Lube de Bragança]
- Remoção da página dedicada para palavra-chave - Links na nuvem para
  palavras-chave irão para a página de pesquisa - Simplificação dos ids
  de componente na página de pesquisa (urls) [Felipe Lube de Bragança]
- Navbar: suporte à páginas com barra lateral fixa. [Felipe Lube de
  Bragança]
- Componente para lista de notícias. [Felipe Lube de Bragança]
- Layout desktop da página de pesquisa com sidebar. [Felipe Lube de
  Bragança]
- Largura fixas para o menu. [Felipe Lube de Bragança]
- PDFPreview adicione suporte a scroll via touchscreen. [Felipe Lube de
  Bragança]
- Substituição do pdfvuer pelo vue-pdf e término do componente PDF.
  [Felipe Lube de Bragança]

  BREAKING CHANGE
  - englobe todos os componentes de visualização em <no-ssr>
  - botões para controle das páginas do PDF
  - cálculo da escala de acordo se mobile ou não
  - substituição do pdfvuer pelo vue-pdf
- Botões para navegar páginas do pdf, funcionalidade básica. [Felipe
  Lube de Bragança]
- Design desktop para componentes Image e PDFFilePreview. [Felipe Lube
  de Bragança]
- Não dê espaço para a barra de navegação na página do documento.
  [Felipe Lube de Bragança]
- Melhorias no componente/página da notícia - classe para um container
  centralizado - sem utilização do componente newscard - pré-
  visualização das capturas em pdf - reordenação e estilização dos
  campos para desktop - limpeza contra xss nos campos que usam v-html.
  [Felipe Lube de Bragança]
- Navbar responsivo. [Felipe Lube de Bragança]
- Alteração do fundo da página para algo mais cinzento. [Felipe Lube de
  Bragança]
- Remoção de fundo para a NavBar. [Felipe Lube de Bragança]
- Página de pesquisa em desktop. [Felipe Lube de Bragança]
- Layout da página principal em desktops - remoção de margem no
  TeaserBlock, a página dará a margem - centralização do svg da
  D3TagCloud - alteração da ordem da chamada da página em destaque em
  desktops - alteração dos tipos dos elementos na página de pesquisa -
  remoção do main do layout padrão, páginas definirão o que é main.
  [Felipe Lube de Bragança]
- Configurações do tema do ReactiveSearch para o as constantes. [Felipe
  Lube de Bragança]
- Utilize o tamanho da fonte padrão do site no TeaserBlock. [Felipe Lube
  de Bragança]
- Página para páginas estáticas. [Felipe Lube de Bragança]
- Componente para exibição de páginas estáticas. [Felipe Lube de
  Bragança]
- Inclua a fonte do logo. [Felipe Lube de Bragança]
- Adicione uma requisição para as fontes do design. [Felipe Lube de
  Bragança]
- (TeaserBlock) classe, estilos e uma prop para exibição na home.
  [Felipe Lube de Bragança]
- Utilize o componente TeaserBlock na página inicial. [Felipe Lube de
  Bragança]
- TeaserBlock: adicione um link para a página. [Felipe Lube de Bragança]
- Ação para pegar páginas em destaque na página inicial. [Felipe Lube de
  Bragança]
- (store) getter para páginas em destaque na página inicial. [Felipe
  Lube de Bragança]
- Componente TeaserBloco para blocos de chamada de páginas. [Felipe Lube
  de Bragança]

  - Adicione o editor Quill para pegar seus estilos
  - Adicione stylus e stylus-loader para suportar os estilos acima
- Filtro xss com suporte à classes do editor quill. [Felipe Lube de
  Bragança]
- Busque e use as páginas da API que deverão aparecer no menu. [Felipe
  Lube de Bragança]
- Plugin p/ buscar conteúdos essenciais da API e colocá-los na store.
  [Felipe Lube de Bragança]
- Melhorias no componente NewsInfo - alguns links abrem noutra janela -
  capturas em pdf linkam para a página do documento - layout multicoluna
  para palavras-chave e assuntos - font sem serifa. [Felipe Lube de
  Bragança]
- Feat (NewsCard): lide com dupla origem para a imagem da notícia.
  [Felipe Lube de Bragança]
- Acertos estéticos na página de pesquisa - migração de estilos
  específicos  do layout padrão para a página - todos itens de filtro
  escondidos por padrão - diminuição da margem da barra de pesquisa -
  não mostre o que foi digitado na pesquisa como filtro - diversos
  ajustes do espaçamento entre elementos. [Felipe Lube de Bragança]
- Feat (store): action para esconder o menu. [Felipe Lube de Bragança]
- Defina o loader como vermelho. [Felipe Lube de Bragança]
- Filtro básico para selecionar um intervalo de anos de publicação.
  [Felipe Lube de Bragança]
- Filtros colapsíveis na página de pesquisa. [Felipe Lube de Bragança]
- NavBar fixa ao topo. [Felipe Lube de Bragança]
- Dê mais espaço no rodapé do menu. [Felipe Lube de Bragança]
- Englobe o componente Logo com um link para a página inicial. [Felipe
  Lube de Bragança]
- Closes #2: versão branca para o logo no menu; prop para componente.
  [Felipe Lube de Bragança]

  - componente Logo agora tem prop 'variant' para escolher versões do logo
  - novas versões do logo adicionadas
- Closes #5: Permita filtrar por várias palavras-chave. [Felipe Lube de
  Bragança]
- CustomQuery(): permita tamanho customizado definido no componente.
  [Felipe Lube de Bragança]
- Closes #4 adicione filtros selecionados na página de pesquisa. [Felipe
  Lube de Bragança]
- Mostre barras de scroll no componente do documento pdf. [Felipe Lube
  de Bragança]
- Requisite o documento direto da API. [Felipe Lube de Bragança]
- Defina parâmetros e debug para o axios fora de produção. [Felipe Lube
  de Bragança]
- Unificação dos estilos dos componentes de visualização. [Felipe Lube
  de Bragança]
- Identificação dos chunks webpack. [Felipe Lube de Bragança]
- Mais um documento fake. [Felipe Lube de Bragança]
- Componente para visualização de documentos pdf. [Felipe Lube de
  Bragança]
- Reorganização dos componentes em pastas. [Felipe Lube de Bragança]
- Debug possível com sourcemaps. [Felipe Lube de Bragança]
- (cloud) fonte proporcional à largura do container. [Felipe Lube de
  Bragança]
- Atualização de dependências. [Felipe Lube de Bragança]
- Feat: atualização do nuxt para @2.4.5. [Felipe Lube de Bragança]
- Componente visualizador de imagens. [Felipe Lube de Bragança]
- Adicione mais documentos, refatoração de funções. [Felipe Lube de
  Bragança]
- Função para adicionar o prefixo do servidor de mídias. [Felipe Lube de
  Bragança]
- Esconda o menu quando a rota mudar. [Felipe Lube de Bragança]
- Término do componente UnknownFilePreview em mobile. [Felipe Lube de
  Bragança]
- Mais informações 'mock' para o documento. [Felipe Lube de Bragança]
- Mais propriedades usadas pelos componentes de visualização. [Felipe
  Lube de Bragança]
- Adicione dayjs para lidar melhor com datas. [Felipe Lube de Bragança]
- [wip] página do documento. [Felipe Lube de Bragança]
- Componente do menu do site; utilização do ícones do google - itens do
  menu hardcoded - animação de aparecimento do menu [wip] - estado do
  menu guardado na store. [Felipe Lube de Bragança]
- Ajuste no espaçamento da barra de pesquisa. [Felipe Lube de Bragança]
- Componente Navbar e Logo. [Felipe Lube de Bragança]
- Padronização de componentes e layout. [Felipe Lube de Bragança]
- Reunifiação de estilos no bloco de layout. [Felipe Lube de Bragança]
- Melhorias na página de palavras-chave - título - aceite um parâmetro
  como título - utilize o mesmo componente de resultados da página de
  busca. [Felipe Lube de Bragança]
- Utilize nuxt-link ao invés de um link puro. [Felipe Lube de Bragança]
- Remova o link para o jornal do componente NewsCard. [Felipe Lube de
  Bragança]
- Continue nomenclatura BEM; remova escopo dos estilos. [Felipe Lube de
  Bragança]
- Nomenclatura BEM com o css dos componentes. [Felipe Lube de Bragança]
- Estilo do microtexto no layout padrão. [Felipe Lube de Bragança]
- Página com resultados de pesquisa dedicada. [Felipe Lube de Bragança]
- Inclusão do filtro por jornal. [Felipe Lube de Bragança]
- Melhorias no design. [Felipe Lube de Bragança]
- NewsInfo: capturas, assuntos, keywords; tamanho humano. [Felipe Lube
  de Bragança]
- [wip] nova página da notícia com um objeto fasificado. [Felipe Lube de
  Bragança]
- Melhorias no design. [Felipe Lube de Bragança]
- Utilize o serviço do bonsai.io. [Felipe Lube de Bragança]
- [wip] novo componente newsinfo. [Felipe Lube de Bragança]
- Melhorias no design e novas props. [Felipe Lube de Bragança]
- Nome do jornal e data de publicação, remova imagens com erro. [Felipe
  Lube de Bragança]
- Utilize o novo componente NewsCard na página inicial. [Felipe Lube de
  Bragança]
- Feat(design): layout padrão: defina o tema de ReactiveBase e paddings.
  [Felipe Lube de Bragança]
- Feat(design): NewsCard: melhorias no design - exiba o texto truncado
  do teaser a partir de certa largura - defina ma largura máxima de
  850px - corrija a margem inferior do título. [Felipe Lube de Bragança]
- NewsCard: estilo e estrutura para telas pequenas. [Felipe Lube de
  Bragança]
- Melhorias no componente da nuvem de palavras-chave - remoção da
  dependência slugify - reorganização do código em wrapper, componente e
  página - página fica responsável pela busca de dados - wrapper faz a
  interface com os resultados do elasticsearch - salve a consulta
  inteira como uma constante, já que raramente irá mudar - Use o
  ReactiveComponent corretamente. [Felipe Lube de Bragança]
- Remova estilos desnecessários. [Felipe Lube de Bragança]
- Utilize o novo componente NewsCard. [Felipe Lube de Bragança]
- Mova o componente ReactiveBase para o layout padrão. [Felipe Lube de
  Bragança]
- Adicione variável ambiente para url do servidor de mídia. [Felipe Lube
  de Bragança]
- Refatoração de D3TagCloud - utilize constantes de cores - englobe um
  texto num link e não o contrário - adicione o atributo xmlns ao svg.
  [Felipe Lube de Bragança]
- Componente básico para um cartão de notícia. [Felipe Lube de Bragança]
- Feat(page): [wip] página palavra-chave. [Felipe Lube de Bragança]
- Lista de resultados básica. [Felipe Lube de Bragança]
- Inclusão de padding na barra de pesquisa; placeholder. [Felipe Lube de
  Bragança]
- Feat (page): somente renderize a nuvem em navegadores; remova filtros.
  [Felipe Lube de Bragança]
- Feat (cloud): organização do código e responsividade - A nuvem
  responde ao evento resize de window. [Felipe Lube de Bragança]
- Feat (cloud): novas props customQuery e maxWords. [Felipe Lube de
  Bragança]
- Feat(cloud): adicione um link a cada palavra. [Felipe Lube de
  Bragança]
- Cor de acordo com uma escala, baseada tamanho da fonte da palavra.
  [Felipe Lube de Bragança]
- Ângulos configuráveis na nuvem. [Felipe Lube de Bragança]
- Melhorias na nuvem e atualizações no nome dos índices. [Felipe Lube de
  Bragança]
- Wip componente de nuvem. [Felipe Lube de Bragança]
- Wip adicione filtros por palavra chave e nuvem. [Felipe Lube de
  Bragança]
- Ignore arquivos do vscode. [Felipe Lube de Bragança]
- POC de busca no ElasticSearch. [Felipe Lube de Bragança]

Corrigido
~~~~~~~~~
- Correções na exibição da descrição do documento. [Felipe Lube de
  Bragança]
- Cor do link da pré-visualização é a mesma cor do link. [Felipe Lube de
  Bragança]
- Acerto no header do componente de página. [Felipe Lube de Bragança]
- Correção da largura do cartão de notícia na lista. [Felipe Lube de
  Bragança]
- Utilize box-sizing: border-box em todos elementos. [Felipe Lube de
  Bragança]
- Redução no espaçamento do topo da barra lateral. [Felipe Lube de
  Bragança]
- Correções no layout da página da notícia - closes #19 - layout dos
  campos com <dl> [Felipe Lube de Bragança]
- Correção na chave para elemento em v-for. [Felipe Lube de Bragança]
- Mudança em nome de estilo. [Felipe Lube de Bragança]
- Utilize o componente AbstractPage com a nova interface. [Felipe Lube
  de Bragança]
- Utilize o componente AbstractPage com a nova interface. [Felipe Lube
  de Bragança]
- Utilize <nuxt-link> ao invés de <a> para linkar uma palavra-chave.
  [Felipe Lube de Bragança]
- Página da notícia: exiba a imagem grande, não o thumbnail. [Felipe
  Lube de Bragança]
- Largura para content-container. [Felipe Lube de Bragança]
- Tamanho do texto maior em TeaserBlock. [Felipe Lube de Bragança]
- Correções estéticas na página. [Felipe Lube de Bragança]
- Resolução do problema de palavras embaralhadas. [Felipe Lube de
  Bragança]
- Remoção de função não usada. [Felipe Lube de Bragança]
- Renomeie a classe para barra de navegação sem logo. [Felipe Lube de
  Bragança]
- Tamanho máximo do TeaserBlock deve ser o mesmo da barra de pesquisa.
  [Felipe Lube de Bragança]
- Lista de filtros colapsível em dekstop. [Felipe Lube de Bragança]
- Retorno do subtítulo na página da notícia. [Felipe Lube de Bragança]
- Remoção de espaço adicional na barra de pesquisa. [Felipe Lube de
  Bragança]
- NewsInfo: correções estéticas. [Felipe Lube de Bragança]
- Remoção da largura máxima da lista de notícias. [Felipe Lube de
  Bragança]
- Remoção do smartTruncate. [Felipe Lube de Bragança]
- NewsCard: mudança do layout do cartão num breakpoint maior. [Felipe
  Lube de Bragança]
- Correções nos títulos e texto das notícias - retorne com o negrito
  full - ajustes nos tamanhos. [Felipe Lube de Bragança]
- Campo do tamanho e estilo das pré-visualizações. [Felipe Lube de
  Bragança]
- NewsInfo/Cloud: correções dos links para assuntos e palavras-chave.
  [Felipe Lube de Bragança]
- CustomFilterQuery: não desconstrua o argumento que pode ser nulo.
  [Felipe Lube de Bragança]
- Remoção de variável não usada. [Felipe Lube de Bragança]
- Remoção da reatividade de published_year p/ evitar bugs. [Felipe Lube
  de Bragança]
- Atualizações de nomes de campos com a mudança do backend. [Felipe Lube
  de Bragança]
- Correção no cálculo do container do PDF. [Felipe Lube de Bragança]
- Término do layout para os componentes visual. em desktop. [Felipe Lube
  de Bragança]
- Readicione o worker-loader, necessário p/o worker pdf.js. [Felipe Lube
  de Bragança]
- Não carregue o componente PDFFilePreview server-side. [Felipe Lube de
  Bragança]
- Correção na importação automática de UnknownFilePreview. [Felipe Lube
  de Bragança]
- Reinserção dos estilos para resultados no layout padrão. [Felipe Lube
  de Bragança]
- Correção no tamanho da fonte do menu. [Felipe Lube de Bragança]
- Correção na barra de navegação puladora. [Felipe Lube de Bragança]
- Resultados de pesquisa começam da esquerda, não centralziados. [Felipe
  Lube de Bragança]
- Tamanho de fonte 18px para telas grandes. [Felipe Lube de Bragança]
- Tamanho da fonte do TeaserBlock deve ser 1rem. [Felipe Lube de
  Bragança]
- Correção na fonte utilizada na nuvem de tags. [Felipe Lube de
  Bragança]
- Remoção de prop não usada. [Felipe Lube de Bragança]
- Correção na rota para o carregamento de páginas estáticas. [Felipe
  Lube de Bragança]
- Correção na cor do botão de filtros. [Felipe Lube de Bragança]
- Mais espaçamento para a barra de pesquisa. [Felipe Lube de Bragança]
- Correção na cor de destque do tema do ReactiveSearch. [Felipe Lube de
  Bragança]
- Ajustes no alinhamento do logo e dos botões do menu. [Felipe Lube de
  Bragança]
- Notícia acessível pelo id, não pela slug (II) [Felipe Lube de
  Bragança]
- Refatoração nos campos calculados de NewsInfo. [Felipe Lube de
  Bragança]
- Obtenha a notícia da api pelo id, não pelo slug. [Felipe Lube de
  Bragança]
- Remova o threshold para colocar a navbar como fixa. [Felipe Lube de
  Bragança]
- Corrija o posicionamento dos itens da navbar e seu espaçamento.
  [Felipe Lube de Bragança]
- Exiba o tipo do arquivo. [Felipe Lube de Bragança]
- Corrija um link dentro de outro na NavBar. [Felipe Lube de Bragança]
- Dê mais margem vertical entre os filtros de pesquisa. [Felipe Lube de
  Bragança]
- Defina explicitamente quantos jornais mostrar como filtro. [Felipe
  Lube de Bragança]
- Correção de nomes de estilos; título de página vermelho. [Felipe Lube
  de Bragança]
- Adicione e utilize o rodapé do componente de arquivo azul. [Felipe
  Lube de Bragança]
- Cor dos botões da navbar constante. [Felipe Lube de Bragança]
- Ignore o proxy nas requisições do axios. [Felipe Lube de Bragança]
- Ignore o proxy na requsição do documento à API. [Felipe Lube de
  Bragança]
- PreviewComponentType() mais robusta. [Felipe Lube de Bragança]
- Remoção de valores hardcoded. [Felipe Lube de Bragança]
- Correção no campo usado para computar file_url. [Felipe Lube de
  Bragança]
- Correção no link para mais informações. [Felipe Lube de Bragança]
- Correção no yarn.lock após atualizações. [Felipe Lube de Bragança]
- Correção no posicionamento do botão de fechamento do menu. [Felipe
  Lube de Bragança]
- Melhor manejo de datas. [Felipe Lube de Bragança]
- Correção para tela inteira. [Felipe Lube de Bragança]
- Correção no layout. [Felipe Lube de Bragança]
- Atualização do yarn.lock. [Felipe Lube de Bragança]
- Aidcione a biblioteca smart-trucate, esquecida em 71fb13b. [Felipe
  Lube de Bragança]
- Correção na obtenção da slug para a palavra-chave. [Felipe Lube de
  Bragança]
- Utilize ao menos o nuxt 2.4.3. [Felipe Lube de Bragança]
- Readicione as outras bibliotecas usadas pelo. [Felipe Lube de
  Bragança]
- Macerto na configuração do eslint. [Felipe Lube de Bragança]
- Reiniciando o projeto com o script do nuxt para suportar jsx/testes.
  [Felipe Lube de Bragança]
- Fix(cloud): utilize novamente maxWords na query. [Felipe Lube de
  Bragança]
- Atualização da query, que agora trabalha com nested. [Felipe Lube de
  Bragança]
- Utilize apenas um índice: notícia. [Felipe Lube de Bragança]
- Remoção de console.log. [Felipe Lube de Bragança]

Outros
~~~~~~
- Merge de no-reactivebase-layout. [Felipe Lube de Bragança]
- Atualização do reactivesearch => 1.0 beta 10. [Felipe Lube de
  Bragança]
- Atualizações (nuxt, reactivesearch) [Felipe Lube de Bragança]
- Chore: atualização para @appbaseio/reactivesearch-vue@1.0.0-beta.9.
  [Felipe Lube de Bragança]
- Diff fantasma. [Felipe Lube de Bragança]

Não categorizado
~~~~~~~~~~~~~~~~
- Merge branch 'desktop_layout' of https://github.com/felubra/nuxt-xram-
  memory into desktop_layout. [Felipe Lube de Bragança]
- Merge branch 'dev' into tag_cloud_refactoring. [Felipe Lube de
  Bragança]
- Revert "fix: remoção do smartTruncate" [Felipe Lube de Bragança]

  This reverts commit fe952599df82650303114ee2bfaea8b064948883.
- Fix (page/search) faça o próprio parse da querystring. [Felipe Lube de
  Bragança]
- Merge pull request #10 from felubra/pdf-viewer-2. [Felipe Lübe de
  Bragança]

  Design desktop para componentes de visualização
- Revert "fix: remova o threshold para colocar a navbar como fixa"
  [Felipe Lube de Bragança]

  This reverts commit 7eb35e448febff51a63475a4e7299197bf72f251.
- Revert "fix: ignore o proxy na requsição do documento à API" [Felipe
  Lube de Bragança]

  This reverts commit 841c4f2a140662eb9c312ab6afd1cd05ea37443b.
- Revert "feat: (cloud) fonte proporcional à largura do container"
  [Felipe Lube de Bragança]

  This reverts commit 4e07ab67c0bb152c8cf66a0074655e91f6bf0fef.
- Todo. [Felipe Lube de Bragança]
- Fat: inclua lib. chrome-js para lidar com cores. [Felipe Lube de
  Bragança]
- Esqueleto de um projeto nuxt@2.4.2. [Felipe Lube de Bragança]
- Revert "esqueleto de um app nuxt@2.3.4" [Felipe Lube de Bragança]

  This reverts commit 8b0b108b9b54c286f7fe4f340285c19c0d614c6f.
- Esqueleto de um app nuxt@2.3.4. [Felipe Lube de Bragança]
- Commit inicial. [Felipe Lube de Bragança]


