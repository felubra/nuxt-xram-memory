<template>
  <div class="Logo">
    <img :src="src" alt>
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
  width: 10rem;
}
</style>
