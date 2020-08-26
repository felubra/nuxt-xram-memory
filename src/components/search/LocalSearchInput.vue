<template>
  <el-input
    v-model="state.searchState[componentId]"
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
  props: {
    componentId: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  inject: ['state']
}
</script>
