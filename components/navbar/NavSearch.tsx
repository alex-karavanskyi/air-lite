'use client'
import { Input } from '../../shared/ui/input'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { Suspense, useState, useEffect } from 'react'

function NavSearchContent() {
  const searchParams = useSearchParams()

  const pathname = usePathname()
  const { replace } = useRouter()
  const [search, setSearch] = useState(
    searchParams.get('search')?.toString() || '',
  )
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)
  useEffect(() => {
    if (!searchParams.get('search')) {
      setSearch('')
    }
  }, [searchParams])
  return (
    <Input
      type='search'
      placeholder='find a property...'
      className='max-w-xs dark:bg-muted '
      onChange={(e) => {
        setSearch(e.target.value)
        handleSearch(e.target.value)
      }}
      value={search}
    />
  )
}

function NavSearch() {
  return (
    <Suspense fallback={null}>
      <NavSearchContent />
    </Suspense>
  )
}

export default NavSearch
