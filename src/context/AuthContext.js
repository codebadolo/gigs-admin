import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  token: null,
  login: () => Promise.resolve(false),
  logout: () => {},
  loading: false,
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (savedToken) {
      setToken(savedToken);
      axios.defaults.headers.common["Authorization"] = `Token ${savedToken}`;
    }
  }, []);

  // On envoie { email, password } au backend
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/users/api/admin/login/",
        { email, password }
      );
      const receivedToken = response.data.token;
      if (!receivedToken) throw new Error("Token non reçu");
      setToken(receivedToken);
      localStorage.setItem("adminToken", receivedToken);
      axios.defaults.headers.common["Authorization"] = `Token ${receivedToken}`;
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("adminToken");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
