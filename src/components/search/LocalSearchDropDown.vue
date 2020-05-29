<template>
  <select v-model="selected">
    <option disabled value="">Selecione</option>
    <option v-for="option in options" :key="option">{{option}}</option>
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
      selected: '',
      options: []
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
  created() {
    this.options = this.registerFilter(this.fieldName)
  },
  inject: ['filterBy', 'registerFilter']
}
</script>

<style>
</style>
