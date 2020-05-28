<template>
  <select v-model="selected">
    <option disabled value="">Please select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
</template>

<script>
export default {
  name: 'LocalSearchDropDown',
  props: {
    componentId: {
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
        this.filterBy(this.componentId, v)
      }
    }
  },
  inject: ['filterBy']
}
</script>

<style>
</style>
