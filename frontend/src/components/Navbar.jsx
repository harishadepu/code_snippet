import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate()
  const onLogout = () => {
    logout();
    navigate("/login");
  }

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link to="/" className="hover:text-blue-300 font-semibold">
          Home
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-300 font-semibold">
              Login
            </Link>
            <Link to="/register" className="hover:text-blue-300 font-semibold">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}