import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile as firebaseUpdateProfile,
  signOut,
} from "firebase/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data from backend API
  const fetchUserData = async (email) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${email}`);
      if (!response.ok) throw new Error("Failed to fetch user data");
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  };

  // Firebase Authentication methods
  const createNewUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithEmailPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  const updateUserProfile = async (name, photoURL) => {
    if (!auth.currentUser) throw new Error("No user logged in.");
    await firebaseUpdateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
    setUser({
      ...auth.currentUser,
      displayName: name,
      photoURL: photoURL,
    });
  };

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        try {
          const data = await fetchUserData(currentUser.email);
          setUserData(data);
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    userData,
    setUserData,
    loading,
    createNewUser,
    googleSignIn,
    loginWithEmailPassword,
    updateUserProfile,
    signOutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
