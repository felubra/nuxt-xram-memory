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
          size: 16 * Math.log(keyword.doc_count * 100)
        }
      })
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
        .style('font-family', 'Impact')
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
      .rotate(function() {
        return ~(Math.random() * 2 * 90)
      })
      .font('sans-serif')
      .fontSize(function(d) {
        return d.size
      })
      .on('end', draw)
    layout.start()
  }
}
</script>
