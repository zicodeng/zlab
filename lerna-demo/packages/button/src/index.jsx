import React from 'react';

import greet from 'zicodeng-greet';

class Button extends React.Component {
    render() {
        return <button onClick={this.handleClickButton}>Hello</button>;
    }

    handleClickButton = () => {
        greet('Zico');
    };
}

export default Button;
