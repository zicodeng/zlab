import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import styled, { css, cx } from 'react-emotion';

// Object literal style
const Title = styled('h1')({
    color: 'red',
    fontSize: '30px'
});

// Tagged template literal style:
// 1. The names of the rules are not camel-cased.
// 2. Quotes are not used.
// 3. Rules are separated with a semicolon.
// 4. Nested rules are possible.
// 5. This is more like writing SASS.
// 6. Can be adapted based on props.
const Box = styled.div`
    width: 200px;
    height: 200px;
    background-color: ${props => props.bgColor || 'black'};
    display: flex;
    justify-content: center;
    align-items: center;

    > p {
        color: yellow;
    }
`;

// This gives us a Styled() function
console.log(Box);
// This gives us a React Component with auto-generated unique CSS class name attached to it
console.log(<Box />);

const Button = styled.button`
    padding: 10px 20px;
    margin-top: 20px;
`;

const Text = styled.p`
    color: purple;
`;

const textExtraStyle = css`
    text-decoration: underline;
`;

// This gives us a class name
console.log(textExtraStyle);

const className1 = css`
    font-size: 20px;
    background: green;
`;
const className2 = css`
    font-size: 20px;
    background: blue;
`;
// Order is important, the one on the right side has higher precedence
const combinedClassName = cx(className1, className2);

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            colors: ['red', 'green', 'blue'],
            currColorIndex: 0
        };
    }

    render() {
        const { colors, currColorIndex } = this.state;
        return (
            <Fragment>
                {/* Custom CSS class name is stilled allowed */}
                <Title className="my-title">Emotion Demo</Title>
                <Box bgColor={colors[currColorIndex]}>
                    <p>Box</p>
                </Box>
                <Button onClick={this.handleClickBtn}>
                    Change Box Background Color
                </Button>
                <Text className={textExtraStyle}>
                    I got a cool function called css
                </Text>
                <p className={combinedClassName}>
                    I got another cool function called cx
                </p>
            </Fragment>
        );
    }

    handleClickBtn = () => {
        const { colors, currColorIndex } = this.state;
        const nextColorIndex = (currColorIndex + 1) % colors.length;
        this.setState({
            currColorIndex: nextColorIndex
        });
    };
}

ReactDOM.render(<App />, document.getElementById('app'));
