export default function({ $axios }) {
  $axios.onRequest(config => {
    // ignore o proxy nas requisições
    config.proxy = false
  })
}
