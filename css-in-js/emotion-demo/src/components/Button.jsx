import React from 'react';
import styled from 'react-emotion';

const StyledButton = styled.button(
    {
        width: '200px',
        height: '50px'
    },
    props => ({
        backgroundColor: props.backgroundColor || 'red'
    })
);

class Button extends React.Component {
    render() {
        const { backgroundColor, clickAction, text } = this.props;
        return (
            <StyledButton
                backgroundColor={backgroundColor}
                onClick={clickAction}
            >
                {text}
            </StyledButton>
        );
    }
}

export default Button;
