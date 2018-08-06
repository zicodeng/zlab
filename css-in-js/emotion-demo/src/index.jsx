import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'react-emotion';

import Button from 'components/Button';
import Input from 'components/Input';

// Object literal style
const Wrapper = styled.div({
    display: 'flex',
    flexDirection: 'column'
});

// Template literal style:
// 1. The names of the rules are not camel-cased.
// 2. Quotes are not used.
// 3. Rules are separated with a semicolon.
const Title = styled.h1`
    color: red;
    font-size: 60px;
`;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            btnBgColors: ['green', 'red', 'blue', 'purple', 'orange'],
            currColorIndex: 0
        };

        // Create a ref to access user input data
        this.exampleInputRef = React.createRef();
    }

    alertInputText = () => {
        window.alert(this.exampleInputRef.current.value);
    };

    changeBtnBgColor = () => {
        const { btnBgColors, currColorIndex } = this.state;
        const newColorIndex = (currColorIndex + 1) % btnBgColors.length;
        this.setState({
            currColorIndex: newColorIndex
        });
    };

    render() {
        const { btnBgColors, currColorIndex } = this.state;
        return (
            // Emotion still allows you to attach your custom class names
            <Wrapper className="container">
                <Title>Emotion Demo</Title>
                <Input inputRef={this.exampleInputRef} />
                <Button
                    text="Click to Alert User Input Data"
                    clickAction={this.alertInputText}
                />
                <Button
                    text="Click to Change Button Background Color"
                    clickAction={this.changeBtnBgColor}
                    backgroundColor={btnBgColors[currColorIndex]}
                />
            </Wrapper>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
