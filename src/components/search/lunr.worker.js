import * as Comlink from 'comlink'
import lunr from 'elasticlunr'
require('lunr-languages/lunr.stemmer.support')(lunr)
require('lunr-languages/lunr.pt')(lunr)
const asciiFolder = require('fold-to-ascii')
const replaceDiacritics = token => asciiFolder.foldReplacing(token)
lunr.Pipeline.registerFunction(replaceDiacritics, 'replaceDiacritics')

const obj = {
  index: null,
  load(serializedIndex) {
    this.index = lunr.Index.load(serializedIndex)
  }
}

Comlink.expose(obj)
