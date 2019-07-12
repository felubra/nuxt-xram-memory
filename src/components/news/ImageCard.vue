<template>
  <div :class="{'Card Card--image': true, 'Card--image-small': small}">
    <nuxt-link :to="itemLink">
      <img :src="image" />
    </nuxt-link>
  </div>
</template>

<script>
import Card from './Card'
export default {
  name: 'ImageCard',
  extends: Card,
  props: {
    small: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.Card.Card--image {
  height: 425px;
  padding: 0;
}

.Card.Card--image-small {
  width: 250px;
  height: 250px;
}

.Card.Card--image a, .Card.Card--image img {
  display: block;
  height: 100%;
  padding: 0;
}

.Card.Card--image a {
  text-align: center;
  overflow: hidden;
  display: flex;
  align-items: center;
  align-content: center;
  flex-direction: column;
}

.Card.Card--image img {
  transition: opacity 0.25s ease;
}

.Card.Card--image a:hover img {
  opacity: 1;
}
</style>
