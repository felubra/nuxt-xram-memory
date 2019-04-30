import { defaultTheme } from '~/config/constants'

export default {
  computed: {
    reactiveDefaultTheme() {
      return defaultTheme
    },
    reactiveServerURL() {
      return process.env.ELASTIC_SEARCH_SERVER
    },
    reactiveCredentials() {
      return process.env.ELASTIC_SEARCH_CREDENTIALS
    }
  }
}
