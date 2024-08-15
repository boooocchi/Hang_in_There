import { useRouter } from 'next/router'
import React from 'react'

import PageTitle from '@/components/elements/title/PageTitle'

type Props = {
  title?: string
  children: React.ReactNode
  editButtons?: React.ReactNode
}
const MainLayout: React.FC<Props> = ({ children, title, editButtons }) => {
  const router = useRouter()
  const pathname = router.pathname
  const dashboardStyle = pathname === '/' ? 'overflow-visible mr-lg' : 'overflow-y-scroll'
  return (
    <div className="h-full flex flex-col relative">
      <div className="flex items-center xs:gap-[30px] max-xs:justify-between mb-sm tracking-wide xs:mb-md  xs:ml-0 w-full">
        <PageTitle>{title}</PageTitle>
        {editButtons && editButtons}
      </div>
      <div className={`flex h-full flex-grow flex-col w-full ${dashboardStyle}`}>{children}</div>
    </div>
  )
}

export default MainLayout
