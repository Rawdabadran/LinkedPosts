import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthContextProvider } from './Contaxt/AuthContext.tsx'

import UserContextProvider from './Contaxt/UserContext.tsx'

import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(

  <StrictMode>
   <QueryClientProvider client={queryClient}>
     <ReactQueryDevtools initialIsOpen={false} />
     <AuthContextProvider>  
<UserContextProvider>
      
    <App />
  
    </UserContextProvider>
    </AuthContextProvider>
   </QueryClientProvider>
    
  

    </StrictMode>

  ,
)
