<template>
  <p class="NewspaperInfo">
    <a :href="newspaperURL">
      <img :src="newspaperLogo">
      {{ newspaper.title }}
    </a>
  </p>
</template>

<script>

export default {
  name: 'NewspaperInfo',
  props: {
    newspaper: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    newspaperURL () {
      return this.$utils.sanitizeOnlyText(this.newspaper.url)
    },
    newspaperLogo () {
      if (this.newspaper.image) {
        return this.$utils.sanitizeOnlyText(this.$utils.getMediaUrl(this.newspaper.image))
      }
      return ''
    }
  }
}
</script>

<style lang="stylus" scoped>
p {
  margin: 0;
  padding: 0;
}

img {
  display: block;
  clear: both;
}

a {
  align-items: center;
  display: flex;
  flex-direction: column;
}
</style>
