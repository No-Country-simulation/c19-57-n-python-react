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
import ProtectedRoute from './components/ProtectedRoute.jsx'
import DogsList from './components/DogsList.jsx'
import CatsList from './components/CatsList.jsx'
import PetDetails from './pages/PetDetails.jsx'
import Admin from './pages/Admin/index.jsx'
import AdminPets from './components/dashboard/AdminPets.jsx'
import AdminRequests from './components/dashboard/AdminRequests.jsx'
import AdminEditRequestById from './components/dashboard/AdminEditRequestById.jsx'
import AdminRequestById from './components/dashboard/AdminRequestById.jsx'
import AdminCreatePet from './components/dashboard/AdminCreatePet.jsx'
import AdminEditPet from './components/dashboard/AdminEditPet.jsx'
import AuthProvider from './context/AuthContext.jsx'
import SearchResults from './components/SearchResults.jsx'

const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
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
        element: <ProtectedRoute element={<RegisterForm />} />
      },
      {
        path: '/login',
        element: <LoginForm />
      },
      {
        path: '/petform',
        element: <ProtectedRoute element={<PetForm />} />
      },
      {
        path: '/petRequestForm/:id',
        element: <PetRequestForm />
      },
      {
        path: '/pets/edit/:id',
        element: <ProtectedRoute element={<PetEditForm />} />
      },
      {
        path: '/search/adoptionForm',
        element: <SearchRequest />
      },
      {
        path: '/search',
        element: <SearchResults />
      },
      {
        path: '/dogs',
        element: <DogsList />
      },
      {
        path: '/cats',
        element: <CatsList />
      },
      {
        path: '/petdetails/:id',
        element: <PetDetails />
      },
      {
        path: '/admin',
        element: <ProtectedRoute element={<Admin />} />
      },
      {
        path: '/admin/pets',
        element: <ProtectedRoute element={<AdminPets />} />
      },
      {
        path: '/admin/pets/add',
        element: <ProtectedRoute element={<AdminCreatePet />} />
      },
      {
        path: '/admin/pets/edit/:id',
        element: <ProtectedRoute element={<AdminEditPet />} />
      },
      {
        path: '/admin/requests',
        element: <ProtectedRoute element={<AdminRequests />} />
      },
      {
        path: '/admin/requests/edit/:id',
        element: <ProtectedRoute element={<AdminEditRequestById />} />
      },
      {
        path: '/admin/requests/:id',
        element: <ProtectedRoute element={<AdminRequestById />} />
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
