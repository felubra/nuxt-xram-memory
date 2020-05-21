<template>
  <el-input v-model="searchQuery" placeholder="Pesquisar no acervo"></el-input>
</template>
<script>
export default {
  inject: ['setFieldValue'],
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
        this.setFieldValue(this.componentId, val)
      }
    }
  },
  created() {
    this.setFieldValue(this.componentId, '')
  }
}
</script>
