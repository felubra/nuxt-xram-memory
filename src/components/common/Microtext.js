import Vue from 'vue'
export default Vue.component('Microtext', {
  functional: true,
  props: {
    tag: {
      type: String,
      default: () => 'p',
      validator (value) {
        return ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'].includes(value)
      }
    },
    arrow: {
      type: String,
      validator (value) {
        return ['right', 'up', 'down', 'left', 'none'].includes(value)
      },
      default: 'none'
    },
    arrowPosition: {
      type: String,
      validator (value) {
        return ['before', 'after'].includes(value)
      },
      default: 'after'
    },
    className: {
      type: String,
      default: ''
    }
  },
  render (createElement, context) {
    const { arrow, arrowPosition, className } = context.props
    const additionalClasses = className.split(' ')
    if (arrow !== 'none') {
      const arrowIcon =
        arrow === 'down' || arrow === 'up'
          ? `arrow_drop_${arrow}`
          : `arrow_${arrow}`
      const arrowElement = createElement(
        'i',
        { class: ['material-icons'] },
        arrowIcon
      )
      return createElement(
        context.props.tag,
        {
          class: [
            'microtext',
            `microtext--arrow-${arrow}`,
            ...additionalClasses
          ]
        },
        arrowPosition === 'after'
          ? [context.slots().default, arrowElement]
          : [arrowElement, context.slots().default]
      )
    }
    return createElement(
      context.props.tag,
      { class: ['microtext', ...additionalClasses] },
      context.slots().default
    )
  }
})
