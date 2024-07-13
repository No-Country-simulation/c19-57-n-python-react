<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
=======
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import RegisterForm from './components/RegisterForm.jsx'
import LoginForm from './components/LoginForm.jsx'

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
      }
    ]
  }
])
>>>>>>> 3df8d45cc3c7acaf82a2f764b191450a3b5e04da

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<<<<<<< HEAD
  <App />
  </React.StrictMode >
);
=======
    <RouterProvider router={router} />
  </React.StrictMode>
)
>>>>>>> 3df8d45cc3c7acaf82a2f764b191450a3b5e04da
