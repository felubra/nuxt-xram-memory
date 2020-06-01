<template>
  <el-select v-model="selected" placeholder="Select" :multiple="true" :collapse-tags="true">
    <el-option
      v-for="option in options" :key="option"
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
    },
    'state.filterDataSources': {
      immediate: true,
      deep: true,
      handler(v) {
        try {
          this.options = v[this.fieldName]
        } catch {
          this.options = []
        }
      }
    },
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
  inject: ['filterBy', 'registerFilter', 'state']
}
</script>

<style>
</style>
