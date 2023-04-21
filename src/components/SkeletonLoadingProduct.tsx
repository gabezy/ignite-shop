import React from 'react'

export default function SkeletonLoadingProduct() {
  return (
    <div className='grid grid-cols-2 items-stretch gap-[72px] justify-center max-w-custom mx-auto animate-pulse'>
      <div className='w-[576px] h-[656px] bg-stone-800 rounded-lg'></div>
      <div className='flex flex-col'>
        <div className='w-[520px] h-[45px] bg-stone-600 rounded-lg mb-4'></div>
        <div className='w-[124px] h-[45px] bg-stone-600 rounded-lg mb-10'></div>
        <div className='w-[520px] h-[20px] bg-stone-600 rounded-lg mb-4'></div>
        <div className='w-[520px] h-[20px] bg-stone-600 rounded-lg mb-4'></div>
        <div className='w-[520px] h-[20px] bg-stone-600 rounded-lg mb-4'></div>
        <div className='w-[520px] h-[20px] bg-stone-600 rounded-lg mb-4'></div>
        <div className='w-[520px] h-[69px] bg-stone-600 rounded-lg mt-auto'> </div>
      </div>
    </div>
  )
}
