import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLogged, setIsLogged }) => {
  const [activeLink, setActiveLink] = useState('home');
  const [loginFocus, setLoginFocus] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (loginFocus) {
      const timeout = setTimeout(() => {
        setLoginFocus(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [loginFocus]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    if (link === 'home') navigate('/');
    else if (link === 'about') navigate('/about-us');
    else if (link === 'contact') navigate('/contact-us');
  };

  const handleLoginClick = () => {
    setActiveLink('');
    navigate('/login');
  };

  const handleSignupClick = () => {
    setActiveLink('');
    navigate('/sign-up');
  };

  const handleLogoutClick = () => {
    setIsLogged(false);
    navigate('/');
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4">
      <div className="text-2xl font-bold">
        <Link to="/" className="text-white">Logo</Link>
      </div>
      <div className="flex space-x-8">
        {['home', 'about', 'contact'].map((link) => (
          <div
            key={link}
            onClick={() => handleLinkClick(link)}
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
        {isLogged ? (
          <>
            <button
              onClick={handleDashboardClick}
              className={`px-6 py-2 border-2 border-transparent text-white rounded-md focus:outline-none transition-all duration-300 hover:border-green-500 hover:shadow-md hover:shadow-green-500/50`}
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
              className={`px-6 py-2 border-2 border-transparent text-white rounded-md focus:outline-none transition-all duration-300 ${loginFocus
                ? 'border-green-500 shadow-lg shadow-green-500/50'
                : 'hover:border-green-500 hover:shadow-md hover:shadow-green-500/50'
              }`}
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
