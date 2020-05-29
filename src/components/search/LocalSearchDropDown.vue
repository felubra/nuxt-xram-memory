<template>
  <select v-model="selected">
    <option disabled value="">Please select one</option>
    <option>justiça</option>
    <option>sítio</option>
    <option>corrupção</option>
  </select>
</template>

<script>
export default {
  name: 'LocalSearchDropDown',
  props: {
    componentId: {
      type: String,
      required: true
    },
    fieldName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selected: ''
    }
  },
  watch: {
    selected: {
      immediate: true,
      handler(v) {
        this.filterBy(this.fieldName, v)
      }
    }
  },
  inject: ['filterBy']
}
</script>

<style>
</style>
