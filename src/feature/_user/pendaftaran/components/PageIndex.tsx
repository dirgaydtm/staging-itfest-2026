import React from 'react'

interface PageIndexProps {
  index: number;
  title: string;
}

const PageIndex = ({index, title}: PageIndexProps) => {
  return (
    <div className="flex w-full items-center justify-center bg-blue-100 space-x-4 py-4 md:py-2 xl:py-4 rounded-lg mt-8 md:mt-0">
        <div className="bg-blue-400 h-8 md:h-6 lg:h-8 w-8 md:w-6 lg:w-8 rounded-full text-base font-changa flex justify-center items-center font-bold text-center">{index}</div>
        <h3 className='text-blue-400 font-changa font-bold text-xl md:text-lg lg:text-xl'>{title}</h3>
    </div>
  )
}

export default PageIndex
