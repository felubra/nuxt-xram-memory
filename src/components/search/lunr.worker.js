import * as Comlink from 'comlink'
import lunr from 'elasticlunr'

const obj = {
  index: null,
  load(serializedIndex) {
    this.index = lunr.Index.load(serializedIndex)
  }
}

Comlink.expose(obj)
