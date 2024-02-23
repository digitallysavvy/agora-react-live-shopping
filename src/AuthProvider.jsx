import React, { createContext, useContext, useEffect, useState } from "react"
import { auth, getFirebaseApp, initFirebase } from "./firebase-config"
import { onAuthStateChanged } from "firebase/auth"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // init firebase
    if (!getFirebaseApp()){
      initFirebase()
    }
    // cleanup
    const unsubscribe = onAuthStateChanged(auth(), (user) => {
        setCurrentUser(user)
        setLoading(false)
    })

    return unsubscribe
  },[])

  return (
    <AuthContext.Provider value={{currentUser}}>
        {!loading && children}
    </AuthContext.Provider>
  )
}