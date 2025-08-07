import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import SignInPage from './components/Pages/SignInPage.tsx'
import Dashboard from './components/Pages/Dashboard.tsx'
import PokemonPage from './components/pokemon/PokemonPage.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store'

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
      },
      {
        path: "/pokemon",
        element: <PokemonPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
