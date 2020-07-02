<template>
  <el-select v-model="state.filterState[fieldName]" :multiple="true" :collapse-tags="true" :filterable="true">
    <el-option
      v-for="option in state.filterDataSources[fieldName]" :key="option"
      :label="option"
      :value="option">
    </el-option>
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
    fieldName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      options: []
    }
  },
  watch: {
    options(v) {
      // remova uma seleção para uma opção que já não existe mais
      if (!v.includes(this.selected)) {
        this.selected = ''
      }
    }
  },
  created() {
    // Fazer uma função para registrar o valor selecionado e os disponóveis
    this.registerFilter(this.fieldName)
  },
  inject: ['registerFilter', 'state']
}
</script>

<style>
</style>
