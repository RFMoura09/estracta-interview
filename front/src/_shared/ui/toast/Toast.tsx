import React, { useEffect } from 'react'
import { ToastProps } from './ToastProps'
import { useToast } from './ToastContext'
import 'animate.css';

export default function Toast(props: ToastProps) {
  const { emitToast } = useToast();

  useEffect(() => {
    setTimeout(() => emitToast(''),3000)
  }, [])

  return (
    <div className='animate__animated animate__fadeInLeft animate__faster fixed left-5 bottom-5 md:left-16 md:bottom-16 md:min-w-[300px] 2xl:min-w-[500px] bg-emerald-600 text-emerald-50 p-5 md:pr-24 shadow-md rounded-md'>
      <p className='break-all'>{props.title}</p>
    </div>
  )
}
