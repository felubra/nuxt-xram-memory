<template functional>
  <p>
    <slot></slot>&nbsp;
    <i v-if="hasArrow" class="material-icons">arrow_bottom</i>
  </p>
</template>
<script>
export default {
  name: 'Microtext',
  props: {
    arrow: {
      type: String,
      validator(value) {
        return ['right', 'top', 'bottom', 'left', 'none'].includes(value)
      },
      default: 'none'
    }
  },
  computed: {
    hasArrow() {
      return this.arrow !== 'none'
    }
  }
}
</script>
<style lang="stylus" scoped>
p {
  font-family: 'Cabin', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: $microtext;
  line-height: 1.06rem;
  text-transform: uppercase;
  color: #d84848;
}
</style>
