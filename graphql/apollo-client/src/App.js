import React, { Component } from 'react';

import BookList from './components/BookList';
import CreateBook from './components/CreateBook';

class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>My Book List</h1>
                <BookList />
                <CreateBook />
            </div>
        );
    }
}

export default App;
