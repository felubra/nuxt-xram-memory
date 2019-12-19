import { mount, shallowMount } from '@vue/test-utils'
import Microtext from '@/components/common/Microtext.js'

describe('Microtext.js', () => {
  it('deve renderizar como um elemento <p> por padrão', () => {
    const text = 'este é um texto'
    const wrapper = shallowMount(Microtext, {
      slots: {
        default: text
      }
    })
    expect(wrapper.find('p').text()).toMatch(text)
  })
})
