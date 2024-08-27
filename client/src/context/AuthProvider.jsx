import React, { createContext, useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { Snackbar, Button, Alert} from '@mui/material';


export const AuthContext = createContext()


export default function AuthProvider({ children }) {
    const [user, setUser] = useState({})
    const auth = getAuth();
    const [notifyOpen, setNotifyOpen] = useState(false)
    const [notificationMessage, setNotificationMessage] = useState('')
    const [notificationSeverity, setNotificationSeverity] = useState('success')
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
  const handleCloseNotification = () => setNotifyOpen(false);
  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      setNotifyOpen,
      setNotificationMessage,
      setNotificationSeverity,
      }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={notifyOpen}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        message={notificationMessage}
        action={
          <Button color="inherit" onClick={handleCloseNotification}>
            Đóng
          </Button>
        }
      >
        <Alert onClose={handleCloseNotification} severity={notificationSeverity} sx={{ width: '100%' }}>
          {notificationMessage}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  )
}
