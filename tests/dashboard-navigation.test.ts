import assert from 'node:assert/strict'
import test from 'node:test'

import * as dashboardNavigation from '../shared/utils/links.ts'

const { links } = dashboardNavigation

test('account navigation exposes clean routes in CRM sidebar order', () => {
  assert.deepEqual(
    links.map(({ href, label }) => ({ href, label })),
    [
      { href: '/favorites', label: 'Favorites' },
      { href: '/bookings', label: 'Bookings' },
      { href: '/reviews', label: 'Reviews' },
      { href: '/reservations', label: 'Reservations' },
      { href: '/rentals', label: 'My rentals' },
      { href: '/rentals/create', label: 'Create rental' },
      { href: '/profile', label: 'Profile' },
    ],
  )
})

test('account navigation selects the most specific matching page', () => {
  const getActiveDashboardHref = Reflect.get(
    dashboardNavigation,
    'getActiveDashboardHref',
  ) as (pathname: string) => string | undefined

  assert.equal(getActiveDashboardHref('/rentals/create'), '/rentals/create')
  assert.equal(getActiveDashboardHref('/rentals/abc/edit'), '/rentals')
  assert.equal(getActiveDashboardHref('/profile/create'), '/profile')
  assert.equal(getActiveDashboardHref('/properties/abc'), undefined)
})

test('navbar search stays hidden throughout the account dashboard', () => {
  const shouldShowNavSearch = Reflect.get(
    dashboardNavigation,
    'shouldShowNavSearch',
  ) as (pathname: string) => boolean

  const dashboardPaths = [
    '/favorites',
    '/bookings',
    '/reviews',
    '/reservations',
    '/rentals',
    '/rentals/create',
    '/rentals/abc/edit',
    '/profile',
    '/profile/create',
  ]

  for (const pathname of dashboardPaths) {
    assert.equal(shouldShowNavSearch(pathname), false, pathname)
  }

  assert.equal(shouldShowNavSearch('/'), true)
  assert.equal(shouldShowNavSearch('/properties/abc'), true)
})
