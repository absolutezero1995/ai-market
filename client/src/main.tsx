import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import store from './store/store.ts'
import App from './App.tsx'
import './index.css'
import 'tailwindcss/tailwind.css';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
