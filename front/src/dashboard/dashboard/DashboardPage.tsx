import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import DashboardBtn from './dashboard-btn/DashboardBtn'
import DashboardNav from './dashboard-nav/DashboardNav'

export default function DashboardPage() {
  return (
    <div className='w-screen h-screen md:grid grid-cols-6 md:overflow-hidden overflow-x-scroll'>
      <div className='bg-blue-600 md:flex flex-col justify-between hidden bg-main'>
        <DashboardBtn link='company/list' label='Empresas' />
        <DashboardBtn link='company/add' label='Adicionar Empresa' />
        <DashboardBtn link='company/edit' label='Editar Empresa' />
        <DashboardBtn link='company/delete' label='Remover Empresa' />
        <div className="flex-grow"></div>
        <DashboardBtn isLogout label='Logout' />
      </div>
      <div className='col-span-5 p-5 md:overflow-hidden'>
        <Outlet />
        <Navigate to='company' />
      </div>
    </div>
  )
}
