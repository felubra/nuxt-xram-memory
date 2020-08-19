<template>
  <el-input v-model="state.searchState[componentId]" type="text" suffix-icon="el-icon-search" :placeholder="placeholder" />
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
  inject: ['state']
}
</script>
