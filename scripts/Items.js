// @flow
import React from 'react';
import Relay from 'react-relay';

import Item from './components/item'
import createItemMutation from "./mutations/createItemMutation"

class Items extends React.Component {
    setLimit = (e)=> {
       let newLimit = Number(e.target.value);
       console.log(newLimit);
       this.props.relay.setVariables({limit: newLimit});
    }
    addItem = (e)=> {
        e.preventDefault();
        //invoke mutation
        Relay.Store.commitUpdate(
            new createItemMutation({
                title: this.refs.newTitle.value,
                price: this.refs.newPrice.value,
                //parent store which exist in the main component as a props
                store: this.props.store
            })
        );
        //when done reset the fields
        this.refs.newTitle.value = "";
        this.refs.newPrice.vlaue = "";
    }
    render() {
        //define list of items
        let itemsList = this.props.store.itemConnection.edges.map(edge => {
            return <Item key={edge.node.id} item={edge.node}/>;
        })
        return (
                <div>
                    <h1> Items </h1>
                    <select onChange={this.setLimit} defaultValue={this.props.relay.variables.limit}>
                        <option value="1">1</option>
                        <option value="100">100</option>
                    </select>
                    <ul>{itemsList}</ul>

                    <form onSubmit={this.addItem}>
                        <input type="text" placeholder="item Title" ref="newTitle" />
                        <input tytpe="number" placeholder="item price" ref="newPrice" /> 
                        <button type="submit">Submit</button>
                    </form>
                </div>
            );
    }
}
//Declare the data requerments for this Component and create a relay container
Items = Relay.createContainer(Items, {
    initialVariables: {
        limit: 100
    },
    fragments: {
        store: () => Relay.QL`
        fragment on Store {
            id,
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