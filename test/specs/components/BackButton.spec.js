import { shallowMount } from '@vue/test-utils'
import BackButton from '@/components/common/BackButton.vue'

const $router = {
  go: jest.fn(n => {})
}

describe('BackButton.vue', () => {
  it('deve voltar usando o vue-router', () => {
    const wrapper = shallowMount(BackButton, {
      mocks: {
        $router
      }
    })
    wrapper.trigger('click')
    expect($router.go.mock.calls[0][0]).toBe(-1)
  })
})
