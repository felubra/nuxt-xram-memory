import Vue from 'vue'
export default Vue.component('Microtext', {
  functional: true,
  props: {
    tag: {
      type: String,
      default: () => 'p',
      validator(value) {
        return ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'].includes(value)
      }
    },
    arrow: {
      type: String,
      validator(value) {
        return ['right', 'up', 'down', 'left', 'none'].includes(value)
      },
      default: 'none'
    }
  },
  render(createElement, context) {
    const { arrow } = context.props
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
        { class: ['microtext', `microtext--arrow-${arrow}`] },
        [context.slots().default, arrowElement]
      )
    }
    return createElement(
      context.props.tag,
      { class: ['microtext'] },
      context.slots().default
    )
  }
})
