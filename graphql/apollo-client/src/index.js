import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
    clientState: {
        // Default state for Apollo cache
        defaults: {
            isConnected: true
        },
        // Actions for manipulating Apollo cache
        resolvers: {
            Mutation: {
                updateNetworkStatus: (_, { isConnected }, { cache }) => {
                    cache.writeData({ data: { isConnected } });
                    return null;
                }
            }
        }
    }
});

ReactDOM.render(
    // Connect the Apollo client to our React app.
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);

registerServiceWorker();
