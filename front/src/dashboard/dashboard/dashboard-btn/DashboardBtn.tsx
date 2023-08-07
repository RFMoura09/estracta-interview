import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { LinkBtnProps } from '../../../_shared/link-btn/LinkBtnProps'
import { DashboardBtnProps } from './DashboardBtnProps'
import { _authService } from '../../../_shared/auth/AuthService'

export default function DashboardBtn(props: Partial<LinkBtnProps & DashboardBtnProps>) {
  const navigate = useNavigate()
  
  const logout = () => {
    _authService.logout();
    navigate('/login')
  }

  if(props.isLogout) {
    return (
      <button onClick={logout} className='bg-transparent text-left rounded-none p-5 hover:bg-white/30'>
        {props.label}
      </button>
    )
  }

  return (
    <NavLink to={props.link} className={({isActive}) => `w-full ${isActive && 'bg-white/40'}`}>
      <button className='bg-transparent text-left rounded-none p-5 hover:bg-white/30'>
        {props.label}
      </button>
    </NavLink>
  )
}
