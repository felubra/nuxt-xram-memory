<template>
  <div class="Card Card--image">
    <nuxt-link :to="itemLink">
      <img :src="image" />
    </nuxt-link>
  </div>
</template>

<script>
import Card from './Card'
export default {
  name: 'ImageCard',
  extends: Card
}
</script>

<style lang="stylus" scoped>
.Card.Card--image {
  height: 425px;
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
