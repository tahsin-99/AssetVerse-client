import React, { useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebaseinit';
import { GoogleAuthProvider } from 'firebase/auth';


const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({children}) => {
      const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

     const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }
   const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }
    const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }
   const logOut = async () => {
    setLoading(true)
    return signOut(auth)
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }

    const authInfo={
        user,
        loading,
        createUser,
        signIn ,
        signInWithGoogle,
        logOut,
        updateUserProfile
    }
      useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
     
      setUser(currentUser)
      setLoading(false)
    })
    return () => {
      return unsubscribe()
    }
  }, [])

    
    return (
       <AuthContext value={authInfo}>
        {children}
       </AuthContext>
    );
};

export default AuthProvider;