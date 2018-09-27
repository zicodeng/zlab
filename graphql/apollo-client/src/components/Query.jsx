/**
 * Our own version of Query component that allows us to handle loading and error uniformly across views.
 */

import React from 'react';
import { Query } from 'react-apollo';

export default ({ children, ...props }) => (
    <Query {...props}>
        {({ loading, error, data }) => {
            console.log(loading);
            if (loading) {
                return 'Loading';
            }
            if (error) {
                return `Error: ${error}`;
            }
            return children(data);
        }}
    </Query>
);
