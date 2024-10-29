import { useSelector } from 'react-redux'
import { 
    createBrowserRouter, 
    createRoutesFromElements, 
    Navigate, 
    Route, 
    RouterProvider
 } from 'react-router-dom'
import {
    Home, 
    Auth, 
    Analytics, 
    Update,
    Task,
    taskLoader,
    analyticsLoader
 } from './components'
import Loading from './Loading.jsx'
import NotFound from './NotFound.jsx'
import App from './App.jsx'

function Router() {
    const user = useSelector(state=>state.user)
    const loading = useSelector(state=>state.loading)

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<App />}>
                <Route index element={loading ? <Loading /> : user ? <Home /> : <Navigate to='/register' replace /> } />
                <Route path='/analytics' element={loading ? <Loading /> : user ? <Analytics /> : <Navigate to='/register' replace /> } loader={analyticsLoader} />
                <Route path='/settings' element={loading ? <Loading /> : user ? <Update /> : <Navigate to='/register' replace /> } />
                <Route path='/register' element={loading ? <Loading /> : user ? <Navigate to='/' replace /> : <Auth mode='Register' /> } />
                <Route path='/login' element={loading ? <Loading /> : user ? <Navigate to='/' replace /> : <Auth mode='Login' /> } />
                <Route path='/task' element={<Task /> } loader={taskLoader} />
                <Route path=':blob' element={<NotFound />} />
            </Route> 
        )
    )
  return (
    <RouterProvider router={router} />
  )
}

export default Router