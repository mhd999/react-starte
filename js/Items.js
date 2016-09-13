// @flow
import React from 'react';
import Relay from 'react-relay';

import Item from './components/item'

class Items extends React.Component {
    render() {
        //define list of items
        let itemsList = this.props.store.items.map(item => {
            return <Item key={item._id} item={item}/>;
        })
        return (<ul>{itemsList}</ul>);
    }
}
//Declare the data requerments for this Component and create a relay container
Items = Relay.createContainer(Items, {
    fragments: {
        store: () => Relay.QL`
        fragment on Store {
            items {
                _id,
                ${Item.getFragment('item')}
            }
        }
        `
    }
});

export default Items;