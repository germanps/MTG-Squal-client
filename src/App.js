import React, { useState, useEffect, useMemo } from 'react'
import client from './config/apollo';
import { ApolloProvider } from '@apollo/client';
import { getToken, decodeToken, removeToken } from './utils/token';
import AuthContext from './context/AuthContext'
import { ToastContainer } from 'react-toastify';
import Auth from './pages/Auth'
import Home from './pages/Home'


export default function App() {
  const [auth, setAuth] = useState(undefined)

  useEffect(() => {
    //verificar si hay token valido en el localStorage
    const token = getToken();
    if (!token) {
      //si no hay token cargamos la pantalla de login/register
      setAuth(null);
    } else {
      //si lo hay enviamos el token y cargará la pantalla de usuario logeado
      setAuth(decodeToken(token));
    }

  }, []);

  const setUser = user => {
    //actualiza el estado pasandole el usuario(token) si existe
    setAuth(user);
  };

  const logout = () => {
    //borar token
    removeToken();
    setAuth(null);
  };

  //métodos que van al hook(useAuth)
  const authData = useMemo(
    () => ({
      auth,
      logout,
      setUser
    }),
    [auth]
  );

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData} >
        {!auth ? <Auth /> : <Home />}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        >

        </ToastContainer>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}


