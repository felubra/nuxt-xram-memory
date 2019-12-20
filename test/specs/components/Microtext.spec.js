import { mount, shallowMount } from '@vue/test-utils'
import Microtext from '@/components/common/Microtext.js'

describe('Microtext.js', () => {
  it('deve renderizar como um elemento <p> e classe padrão', () => {
    const text = 'este é um texto'
    const wrapper = shallowMount(Microtext, {
      slots: {
        default: text
      }
    })
    expect(wrapper.find('p').text()).toMatch(text)
    expect(wrapper.classes('microtext')).toBe(true)
  })

  it('deve usar uma tag customizada', () => {
    const text = 'este é um texto'
    const wrapper = shallowMount(Microtext, {
      slots: {
        default: text
      },
      propsData: {
        tag: 'h1'
      }
    })
    expect(wrapper.find('h1').text()).toMatch(text)
  })

  it('deve aceitar uma classe adicional', () => {
    const text = 'este é um texto'
    const wrapper = shallowMount(Microtext, {
      slots: {
        default: text
      },
      propsData: {
        className: 'abacate'
      }
    })
    expect(wrapper.classes('microtext')).toBe(true)
    expect(wrapper.classes('abacate')).toBe(true)
  })

  it('deve renderizar um ícone de seta', () => {
    const text = 'este é um texto'
    const wrapper = shallowMount(Microtext, {
      slots: {
        default: text
      },
      propsData: {
        tag: 'h1',
        arrow: 'left'
      }
    })
    expect(wrapper.find('h1').text()).toMatch(text)
    expect(wrapper.find('h1').contains('i')).toBe(true)
    expect(
      wrapper
        .find('h1')
        .find('i')
        .classes('material-icons')
    ).toBe(true)
    expect(
      wrapper
        .find('h1')
        .find('i')
        .text()
    ).toBe('arrow_left')
    expect(wrapper.find('h1').classes('microtext--arrow-left')).toBe(true)

    const wrapper2 = shallowMount(Microtext, {
      slots: {
        default: text
      },
      propsData: {
        tag: 'h1',
        arrow: 'down'
      }
    })

    expect(wrapper2.find('h1').classes('microtext--arrow-down')).toBe(true)
    expect(
      wrapper2
        .find('h1')
        .find('i')
        .classes('material-icons')
    ).toBe(true)

    expect(
      wrapper2
        .find('h1')
        .find('i')
        .text()
    ).toBe('arrow_drop_down')
  })
})
