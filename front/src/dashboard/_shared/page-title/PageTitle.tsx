import React, { useState } from 'react'
import { PageTitleProps } from './PageTitleProps'
import { AiOutlineMenu } from "react-icons/ai";
import DashboardBtn from '../../dashboard/dashboard-btn/DashboardBtn'

export default function PageTitle(props: PageTitleProps) {
  const [clickMenu, setClickMenu] = useState(false)

  return (
    <div className='text-2xl text-emerald-600 mb-10'>
      <div className='flex justify-between'>
        <p className='mb-2 font-medium'>{props.title}</p>
        <div className='md:hidden'>
          <AiOutlineMenu onClick={() => setClickMenu(true)} />
        </div>
      </div>
      <hr className='border-gray-300'/>

      <div className='md:hidden'>
        {clickMenu && <>
          <div className='animate__animated animate__fadeIn animate__faster fixed top-0 left-0 bg-black/70 z-0 w-screen h-screen' onClick={() => setClickMenu(false)}></div>
          <div className='animate__animated animate__fadeInLeft animate__faster bg-blue-600 shadow-md flex flex-col justify-between bg-main fixed w-8/12 h-screen left-0 top-0 z-10'>
            <DashboardBtn link='/dashboard/company/list' label='Empresas' />
            <DashboardBtn link='/dashboard/company/add' label='Adicionar Empresa' />
            <DashboardBtn link='/dashboard/company/edit' label='Editar Empresa' />
            <DashboardBtn link='/dashboard/company/delete' label='Remover Empresa' />
            <div className="flex-grow"></div>
            <DashboardBtn isLogout label='Logout' />
          </div>      
        </>}
      </div>
    </div>
  )
}
