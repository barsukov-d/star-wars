import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import StarshipIcon from './StarshipIcon.vue'

describe('StarshipIcon', () => {
  it('renders an inline svg illustration', () => {
    const wrapper = mount(StarshipIcon)

    expect(wrapper.find('svg').exists()).toBe(true)
  })
})
