import { createRoot } from 'react-dom/client'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './app/store.js'
import Router from './Router.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ToastContainer />
    <Router />
  </Provider>
)
