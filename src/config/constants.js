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

/** Estados de carregamento do índice */
export const EMPTY = 0
export const DOWNLOADING = 1
export const LOADING = 2
export const LOADED = 3
export const LOAD_ERROR = 4
export const DOWNLOAD_ERROR = 5
