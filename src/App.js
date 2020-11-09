import React, { useState } from 'react'
import client from './config/apollo';
import { ApolloProvider } from '@apollo/client';
import Auth from './pages/Auth'


export default function App() {
  const [auth, setAuth] = useState(undefined)

  return (
    <ApolloProvider client={client}>
      {!auth ? <Auth /> : <p>estas logueado</p>}
    </ApolloProvider>
  );
}


