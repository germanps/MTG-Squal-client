import React from 'react'
import client from './config/apollo';
import { ApolloProvider } from '@apollo/client';
import { Button } from 'semantic-ui-react'


export default function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>App</h1>
        <Button className="btn" primary>Botón</Button>
        <Button secondary>Botón</Button>
      </div>
    </ApolloProvider>
  );
}


