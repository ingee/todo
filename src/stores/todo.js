import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref(['hello', 'world', 'nice', 'to', 'meet', 'you'])
  return { todos }
})
