<template>
  <div
    :class="{
      'Logo': true,
      'Logo--big': big
    }"
  >
    <nuxt-link
      class="Logo__Link"
      to="/"
    >
      <img
        :src="src"
        alt
      >
    </nuxt-link>
  </div>
</template>
<script>
export default {
  name: 'Logo',
  props: {
    variant: {
      type: String,
      default: 'original',
      validator: value => ['original', 'claro', 'pb', 'pb--branco'].includes(value)
    },
    big: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    src () {
      const base = '/logo'
      if (this.variant === 'original') {
        return `${base}.svg`
      }
      return `${base}--${this.variant}.svg`
    }
  }
}
</script>
<style lang="stylus" scoped>
.Logo img
  height: 38px
  width: 156.27px

.Logo.Logo--big img
  height: 56px
  width: 230.28px
</style>
