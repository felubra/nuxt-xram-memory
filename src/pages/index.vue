<template>
  <section class="Page">
    <TeaserBlock v-if="featuredPage" :page-item="featuredPage"></TeaserBlock>
    <DataSearch
      component-id="SearchSensor"
      :field-weights="[10,7]"
      :data-field="['title', 'teaser']"
      icon-position="right"
      :autosuggest="false"
      class-name="SearchBar SearchBar--home"
      placeholder="Pesquisar no acervo"
      :show-clear="false"
      @keyPress="search"
    />
    <no-ssr>
      <ReactiveComponent component-id="ReactiveD3TagCloud" :default-query="tagCloudQuery">
        <div slot-scope="{ aggregations, error }">
          <ReactiveD3TagCloud :aggregations="aggregations" :error="error"/>
        </div>
      </ReactiveComponent>
    </no-ssr>
  </section>
</template>

<script>
import ReactiveD3TagCloud from '~/components/tag-cloud/ReactiveD3TagCloud'
import TeaserBlock from '~/components/common/TeaserBlock'
import { mapGetters } from 'vuex'

import { TAGCLOUD_QUERY } from '~/config/constants'
export default {
  components: {
    ReactiveD3TagCloud,
    TeaserBlock
  },
  computed: {
    tagCloudQuery() {
      return function() {
        return TAGCLOUD_QUERY
      }
    },
    ...mapGetters(['featuredPages']),
    featuredPage() {
      return this.featuredPages.length > 0 && this.featuredPages[0]
    }
  },
  methods: {
    search(e) {
      if (event.which == 13 || event.keyCode == 13) {
        this.$router.push({
          name: 'search-query',
          params: { query: e.target.value }
        })
      }
    }
  }
}
</script>
