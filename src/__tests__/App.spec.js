import { describe, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useTodoStore } from '@/stores/todo'
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

  it('adds todo-item when add-btn is clicked', async () => {
    const wrapper = createWrapper()

    const todo = 'have lunch'
    const todoInput = wrapper.find('[data-test="todo-input"]')
    await todoInput.setValue(todo)

    const addBtn = wrapper.find('[data-test="add-btn"]')
    await addBtn.trigger('click')

    const store = useTodoStore()
    expect(store.addTodo).toBeCalledWith(todo)
  })
})
