const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');
const _ = require('lodash');

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

// Define types
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        authorId: {
            type: GraphQLID
        },
        // A book is written by an author (one-to-one relationship)
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorId });
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        // An author can have many books (one-to-many relationship)
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id });
            }
        }
    })
});

/**
 * RootQuery Represents all of the possible entry points into the GraphQL API
 */
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // Get a book by ID
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                // Code to get data from database
                return _.find(books, { id: args.id });
            }
        },
        // Get all books
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        // Get an author by ID
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return _.find(authors, { id: args.id });
            }
        },
        // Get all authors
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createAuthor: {
            type: AuthorType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                age: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve(parent, args) {
                const { name, age } = args;
                const author = {
                    id: authors.length + 1,
                    name,
                    age
                };
                authors.push(author);
                return author;
            }
        },
        createBook: {
            type: BookType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                genre: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                authorId: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent, args) {
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
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
