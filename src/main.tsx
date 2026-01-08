import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.tsx'
import { ThemeProvider } from './components/theme/AuthTheme.tsx'
import { AuthProvider } from './services/authguard.tsx'
import { LoadingProvider } from './components/shared/LoadingProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ThemeProvider>
      <AuthProvider>
        <LoadingProvider>
      <App />
        </LoadingProvider>
      </AuthProvider>
     </ThemeProvider>
  </StrictMode>,
)
