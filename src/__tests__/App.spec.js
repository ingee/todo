import { describe, it, expect, vi } from 'vitest'
import { shallowMount, flushPromises } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import merge from 'lodash.merge'
import App from '@/App.vue'

describe('App.vue', () => {
  function createWrapper (option) {
    const pinia = createTestingPinia({
      initialState: option
        ? {
            todo: option.initialState,
          }
        : {},
      createSpy: vi.fn,
    })
    const defaultOpt = {
      global: {
        plugins: [pinia],
      },
    }
    return shallowMount(App, merge(defaultOpt, option))
  }

  it('shows todos in store', () => {
    const todos = [
      'wake up',
      'wash up',
      'go to work',
    ]
    const initialState = { todos }
    const wrapper = createWrapper({ initialState })
    for (const todo of todos) {
      expect(wrapper.text()).toContain(todo)
    }
  })
})
