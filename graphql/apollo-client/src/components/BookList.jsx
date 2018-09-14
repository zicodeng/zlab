import React, { Component } from 'react';

import { GET_BOOKS } from '../queries';
import BookDetails from './BookDetails';
import Query from '../components/Query';

class BookList extends Component {
    state = {
        selected: null
    };

    render() {
        return (
            <Query query={GET_BOOKS}>
                {({ books }) => {
                    return (
                        <div>
                            <ul>
                                {books.map((book, i) => (
                                    <li
                                        key={i}
                                        onClick={e =>
                                            this.setState({ selected: book.id })
                                        }
                                    >
                                        {book.name}
                                    </li>
                                ))}
                            </ul>
                            <BookDetails id={this.state.selected} />
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default BookList;
