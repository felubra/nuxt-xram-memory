<template>
  <div class="ResultCard">
    <nuxt-link :to="itemLink">
      <div class="ResultCard__Body">
        <div class="NewCard__Image">
          <img v-if="image" :src="image" alt @error="removeImage">
        </div>
        <div class="news-text">
          <p class="label">{{label}}</p>
          <h3>{{ resultItem.title }}</h3>
          <p class="teaser">{{teaser}}</p>
        </div>
      </div>
    </nuxt-link>
    <div v-if="footer" class="ResultCard__Footer">
      <p class="ResultCard__Newspaper">
        <a :href="newspaper.url">
          <img v-if="newspaperIcon" :src="newspaperIcon" alt>
          <strong>{{newspaper.title}}</strong>
        </a>
      </p>
    </div>
  </div>
</template>

<script>
/**TODO: adicionar prop centered */
const dayJs = require('dayjs')
const { getMediaUrl, sanitize } = require('~/utils')
export default {
  name: 'ResultCard',
  props: {
    resultItem: {
      type: Object,
      default: function() {
        return {}
      }
    },
    showLabel: {
      type: Boolean,
      default: true
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
      return sanitize(this.resultItem.title)
    },
    teaser() {
      return sanitize(this.resultItem.teaser)
    },
    image() {
      try {
        return (
          (this.resultItem.image_capture &&
            getMediaUrl(this.resultItem.image_capture)) ||
          (this.resultItem.thumbnail && getMediaUrl(this.resultItem.thumbnail))
        )
      } catch {
        /** TODO: retorne um ícone padrão se não houver imagem */
        return ''
      }
    },
    itemLink() {
      switch (this.type) {
        case 'Documento': {
          return {
            name: 'document-document_id',
            params: { document_id: this.resultItem.document_id }
          }
        }
        case 'Notícia': {
          return { name: 'news-slug', params: { slug: this.resultItem.slug } }
        }
        default: {
          return { name: 'search' }
        }
      }
    },
    type() {
      return this.resultItem._type || ''
    },
    newspaperIcon() {
      try {
        return getMediaUrl(this.resultItem.newspaper.favicon_logo)
      } catch (e) {
        return ''
      }
    },
    newspaper() {
      if (
        this.resultItem.newspaper &&
        this.resultItem.newspaper.url &&
        this.resultItem.newspaper.title
      ) {
        return {
          url: this.resultItem.newspaper.url,
          title: this.resultItem.newspaper.title
        }
      }
      return false
    },
    published_date() {
      try {
        const dateTime = dayJs(this.resultItem.published_date)
        if (!dateTime.isValid()) {
          throw new Error()
        }
        return dateTime.toDate().toLocaleDateString()
      } catch {
        return ''
      }
    },
    label() {
      const values = [this.type, this.published_date]
      return values.filter(value => value).join(' em ')
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
p.label {
  color: #aa0000;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  font-size: 0.75rem;
  font-family: 'Cabin', sans-serif;
}

.ResultCard a:hover,
.ResultCard a:focus {
  text-decoration: none;
}

.ResultCard {
  background: #f3f1f1;
  padding: 1rem 1rem 0.6rem 1rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  transition: color 0.25s ease, background-color 0.25s ease;
  color: inherit;
  text-decoration: none;
  border: solid 1px #efefef;
  transition: border 0.25s ease, background-color 0.25s ease;
}

.ResultCard h3,
.ResultCard p {
  transition: color 0.25s ease;
}
.ResultCard p {
  color: #555;
}

.ResultCard:hover {
  border-color: #ce5454;
}

.ResultCard:hover h3 {
  color: #ce5454;
}

.ResultCard:hover p {
  color: #8c1010;
}

.ResultCard:focus,
.ResultCard:active {
  background: #ce5454;
  color: #fff;
}

.ResultCard:focus a,
.ResultCard:active h3,
.ResultCard:focus h3,
.ResultCard:focus h3,
.ResultCard:active p,
.ResultCard:focus p {
  color: #fff;
  outline-color: #fff;
}

div.ResultCard__Body {
  justify-content: flex-start;
}

div.ResultCard__Body p.teaser {
  display: none;
}

div.NewCard__Image {
  min-width: 15.625rem;
}

div.ResultCard__Body h3 {
  font-weight: 500;
  margin: 0 0 1rem;
  font-size: 1.25rem;
  line-height: 1.2;
}

div.ResultCard__Footer {
  justify-content: flex-end;
}
div.ResultCard__Footer a.newspaper {
  text-transform: uppercase;
  text-decoration: none;
  color: #333333;
}

div.ResultCard__Footer a.newspaper:visited {
  color: #333333;
}

p.ResultCard__Newspaper {
  font-family: Cabin, sans-serif;
  font-size: 0.75rem;
  margin: 0;
  padding: 0;
}

p.ResultCard__Newspaper a {
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
}

p.ResultCard__Newspaper img {
  margin-right: 0.27rem;
}

@media only screen and (min-width: 1080px) {
  .ResultCard {
    text-align: left;
  }
  div.ResultCard__Body {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    text-align: left;
  }

  div.ResultCard__Body p.teaser {
    font-size: 0.9rem;
  }

  div.ResultCard__Body h3 {
    font-weight: 700;
    font-size: 1.3rem;
  }

  div.ResultCard__Body img {
    align-self: baseline;
    margin: 0 0.5rem 0 0rem;
  }

  div.ResultCard__Footer p {
    font-size: 0.8rem;
    margin: 0.5rem 0 0 0;
  }

  div.ResultCard__Body p.teaser {
    display: block;
    text-align: justify;
    margin: 0;
  }
  p.label {
    text-align: left;
  }
  p.ResultCard__Newspaper {
    justify-content: flex-start;
  }
  p.ResultCard__Newspaper a {
    display: flex;
    align-items: flex-start;
    text-align: left;
    justify-content: flex-start;
  }
}
</style>
