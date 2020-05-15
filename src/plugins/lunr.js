const lunr = require('elasticlunr')
//const lunr_multi = require('lunr-languages/lunr.multi')
//require('lunr-languages/lunr.stemmer.support')(lunr)
//require('lunr-languages/lunr.pt')(lunr)
// Um plugin para buscar conteúdos essenciais para o site da API e colocá-los na store
export default ({ app }, inject) => {
  inject('lunr', lunr)
}
