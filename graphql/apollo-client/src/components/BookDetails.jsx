import React from 'react';

import { GET_BOOK } from '../queries';
import Query from '../components/Query';

export default ({ id }) => {
    if (!id) {
        return null;
    }
    return (
        <Query query={GET_BOOK} variables={{ id }}>
            {({ book }) => (
                <React.Fragment>
                    <h2>Book Details</h2>
                    <div>
                        <p>{book.name}</p>
                        <p>{book.genre}</p>
                        <p>{book.author.name}</p>
                        <p>All books by this author:</p>
                        <ul>
                            {book.author.books.map((book, i) => (
                                <li key={i}>{book.name}</li>
                            ))}
                        </ul>
                    </div>
                </React.Fragment>
            )}
        </Query>
    );
};
