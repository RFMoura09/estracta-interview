import DashboardBtn from '../dashboard-btn/DashboardBtn'

export default function DashboardNav(props: { isMobile?: boolean, }) {
  if(!props.isMobile) {
    return <>
      <div className='animate__animated animate__fadeIn animate__faster fixed bg-black/70 z-0 w-screen h-screen'></div>
      <div className='animate__animated animate__fadeInLeft animate__faster bg-blue-600 shadow-md flex flex-col justify-between bg-main fixed w-8/12 h-screen left-0 z-10'>
        <DashboardBtn link='company/list' label='Empresas' />
        <DashboardBtn link='company/add' label='Adicionar Empresa' />
        <DashboardBtn link='company/edit' label='Editar Empresa' />
        <DashboardBtn link='company/delete' label='Remover Empresa' />
        <div className="flex-grow"></div>
        <DashboardBtn isLogout label='Logout' />
      </div>
    </>
  }

  return (
    <div className='bg-blue-600 flex flex-col justify-between bg-main'>
      <DashboardBtn link='company/list' label='Empresas' />
      <DashboardBtn link='company/add' label='Adicionar Empresa' />
      <DashboardBtn link='company/edit' label='Editar Empresa' />
      <DashboardBtn link='company/delete' label='Remover Empresa' />
      <div className="flex-grow"></div>
      <DashboardBtn isLogout label='Logout' />
    </div>
  )
}