// @flow
import React from 'react';
import Relay from 'react-relay';

import Item from './components/item'

class Items extends React.Component {
    setLimit = (e)=> {
       let newLimit = Number(e.target.value);
       this.props.relay.setVariables({limit: newLimit});
    }
    render() {
        //define list of items
        let itemsList = this.props.store.itemConnection.edges.map(edge => {
            return <Item key={edge.node.id} item={edge.node}/>;
        })
        return (
                <div>
                    <select onChange={this.setLimit}>
                        <option value="1">1</option>
                        <option value="100" selected>100</option>
                    </select>
                    <ul>{itemsList}</ul>
                </div>
            );
    }
}
//Declare the data requerments for this Component and create a relay container
Items = Relay.createContainer(Items, {
    initialVariables: {
        limit: 2
    },
    fragments: {
        store: () => Relay.QL`
        fragment on Store {
            itemConnection(first: $limit) {
                edges{
                    node{
                         id,
                        ${Item.getFragment('item')}
                    }
                }
               
            }
        }
        `
    }
});

export default Items;