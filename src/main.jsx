import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import About from './pages/About.jsx'
import RegisterForm from './components/RegisterForm.jsx'
import LoginForm from './components/LoginForm.jsx'
import PetForm from './components/PetForm.jsx'
import PetRequestForm from './components/PetRequestForm.jsx'
import PetEditForm from './components/PetEditForm.jsx'
import SearchRequest from './components/SearchRequest.jsx'
import NotFound from './pages/NotFound.jsx'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/register',
        element: <RegisterForm />
      },
      {
        path: '/login',
        element: <LoginForm />
      },
      {
        path: '/petform',
        element: <PetForm />
      },
      {
        path: '/petRequestForm/:id',
        element: <PetRequestForm />
      },
      {
        path: '/pets/edit/:id',
        element: <PetEditForm />
      },
      {
        path: '/search/adoptionForm',
        element: <SearchRequest />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
