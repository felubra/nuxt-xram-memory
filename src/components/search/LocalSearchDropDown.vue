<template>
  <el-select v-model="selectedValues" placeholder="Select">
    <el-option
      v-for="item in options"
      :key="item"
      :multiple="true"
      :label="item"
      :value="item">
    </el-option>
  </el-select>

</template>

<script>
export default {
  name: 'LocalSearchDropDown',
  props: {
    searchFilter: {
      type: String,
      required: true
    },
    componentId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectedValues: ''
    }
  },
  computed: {
    options() {
      return this.localSearch.availableFilters[this.searchFilter]
    }
  },
  watch: {
    selectedValues: {
      immediate: true,
      handler(val) {
        this.$set(this.localSearch.searchState, this.componentId, val)
      }
    }
  },
  inject: ['localSearch']
}
</script>

<style>
</style>
