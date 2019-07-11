<template>
  <article :class="{'SubjectCard': true, 'SubjectCard--big': big}">
    <nuxt-link :to="itemLink">
      <span class="microtext SubjectCard__ItemsCount">{{num_items}}</span>
      <h2>{{title}}</h2>
      <div class="SubjectCard__Description" v-html="description" />
      <div v-if="!big" class="SubjectCard__Cover">
        <img width="250" height="250" :src="cover" :alt="description" />
      </div>
    </nuxt-link>

    <div v-if="big" class="SubjectCard__Images">
      <nuxt-link :to="itemLink">
        <img :src="bigCover" alt />
      </nuxt-link>
    </div>
  </article>
</template>

<script>
import { sanitize, sanitizeOnlyText, getMediaUrl } from '@/utils'
const smartTruncate = require('smart-truncate')

export default {
  name: 'SubjectCard',

  props: {
    subject: {
      type: Object,
      required: true
    },
    big: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    num_items() {
      if (this.subject.items_count) {
        return this.subject.items_count > 1
          ? `${this.subject.items_count} itens`
          : `${this.subject.items_count} item`
      }
      return ''
    },
    title() {
      return sanitize(this.subject.name)
    },
    description() {
      const desc = sanitizeOnlyText(this.subject.description)
      if (this.big) {
        return smartTruncate(desc, 650)
      }
      return smartTruncate(desc, 360)
    },
    cover() {
      return getMediaUrl(this.subject.cover)
    },
    bigCover() {
      return getMediaUrl(this.subject.big_cover)
    },
    itemLink() {
      if (this.subject.slug) {
        return { name: 'subject-slug', params: { slug: this.subject.slug } }
      }
      return { name: 'index' }
    }
  }
}
</script>

<style lang="stylus" scoped>
.SubjectCard {
  background-image: linear-gradient(rgba(250, 249, 246, 1) 0%, rgba(255, 255, 255, 1) 25%);
  display: flex;
  align-items: center;
  width: 270px;
  min-width: 270px;
  overflow: hidden;
  height: 650px;
  justify-content: flex-end;
  justify-content: flex-end;
  padding: 0.5rem;
  border: solid 1px #efefef;
  transition: box-shadow 0.15s ease, border-color 0.15s ease, background-image 0.15s ease;
}

.SubjectCard:hover {
  box-shadow: 0px 5px 25px #efefef;
  border-color: rgba(206, 84, 84, 1);
}

.SubjectCard > a {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  justify-content: flex-start;
  position: relative;
  height: 100%;
}

.SubjectCard.SubjectCard--big {
  align-items: flex-end;
  text-align: center;
  width: auto;
}

.SubjectCard.SubjectCard--big > a {
  order: 2;
}

.SubjectCard__Cover {
  position: absolute;
  bottom: 0;
}

.SubjectCard__Images {
  height: 100%;
  display: -webkit-box;
  display: flex;
  overflow: hidden;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}

.SubjectCard__Images img {
  opacity: 0.75;
}

.SubjectCard__Cover::before {
  height: 250px;
  width: 100%;
  content: '';
  position: absolute;
  top: 0;
  background: linear-gradient(180deg, #fff, rgba(255, 255, 255, 0.25) 30%);
}

h2 {
  font-family: $small-caps;
  margin-top: 0.25rem;
}

.SubjectCard__Description, h2 {
  color: #333;
}

.SubjectCard__ItemsCount {
  font-size: 12px;
}
</style>
