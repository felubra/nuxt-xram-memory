<template>
  <div class="Card">
    <slot>
      <nuxt-link :to="itemLink">
        <slot name="image">
          <img
            :key="imageSrc"
            width="250"
            height="250"
            class="ImageFilePreview__OriginalImage"
            :src="imageSrc"
            @error="removeImage"
          >
        </slot>
        <slot name="label">
          <Microtext
            v-if="label"
            class-name="label"
          >
            {{ label }}
          </Microtext>
        </slot>
        <slot name="title">
          <h3 v-if="title">
            {{ title }}
          </h3>
        </slot>
        <slot name="teaser">
          <p
            v-if="teaser"
            class="teaser"
          >
            {{ teaser }}
          </p>
        </slot>
      </nuxt-link>
      <slot name="footer" />
    </slot>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    imageURI: {
      type: String,
      default: () => ''
    },
    label: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    teaser: {
      type: String,
      default: ''
    },
    itemLink: {
      type: Object,
      required: true
    }
  },
  computed: {
    /**
     * Retorna URL absoluta limpa para o source de uma imagem.
     */
    imageSrc () {
      try {
        let uri = this.imageURI
        if (uri.startsWith('/')) {
          // É um caminho relativo, transforme-o numa url absoluta
          uri = this.$utils.getMediaUrl(uri)
        }
        return this.$utils.sanitizeOnlyText(uri)
      } catch {
        return ''
      }
    }
  },
  methods: {
    /**
     * Remove o elemento-alvo de um evento error
     */
    removeImage (e) {
      e.target.remove()
    }
  }
}
</script>

<style lang="stylus" scoped>
.Card
  background-image:
    linear-gradient(rgba(250, 249, 246, 1) 0%,
    rgba(255, 255, 255, 1) 25%)
  display: flex
  flex-direction: column
  align-items: center
  overflow: hidden
  justify-content: flex-end
  border: solid 1px #efefef
  transition:
    box-shadow 0.15s ease,
    border-color 0.15s ease
  text-align: center
  position: relative
  max-width: 350px
  &:focus-within
  &:active
  &:focus
  &:hover
    box-shadow: 0px 5px 25px #efefef
    border-color: #d84848

.Card h3
  text-align: center
  font-size: 18px
  font-weight: 500

.Card > a
  text-align: center
  transition: background-color 0.25s ease, color 0.15s ease-out
  flex-grow: 1
  display: flex
  flex-direction: column
  word-break: break-all
  width: 100%
  padding: 0
  align-items: center
  justify-content: flex-start

.Card p
.Card h3
  word-break: break-word
  padding: 0.5rem

.Card p
  color: $text-color
  font-family: $sans-serif

.Card h3
  margin: auto

.Card p.label
  text-align: center
  margin-top: 15px

.Card img
  filter: grayscale($grayscale-image)
  transition: opacity 0.25s ease
  object-fit: cover

.Card
  &focus-within img
  &:active img
  &:focus img
  &:hover img
    filter: none

.Card a
  &:hover
  &:active
  &:focus
    outline: none

>>>p.microtext
  justify-content: center
  color: #a1a1a1

.teaser
  text-align: justify
  line-height: 1.5

</style>
