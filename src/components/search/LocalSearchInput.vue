<template>
  <input type="text" @change="(e) => searchBy(componentId, e.target.value)" />
</template>

<script>
export default {
  name: 'LocalSearchInput',
  props: {
    componentId: {
      type: String,
      required: true
    }
  },
  inject: ['searchBy']
}
</script>

<style>
</style>
