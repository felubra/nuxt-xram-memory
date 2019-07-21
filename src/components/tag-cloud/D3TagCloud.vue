<template>
  <div class="D3TagCloud">
    <resize-sensor @resize="resize"></resize-sensor>
    <transition-group
      ref="Cloud"
      xmlns="http://www.w3.org/2000/svg"
      class="Cloud"
      :width="width"
      :height="height"
      tag="svg"
      name="list-complete"
    >
      <g
        v-for="d in words"
        :key="d.text"
        :style="`transform: translate(${width/2}px, ${height/2}px);`"
      >
        <nuxt-link
          :title="d.text"
          :alt="d.text"
          class="Cloud__Word"
          :to="d.link || {
            name: 'index',
            query: {
              keywords: JSON.stringify([d.text])
            }
          }"
        >
          <text
            :style="`
              font-size:${d.size + 'px'};
              fill: ${d.color || colorForSize(d.size)};
              font-family: 'Vollkorn';
              text-anchor: middle; transform: translate(${d.x}px, ${d.y}px) rotate(${d.rotate}deg);
            `"
          >{{d.text}}</text>
        </nuxt-link>
      </g>
    </transition-group>
  </div>
</template>

<script>
import {
  TAGCLOUD_KEYWORD_LOWKEY_COLOR,
  TAGCLOUD_KEYWORD_HIGHKEY_COLOR
} from '@/config/constants'
const debounce = require('debounce')
const d3Cloud = require('d3-cloud')
const chromaJS = require('chroma-js')

export default {
  name: 'D3TagCloud',
  props: {
    keywords: {
      required: true,
      type: Array
    },
    lowColor: {
      type: String,
      default: TAGCLOUD_KEYWORD_LOWKEY_COLOR
    },
    hiColor: {
      type: String,
      default: TAGCLOUD_KEYWORD_HIGHKEY_COLOR
    }
  },
  data() {
    return {
      words: [],
      layout: {},
      width: 0,
      height: 0
    }
  },
  watch: {
    keywords: {
      immediate: true,
      async handler(keywords) {
        if (keywords.length > 0) {
          await this.$nextTick()
          this.makeCloud()
        }
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    colorForSize(size) {
      return chromaJS.scale([this.lowColor, this.hiColor])(
        (size - 1) / (100 - 1)
      )
    },
    resize({ width, height }) {
      this.width = width
      this.height = height > 450 ? height : 450
      this.$nextTick(() => {
        this.makeCloud()
      })
    },
    makeCloud: debounce(function() {
      /**
       * faça um clone da prop de palavras-chave para não poluí-la com mais atributos abaixo
       * isso evita que as palavras fiquem embaralhadas, pois, ao se redimensionar, atributos
       * antigos de um item dessa array não são atualizados, o que faz com que posições antigas
       * sejam reutilizadas.
       */
      const words = JSON.parse(JSON.stringify(this.keywords))

      const dimensions = [this.width, this.height]
      const [width, height] = dimensions
      if (!width || !height) {
        return
      }
      this.layout = d3Cloud()
        .size(dimensions)
        .words(words)
        .padding(2)
        .font('Vollkorn')
        .fontSize(function(d) {
          return d.size
        })
        .on('end', this.setWords)
      this.layout.start()
    }, 300),
    setWords(words) {
      this.words = words
    }
  }
}
</script>

<style>
.D3TagCloud {
  position: relative;
  width: 100%;
  min-height: 600px;
}
svg {
  display: block;
  margin: 0 auto;
}

g {
  transition: opacity 0.25s ease-in;
}
a.Cloud__Word > text {
  transition: all 0.25s ease;
}

a.Cloud__Word:focus,
a.Cloud__Word:active,
a.Cloud__Word:hover {
  text-decoration: none;
}

a.Cloud__Word:focus > text,
a.Cloud__Word:active > text,
a.Cloud__Word:hover > text {
  fill: #ce5454 !important;
}

.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  width: 0;
}

.list-complete-leave-active {
}
</style>
