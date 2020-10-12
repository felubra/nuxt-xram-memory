<template>
  <el-select
    v-model="state.filterState[fieldName]"
    :multiple="true"
    :collapse-tags="true"
  >
    <el-option
      v-for="option in state.filterDataSources[fieldName]"
      :key="option"
      :label="(labelFn && labelFn(option)) || option"
      :value="option"
    />
  </el-select>
</template>

<script>
export default {
  name: 'LocalSearchDropDown',
  props: {
    componentId: {
      type: String,
      required: true
    },
    labelFn: {
      type: Function,
      default: null
    },
    fieldName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      options: []
    }
  },
  created () {
    // Fazer uma função para registrar o valor selecionado e os disponóveis
    this.registerFilter(this.fieldName)
  },
  inject: ['registerFilter', 'state']
}
</script>

<style>
</style>
