<template>
  <el-input v-model="value" type="text" suffix-icon="el-icon-search" :placeholder="placeholder" />
</template>

<script>
export default {
  name: 'LocalSearchInput',
  props: {
    componentId: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      value: ''
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(v) {
        this.searchBy(this.componentId, v)
      }
    }
  },
  inject: ['searchBy']
}
</script>

<style>
</style>
