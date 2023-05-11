<template>
  <h1>Todo</h1>
  <div>
    <div>
      <label for="todo">Enter todo</label>
      <input type="text" data-test="todo-input" v-model="todo" @keyup.enter="onAdd" />
      <button type="button" data-test="add-btn" @click="onAdd">
        Add
      </button>
    </div>
    <ul>
      <li v-for="(todo, i) in store.todos" :key="i">
        {{ todo }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todo'

const todo = ref('')
const store = useTodoStore()

function onAdd () {
  store.addTodo(todo.value)
  todo.value = ""
}
</script>
