import { StrictMode } from 'react'
import {BrowserRouter} from 'react-router-dom'
// import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import  './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { SocketContextProvider } from './context/SocketContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>


<BrowserRouter>
<AuthContextProvider>
<SocketContextProvider> 
  <App />
  </SocketContextProvider>
</AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
   
  
)
