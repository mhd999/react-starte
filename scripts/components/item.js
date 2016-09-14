// @flow
import React from 'react';
import Relay from 'react-relay';

class Item extends React.Component {
    render() {
        let {item} = this.props;
        return ( 
            <li key={item.id}>
                {item.title} - {item.price}
            </li>
        );
    }
}
// define the relay container for the Component
Item = Relay.createContainer(Item, {
    fragments: {
        item: () => Relay.QL`
        fragment on Item {
            id,
            title,
            price
        }
        `
    }
});

export default Item;