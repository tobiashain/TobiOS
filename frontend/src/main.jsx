import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import OS from './OS.jsx'
import "./global.scss"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OS />
  </StrictMode>,
)
