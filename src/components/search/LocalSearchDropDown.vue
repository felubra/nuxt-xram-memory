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
      return this.localSearchState.availableFilters[this.searchFilter]
    }
  },
  watch: {
    selectedValues: {
      immediate: true,
      handler(val) {
        this.setFieldValue(this.componentId, val)
      }
    }
  },
  inject: ['localSearchState', 'setFieldValue']
}
</script>

<style>
</style>
