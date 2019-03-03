// Um plugin para buscar conteúdos essenciais para o site da API e colocá-los na store
export default ({ store }) => {
  // Pega os links para páginas que deverão ficar no menu
  store.dispatch('fetchPagesInMenu')
}
