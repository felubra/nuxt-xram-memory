<template>
  <ReactiveBase
    app="artifact_document,artifact_news"
    :url="reactiveServerURL"
    :theme="reactiveDefaultTheme"
    :credentials="reactiveCredentials"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </ReactiveBase>
</template>

<script>
import { ReactiveBase } from '@appbaseio/reactivesearch-vue'
import { defaultTheme } from '~/config/constants'
export default {
  name: 'DefaultReactiveSearch',
  components: {
    ReactiveBase
  },
  inheritAttrs: false,
  data: function() {
    return {
      reactiveDefaultTheme: defaultTheme,
      reactiveServerURL: process.env.ELASTIC_SEARCH_SERVER,
      reactiveCredentials: process.env.ELASTIC_SEARCH_CREDENTIALS
    }
  }
}
</script>
