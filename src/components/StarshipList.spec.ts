import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import StarshipList from './StarshipList.vue'
import type { Starship } from '../types/starship'

function makeStarship(overrides: Partial<Starship> = {}): Starship {
  return {
    uid: '9',
    name: 'Millennium Falcon',
    model: 'YT-1300 light freighter',
    manufacturer: 'Corellian Engineering Corporation',
    cost_in_credits: '100000',
    length: '34.37',
    max_atmosphering_speed: '1050',
    crew: '4',
    passengers: '6',
    cargo_capacity: '100000',
    consumables: '2 months',
    hyperdrive_rating: '0.5',
    MGLT: '75',
    starship_class: 'Light freighter',
    pilots: [],
    films: [],
    created: '',
    edited: '',
    url: 'https://www.swapi.tech/api/starships/10',
    ...overrides,
  }
}

describe('StarshipList', () => {
  it('shows a loading indicator while loading', () => {
    const wrapper = mount(StarshipList, {
      props: { starships: [], loading: true, error: null },
    })

    expect(wrapper.text()).toContain('Loading...')
  })

  it('shows an error message when loading failed', () => {
    const wrapper = mount(StarshipList, {
      props: { starships: [], loading: false, error: 'Network error' },
    })

    expect(wrapper.get('[role="alert"]').text()).toBe('Network error')
  })

  it('renders each starship with name, model, manufacturer and class', () => {
    const starship = makeStarship()
    const wrapper = mount(StarshipList, {
      props: { starships: [starship], loading: false, error: null },
    })

    const card = wrapper.get('.card')
    expect(card.text()).toContain('Millennium Falcon')
    expect(card.text()).toContain('YT-1300 light freighter')
    expect(card.text()).toContain('Corellian Engineering Corporation')
    expect(card.text()).toContain('Light freighter')
  })

  it('emits select with the clicked starship', async () => {
    const starship = makeStarship()
    const wrapper = mount(StarshipList, {
      props: { starships: [starship], loading: false, error: null },
    })

    await wrapper.get('.card').trigger('click')

    expect(wrapper.emitted('select')?.[0]).toEqual([starship])
  })
})
