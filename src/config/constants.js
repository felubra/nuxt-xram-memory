export const TAGCLOUD_KEYWORD_LOWKEY_COLOR = '#ddd'
export const TAGCLOUD_KEYWORD_HIGHKEY_COLOR = '#caafaf'
export const TAGCLOUD_NUM_KEYWORDS = 100

/** Tipos de conteúdo */
export const NEWS = 'news'
export const DOCUMENT = 'document'
export const IMAGE = 'image'

/** Nomes amigáveis para os tipos de conteúdo */
export const CONTENT_TYPE_LABELS = {
  [NEWS]: 'Notícia',
  [DOCUMENT]: 'Documento',
  [IMAGE]: 'Imagem'
}

/** Estados de carregamento do índice ElasticLunr */
export const EMPTY = 0
export const DOWNLOADING = 1
export const LOADING = 2
export const LOADED = 3
export const LOAD_ERROR = 4
export const DOWNLOAD_ERROR = 5

export const AVAILABLE_ORDERINGS = [
  {
    field: 'published_date',
    title: 'Data de publicação',
    desc: true
  },
  {
    field: 'title',
    title: 'Título',
    desc: false
  }
]
