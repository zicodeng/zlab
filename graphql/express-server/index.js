const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

const schema = require('./schema');

const app = express();

// Allow CORS
app.use(cors());

// Set up GraphQL middleware
app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true
    })
);

app.listen(8080, () => {
    console.log('Server is listening on http://localhost:8080');
});
