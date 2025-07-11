import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { router } from './router'
import Footer from './components/shared/Footer'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Nav /> AQUI */}
    <RouterProvider router={router} />
    <Footer />
  </StrictMode>
)
