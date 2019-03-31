<template>
  <section class="Page">
    <TeaserBlock v-if="featuredPage" class="FeaturedPage" :page-item="featuredPage"></TeaserBlock>
    <Logo :big="true"/>
    <DataSearch
      v-inner-input-focus
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
import Logo from '~/components/common/Logo'
import { mapGetters } from 'vuex'
import { innerInputFocus } from '~/utils'

import { TAGCLOUD_QUERY } from '~/config/constants'
export default {
  components: {
    ReactiveD3TagCloud,
    TeaserBlock,
    Logo
  },
  directives: {
    'inner-input-focus': innerInputFocus
  },
  head: {
    title: 'xraM-Memory',
    bodyAttrs: {
      class: 'Navbar--no-logo'
    }
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
.Logo {
  margin-top: 10vh;
  padding: 0.5rem;
}

.Logo + .SearchBar {
  margin: 0;
}

.SearchBar .SearchBar__Input {
  background-color: #fff;
}

.ReactiveD3TagCloud--home {
  order: 2;
  margin-top: 35vh;
}
.FeaturedPage {
  order: 0;
  margin-top: 10vh;
}

@media only screen and (min-width: 768px) {
  .Logo {
    margin-top: 25vh;
  }
  .FeaturedPage {
    order: 1;
  }
  .ReactiveD3TagCloud--home {
    margin-top: 25vh;
  }
}
</style>
