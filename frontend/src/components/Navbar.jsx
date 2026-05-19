import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Had to manually import icons
import { FaHome } from "react-icons/fa";
import { MdDashboard, MdPostAdd } from "react-icons/md";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
               <MdDashboard className="text-3xl text-blue-600" />
              <span className="font-bold text-xl text-gray-800 tracking-tight">
                Smart<span className="text-blue-600">Complaint</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium px-3 py-2 rounded-md flex items-center gap-1 transition">
              Home
            </Link>

            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium px-3 py-2 rounded-md flex items-center gap-1 transition">
                   Dashboard
                </Link>
                {user.role !== 'Admin' && (
                   <Link to="/register-complaint" className="bg-blue-600 text-white hover:bg-blue-700 font-medium px-4 py-2 rounded-md flex items-center gap-1 transition">
                    <MdPostAdd /> File Complaint
                  </Link>
                )}
                
                <div className="ml-4 flex items-center gap-4 pl-4 border-l">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                       {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                       <span className="text-sm font-semibold text-gray-800 leading-tight">{user.name}</span>
                       <span className="text-xs text-gray-500 leading-tight">{user.role}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-red-600 transition"
                    title="Logout"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3 ml-2">
                <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium transition">
                  Login
                </Link>
                <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition shadow-sm">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
