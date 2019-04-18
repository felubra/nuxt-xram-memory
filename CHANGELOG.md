Changelog
=========


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
- Chore: atualização do nuxt para 2.6.1. [Felipe Lube de Bragança]
- Chore: atualização do reactivesearch. [Felipe Lube de Bragança]
- Chore: padronização de estilos para a sidebar. [Felipe Lube de
  Bragança]


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
- Merge branch 'desktop_layout' of https://github.com/felubra/nuxt-xram-
  memory into desktop_layout. [Felipe Lube de Bragança]
- Chore: merge de no-reactivebase-layout. [Felipe Lube de Bragança]
- Chore: atualização do reactivesearch => 1.0 beta 10. [Felipe Lube de
  Bragança]
- Merge branch 'dev' into tag_cloud_refactoring. [Felipe Lube de
  Bragança]
- Revert "fix: remoção do smartTruncate" [Felipe Lube de Bragança]

  This reverts commit fe952599df82650303114ee2bfaea8b064948883.
- Fix (page/search) faça o próprio parse da querystring. [Felipe Lube de
  Bragança]
- Chore: atualizações (nuxt, reactivesearch) [Felipe Lube de Bragança]
- Chore: atualização para @appbaseio/reactivesearch-vue@1.0.0-beta.9.
  [Felipe Lube de Bragança]
- Merge pull request #10 from felubra/pdf-viewer-2. [Felipe Lübe de
  Bragança]

  Design desktop para componentes de visualização
- Revert "fix: remova o threshold para colocar a navbar como fixa"
  [Felipe Lube de Bragança]

  This reverts commit 7eb35e448febff51a63475a4e7299197bf72f251.
- Chore: diff fantasma. [Felipe Lube de Bragança]
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


