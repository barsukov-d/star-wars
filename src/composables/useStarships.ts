import { ref, type Ref } from 'vue'
import type { Starship, SwapiStarshipsPage } from '../types/starship'

const STARSHIPS_ENDPOINT = 'https://www.swapi.tech/api/starships?limit=100&expanded=true'

export interface UseStarshipsResult {
  starships: Ref<Starship[]>
  loading: Ref<boolean>
  error: Ref<string | null>
  load: () => Promise<void>
}

export function useStarships(): UseStarshipsResult {
  const starships = ref<Starship[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function load(): Promise<void> {
    loading.value = true
    error.value = null
    try {
      const collected: Starship[] = []
      let nextUrl: string | null = STARSHIPS_ENDPOINT

      while (nextUrl) {
        const response = await fetch(nextUrl)
        if (!response.ok) {
          throw new Error(`SWAPI request failed with status ${response.status}`)
        }
        const page: SwapiStarshipsPage = await response.json()
        for (const item of page.results) {
          collected.push({ ...item.properties, uid: item.uid })
        }
        nextUrl = page.next
      }

      starships.value = collected
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load starships from SWAPI.'
    } finally {
      loading.value = false
    }
  }

  return { starships, loading, error, load }
}
