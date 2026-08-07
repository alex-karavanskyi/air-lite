import { categories } from '@/utils/categories'
import { ScrollArea, ScrollBar } from '../../shared/ui/scroll-area'
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
    <section>
      <ScrollArea className='py-5'>
        <div className='flex justify-center gap-2 pb-2'>
          {categories.map((item) => {
            const isActive = item.label === category
            return (
              <Link
                key={item.label}
                href={`/?category=${item.label}${searchTerm}`}
              >
                <article
                  className={`flex w-[108px] cursor-pointer flex-col items-center rounded-2xl border px-3 py-3 transition-all duration-200 ${
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
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </section>
  )
}
export default CategoriesList
