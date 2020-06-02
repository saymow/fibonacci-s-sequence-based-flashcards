import React, { createContext, useState, useEffect, useContext } from "react";

import * as Api from "../services/auth";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function authorify(response) {

    setUser(response.user);

    localStorage.setItem("@Auth:user", JSON.stringify(response.user));
    localStorage.setItem("@Auth:token", response.token);
    window.location.reload();
  }

  async function signIn(data) {
    const response = await Api.signIn(data);

    if (/^error$/.test(Object.keys(response)[0])) return response;

    authorify(response);
  }

  async function signUp(data) {
    const response = await Api.signUp(data);

    console.log(response);

    if (/^error$/.test(Object.keys(response)[0])) return response;

    authorify(response);
  }

  function signOut() {
    setUser(null);

    localStorage.clear();
    window.location.reload();
  }

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await localStorage.getItem("@Auth:user");
      const storagedToken = await localStorage.getItem("@Auth:token");

      if (storagedToken && storagedUser) {
        setUser(JSON.parse(storagedUser));
      }
    }

    loadStoragedData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
