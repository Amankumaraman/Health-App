import { useState } from "react";
import { Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline';

const Header = ({ onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    if (onLogout) onLogout();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Brand Name */}
          <h1 className="text-xl font-bold text-gray-900">HealthTrack</h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-4 items-center">
            <button className="text-sm font-medium text-gray-700 hover:text-blue-600 px-3 py-1 rounded-md hover:bg-gray-100">
              Dashboard
            </button>
            <button className="text-sm font-medium text-gray-700 hover:text-blue-600 px-3 py-1 rounded-md hover:bg-gray-100">
              History
            </button>
            {onLogout && (
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md"
              >
                Logout
              </button>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="mt-4 md:hidden space-y-2">
            <button className="block w-full text-left text-sm font-medium text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md hover:bg-gray-100">
              Dashboard
            </button>
            <button className="block w-full text-left text-sm font-medium text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md hover:bg-gray-100">
              History
            </button>
            {onLogout && (
              <button
                onClick={handleLogout}
                className="block w-full text-left text-sm font-medium text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md"
              >
                Logout
              </button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
