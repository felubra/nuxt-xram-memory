<template>
  <div :class="{'Logo': true, 'Logo--big': big}">
    <nuxt-link class="Logo__Link" to="/">
      <img :src="src" alt @load="imageLoaded" />
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
    },
    big: {
      type: Boolean,
      default: false
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
  },
  methods: {
    imageLoaded() {
      this.$emit('load')
    }
  }
}
</script>
<style scoped>
.Logo img {
  height: 38px;
}

.Logo.Logo--big img {
  height: 56px;
}
</style>
