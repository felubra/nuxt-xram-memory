import lunr from 'elasticlunr'

onmessage = function({ data: { name, data } }) {
  switch (name) {
    case 'loadIndex': {
      console.log('solicitação para carregar um índice serializado')
      try {
        self.index = lunr.Index.load(data)
        self.postMessage({ name: 'loadIndex', data: 'OK' })
      } catch {
        self.postMessage({ name: 'loadIndex', data: 'ERROR' })
      }
      break
    }
    case 'search': {
      console.log('solicitação para fazer uma busca')
      try {
        const results = self.index.search(data)
        self.postMessage({ name: 'search', data: results })
      } catch {
        self.postMessage({ name: 'search', data: 'ERROR' })
      }
      break
    }
  }
}
