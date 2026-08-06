import { afterEach, describe, expect, it, vi } from 'vitest'
import { useStarships } from './useStarships'

function jsonResponse(body: unknown, ok = true, status = 200) {
  return {
    ok,
    status,
    json: async () => body,
  } as Response
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('useStarships', () => {
  it('walks pagination and collects starships from every page', async () => {
    const page1 = {
      message: 'ok',
      total_records: 2,
      total_pages: 2,
      previous: null,
      next: 'https://www.swapi.tech/api/starships?page=2',
      results: [
        { uid: '2', description: 'A Starship', properties: { name: 'CR90 corvette', model: 'CR90 corvette', starship_class: 'corvette', manufacturer: 'CEC', cost_in_credits: '3500000', length: '150', max_atmosphering_speed: '950', crew: '30-165', passengers: '600', cargo_capacity: '3000000', consumables: '1 year', hyperdrive_rating: '2.0', MGLT: '60', pilots: [], films: [], created: '', edited: '', url: '' } },
      ],
    }
    const page2 = {
      message: 'ok',
      total_records: 2,
      total_pages: 2,
      previous: 'https://www.swapi.tech/api/starships?page=1',
      next: null,
      results: [
        { uid: '3', description: 'A Starship', properties: { name: 'Star Destroyer', model: 'Imperial I-class', starship_class: 'Star Destroyer', manufacturer: 'Kuat Drive Yards', cost_in_credits: '150000000', length: '1,600', max_atmosphering_speed: '975', crew: '47,060', passengers: 'n/a', cargo_capacity: '36000000', consumables: '2 years', hyperdrive_rating: '1.0', MGLT: '60', pilots: [], films: [], created: '', edited: '', url: '' } },
      ],
    }

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse(page1))
      .mockResolvedValueOnce(jsonResponse(page2))
    vi.stubGlobal('fetch', fetchMock)

    const { starships, loading, error, load } = useStarships()
    await load()

    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(loading.value).toBe(false)
    expect(error.value).toBeNull()
    expect(starships.value.map((s) => s.name)).toEqual(['CR90 corvette', 'Star Destroyer'])
  })

  it('sets an error message when the request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse(null, false, 500)))

    const { starships, loading, error, load } = useStarships()
    await load()

    expect(loading.value).toBe(false)
    expect(starships.value).toEqual([])
    expect(error.value).toContain('500')
  })

  it('sets an error message when fetch itself rejects', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')))

    const { error, load } = useStarships()
    await load()

    expect(error.value).toBe('network down')
  })
})
