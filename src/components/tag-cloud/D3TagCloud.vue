<template>
  <div ref="Cloud" class="Cloud"/>
</template>

<script>
import {
  TAGCLOUD_KEYWORD_LOWKEY_COLOR,
  TAGCLOUD_KEYWORD_HIGHKEY_COLOR
} from '@/config/constants'

const d3Cloud = require('d3-cloud')
const chromaJS = require('chroma-js')
const d3 = require('d3')

export default {
  name: 'D3TagCloud',
  props: {
    keywords: {
      required: true,
      type: Array
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
    window.removeEventListener('resize', this.makeCloud)
  },
  created() {
    this.layout = {}
  },
  mounted() {
    this.makeCloud(this.$refs.Cloud)
    window.addEventListener('resize', this.makeCloud)
  },
  methods: {
    makeCloud() {
      const el = this.$refs.Cloud
      const dimensions = [Math.min(el.clientWidth, 1200), el.clientHeight]
      this.layout = d3Cloud()
        .size(dimensions)
        .words(this.keywords)
        .padding(2)
        .rotate(function() {
          const avaliableAngles = [15, 45, 60, 90]
          const angle =
            avaliableAngles[Math.floor(Math.random() * avaliableAngles.length)]
          const avNums = [2, 3, 5, 9]
          const numSteps = avNums[Math.floor(Math.random() * avNums.length)]
          const step = (angle * 2) / numSteps
          const angles = Array.apply(undefined, Array(numSteps + 1)).map(
            (n, i) => {
              return i * step - angle
            }
          )
          return angles[Math.floor(Math.random() * angles.length)]
        })
        .font('Vollkorn')
        .fontSize(function(d) {
          return d.size
        })
        .on('end', this.drawCloud)
      this.layout.start()
    },
    drawCloud(words) {
      const svgEl = this.$refs.Cloud.querySelector('svg')
      if (svgEl) {
        this.$refs.Cloud.removeChild(svgEl)
      }
      d3.select(this.$refs.Cloud)
        .append('svg')
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr('width', this.layout.size()[0])
        .attr('height', this.layout.size()[1])
        .append('g')
        .attr(
          'transform',
          'translate(' +
            this.layout.size()[0] / 2 +
            ',' +
            this.layout.size()[1] / 2 +
            ')'
        )
        .selectAll('text')
        .data(words)
        .enter()
        .append('a')
        .attr('href', function(d) {
          return '/search?keywords=["' + d.text + '"]'
        })
        .attr('class', 'Cloud__Word')
        .append('text')
        .style('font-size', function(d) {
          return d.size + 'px'
        })
        .style('fill', function(d) {
          const color = chromaJS.scale([
            TAGCLOUD_KEYWORD_HIGHKEY_COLOR,
            TAGCLOUD_KEYWORD_LOWKEY_COLOR
          ])((d.size - 1) / (100 - 1))
          return color
        })
        .style('font-family', 'Vollkorn')
        .attr('text-anchor', 'middle')
        .attr('transform', function(d) {
          return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')'
        })
        .text(function(d) {
          return d.text
        })
    }
  }
}
</script>

<style>
div.Cloud {
  position: relative;
  width: 100%;
  min-height: 600px;
}
svg {
  display: block;
  margin: 0 auto;
}
</style>
