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

  it('filters starships by name case-insensitively', async () => {
    const falcon = makeStarship({ uid: '9', name: 'Millennium Falcon' })
    const xwing = makeStarship({ uid: '12', name: 'X-wing' })
    const wrapper = mount(StarshipList, {
      props: { starships: [falcon, xwing], loading: false, error: null },
    })

    await wrapper.get('#starship-search').setValue('MILLENNIUM')

    const cards = wrapper.findAll('.card')
    expect(cards).toHaveLength(1)
    expect(cards[0].text()).toContain('Millennium Falcon')
  })

  it('filters starships by model, manufacturer and class', async () => {
    const falcon = makeStarship({
      uid: '9',
      name: 'Millennium Falcon',
      model: 'YT-1300 light freighter',
      manufacturer: 'Corellian Engineering Corporation',
      starship_class: 'Light freighter',
    })
    const xwing = makeStarship({
      uid: '12',
      name: 'X-wing',
      model: 'T-65 X-wing',
      manufacturer: 'Incom Corporation',
      starship_class: 'Starfighter',
    })
    const wrapper = mount(StarshipList, {
      props: { starships: [falcon, xwing], loading: false, error: null },
    })

    await wrapper.get('#starship-search').setValue('incom')
    expect(wrapper.findAll('.card').map((c) => c.text())).toEqual([expect.stringContaining('X-wing')])

    await wrapper.get('#starship-search').setValue('starfighter')
    expect(wrapper.findAll('.card').map((c) => c.text())).toEqual([expect.stringContaining('X-wing')])

    await wrapper.get('#starship-search').setValue('yt-1300')
    expect(wrapper.findAll('.card').map((c) => c.text())).toEqual([expect.stringContaining('Millennium Falcon')])
  })

  it('shows the full list when the search field is empty', () => {
    const falcon = makeStarship({ uid: '9', name: 'Millennium Falcon' })
    const xwing = makeStarship({ uid: '12', name: 'X-wing' })
    const wrapper = mount(StarshipList, {
      props: { starships: [falcon, xwing], loading: false, error: null },
    })

    expect(wrapper.findAll('.card')).toHaveLength(2)
  })

  it('shows a no-results message when nothing matches the search', async () => {
    const starship = makeStarship()
    const wrapper = mount(StarshipList, {
      props: { starships: [starship], loading: false, error: null },
    })

    await wrapper.get('#starship-search').setValue('zzzzzz-no-match')

    expect(wrapper.find('.grid').exists()).toBe(false)
    expect(wrapper.text()).toContain('Корабли не найдены')
  })

  it('restores the full list after clearing the search field', async () => {
    const falcon = makeStarship({ uid: '9', name: 'Millennium Falcon' })
    const xwing = makeStarship({ uid: '12', name: 'X-wing' })
    const wrapper = mount(StarshipList, {
      props: { starships: [falcon, xwing], loading: false, error: null },
    })

    const input = wrapper.get('#starship-search')
    await input.setValue('Millennium')
    expect(wrapper.findAll('.card')).toHaveLength(1)

    await input.setValue('')
    expect(wrapper.findAll('.card')).toHaveLength(2)
  })

  it('emits select for a card that remains after filtering', async () => {
    const falcon = makeStarship({ uid: '9', name: 'Millennium Falcon' })
    const xwing = makeStarship({ uid: '12', name: 'X-wing' })
    const wrapper = mount(StarshipList, {
      props: { starships: [falcon, xwing], loading: false, error: null },
    })

    await wrapper.get('#starship-search').setValue('X-wing')
    await wrapper.get('.card').trigger('click')

    expect(wrapper.emitted('select')?.[0]).toEqual([xwing])
  })
})
