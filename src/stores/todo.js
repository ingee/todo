import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref([])

  function addTodo(todo) {
    todos.value.push(todo)
  }

  return {
    todos,
    addTodo,
  }
})
