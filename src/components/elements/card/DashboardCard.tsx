import Link from 'next/link'
import React from 'react'

type Props = {
  children: React.ReactNode
  title: string
  link: string
}

const DashboardCard: React.FC<Props> = ({ children, title, link }) => {
  return (
    <Link
      href={link}
      className="flex gap-sm items-center  xs:h-full xs:w-[25%] rounded-md bg-gray  relative overflow-hidden shadow-[5px_10px_10px_-5px_rgba(0,0,0,0.3)] p-[15px] xs:p-md hover:bg-middleGreen hover:text-gray transition-color duration-300 w-full group"
    >
      <div className="h-8 w-8 bg-middleGreen flex items-center justify-center rounded-md shrink-0 group-hover:outline-gray group-hover:border-[1px]">
        {children}
      </div>
      <h2 className="text-base relative  w-full">
        <p className="font-bolder tracking-tighter">{title}</p>
      </h2>
    </Link>
  )
}

export default DashboardCard
