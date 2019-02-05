<template>
  <div ref="sky"></div>
</template>

<script>
const d3Cloud = require('d3-cloud')
const d3 = require('d3')
export default {
  name: 'D3TagCloud',
  props: {
    keywords: {
      required: true,
      type: Array
    }
  },
  computed: {
    words() {
      return this.keywords.map(keyword => {
        return {
          text: keyword.key,
          size: (keyword.doc_count / this.wordsStdDeviation) * 14
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
  mounted() {
    const sky = this.$refs.sky
    function draw(words) {
      d3.select(sky)
        .append('svg')
        .attr('width', layout.size()[0])
        .attr('height', layout.size()[1])
        .append('g')
        .attr(
          'transform',
          'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')'
        )
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', function(d) {
          return d.size + 'px'
        })
        .style('font-family', 'Asmath Solid')
        .attr('text-anchor', 'middle')
        .attr('transform', function(d) {
          return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')'
        })
        .text(function(d) {
          return d.text
        })
    }
    const layout = d3Cloud()
      .size([960, 500])
      .words(this.words)
      .padding(5)
      .rotate(function(d) {
        const signal = Math.random() < 0.5 ? -1 : 1
        return ~~(Math.random() * signal * 2 * (90 - Math.max(d.size, 90)))
      })
      .font('Asmath Solid')
      .fontSize(function(d) {
        return d.size
      })
      .on('end', draw)
    layout.start()
  }
}
</script>
