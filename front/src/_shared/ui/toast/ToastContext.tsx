import { useContext, useState } from 'react'
import { createContext } from "react";
import { ToastProps } from './ToastProps';
import Toast from './Toast';

interface IToastContext {
  emitToast: React.Dispatch<React.SetStateAction<string>>
}

const ToastContext = createContext<IToastContext|null>(null);

export function ToastProvider({ children }) {
  const [toastTitle, emitToast] = useState<string>('')

  return (
    <ToastContext.Provider value={{emitToast}}>
      {toastTitle && <Toast title={toastTitle} />}
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext) as IToastContext
