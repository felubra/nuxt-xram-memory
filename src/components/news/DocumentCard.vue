<template>
  <div class="Card Card--document">
    <nuxt-link :to="itemLink">
      <img v-if="teaser" v-card-image-dimensions :src="image" />
      <p class="label">{{label}}</p>
      <h3>{{title}}</h3>
      <p v-if="teaser">{{teaser}}</p>
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
.Card--document {
  background: #F6F8FA;
}

.Card--document img {
  width: 90%;
  margin: 0.5rem auto;
  border: solid 1px #C7C9C9;
}
</style>
