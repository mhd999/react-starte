import React from 'react';
import ReactDom from 'react-dom';
import Relay from 'react-relay';

import Items from './Items';

ReactDom.render(<Items />, document.getElementById('react'));

console.log(
    Relay.QL`
    query Test{
        items{
            title
        }
    }
    `
)