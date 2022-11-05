import React, { useContext, useEffect, useState } from "react";
import { userColumns } from "../datatablesource";
import { onAuth } from "../firebase";


const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState("loading");
  const [loading, setLoading] = useState(true);
  const [userDB, setUserDB] = useState(null);
  const [saveCotizacion, setSaveCotizacion] = useState(true);
  const [success, setSuccess] = useState(null);




const setUserData = (data) => {
  setUserDB(data)
}
function setUserSuccess (mode) {
  setSuccess(mode)
  setTimeout(()=>{ setSuccess(null)}, 6000)
}

  useEffect(() => {
    setLoading(false)
    return onAuth(setUser, setUserData);
  },[user])

  return (
    <AuthContext.Provider value={{user, userDB, saveCotizacion, success, setUser, setUserData, setSaveCotizacion, setUserSuccess}} >
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('error')
  }
  return context
}