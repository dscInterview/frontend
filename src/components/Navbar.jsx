import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [loginFocus, setLoginFocus] = useState(false);

  // Initialize navigate function
  const navigate = useNavigate();

  // Reset login focus after 3 seconds
  useEffect(() => {
    if (loginFocus) {
      const timeout = setTimeout(() => {
        setLoginFocus(false);
      }, 3000);

      return () => clearTimeout(timeout); // Cleanup the timeout
    }
  }, [loginFocus]);

  // Handle link click
  const handleLinkClick = (link) => {
    setActiveLink(link);
    // Conditionally navigate based on the link
    if (link === 'home') {
      navigate('/');
    } else if (link === 'about') {
      navigate('/about-us');
    } else if (link === 'contact') {
      navigate('/contact-us');
    }
  };

  // Navigate to login page when Login button is clicked
  const handleLoginClick = () => {
    setActiveLink(''); // Clear active link to remove underlines
    navigate('/login');
  };

  // Navigate to sign-up page when Signup button is clicked
  const handleSignupClick = () => {
    setActiveLink(''); // Clear active link to remove underlines
    navigate('/sign-up');
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <Link to="/" className="text-white">Logo</Link>
      </div>

      {/* Nav Links */}
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
              {/* Underline for active link */}
              {activeLink === link && (
                <div
                  className="absolute -bottom-1 left-2 h-[2px] bg-green-500" // Update color to #191919
                  style={{ width: '60%' }} // Adjust width to 60% of the link's text length
                />
              )}
            </Link>
          </div>
        ))}
      </div>

      {/* Buttons for Login and Signup */}
      <div className="flex space-x-4">
        {/* Login Button */}
        <button
          onClick={handleLoginClick} // Use the handleLoginClick to navigate to the /login page
          className={`px-6 py-2 border-2 border-transparent text-white rounded-md focus:outline-none transition-all duration-300 ${loginFocus
            ? 'border-green-500 shadow-lg shadow-green-500/50'
            : 'hover:border-green-500 hover:shadow-md hover:shadow-green-500/50'
          }`}
        >
          Login
        </button>

        {/* Signup Button (styled same as Login button, but blue) */}
        <button
          onClick={handleSignupClick} // Navigate to the /sign-up page
          className={`px-6 py-2 border-2 border-transparent text-white rounded-md focus:outline-none transition-all duration-300 ${loginFocus
            ? 'border-blue-500 shadow-lg shadow-blue-500/50'
            : 'hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/50'
          }`}
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
