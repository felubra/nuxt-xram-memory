<template>
  <el-input v-model="searchQuery" placeholder="Pesquisar no acervo"></el-input>
</template>
<script>
export default {
  inject: ['localSearch'],
  name: 'LocalSearchInput',
  props: {
    componentId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      searchQuery: ''
    }
  },
  watch: {
    searchQuery: {
      immediate: true,
      handler(val) {
        this.$set(this.localSearch.searchState, this.componentId, val)
      }
    }
  },
  created() {
    this.localSearch.searchState[this.componentId] =
      this.localSearch.searchState[this.componentId] || ''
  }
}
</script>
