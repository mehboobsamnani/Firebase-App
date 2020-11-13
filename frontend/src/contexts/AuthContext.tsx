import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

import app from '../firebase';

export const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<any>(null);

 useEffect(()=> {
    app.auth().onAuthStateChanged(setCurrentUser);
 },[]);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}
