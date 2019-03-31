<template>
  <nuxt-link :to="{name:'news-id', params:{id:newsItem.id}}">
    <div class="NewsCard">
      <div class="NewsCard__Body">
        <div class="NewCard__Image">
          <img v-if="image" :src="image" alt @error="removeImage">
        </div>
        <div class="news-text">
          <p v-if="label" class="label">Notícia</p>
          <h3>{{ newsItem.title }}</h3>
          <p class="teaser">{{teaser}}</p>
        </div>
      </div>
      <div v-if="footer" class="NewsCard__Footer">
        <p>
          <strong>{{newspaper.title}}</strong>
          {{published_date}}
        </p>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
/**TODO: adicionar prop centered */
import xss from 'xss'
const smartTruncate = require('smart-truncate')
const dayJs = require('dayjs')
const { appClassesXSSFilter, getMediaUrl } = require('~/utils')
export default {
  name: 'NewsCard',
  props: {
    newsItem: {
      type: Object,
      default: function() {
        return {}
      }
    },
    label: {
      type: Boolean,
      default: false
    },
    footer: {
      type: Boolean,
      default: true
    },
    info: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    title() {
      return xss(this.newsItem.title, appClassesXSSFilter)
    },
    teaser() {
      return xss(this.newsItem.teaser, appClassesXSSFilter)
    },
    image() {
      try {
        return (
          (this.newsItem.image_capture &&
            getMediaUrl(this.newsItem.image_capture)) ||
          (this.newsItem.thumbnail && getMediaUrl(this.newsItem.thumbnail))
        )
      } catch {
        /** TODO: retorne um ícone padrão se não houver imagem */
        return ''
      }
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
      try {
        const dateTime = dayJs(this.newsItem.published_date)
        if (!dateTime.isValid()) {
          throw new Error()
        }
        return dateTime.toDate().toLocaleDateString()
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

<style>
a {
  color: inherit;
  text-decoration: none;
}

p.label {
  color: #aa0000;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  font-size: 0.75rem;
  font-family: 'Cabin', sans-serif;
}
div.NewsCard {
  background: #f3f1f1;
  padding: 1rem 1rem 0.6rem 1rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
}

div.NewsCard__Body {
  justify-content: flex-start;
}

div.NewsCard__Body p.teaser {
  display: none;
}

div.NewCard__Image {
  min-width: 15.625rem;
}

div.NewsCard__Body h3 {
  font-weight: 500;
  margin: 0 0 1rem;
  font-size: 1.25rem;
  line-height: 1.2;
}

div.NewsCard__Footer {
  justify-content: flex-end;
}
div.NewsCard__Footer a.newspaper {
  text-transform: uppercase;
  text-decoration: none;
  color: #333333;
}

div.NewsCard__Footer a.newspaper:visited {
  color: #333333;
}

div.NewsCard__Footer p {
  font-family: Cabin, sans-serif;
  font-size: 0.75rem;
  margin: 0;
  padding: 0;
}
@media only screen and (min-width: 1080px) {
  div.NewsCard {
    text-align: left;
  }
  div.NewsCard__Body {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    text-align: left;
  }

  div.NewsCard__Body p.teaser {
    font-size: 1rem;
  }

  div.NewsCard__Body h3 {
    font-weight: bold;
    font-size: 1.3rem;
  }

  div.NewsCard__Body img {
    align-self: baseline;
    margin: 0 0.5rem 0 0rem;
  }

  div.NewsCard__Footer p {
    font-size: 0.8rem;
    margin: 0.5rem 0 0 0;
  }

  div.NewsCard__Body p.teaser {
    display: block;
    text-align: justify;
    margin: 0;
  }
}
</style>
