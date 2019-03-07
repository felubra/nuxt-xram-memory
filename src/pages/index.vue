<template>
  <section class="Page">
    <TeaserBlock v-if="featuredPage" class="FeaturedPage" :page-item="featuredPage"></TeaserBlock>
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
      <ReactiveComponent
        class="ReactiveD3TagCloud--home"
        component-id="ReactiveD3TagCloud"
        :default-query="tagCloudQuery"
      >
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

<style scoped>
.SearchBar--home {
  margin: 10vh 0 15vh;
}

.SearchBar .SearchBar__Input {
  background-color: #fff;
}

.ReactiveD3TagCloud--home {
  order: 2;
  margin-top: 15vh;
}
.FeaturedPage {
  order: 0;
  margin: 10vh;
}

@media only screen and (min-width: 768px) {
  .SearchBar--home {
    margin: 15rem 0 2rem;
  }
  .FeaturedPage {
    order: 1;
    margin: 0;
  }
  .ReactiveD3TagCloud--home {
    margin-top: 35vh;
  }
}
</style>
