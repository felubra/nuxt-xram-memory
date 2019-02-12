<template>
  <div class="sky" ref="sky"></div>
</template>

<script>
const d3Cloud = require('d3-cloud')
const chromaJS = require('chroma-js')
const slugify = require('slugify')
const d3 = require('d3')
export default {
  name: 'D3TagCloud',
  props: {
    keywords: {
      required: true,
      type: Array
    }
  },
  methods: {
    makeCloud(event) {
      const el = this.$refs.sky
      return this.$nextTick(function() {
        const dimensions = [Math.min(el.clientWidth, 1200), el.clientHeight]

        this.layout = d3Cloud()
          .size(dimensions)
          .words(this.words)
          .padding(2)
          .rotate(function(d) {
            const avaliableAngles = [15, 45, 60, 90]
            const angle =
              avaliableAngles[
                Math.floor(Math.random() * avaliableAngles.length)
              ]
            const avNums = [2, 3, 5, 9]
            const numSteps = avNums[Math.floor(Math.random() * avNums.length)]
            const step = (angle * 2) / numSteps
            const angles = Array.apply(undefined, Array(numSteps + 1)).map(
              (n, i, c) => {
                return i * step - angle
              }
            )
            return angles[Math.floor(Math.random() * angles.length)]
          })
          .font('Asmath Solid')
          .fontSize(function(d) {
            return d.size
          })
          .on('end', this.drawCloud)
        this.layout.start()
      })
    },
    drawCloud(words) {
      this.$nextTick(function() {
        try {
          const svgEl = this.$refs.sky.querySelector('svg')
          if (svgEl) {
            this.$refs.sky.removeChild(svgEl)
          }
        } catch {
          //TODO: verificar porque o elemento this.$refs.sky não está disponível
        }
        d3.select(this.$refs.sky)
          .append('svg')
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
          .append('text')
          .style('font-size', function(d) {
            return d.size + 'px'
          })
          .style('fill', function(d) {
            const color = chromaJS.scale(['#AA0000', '#f00'])(
              (d.size - 1) / (100 - 1)
            )
            return color
          })
          .style('font-family', 'Asmath Solid')
          .attr('text-anchor', 'middle')
          .attr('transform', function(d) {
            return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')'
          })
          .append('a')
          .attr('href', function(d) {
            return '/keyword/' + slugify(d.text)
          })
          .text(function(d) {
            return d.text
          })
      })
    }
  },
  computed: {
    words() {
      //TODO: calcular isso daqui em função da largura do container
      const FONT_SIZE_DELTA = 16
      return this.keywords.map(keyword => {
        return {
          text: keyword.key,
          size: (keyword.doc_count / this.wordsStdDeviation) * FONT_SIZE_DELTA
        }
      })
    },
    wordsStdDeviation() {
      function standardDeviation(values) {
        const avg = average(values)

        const squareDiffs = values.map(function(value) {
          const diff = value - avg
          const sqrDiff = diff * diff
          return sqrDiff
        })

        const avgSquareDiff = average(squareDiffs)

        const stdDev = Math.sqrt(avgSquareDiff)
        return stdDev
      }

      function average(data) {
        const sum = data.reduce(function(sum, value) {
          return sum + value
        }, 0)

        const avg = sum / data.length
        return avg
      }
      return standardDeviation(this.keywords.map(keyword => keyword.doc_count))
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.makeCloud)
  },
  created() {
    this.layout = {}
  },
  mounted() {
    this.makeCloud(this.$refs.sky)
    window.addEventListener('resize', this.makeCloud)
  },
  updated() {
    this.makeCloud(this.$refs.sky)
    window.addEventListener('resize', this.makeCloud)
  }
}
</script>

<style>
div.sky {
  position: relative;
  width: 100%;
  min-height: 600px;
}
</style>
