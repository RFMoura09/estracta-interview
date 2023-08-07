import React from 'react'
import { Link } from 'react-router-dom'
import { LinkBtnProps } from './LinkBtnProps'

export default function LinkBtn(props: LinkBtnProps) {
  return (
    <Link to={props.link} className='w-full'>
      <button>
        {props.label}
      </button>
    </Link>
  )
}
