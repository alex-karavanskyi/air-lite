type NavLink = {
  href: string
  label: string
}

export const links: NavLink[] = [
  { href: '/favorites', label: 'Favorites' },
  { href: '/bookings', label: 'Bookings' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/reservations', label: 'Reservations' },
  { href: '/rentals', label: 'My rentals' },
  { href: '/rentals/create', label: 'Create rental' },
  { href: '/profile', label: 'Profile' },
]

export const getActiveDashboardHref = (pathname: string) =>
  links
    .filter(
      ({ href }) => pathname === href || pathname.startsWith(`${href}/`),
    )
    .sort((first, second) => second.href.length - first.href.length)[0]?.href

export const shouldShowNavSearch = (pathname: string) =>
  getActiveDashboardHref(pathname) === undefined
