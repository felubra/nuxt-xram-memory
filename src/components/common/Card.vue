<template>
  <div class="Card">
    <slot>
      <nuxt-link :to="itemLink">
        <slot name="image">
          <img :key="imageSrc" class="ImageFilePreview__OriginalImage" :src="imageSrc" />
        </slot>
        <slot name="label">
          <Microtext v-if="label" class-name="label">{{label}}</Microtext>
        </slot>
        <slot name="title">
          <h3 v-if="title">{{title}}</h3>
        </slot>
        <slot name="teaser">
          <p v-if="teaser" class="teaser">{{teaser}}</p>
        </slot>
      </nuxt-link>
      <slot name="footer"></slot>
    </slot>
  </div>
</template>

<script>
import { sanitizeOnlyText, getMediaUrl } from '@/utils'
export default {
  name: 'Card',
  props: {
    image: {
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
    imageSrc() {
      try {
        if (this.image.startsWith('/')) {
          return sanitizeOnlyText(getMediaUrl(this.image))
        }
        return sanitizeOnlyText(this.image)
      } catch {
        return ''
      }
    }
  },
  methods: {
    removeImage(e) {
      e.target.remove()
    }
  }
}
</script>

<style lang="stylus" scoped>
.Card {
  background-image: linear-gradient(rgba(250, 249, 246, 1) 0%, rgba(255, 255, 255, 1) 25%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  justify-content: flex-end;
  justify-content: flex-end;
  border: solid 1px #efefef;
  transition: box-shadow 0.15s ease, border-color 0.15s ease;
  text-align: center;
  position: relative;
  max-width: 350px;
}

.Card h3 {
  text-align: center;
  font-size: 18px;
  font-weight: 500;
}

.Card > a {
  text-align: center;
  transition: background-color 0.25s ease, color 0.15s ease-out;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  word-break: break-all;
  width: 100%;
  padding: 0;
  align-items: center;
  justify-content: flex-start;
}

.Card p, .Card h3 {
  word-break: break-word;
  padding: 0.5rem;
}

.Card p {
  color: #333333;
  font-family: $sans-serif;
}

.Card h3 {
  margin: auto;
}

.Card p.label {
  text-align: center;
  margin-top: 15px;
}

.Card img {
  filter: grayscale($grayscale-image);
  transition: opacity 0.25s ease;
}

.Card a:hover, .Card a:active, .Card a:focus {
  outline: none;
}

.Card:focus-within img, .Card:active img, .Card:focus img, .Card:hover img {
  filter: none;
}

.Card:focus-within, .Card:active, .Card:focus, .Card:hover {
  box-shadow: 0px 5px 25px #efefef;
  border-color: #d84848;
}

.microtext {
  justify-content: center;
  color: #a1a1a1 !important;
}

.teaser {
  text-align: justify;
}
</style>
