import { auth } from '@clerk/nextjs/server'

import DashboardSidebar from '@/components/dashboard/DashboardSidebar'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  await auth.protect()

  return (
    <div className='grid items-start gap-8 lg:grid-cols-[260px_minmax(0,1fr)]'>
      <DashboardSidebar />
      <div className='min-w-0'>{children}</div>
    </div>
  )
}

export default DashboardLayout
