import { mount, shallowMount } from '@vue/test-utils'
import NewsGrid from '@/components/news/NewsGrid.vue'
import newsItems from '../../fixtures/news.items.json'

// Mescle os itens com seus meta-atributos, tal como o componente NewsGrid deve recebê-los
const mergedItems = newsItems.map(item => {
  return {
    ...item,
    ...item._source
  }
})

describe('NewsGrid.vue', () => {
  it('não deve renderizar sem elementos', () => {
    const wrapper = shallowMount(NewsGrid, {})
    expect(wrapper.contains('div')).toBe(false)
  })

  it('deve renderizar corretamente com um elemento de notícia', () => {
    const wrapper = mount(NewsGrid, {
      propsData: {
        items: [mergedItems[0]]
      }
    })
    expect(wrapper.contains('div')).toBe(true)
  })
})
