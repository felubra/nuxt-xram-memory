<template>
  <el-select v-model="selectedValues" :clearable="true" placeholder="Select" :multiple="true" @change="doFilterBy">
    <el-option
      v-for="item in options"
      :key="item"
      :label="item"
      :value="item"
      >
    </el-option>
  </el-select>

</template>

<script>
export default {
  name: 'LocalSearchDropDown',
  props: {
    dataField: {
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
      selectedValues: []
    }
  },
  computed: {
    options() {
      return this.localSearchState.availableFilters[this.dataField]
    }
  },
  watch: {
    options: {
      deep: true,
      immediate: true,
      handler(val) {
        /**
         * Se houve mudança nos valores disponíveis para este campo e o valor selecionado
         * antriormente não está no rol dos novos valores, limpe o valor deste campo.
         */
        this.selectedValues =
          (val && this.selectedValues.filter(v => val.has(v))) || []
        if (!this.selectedValues.length) {
          this.removeFilter(this.dataField)
        }
      }
    }
  },
  methods: {
    doFilterBy(value) {
      if (value.length > 0) {
        this.filterBy(this.dataField, value)
      } else {
        this.removeFilter(this.dataField)
      }
    }
  },
  inject: ['localSearchState', 'filterBy', 'removeFilter']
}
</script>

<style>
</style>
