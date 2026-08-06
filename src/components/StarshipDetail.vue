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
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1.5rem;
}
dt {
  font-weight: bold;
}
dd {
  margin: 0 0 0.5rem 0;
}
</style>
