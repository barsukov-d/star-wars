<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Starship } from '../types/starship'
import StarshipIcon from './StarshipIcon.vue'

const props = defineProps<{
  starships: Starship[]
  loading: boolean
  error: string | null
}>()

const emit = defineEmits<{
  select: [starship: Starship]
}>()

const searchQuery = ref('')
const selectedManufacturers = ref<string[]>([])
const selectedClasses = ref<string[]>([])

function splitManufacturers(value: string): string[] {
  return value
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
}

const manufacturerOptions = computed(() => {
  const unique = new Set<string>()
  for (const starship of props.starships) {
    for (const manufacturer of splitManufacturers(starship.manufacturer)) {
      unique.add(manufacturer)
    }
  }
  return Array.from(unique).sort((a, b) => a.localeCompare(b))
})

const starshipClassOptions = computed(() => {
  const unique = new Set<string>()
  for (const starship of props.starships) {
    if (starship.starship_class) unique.add(starship.starship_class)
  }
  return Array.from(unique).sort((a, b) => a.localeCompare(b))
})

const filteredStarships = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return props.starships.filter((starship) => {
    const matchesQuery =
      !query ||
      [starship.name, starship.model, starship.manufacturer, starship.starship_class].some((field) =>
        field.toLowerCase().includes(query),
      )

    const matchesManufacturer =
      selectedManufacturers.value.length === 0 ||
      splitManufacturers(starship.manufacturer).some((manufacturer) =>
        selectedManufacturers.value.includes(manufacturer),
      )

    const matchesClass =
      selectedClasses.value.length === 0 || selectedClasses.value.includes(starship.starship_class)

    return matchesQuery && matchesManufacturer && matchesClass
  })
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
    <div v-if="!loading && !error" class="filters">
      <fieldset class="filter manufacturer-filter">
        <legend>Производитель</legend>
        <button
          type="button"
          class="reset-filter"
          :disabled="selectedManufacturers.length === 0"
          @click="selectedManufacturers = []"
        >
          Сбросить
        </button>
        <label v-for="manufacturer in manufacturerOptions" :key="manufacturer" class="filter-option">
          <input v-model="selectedManufacturers" type="checkbox" class="manufacturer-checkbox" :value="manufacturer" />
          {{ manufacturer }}
        </label>
      </fieldset>
      <fieldset class="filter class-filter">
        <legend>Класс корабля</legend>
        <button
          type="button"
          class="reset-filter"
          :disabled="selectedClasses.length === 0"
          @click="selectedClasses = []"
        >
          Сбросить
        </button>
        <label v-for="starshipClass in starshipClassOptions" :key="starshipClass" class="filter-option">
          <input v-model="selectedClasses" type="checkbox" class="class-checkbox" :value="starshipClass" />
          {{ starshipClass }}
        </label>
      </fieldset>
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
        <StarshipIcon class="card-icon" />
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
.filters {
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.filter {
  border: 1px solid #93c5fd;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.filter legend {
  color: #1e3a8a;
  font-weight: bold;
  padding: 0 0.25rem;
}
.filter-option {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
}
.reset-filter {
  align-self: flex-start;
  background: none;
  border: 1px solid #93c5fd;
  border-radius: 4px;
  color: #1e3a8a;
  padding: 0.15rem 0.5rem;
  cursor: pointer;
  font-size: 0.85rem;
}
.reset-filter:disabled {
  color: #9ca3af;
  border-color: #d1d5db;
  cursor: default;
}
.card-icon {
  margin-bottom: 0.5rem;
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
