<template>
  <el-input
    v-model="state.searchState[fieldName]"
    type="text"
    :placeholder="placeholder"
  >
    <slot
      v-for="(_, name) in $slots"
      :slot="name"
      :name="name"
    />
  </el-input>
</template>

<script>
export default {
  name: 'LocalSearchInput',
  inject: ['state'],
  props: {
    fieldName: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    }
  }
}
</script>
