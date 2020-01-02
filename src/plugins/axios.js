import { setupCache } from 'axios-cache-adapter'

export default function({ $axios }) {
  const cache = setupCache({
    maxAge: 15 * 60 * 1000
  })
  const { defaults } = $axios
  defaults.adapter = cache.adapter
}
