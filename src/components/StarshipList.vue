<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Starship } from '../types/starship'

const props = defineProps<{
  starships: Starship[]
  loading: boolean
  error: string | null
}>()

const emit = defineEmits<{
  select: [starship: Starship]
}>()

const searchQuery = ref('')

const filteredStarships = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return props.starships

  return props.starships.filter((starship) =>
    [starship.name, starship.model, starship.manufacturer, starship.starship_class].some((field) =>
      field.toLowerCase().includes(query),
    ),
  )
})
</script>

<template>
  <div class="starship-list">
    <div v-if="!loading && !error" class="search">
      <label for="starship-search">Поиск кораблей</label>
      <input
        id="starship-search"
        v-model="searchQuery"
        type="search"
        placeholder="Поиск кораблей"
      />
    </div>
    <p v-if="loading" role="status">Loading...</p>
    <p v-else-if="error" role="alert" class="error">{{ error }}</p>
    <p v-else-if="filteredStarships.length === 0" class="empty">Корабли не найдены</p>
    <ul v-else class="grid">
      <li
        v-for="starship in filteredStarships"
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
.search {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.search input {
  padding: 0.5rem;
  border: 1px solid #93c5fd;
  border-radius: 6px;
  font-size: 1rem;
}
.empty {
  color: #1e3a8a;
}
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
