import { gql } from 'apollo-boost';

export const GET_AUTHORS = gql`
    query GetAuthors {
        authors {
            id
            name
        }
    }
`;

export const GET_BOOKS = gql`
    query GetBooks {
        books {
            id
            name
        }
    }
`;

export const GET_BOOK = gql`
    query GetBook($id: ID!) {
        book(id: $id) {
            id
            name
            genre
            author {
                id
                name
                age
                books {
                    name
                    id
                }
            }
        }
    }
`;

export const CREATE_BOOK = gql`
    mutation CreateBook($name: String!, $genre: String!, $authorId: ID!) {
        createBook(name: $name, genre: $genre, authorId: $authorId) {
            id
            name
        }
    }
`;
