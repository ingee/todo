<template>
  <h1>Todo</h1>
  <div>
    <ul>
      <li v-for="(todo, i) in store.todos" :key="i">
        {{ todo }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useTodoStore } from '@/stores/todo'
const store = useTodoStore()
</script>
