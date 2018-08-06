import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input(
    {
        width: '200px'
    },
    props => ({
        color: props.color
    })
);

class Input extends React.Component {
    render() {
        const { inputRef } = this.props;
        // ref gives you the styled component
        // innerRef gives you the actual rendered DOM node
        return <StyledInput type="text" innerRef={inputRef} />;
    }
}

export default Input;
