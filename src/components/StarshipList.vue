<script setup lang="ts">
import type { Starship } from '../types/starship'

defineProps<{
  starships: Starship[]
  loading: boolean
  error: string | null
}>()

const emit = defineEmits<{
  select: [starship: Starship]
}>()
</script>

<template>
  <div class="starship-list">
    <p v-if="loading" role="status">Loading...</p>
    <p v-else-if="error" role="alert" class="error">{{ error }}</p>
    <ul v-else class="grid">
      <li
        v-for="starship in starships"
        :key="starship.uid"
        class="card"
        tabindex="0"
        @click="emit('select', starship)"
        @keyup.enter="emit('select', starship)"
      >
        <h2>{{ starship.name }}</h2>
        <dl>
          <dt>Model</dt>
          <dd>{{ starship.model }}</dd>
          <dt>Manufacturer</dt>
          <dd>{{ starship.manufacturer }}</dd>
          <dt>Class</dt>
          <dd>{{ starship.starship_class }}</dd>
        </dl>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  padding: 0;
}
.card {
  border: 1px solid #93c5fd;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  background-color: #ffffff;
}
.card:hover,
.card:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px #bfdbfe;
}
.card h2 {
  color: #1e3a8a;
}
.error {
  color: #b00020;
}
</style>
