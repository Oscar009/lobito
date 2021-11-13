import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { auth } from "../../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logOut() {
    return auth.signOut();
  }

  const unSuscribe = auth.onAuthStateChanged((user) => {
    setLoading(false);
    if (user !== null) {
      setCurrentUser(user);
      return true;
    }
    return false;
  });

  useEffect(() => {
    unSuscribe();
  }, [unSuscribe]);

  const value = {
    currentUser,
    signup,
    login,
    logOut,
    unSuscribe,
  };

  return (
    // eslint-disable-next-line react/jsx-pascal-case
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
