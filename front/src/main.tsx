import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import {
  RouterProvider,
} from "react-router-dom"
import { router } from './router/Router'
import UIProvider from './_shared/ui/UIProvider'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <UIProvider>
    <RouterProvider router={router} />
  </UIProvider>
)
