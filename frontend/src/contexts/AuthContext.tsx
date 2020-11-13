import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

import app from '../services/firestore';

export const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<any>(null);

 useEffect(()=> {
   const unsubsribe = app.auth().onAuthStateChanged(user => setCurrentUser(user));
   return unsubsribe;
 },[]);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}
