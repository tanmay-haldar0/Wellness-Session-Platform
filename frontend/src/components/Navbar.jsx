import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const closeDropdown = () => setDropdownOpen(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const userInitial = user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U";
  const displayName = user?.name || user?.email?.split("@")[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const authMenuLinks = (
    <>
      <Link
        to="/dashboard"
        onClick={() => {
          closeDropdown();
          setSidebarOpen(false);
        }}
        className="block px-1 py-2 hover:bg-gray-100"
      >
        📊 Dashboard
      </Link>
      <Link
        to="/my-sessions"
        onClick={() => {
          closeDropdown();
          setSidebarOpen(false);
        }}
        className="block px-1 py-2 hover:bg-gray-100"
      >
        📚 My Sessions
      </Link>
      <Link
        to="/editor"
        onClick={() => {
          closeDropdown();
          setSidebarOpen(false);
        }}
        className="block px-1 py-2 hover:bg-gray-100"
      >
        ✍️ New Session
      </Link>
      <button
        onClick={() => {
          handleLogout();
          closeDropdown();
          setSidebarOpen(false);
        }}
        className="w-full text-left px-1 py-2 text-red-500 hover:bg-gray-100"
      >
        🚪 Logout
      </button>
    </>
  );

  const menuLinks = (
    <>
      <Link
        to="/login"
        onClick={() => {
          closeDropdown();
          setSidebarOpen(false);
        }}
        className="block px-4 py-2 hover:bg-gray-100"
      >
        Login
      </Link>
      <Link
        to="/Register"
        onClick={() => {
          closeDropdown();
          setSidebarOpen(false);
        }}
        className="block px-4 py-2 hover:bg-gray-100"
      >
        Register
      </Link>

    </>
  );

  return (
    <>
      <nav className="bg-white border-b shadow-sm fixed top-0 left-0 w-full z-20 px-6 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">
          <Link to="/" className="hover:text-blue-600 transition">🧘 Arvyax</Link>
        </h1>

        {/* Desktop menu */}
        {user ? (
          <div className="hidden md:flex items-center gap-2 relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-2 justify-center p-2 w-10 rounded-full bg-blue-600 text-white font-bold focus:outline-none"
              title={user.email}
            >
              {userInitial}
            </button>
            <button onClick={toggleDropdown} className="text-sm text-gray-700 font-medium flex items-center gap-1"><span>{displayName}</span><FaChevronDown className="text-xs" /></button>



            {dropdownOpen && (
              <div className="absolute right-0 top-12 w-48 bg-white border rounded-md shadow-lg z-30 text-sm font-medium text-gray-700">
                {authMenuLinks}
              </div>
            )}
          </div>
        ) : (
          <div className="hidden md:flex gap-4 text-sm font-medium text-gray-700">
            <Link to="/login" className="hover:text-blue-600 transition">Login</Link>
            <Link to="/register" className="hover:text-blue-600 transition">Register</Link>
          </div>
        )}

        {/* Mobile menu icon */}
        <button className="md:hidden text-gray-700 text-xl" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </nav>

      {/* Sidebar for mobile */}
      <div className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-40 transition-transform duration-300 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={toggleSidebar} className="text-gray-700 text-xl">
            <FaTimes />
          </button>
        </div>
        {user ? (
          <>
            <div className="w-full flex flex-col mt-5 items-center justify-center">
              <button
                className="flex items-center gap-2 justify-center p-2 w-10 rounded-full bg-blue-600 text-white font-bold focus:outline-none"
                title={user.email}
              >
                {userInitial}
              </button>
              <button onClick={toggleDropdown} className="text-sm text-gray-700 font-medium flex items-center gap-1"><span>{displayName}</span></button>

            </div>
            <div className="p-4 space-y-2 text-sm font-medium text-gray-700">
              {authMenuLinks}
            </div>
          </>
        ) : (
          <div className="p-4 space-y-2 text-sm font-medium text-gray-700">
            {menuLinks}
          </div>
        )}
      </div>

      {/* Overlay behind sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black opacity-30 z-30" onClick={() => setSidebarOpen(false)}></div>
      )}
    </>
  );
}
