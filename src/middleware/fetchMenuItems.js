export default function({ store }) {
  if (!store.hasPagesOfMenu) {
    return store.dispatch('fetchPagesInMenu')
  }
  return Promise.resolve()
}
