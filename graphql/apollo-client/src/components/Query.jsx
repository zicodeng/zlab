/**
 * Our own version of Query component that allows us to handle loading and error uniformly across views.
 */

import React from 'react';
import { Query } from 'react-apollo';

export default ({ children, ...props }) => (
    <Query {...props}>
        {({ loading, error, data }) => {
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
