import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Header from './Header.vue'

describe('Header', () => {
  it('renders an inline svg logo', () => {
    const wrapper = mount(Header)

    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('shows the site name as text in the menu, not a link', () => {
    const wrapper = mount(Header)

    const menu = wrapper.get('.menu')
    expect(menu.text()).toContain('Star Wars Starships Catalog')
    expect(menu.find('a').exists()).toBe(false)
  })
})
