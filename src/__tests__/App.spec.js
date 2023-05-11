import { describe, it, expect, vi } from 'vitest'
import { shallowMount, flushPromises } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useTodoStore } from '@/stores/todo'
import merge from 'lodash.merge'
import App from '@/App.vue'

describe('App.vue', () => {
  async function setStore (state) {
    const store = useTodoStore()
    store.$patch(state)
    await flushPromises()
    return store
  }

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

  it('removes todo-item when rm-btn is clicked', async () => {
    const todo = 'something to do'
    const wrapper = createWrapper({
      initialState: {
        todos: [ todo ],
      },
    })
    let rmBtns = wrapper.findAll('[data-test="rm-btn"]')
    expect(rmBtns.length).toBe(1)
    await rmBtns.at(0).trigger('click')
    let store = useTodoStore()
    expect(store.rmTodo).toBeCalledWith(0)

    const todos = [
      'something #1',
      'something #2',
      'something #3',
    ]
    store = await setStore({ todos })
    rmBtns = wrapper.findAll('[data-test="rm-btn"]')
    expect(rmBtns.length).toBe(todos.length)
    await rmBtns.at(1).trigger('click')
    expect(store.rmTodo).toBeCalledWith(1)
  })
})
