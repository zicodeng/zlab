import React from 'react';

class Button extends React.Component {
    render() {
        <button onClick={this.handleClickButton}>Hello</button>;
    }

    handleClickButton = () => {
        window.alert('Clicky...');
    };
}

export default Button;