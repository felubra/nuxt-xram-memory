<template>
  <el-input v-model="searchQuery" placeholder="Pesquisar no acervo" @input="doSearch"></el-input>
</template>
<script>
export default {
  inject: ['search'],
  name: 'LocalSearchInput',
  props: {
    componentId: {
      type: String,
      required: true
    },
    dataFields: {
      type: [Array, Object],
      required: true
    }
  },
  data() {
    return {
      searchQuery: ''
    }
  },
  computed: {
    fieldConfiguration() {
      if (Array.isArray(this.dataFields)) {
        return this.dataFields.reduce((config, field) => {
          config[field] = { boost: 1 }
          return config
        }, {})
      }
      return this.dataFields
    }
  },
  methods: {
    /***
     * Faça uma busca com a configuração definida para os campos.
     */
    doSearch(query) {
      this.search(query, this.fieldConfiguration)
    }
  }
}
</script>
