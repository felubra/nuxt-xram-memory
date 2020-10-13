export default async function ({ store }) {
  if (!store.hasPagesOfMenu) {
    try {
      await store.dispatch('fetchPagesInMenu')
    } catch {
      // ignore erros
      return Promise.resolve()
    }
  }
  return Promise.resolve()
}
