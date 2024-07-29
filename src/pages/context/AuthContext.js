import React, { useState, createContext, useContext } from 'react'
import { toast } from 'react-toastify'

const AuthContext = createContext()
const initialState = { isAuthenticated: false, user: { email: "", password: "" } };

export default function AuthContextProvider({ children }) {

  const [authState, setAuthState] = useState(() => {
    const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated')) || false;
    const user = JSON.parse(localStorage.getItem('user')) || { email: "", password: "" };
    return { isAuthenticated, user };
  });

  const login = (email, password) => {

    let users = JSON.parse(localStorage.getItem("users")) || []
    let userExists = users.find(u => u.email === email && u.password === password)

    if (!userExists) {
      toast.error("User Not Found", { position: "bottom-left" })
      return false
    } else {
      let user = { ...userExists }
      setAuthState({ isAuthenticated: true, user })
      localStorage.setItem("isAuthenticated", JSON.stringify("true"))
      localStorage.setItem("user", JSON.stringify(user))
      return true
    }
  }

  const logout = (callback) => {
    setAuthState(initialState)
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    toast.error("User Logged Out", { position: "bottom-left" })
    if (callback) callback();
  }


  return (
    <AuthContext.Provider value={{ authState,setAuthState, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)