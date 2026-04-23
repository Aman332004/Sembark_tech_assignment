import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-[80vh] px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
