<<<<<<< HEAD
// En App.jsx

import React, { useState, useEffect } from 'react';
import { StickyNavbar } from './components/header_a'; // Ajusta la ruta según la ubicación correcta de tu archivo header.jsx
import { Loading } from './components/loading'; // Asegúrate de que la ruta sea correcta

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula un proceso de carga (por ejemplo, una llamada a una API)
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Cambia el tiempo según tus necesidades
  }, []);

  if (loading) {
    return <Loading />; // Asegúrate de usar el componente Loading con la letra mayúscula
  }

  return (
    <div>
      <StickyNavbar />
      <Outlet />
    </div>
  );
};

export default App;
=======
import { Outlet } from 'react-router-dom';
import StickyNavbar from './components/header'; // Ajusta la ruta según la ubicación de tu archivo header.js
>>>>>>> 3df8d45cc3c7acaf82a2f764b191450a3b5e04da


