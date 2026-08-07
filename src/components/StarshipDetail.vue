<script setup lang="ts">
import type { Starship } from '../types/starship'

defineProps<{
  starship: Starship
}>()

const emit = defineEmits<{
  close: []
}>()

const FIELD_LABELS: Array<[keyof Starship, string]> = [
  ['model', 'Model'],
  ['manufacturer', 'Manufacturer'],
  ['starship_class', 'Starship class'],
  ['cost_in_credits', 'Cost (credits)'],
  ['length', 'Length'],
  ['max_atmosphering_speed', 'Max atmosphering speed'],
  ['crew', 'Crew'],
  ['passengers', 'Passengers'],
  ['cargo_capacity', 'Cargo capacity'],
  ['consumables', 'Consumables'],
  ['hyperdrive_rating', 'Hyperdrive rating'],
  ['MGLT', 'MGLT'],
]
</script>

<template>
  <section class="starship-detail" role="dialog" aria-label="Starship details">
    <button type="button" @click="emit('close')">Close</button>
    <h2>{{ starship.name }}</h2>
    <dl>
      <template v-for="[field, label] in FIELD_LABELS" :key="field">
        <dt>{{ label }}</dt>
        <dd>{{ starship[field] }}</dd>
      </template>
    </dl>
  </section>
</template>

<style scoped>
.starship-detail {
  border: 1px solid #93c5fd;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1.5rem;
  background-color: #f0f7ff;
}
h2 {
  color: #1e3a8a;
}
button {
  background-color: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
}
button:hover {
  background-color: #1e40af;
}
dt {
  font-weight: bold;
  color: #1e3a8a;
}
dd {
  margin: 0 0 0.5rem 0;
}
</style>
