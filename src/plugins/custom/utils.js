const xss = require('xss')
const isString = require('lodash/isString')

export default ({ $config: { mediaURL, apiURL, version } }, inject) => {
  const getMediaUrl = function (path) {
    if (!path) {
      return
    }
    try {
      if (mediaURL) {
        if (path.includes(mediaURL)) {
          return path // já é uma url formada
        }
        return `${mediaURL}${path}`
      } else {
        return path
      }
    } catch {
      return path
    }
  }

  const defaultWhiteList = {
    section: ['id', 'class'],
    div: ['class'],

    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],

    dl: [],
    ul: [],
    ol: [],
    li: [],
    br: [],

    blockquote: [],

    img: ['src'],
    small: [],

    b: [],
    em: [],
    p: ['class'],
    hr: [],
    address: [],
    a: ['target', 'class', 'href'],
    span: [],
    strong: []
  }

  const xssFilterFactory = (allowedClasses = null, whiteList = null) => {
    const wl = whiteList || defaultWhiteList

    return {
      whiteList: wl,
      stripIgnoreTag: true,
      stripIgnoreTagBody: true,
      onTagAttr (tag, name, value, isWhiteAttr) {
        // Permita somente classes em allowedClasses
        if (isWhiteAttr && name === 'class') {
          let classes = value.split(' ')
          if (typeof allowedClasses === 'function') {
            classes = allowedClasses(classes).join(' ')
          } else if (Array.isArray(allowedClasses)) {
            classes = classes
              .filter(className => allowedClasses.includes(className))
              .join(' ')
          }
          return xss.onTagAttr(tag, name, classes, isWhiteAttr)
        }
        // Adicione o endereço da api em atributos src relativos de tags img
        if (tag === 'img' && name === 'src') {
          if (!value.match(/^https?:\/\//)) {
            if (value.startsWith('data:image/')) {
              return `src=${value}`
            } else {
              return `src=${xss.escapeAttrValue(apiURL + value)}`
            }
          }
        }
        return xss.onTagAttr(tag, name, value, isWhiteAttr)
      }
    }
  }

  /** Permita classes que são prefixadas com ql- (do Quill Editor) */
  const allowQuillClasses = classes =>
    classes.filter(className => className.startsWith('ql-'))

  const appClassesXSSFilter = xssFilterFactory(allowQuillClasses)

  const sanitize = (str, classes = appClassesXSSFilter) =>
    isString(str) ? xss(str, classes) : ''

  const sanitizeOnlyText = str =>
    sanitize(str, {
      whiteList: [],
      stripIgnoreTag: true
    })
  const urlOrRoute = item => {
    return typeof item.url === 'object'
      ? item.url
      : {
        name: 'slug',
        params: {
          slug: sanitize(item.url)
        }
      }
  }

  inject('utils', {
    sanitize,
    version,
    sanitizeOnlyText,
    appClassesXSSFilter,
    getMediaUrl,
    urlOrRoute
  })
}
