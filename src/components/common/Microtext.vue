<template>
  <p v-microtext-class="arrow" class="Microtext">
    <slot></slot>&nbsp;
    <i v-if="hasArrow" class="material-icons">{{arrowIcon}}</i>
  </p>
</template>
<script>
export default {
  name: 'Microtext',
  directives: {
    'microtext-class': {
      inserted(el, { value }) {
        if (value && value !== 'none') {
          el.classList.add(`Microtext--arrow-${value}`)
        }
      }
    }
  },
  props: {
    arrow: {
      type: String,
      validator(value) {
        return ['right', 'up', 'down', 'left', 'none'].includes(value)
      },
      default: 'none'
    }
  },
  computed: {
    hasArrow() {
      return this.arrow !== 'none'
    },
    arrowIcon() {
      switch (this.arrow) {
        case 'down':
        case 'up': {
          return 'arrow_drop_' + this.arrow
        }
        default: {
          return 'arrow_' + this.arrow
        }
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
p {
  font-family: 'Cabin', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: $microtext;
  line-height: 1.06rem;
  text-transform: uppercase;
  color: #d84848;
  display: inline-flex;
  align-items: center;
}
</style>
