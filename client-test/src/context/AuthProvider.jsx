import React, { createContext, useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'


const AuthContext = createContext()


export default function AuthProvider({ children }) {
    const [user, setUser] = useState({})
    const auth = getAuth();
    useEffect(() => {
        const unsub =  auth.onAuthStateChanged((user) => {
            if(user?.uid){
                setUser(user)
                localStorage.setItem('accessToken', user.accessToken)
            }else{
                setUser({})
                localStorage.clear()
            }
        })
        return () => {
            unsub()
        }
    }, [])

  return (
    <AuthContext.Provider value={{user,setUser}}>
      {children}
    </AuthContext.Provider>
  )
}
