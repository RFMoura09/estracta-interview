import React from 'react'
import { LoaderProvider } from './loader/LoaderContext'
import { ToastProvider } from './toast/ToastContext'

export default function UIProvider({ children }) {
  return (
    <LoaderProvider>
    <ToastProvider>
      { children }
    </ToastProvider>
    </LoaderProvider>
  )
}
