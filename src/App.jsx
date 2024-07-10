import { Outlet } from 'react-router-dom';
import StickyNavbar from './components/header'; // Ajusta la ruta según la ubicación de tu archivo header.js

const App = () => {
  return (
    <div>
      <StickyNavbar />
      <Outlet />
    </div>
  );
};

export default App;
