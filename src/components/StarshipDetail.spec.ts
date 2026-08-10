import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import StarshipDetail from './StarshipDetail.vue'
import type { Starship } from '../types/starship'

const starship: Starship = {
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
}

describe('StarshipDetail', () => {
  it('renders the full set of starship characteristics', () => {
    const wrapper = mount(StarshipDetail, { props: { starship } })
    const text = wrapper.text()

    expect(text).toContain('Millennium Falcon')
    expect(text).toContain('100000')
    expect(text).toContain('34.37')
    expect(text).toContain('4')
    expect(text).toContain('6')
    expect(text).toContain('2 months')
    expect(text).toContain('0.5')
    expect(text).toContain('Light freighter')
  })

  it('emits close when the close button is clicked', async () => {
    const wrapper = mount(StarshipDetail, { props: { starship } })

    await wrapper.get('button').trigger('click')

    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('renders an inline svg illustration', () => {
    const wrapper = mount(StarshipDetail, { props: { starship } })

    expect(wrapper.find('svg').exists()).toBe(true)
  })
})
