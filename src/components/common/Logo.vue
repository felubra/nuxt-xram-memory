<template>
  <div class="Logo">
    <nuxt-link class="Logo__Link" to="/">
      <img :src="src" alt>
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
      validator(value) {
        if (!value.length) {
          return true
        }
        return ['original', 'claro', 'pb', 'pb--branco'].includes(value)
      }
    }
  },
  computed: {
    src() {
      const base = '/logo'
      if (this.variant === 'original') {
        return `${base}.svg`
      }
      return `${base}--${this.variant}.svg`
    }
  }
}
</script>
<style scoped>
.Logo img {
  height: 2.4rem;
}
.Logo__Link {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
