import React from 'react'
import { LoaderProps } from './LoaderProps'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loader() {
  return (
    <div className='fixed bottom-0 right-0 flex bg-gray-700 text-white p-5 items-center space-x-2'>
      <div className='animate-spin text-2xl text-center'>
        <AiOutlineLoading3Quarters />
      </div>
      <p>Carregando...</p>
    </div>
  )
}
