<template>
  <div class="Page PageIndex">
    <h1 class="offscreen">
      Início
    </h1>
    <Logo
      class="Home__Logo"
      :big="true"
    />

    <el-input
      v-model="searchQuery"
      class="SearchBar"
      type="text"
      placeholder="Pesquisar no acervo"
      @change="handleSearch"
    >
      <template #suffix>
        <nuxt-link
          :to="{
            name: 'search',
            query: {
              text: searchQuery
            }
          }"
        >
          <i class="material-icons">search</i>
        </nuxt-link>
      </template>
    </el-input>

    <TeaserBlock
      v-if="featuredPage"
      link-position="center"
      class="FeaturedPage"
      :page-item="featuredPage"
    />

    <HomeTagCloud
      :aggregations="tagCloudAggregations"
      class="HomeTagCloud"
    />
  </div>
</template>

<script>
import HomeTagCloud from '~/components/home/HomeTagCloud'
import TeaserBlock from '~/components/home/TeaserBlock'
import Logo from '@/components/nav/Logo'
import { mapGetters } from 'vuex'
import { TAGCLOUD_NUM_KEYWORDS } from '~/config/constants'

export default {
  name: 'IndexPage',
  components: {
    HomeTagCloud,
    TeaserBlock,
    Logo
  },
  async asyncData ({ $api: { Keywords } }) {
    try {
      return {
        tagCloudAggregations: (await Keywords.all(TAGCLOUD_NUM_KEYWORDS))
      }
    } catch {
      return {
        tagCloudAggregations: []
      }
    }
  },
  data () {
    return {
      searchQuery: '',
      tagCloudAggregations: []
    }
  },
  head: {
    title: 'xraM-Memory',
    bodyAttrs: {
      class: 'page--index'
    }
  },
  computed: {
    ...mapGetters(['featuredPages']),
    featuredPage () {
      return this.featuredPages.length > 0 && this.featuredPages[0]
    }
  },
  methods: {
    handleSearch (searchQuery) {
      if (searchQuery.trim()) {
        this.$router.push({
          name: 'search',
          query: {
            text: searchQuery
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.PageIndex
  margin-top: 5vh

.FeaturedPage, .SearchBar
  margin-left: auto
  margin-right: auto

.PageIndex__SearchArea, .HomeTagCloud
  transition: margin-top 0.35s ease

.PageIndex__SearchArea
  margin-top: 20vh

.PageIndex__SearchArea--searching
  margin-top: 1rem

.Home__Logo
  text-align: center

.HomeTagCloud
  order: 2
  margin-top: 17vh

@media only screen and (min-width: $tablet)
  .PageIndex
    margin-top: 20vh

  .HomeTagCloud
    margin-top: 15vh

</style>

<style lang="stylus">
.PageIndex .SearchBar
  max-width: 730px
  display: block
  margin: 0 auto

.PageIndex .SearchBar input.el-input__inner
  transition: border-color 0.25s ease
  font-size: 16px

.PageIndex .SearchBar input.el-input__inner:focus
.PageIndex .SearchBar input.el-input__inner:hover
.PageIndex .SearchBar input.el-input__inner:active
  border-color: $link-color

.PageIndex .SearchBar input.el-input__inner::placeholder
  transition:
    color 0.25s ease,
    border-color 0.25s ease
  color: #888

.PageIndex .SearchBar i.el-icon-search
  color: $link-color

.PageIndex .SearchBar .el-input__suffix
  display: flex
  align-items: center
  cursor: hand

.PageIndex .SearchBar .el-input__suffix a
  display: flex

.PageIndex .SearchBar .el-input__suffix .material-icons
  font-size: 18px

.PageIndex .SearchBar input.el-input__inner:active::placeholder
.PageIndex .SearchBar input.el-input__inner:hover::placeholder
.PageIndex .SearchBar input.el-input__inner:focus::placeholder
  color: #333

</style>
