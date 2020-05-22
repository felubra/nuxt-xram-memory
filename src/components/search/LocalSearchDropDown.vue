<template>
  <el-select v-model="selectedValues" :clearable="true" placeholder="Select" @change="doFilterBy">
    <el-option
      v-for="item in options"
      :key="item"
      :multiple="true"
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
      selectedValues: ''
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
        if (!val || !val.has(this.selectedValues)) {
          this.selectedValues = ''
          this.$nextTick(() => this.doFilterBy(''))
        }
      }
    }
  },
  methods: {
    doFilterBy(value) {
      this.filterBy(this.dataField, value)
    }
  },
  inject: ['localSearchState', 'filterBy']
}
</script>

<style>
</style>
