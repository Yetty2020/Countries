import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDom from 'react-dom'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './App.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)