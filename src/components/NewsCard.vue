<template>
  <div class="news-card">
    <div class="news-body">
      <img v-if="image" :src="image" alt="" @error="removeImage">
      <div class="news-text">
        <h3>{{ newsItem.title }}</h3>
        <p class="teaser">{{teaser}}</p>
      </div>
    </div>
    <div class="news-footer">
      <p><a v-if="newspaper" :href="newspaper.url" class="newspaper"><strong>{{newspaper.title}}</strong></a> {{published_date}}</p>
    </div>
  </div>
</template>

<script>
const smartTruncate = require('smart-truncate')

export default {
  name: 'NewsCard',
  props: {
    newsItem: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    title() {
      return this.newsItem.title
    },
    teaser() {
      return smartTruncate(this.newsItem.teaser, 300)
    },
    image() {
      if (this.newsItem.image_capture) {
        return `${process.env.mediaUrl}${this.newsItem.image_capture}`
      }
      /** TODO: retorne um ícone padrão se não houver imagem */
      return ''
    },
    newspaper() {
      if (
        this.newsItem.newspaper &&
        this.newsItem.newspaper.url &&
        this.newsItem.newspaper.title
      ) {
        return {
          url: this.newsItem.newspaper.url,
          title: this.newsItem.newspaper.title
        }
      }
      return false
    },
    published_date() {
      if (this.newsItem.published_date) {
        try {
          return new Date(this.newsItem.published_date).toLocaleDateString()
        } catch {
          return ''
        }
      }
      return ''
    }
  },
  methods: {
    removeImage(e) {
      e.target.remove()
    }
  }
}
</script>

<style scoped>
div.news-card {
  background: #f3f1f1;
  padding: 1rem 1rem 0.6rem 1rem;
  margin: 1.2rem 0;
  display: flex;
  flex-direction: column;
  text-align: center;
  max-width: 850px;
}

div.news-body {
  justify-content: flex-start;
}

div.news-body p.teaser {
  display: none;
}

div.news-body img {
  min-width: 15.625rem;
}

div.news-body h3 {
  font-weight: 500;
  margin: 0 0 1rem;
  font-size: 1.25rem;
  line-height: 1.2;
}

div.news-footer {
  justify-content: flex-end;
}
div.news-footer a.newspaper {
  text-transform: uppercase;
  text-decoration: none;
  color: #333333;
}

div.news-footer a.newspaper:visited {
  color: #333333;
}

div.news-footer p {
  font-family: Cabin, sans-serif;
  font-size: 0.75rem;
  margin: 0;
  padding: 0;
}
@media only screen and (min-width: 768px) {
  div.news-card {
    text-align: left;
  }
  div.news-body {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    position: relative;
    text-align: left;
  }

  div.news-body img {
    align-self: baseline;
    margin: 0 0.5rem 0 0rem;
  }

  div.news-footer p {
    font-size: 0.8rem;
    margin: 0.5rem 0 0 0;
  }

  div.news-body p.teaser {
    display: block;
    text-align: justify;
    margin: 0;
  }
}
</style>
