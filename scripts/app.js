import React from 'react';
import ReactDom from 'react-dom';
import Relay from 'react-relay';

import Items from './Items';

class ItemsRoute extends Relay.Route {
    static routeName = 'ItemsRoute';
    static queries = {
        store: (Component) => Relay.QL`
            query ItemsQuery {
                store {${Component.getFragment('store')}}
            }
        `
    }
}
ReactDom.render(
    <Relay.RootContainer  
        Component = {Items}
        route={new ItemsRoute()}
    />,
     document.getElementById('react')
     
);
