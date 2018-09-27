const { ApolloServer, gql } = require('apollo-server');
const _ = require('lodash');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
// In-memory store
const books = [
    {
        id: '1',
        name: 'Book1',
        genre: 'Sci-Fi',
        authorId: '1'
    },
    {
        id: '2',
        name: 'Book2',
        genre: 'Horror',
        authorId: '2'
    },
    {
        id: '3',
        name: 'Book3',
        genre: 'Comedy',
        authorId: '3'
    },
    {
        id: '4',
        name: 'Book4',
        genre: 'Sci-Fi',
        authorId: '1'
    },
    {
        id: '5',
        name: 'Book5',
        genre: 'Horror',
        authorId: '2'
    },
    {
        id: '6',
        name: 'Book6',
        genre: 'Comedy',
        authorId: '3'
    }
];

const authors = [
    {
        id: '1',
        name: 'Zico',
        age: 22
    },
    {
        id: '2',
        name: 'Jerry',
        age: 26
    },
    {
        id: '3',
        name: 'Tom',
        age: 20
    }
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
    # Comments in GraphQL are defined with the hash (#) symbol.
    # "" for description

    # This "Book" type can be used in other type declarations.
    type Book {
        id: ID!
        name: String!
        genre: String!
        authorId: ID!
        author: Author
    }

    "Represents an author"
    type Author {
        id: ID!
        name: String!
        age: Int!
        books: [Book]
    }

    # The "Query" type is the root of all GraphQL queries.
    # (A "Mutation" type will be covered later on.)
    type Query {
        book(id: ID!): Book
        books: [Book]
        author(id: ID!): Author
        authors: [Author]
    }

    type Mutation {
        createBook(name: String!, genre: String!, authorId: ID!): Book
    }
`;

// Resolvers define the technique for fetching the types in the
// schema. We'll retrieve books from the "books" array above.
const resolvers = {
    Book: {
        author(parent, args, context, info) {
            return _.find(authors, { id: parent.authorId });
        }
    },
    Author: {
        books(parent, args, context, info) {
            return _.filter(books, { authorId: parent.id });
        }
    },
    Query: {
        book(parent, args) {
            return _.find(books, { id: args.id });
        },
        books() {
            return books;
        },
        author(parent, args) {
            return _.find(authors, { id: args.id });
        },
        authors() {
            return authors;
        }
    },
    Mutation: {
        createBook(parent, args) {
            const { name, genre, authorId } = args;
            const book = {
                id: books.length + 1,
                name,
                genre,
                authorId
            };
            books.push(book);
            return book;
        }
    }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server
    .listen({
        port: 8080
    })
    .then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });
