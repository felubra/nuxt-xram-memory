<template>
  <no-ssr>
    <div
      v-masonry
      transition-duration=".250s"
      fit-width="true"
      item-selector=".item"
      colum-width="250"
      gutter="0"
      class="masonry-container"
    >
      <div v-for="(item, index) in blocks" :key="index" v-blockSize v-masonry-tile class="item">
        <p>{{item}} - {{index}}</p>
      </div>
    </div>
  </no-ssr>
</template>

<script>
const BLOCK_SIZES = ['360x240', '150x80', '480x360', '250x250', '120x360']
export default {
  name: 'ImageGrid',
  directives: {
    blockSize: {
      bind(el, binding, vnode) {
        const [width, height] = vnode.context.getBlockSize().split('x')
        el.setAttribute('style', `width: 250px; height: ${height}px;`)
      }
    }
  },
  data() {
    return {
      blocks: [
        'Perferendis sit laboriosam. Aut in soluta qui aliquid et adipisci. Alias consectetur architecto odit.',
        'Ipsa natus enim consequuntur fugit. Ut at quis fugiat officiis doloribus est quam. Et repellat maiores. Repudiandae error ea.',
        'Qui nam est eos ab exercitationem. Quia officia et dignissimos dolores reprehenderit aut fugit ut. Molestiae sunt et.',
        'Omnis sit aspernatur voluptatem. Voluptas suscipit velit suscipit distinctio ipsam dolorem debitis quisquam est.',
        'Voluptatem voluptatem repellat. Dicta vitae ratione aperiam rem totam repellendus maiores.',
        'Pariatur unde omnis incidunt tenetur aut quae. Quia libero a dolor.',
        'Reprehenderit ut ea ullam repudiandae voluptas quos ad. Tenetur temporibus consequuntur quia.',
        'Omnis doloremque placeat fugiat id dolorum. Impedit veritatis nesciunt sed.',
        'Perferendis sit laboriosam. Aut in soluta qui aliquid et adipisci. Alias consectetur architecto odit.',
        'Ipsa natus enim consequuntur fugit. Ut at quis fugiat officiis doloribus est quam. Et repellat maiores. Repudiandae error ea.',
        'Qui nam est eos ab exercitationem. Quia officia et dignissimos dolores reprehenderit aut fugit ut. Molestiae sunt et.',
        'Omnis sit aspernatur voluptatem. Voluptas suscipit velit suscipit distinctio ipsam dolorem debitis quisquam est.',
        'Voluptatem voluptatem repellat. Dicta vitae ratione aperiam rem totam repellendus maiores.',
        'Pariatur unde omnis incidunt tenetur aut quae. Quia libero a dolor.',
        'Reprehenderit ut ea ullam repudiandae voluptas quos ad. Tenetur temporibus consequuntur quia.',
        'Omnis doloremque placeat fugiat id dolorum. Impedit veritatis nesciunt sed.',
        'Perferendis sit laboriosam. Aut in soluta qui aliquid et adipisci. Alias consectetur architecto odit.',
        'Ipsa natus enim consequuntur fugit. Ut at quis fugiat officiis doloribus est quam. Et repellat maiores. Repudiandae error ea.',
        'Qui nam est eos ab exercitationem. Quia officia et dignissimos dolores reprehenderit aut fugit ut. Molestiae sunt et.',
        'Omnis sit aspernatur voluptatem. Voluptas suscipit velit suscipit distinctio ipsam dolorem debitis quisquam est.',
        'Voluptatem voluptatem repellat. Dicta vitae ratione aperiam rem totam repellendus maiores.',
        'Pariatur unde omnis incidunt tenetur aut quae. Quia libero a dolor.',
        'Reprehenderit ut ea ullam repudiandae voluptas quos ad. Tenetur temporibus consequuntur quia.',
        'Omnis doloremque placeat fugiat id dolorum. Impedit veritatis nesciunt sed.',
        'Perferendis sit laboriosam. Aut in soluta qui aliquid et adipisci. Alias consectetur architecto odit.',
        'Ipsa natus enim consequuntur fugit. Ut at quis fugiat officiis doloribus est quam. Et repellat maiores. Repudiandae error ea.',
        'Qui nam est eos ab exercitationem. Quia officia et dignissimos dolores reprehenderit aut fugit ut. Molestiae sunt et.',
        'Omnis sit aspernatur voluptatem. Voluptas suscipit velit suscipit distinctio ipsam dolorem debitis quisquam est.',
        'Voluptatem voluptatem repellat. Dicta vitae ratione aperiam rem totam repellendus maiores.',
        'Pariatur unde omnis incidunt tenetur aut quae. Quia libero a dolor.',
        'Reprehenderit ut ea ullam repudiandae voluptas quos ad. Tenetur temporibus consequuntur quia.',
        'Omnis doloremque placeat fugiat id dolorum. Impedit veritatis nesciunt sed.'
      ]
    }
  },
  mounted() {
    if (typeof this.$redrawVueMasonry === 'function') {
      this.$redrawVueMasonry()
    }
  },
  methods: {
    getBlockSize() {
      return BLOCK_SIZES[Math.floor(Math.random() * BLOCK_SIZES.length)]
    }
  }
}
</script>


<style scoped>
.item {
  display: inline-block;
  border: solid 1px black;
}
.masonry-container {
  margin: 0 auto;
}
</style>
