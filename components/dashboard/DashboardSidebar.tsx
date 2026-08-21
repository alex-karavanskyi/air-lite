'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LuCalendarDays,
  LuCirclePlus,
  LuHeart,
  LuHouse,
  LuMessageSquareText,
  LuNotebookTabs,
  LuPanelLeft,
  LuUserRound,
} from 'react-icons/lu'
import type { IconType } from 'react-icons'

import SignOutLink from '@/components/navbar/SignOutLink'
import { cn } from '@/shared/lib/utils'
import { getActiveDashboardHref, links } from '@/utils/links'

const linkIcons: Record<string, IconType> = {
  '/favorites': LuHeart,
  '/bookings': LuCalendarDays,
  '/reviews': LuMessageSquareText,
  '/reservations': LuNotebookTabs,
  '/rentals': LuHouse,
  '/rentals/create': LuCirclePlus,
  '/profile': LuUserRound,
}

const DashboardSidebar = () => {
  const pathname = usePathname()
  const activeHref = getActiveDashboardHref(pathname)

  return (
    <aside className='-mx-4 overflow-hidden border-y border-border/70 bg-card/80 shadow-sm sm:-mx-8 lg:sticky lg:top-28 lg:mx-0 lg:rounded-3xl lg:border'>
      <header className='hidden border-b border-border/70 p-5 lg:block'>
        <div className='flex items-center gap-3'>
          <span className='flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
            <LuPanelLeft className='size-5' />
          </span>
          <div>
            <p className='font-semibold tracking-tight'>Your workspace</p>
            <p className='text-xs text-muted-foreground'>Manage your AirLite account</p>
          </div>
        </div>
      </header>

      <nav
        aria-label='Account navigation'
        className='flex gap-1 overflow-x-auto p-2 lg:flex-col lg:p-3'
      >
        {links.map(({ href, label }) => {
          const Icon = linkIcons[href]
          const isActive = activeHref === href

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex shrink-0 items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:w-full',
                isActive &&
                  'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:text-primary-foreground',
              )}
            >
              <Icon className='size-4' />
              {label}
            </Link>
          )
        })}

        <div className='shrink-0 border-l border-border/70 pl-1 lg:mt-2 lg:border-l-0 lg:border-t lg:pt-2'>
          <SignOutLink />
        </div>
      </nav>
    </aside>
  )
}

export default DashboardSidebar
