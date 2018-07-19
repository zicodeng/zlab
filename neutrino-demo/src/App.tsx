import * as React from 'react';
import { hot } from 'react-hot-loader';

import Button from 'components/button/Button';

import './App.scss';

class App extends React.Component<{}, { name: string }> {
    constructor(props: {}) {
        super(props);

        this.state = {
            name: 'Neutrino Demo'
        };
    }

    public render(): JSX.Element {
        const { name } = this.state;
        return (
            <div className="app">
                <h1>{name}</h1>
                <Button />
            </div>
        );
    }

    public componentWillMount(): void {
        console.log('App mounted');
    }

    public componentWillUpdate(): void {
        console.log('App updated');
    }
}

export default hot(module)(App);
