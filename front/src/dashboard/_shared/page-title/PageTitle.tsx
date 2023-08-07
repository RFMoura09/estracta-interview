import React from 'react'
import { PageTitleProps } from './PageTitleProps'

export default function PageTitle(props: PageTitleProps) {
  return (
    <div className='text-2xl text-emerald-600 mb-10'>
      <p className='mb-2 font-medium'>{props.title}</p>
      <hr className='border-gray-300'/>
    </div>
  )
}
