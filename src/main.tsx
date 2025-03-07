import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import RouterComponent from './router/RouterComponent.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store} >
      <BrowserRouter>
        <RouterComponent />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
