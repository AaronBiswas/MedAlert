import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("jwt");
    if(token) setIsLoggedIn(true);
  }, []);

  const login = () => setIsLoggedIn(true);

  const logout = () => {
    Cookies.remove("jwt",{
      path:"/",
      sameSite:"none",
      secure:true
    });
    setIsLoggedIn(false);
  };

  useEffect(() => {
    console.log("Auth state changed:", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
