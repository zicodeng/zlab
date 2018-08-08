import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import { FormikForm1 } from 'components/FormikForm';

class App extends React.Component {
    render() {
        return (
            <Fragment>
                <h1>Formik Demo</h1>
                <FormikForm1 />
            </Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
