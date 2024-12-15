import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { toast } from 'react-toastify'; 
const Navbar = ({ isLogged, setIsLogged }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  // Determine active link based on the current path
  const getActiveLink = () => {
    if (location.pathname === '/') return 'home';
    if (location.pathname === '/about-us') return 'about';
    if (location.pathname === '/contact-us') return 'contact';
    return '';
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/sign-up');
  };

  const handleLogoutClick = () => {
    toast.error('Logged out Successfully!');
    dispatch(logout());
    navigate('/');
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  const activeLink = getActiveLink();

  return (
    <nav className="flex items-center justify-between px-6 py-4">
      <div className="text-2xl font-bold">
        <Link to="/" className="text-white">Logo</Link>
      </div>
      <div className="flex space-x-8">
        {['home', 'about', 'contact'].map((link) => (
          <div
            key={link}
            className={`relative cursor-pointer ${activeLink === link ? 'text-white scale-110' : 'text-white'}`}
          >
            <Link
              to={link === 'home' ? '/' : link === 'about' ? '/about-us' : '/contact-us'}
              className="relative"
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
              {activeLink === link && (
                <div
                  className="absolute -bottom-1 left-2 h-[2px] bg-green-500"
                  style={{ width: '60%' }}
                />
              )}
            </Link>
          </div>
        ))}
      </div>

      <div className="flex space-x-4">
        {isLoggedIn ? (
          <>
            <button
              onClick={handleDashboardClick}
              className={`px-6 py-2 border-2 border-transparent text-white rounded-md focus:outline-none transition-all duration-300 hover:border-purple-500 hover:shadow-md hover:shadow-purple-500/50`}
            >
              Dashboard
            </button>
            <button
              onClick={handleLogoutClick}
              className={`px-6 py-2 border-2 border-transparent text-white rounded-md focus:outline-none transition-all duration-300 hover:border-red-500 hover:shadow-md hover:shadow-red-500/50`}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleLoginClick}
              className={`px-6 py-2 border-2 border-transparent text-white rounded-md focus:outline-none transition-all duration-300 hover:border-green-500 hover:shadow-md hover:shadow-green-500/50`}
            >
              Login
            </button>
            <button
              onClick={handleSignupClick}
              className={`px-6 py-2 border-2 border-transparent text-white rounded-md focus:outline-none transition-all duration-300 hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/50`}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
