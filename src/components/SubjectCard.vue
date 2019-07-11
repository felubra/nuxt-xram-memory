<template>
  <article class="SubjectCard">
    <nuxt-link :to="itemLink">
      <span class="microtext SubjectCard__ItemsCount">{{num_items}}</span>
      <h2>{{title}}</h2>
      <div class="SubjectCard__Description" v-html="description" />
      <div class="SubjectCard__Cover">
        <img v-card-image-dimensions :src="imageURL" :alt="description" />
      </div>
    </nuxt-link>
  </article>
</template>

<script>
import { sanitize, getMediaUrl, cardImageDimensions } from '@/utils'
export default {
  name: 'SubjectCard',
  directives: {
    cardImageDimensions
  },
  props: {
    subject: {
      type: Object,
      required: true
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
      return sanitize(this.subject.description)
    },
    imageURL() {
      return getMediaUrl(this.subject.cover)
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
  background: #FAF9F6;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 270px;
  overflow: hidden;
  height: 650px;
  justify-content: flex-end;
  justify-content: flex-end;
  padding: 0.5rem;
}

.SubjectCard > a {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex-grow: 1;
  justify-content: flex-start;
  position: relative;
}

.SubjectCard__Cover {
  position: absolute;
  bottom: 0;
}

.SubjectCard__Cover::before {
  height: 250px;
  width: 100%;
  content: '';
  position: absolute;
  top: 0;
  background: linear-gradient(180deg, #faf9f6, rgba(250, 249, 246, 0.25) 30%);
}

h2 {
  font-family: $small-caps;
  margin-top: 0.25rem;
}

.SubjectCard__Description, h2 {
  color: #333;
}
</style>
