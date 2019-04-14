const xss = require('xss')
export const getMediaUrl = function(path) {
  const mediaUrl = process.env.mediaUrl
  try {
    if (path.includes(mediaUrl)) {
      return path // já é uma url formada
    }
    return `${process.env.mediaUrl}${path}`
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
    onTagAttr(tag, name, value, isWhiteAttr) {
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
            return `src=${xss.escapeAttrValue(process.env.API_URL + value)}`
          }
        }
      }
      return xss.onTagAttr(tag, name, value, isWhiteAttr)
    }
  }
}

/** Permita classes que são prefixadas com ql- (do Quill Editor) */
const allowQuillClasses = classes =>
  classes.filter(klass => klass.startsWith('ql-'))

export const appClassesXSSFilter = xssFilterFactory(allowQuillClasses)

export const innerInputFocus = {
  inserted: function(el) {
    el.querySelector('input').focus()
  }
}

export const sanitize = (str, classes = appClassesXSSFilter) =>
  xss(str, classes)
