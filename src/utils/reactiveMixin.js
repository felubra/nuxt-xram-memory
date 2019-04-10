import { defaultTheme, ELASTIC_SEARCH_SERVER } from '~/config/constants'
export default {
  computed: {
    reactiveDefaultTheme() {
      return defaultTheme
    },
    reactiveServerURL() {
      return ELASTIC_SEARCH_SERVER;
    }
  }
}