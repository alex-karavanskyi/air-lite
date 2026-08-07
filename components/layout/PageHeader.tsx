type PageHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  children?: React.ReactNode
}

const PageHeader = ({
  eyebrow,
  title,
  description,
  children,
}: PageHeaderProps) => {
  return (
    <header className='mb-8 flex flex-col gap-5 border-b border-border/70 pb-7 sm:flex-row sm:items-end sm:justify-between'>
      <div className='max-w-2xl'>
        {eyebrow && (
          <p className='mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary'>
            {eyebrow}
          </p>
        )}
        <h1 className='text-3xl font-semibold tracking-[-0.03em] sm:text-4xl'>
          {title}
        </h1>
        {description && (
          <p className='mt-3 text-sm leading-6 text-muted-foreground sm:text-base'>
            {description}
          </p>
        )}
      </div>
      {children && <div className='shrink-0'>{children}</div>}
    </header>
  )
}

export default PageHeader
