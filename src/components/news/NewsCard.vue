<template>
  <div class="Card Card--news">
    <nuxt-link :to="itemLink">
      <img v-if="image" v-card-image-dimensions :src="image" />
      <p class="label">{{label}}</p>
      <h3>{{title}}</h3>
      <p v-if="teaser">{{teaser}}</p>
    </nuxt-link>
    <p>
      <a :href="newspaper.url">
        <img v-if="newspaperIcon" :src="newspaperIcon" alt />
        {{newspaper.title}}
      </a>
    </p>
  </div>
</template>

<script>
import Card from './Card'
export default {
  name: 'NewsCard',
  extends: Card
}
</script>

<style lang="stylus" scoped>
.Card--news {
  background: #FAF6F6;
}
</style>
