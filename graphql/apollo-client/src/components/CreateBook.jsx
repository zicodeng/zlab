import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { GET_AUTHORS, CREATE_BOOK, GET_BOOKS } from '../queries';
import Query from '../components/Query';

class CreateBook extends Component {
    state = {
        name: '',
        genre: '',
        authorId: ''
    };

    render() {
        return (
            <Mutation mutation={CREATE_BOOK}>
                {mutate => (
                    <form onSubmit={e => this.handleSubmit(e, mutate)}>
                        <div>
                            <label>Book name</label>
                            <input
                                type="text"
                                onChange={e =>
                                    this.setState({ name: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label>Book genre</label>
                            <input
                                type="text"
                                onChange={e =>
                                    this.setState({ genre: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label>Book author</label>
                            <select
                                onChange={e =>
                                    this.setState({
                                        authorId: e.target.value
                                    })
                                }
                            >
                                <option>Select author</option>
                                {this.renderOptions()}
                            </select>
                        </div>
                        <button>Create Book</button>
                    </form>
                )}
            </Mutation>
        );
    }

    renderOptions() {
        return (
            <Query query={GET_AUTHORS}>
                {({ authors }) =>
                    authors.map(author => (
                        <option key={author.id} value={author.id}>
                            {author.name}
                        </option>
                    ))
                }
            </Query>
        );
    }

    handleSubmit(e, mutate) {
        e.preventDefault();
        const { name, genre, authorId } = this.state;
        mutate({
            variables: {
                name,
                genre,
                authorId
            },
            // Sync our Apollo cache and GraphQL server
            update: (cache, { data: { createBook } }) => {
                const { books } = cache.readQuery({
                    query: GET_BOOKS
                });
                cache.writeQuery({
                    query: GET_BOOKS,
                    data: {
                        books: books.concat([createBook])
                    }
                });
            },
            optimisticResponse: {
                __typename: 'Mutation',
                // This needs to match BookType schema
                createBook: {
                    // Give it a negative ID to indicate that this is an optimistic response
                    id: Math.floor(Math.random() * -10000),
                    __typename: 'Book',
                    name,
                    genre,
                    authorId
                }
            }
            // What happens after if this mutation is executed?
            // We want to refetch queries to update the view.
            // (It is better to use optimistic UI)
            // refetchQueries: [
            //     {
            //         query: GET_BOOKS
            //     }
            // ]
        });
    }
}

export default CreateBook;
