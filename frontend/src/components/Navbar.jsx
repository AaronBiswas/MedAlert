import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  const handleLogout=(e)=>{
    e.preventDefault();
    logout();
  }

  return (
    <nav className="w-full bg-white shadow-md border-b border-gray-200 px-6 py-4 h-20">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-full">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold text-gray-800">MedAlert</span>
        </div>

        <ul className="hidden lg:flex items-center gap-8 text-xl font-medium text-gray-700">
          <li
            className="hover:text-blue-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </li>
          <li
            className="hover:text-blue-600 cursor-pointer"
            onClick={() => navigate("/upload")}
          >
            Upload
          </li>
        </ul>

        <div className="hidden lg:flex justify-around gap-4">
          {isLoggedIn ? (
            <button className="btn btn-error btn-md" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <button className="btn btn-primary btn-md" onClick={handleLogin}>
                Login
              </button>
              <button className="btn btn-primary btn-md" onClick={handleSignup}>
                Signup
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
