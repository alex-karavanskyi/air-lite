import { categories } from '@/utils/categories'
import Link from 'next/link'

function CategoriesList({
  category,
  search,
}: {
  category?: string
  search?: string
}) {
  const searchTerm = search ? `&search=${search}` : ''
  return (
    <section className='py-5'>
      <div className='grid grid-cols-3 gap-2 px-4 sm:grid-cols-4 md:flex md:justify-center md:px-0'>
        {categories.map((item) => {
          const isActive = item.label === category
          return (
            <Link
              key={item.label}
              href={`/?category=${item.label}${searchTerm}`}
            >
              <article
                className={`flex w-full cursor-pointer flex-col items-center rounded-2xl border px-3 py-3 transition-all duration-200 md:w-[108px] ${
                  isActive
                    ? 'border-primary/25 bg-primary/[0.07] text-primary shadow-sm'
                    : 'border-transparent text-muted-foreground hover:border-border hover:bg-card hover:text-foreground'
                }`}
              >
                <item.icon className='size-6' />
                <p className='mt-2 text-xs font-medium capitalize'>
                  {item.label}
                </p>
              </article>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
export default CategoriesList
