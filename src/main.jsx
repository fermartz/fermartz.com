import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import FermartzSite from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FermartzSite />
  </StrictMode>,
)
