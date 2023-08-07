import React from 'react'
import { TableCelProps } from './TableCelProps'
import { BsSortAlphaDown } from "react-icons/bs";

export default function TableCel(props: TableCelProps) {
  return (
    <div 
      className={`
        p-2 flex space-x-2 
        ${props.header && 'font-medium hover:bg-gray-200 duration-300 cursor-pointer'} 
        ${props.isEven && 'bg-gray-100'} ${props.headerClicked && 'text-emerald-600'}`}
      onClick={props.onHeaderClick}
    >
      <p className='break-all'>{props.label}</p>
      {props.header && (
        <div className='mt-0.5 mr-2 text-lg'><BsSortAlphaDown /></div>
      )}
    </div>
  )
}
