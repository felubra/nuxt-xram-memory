export const TAGCLOUD_KEYWORD_LOWKEY_COLOR = '#f00'
export const TAGCLOUD_KEYWORD_HIGHKEY_COLOR = '#AA0000'
export const TAGCLOUD_NUM_KEYWORDS = 150
export const TAGCLOUD_QUERY = {
  size: 0,
  aggs: {
    keywords: {
      nested: {
        path: 'keywords'
      },
      aggs: {
        slugs: {
          terms: {
            field: 'keywords.slug',
            size: TAGCLOUD_NUM_KEYWORDS
          }
        },
        names: {
          terms: {
            field: 'keywords.name',
            size: TAGCLOUD_NUM_KEYWORDS
          }
        }
      }
    }
  }
}
