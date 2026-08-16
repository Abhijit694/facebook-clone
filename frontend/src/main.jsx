import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/store'
import ThemeProvider from './components/ThemeProvider'
import { Toaster } from "@/components/ui/toast"

createRoot(document.getElementById('root')).render(
  <Provider store={ store }>
    <ThemeProvider>
      <App />
      <Toaster/>
    </ThemeProvider>
  </Provider>
  
)
