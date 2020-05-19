export const TAGCLOUD_KEYWORD_LOWKEY_COLOR = '#ddd'
export const TAGCLOUD_KEYWORD_HIGHKEY_COLOR = '#caafaf'
export const TAGCLOUD_NUM_KEYWORDS = 100
export const TAGCLOUD_QUERY = {
  size: 0,
  aggs: {
    keywords: {
      nested: {
        path: 'keywords'
      },
      aggs: {
        names: {
          terms: {
            field: 'keywords.name',
            size: TAGCLOUD_NUM_KEYWORDS
          },
          aggs: {
            slug: {
              terms: {
                field: 'keywords.slug',
                size: 1
              }
            }
          }
        }
      }
    }
  }
}

export const defaultTheme = {
  typography: {
    fontFamily: 'Vollkorn, serif',
    fontSize: '16px'
  },
  colors: {
    textColor: '#333333',
    backgroundColor: '#fff',
    primaryTextColor: '#AA0000',
    primaryColor: '#AA0000',
    titleColor: '#AA0000',
    alertColor: '#d9534f',
    borderColor: '#B9B9B9'
  }
}

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

export const EMPTY = 'empty' // sem índice - estado inicial
export const DOWNLOADING = 'downloading' // baixando o arquivo com o índice
export const LOADING = 'loading' // carregando o arquivo na memória
export const LOADED = 'loaded' // arquivo carregado - índice pronto para busca
export const LOAD_ERROR = 'load_error' // falha no carregamento do índice
export const DOWNLOAD_ERROR = 'download_error' // falha no download do arquivo do índice

/** Estados possíveis de download do índice */
export const LUNR_INDEX_STATUSES = [
  EMPTY,
  DOWNLOADING,
  LOADING,
  LOADED,
  LOAD_ERROR,
  DOWNLOAD_ERROR
]

/** Nomes de mutação */
export const LOAD_LUNR_INDEX = 'loadLunrIndex'
export const SET_LUNR_INDEX_STATUS = 'setLunrIndexStatus'
