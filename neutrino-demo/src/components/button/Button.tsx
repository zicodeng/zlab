import * as React from 'react';

import './Button.scss';

export default class Button extends React.Component<
    {},
    {
        count: number;
    }
> {
    constructor(props: {}) {
        super(props);

        this.state = {
            count: 0
        };
    }

    private handleClickBtn = (): void => {
        const { count } = this.state;
        const newCount = count + 1;
        this.setState({
            count: newCount
        });
        console.log('Clicky');
    };

    public render(): JSX.Element {
        const { count } = this.state;
        return (
            <button className="clicky-btn" onClick={this.handleClickBtn}>
                Clicky +{count}
            </button>
        );
    }
}
