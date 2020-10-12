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
  inject: ['registerFilter', 'state'],
  props: {
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
    this.registerFilter(this.fieldName)
  }
}
</script>
