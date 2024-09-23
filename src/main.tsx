import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import SignInPage from './components/Pages/SignInPage.tsx'
import Dashboard from './components/Pages/Dashboard.tsx'

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <SignInPage />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
      
        <RouterProvider router={router}/>

)
