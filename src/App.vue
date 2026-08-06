<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useStarships } from './composables/useStarships'
import type { Starship } from './types/starship'
import StarshipList from './components/StarshipList.vue'
import StarshipDetail from './components/StarshipDetail.vue'

const { starships, loading, error, load } = useStarships()
const selectedStarship = ref<Starship | null>(null)

onMounted(load)
</script>

<template>
  <main class="app">
    <h1>Star Wars Starships Catalog</h1>
    <StarshipList
      :starships="starships"
      :loading="loading"
      :error="error"
      @select="(starship) => (selectedStarship = starship)"
    />
    <StarshipDetail v-if="selectedStarship" :starship="selectedStarship" @close="selectedStarship = null" />
  </main>
</template>

<style scoped>
.app {
  max-width: 960px;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: system-ui, sans-serif;
}
</style>
