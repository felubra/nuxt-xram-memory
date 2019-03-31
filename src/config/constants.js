export const TAGCLOUD_KEYWORD_LOWKEY_COLOR = '#963a3a'
export const TAGCLOUD_KEYWORD_HIGHKEY_COLOR = '#f00'
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
