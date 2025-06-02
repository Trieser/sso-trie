import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/logout");
      window.location.href = "/"; // atau navigate('/login')
    } catch (err) {
      alert("Logout gagal");
    }
  };

  const isLoggedIn = window.location.pathname.includes("/user/dashboard") || window.location.pathname.includes("/admin/dashboard");

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="font-bold text-lg text-blue-600">SSO-TRIE</h1>

      {isLoggedIn ? (
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 focus:outline-none"
          >
            👤 Menu
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50">
              <Link
                to="/"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Home
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:underline">
            Home
          </Link>
          <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
