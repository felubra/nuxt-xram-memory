export default async function({ store }) {
  if (!store.hasPagesOfMenu) {
    try {
      await store.dispatch('fetchPagesInMenu')
    } catch {
      return Promise.resolve()
    }
  }
  return Promise.resolve()
}
