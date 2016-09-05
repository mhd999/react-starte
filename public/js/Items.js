import React from 'react';
import api from '../api';
import itemsStore from '../stores/itemsStore';

//read from items store
let _getState = () => {
    return {items: itemsStore.returnItems()};
};

export default class Items extends React.Component {
    //read data from a store when init Component
    constructor(proporties) {
        super(proporties);

        this.state = _getState();
        //bind on change as reciver
        this.onChange = this.onChange.bind(this);

    }
   componentWillUnmount() {
       //remove the listener
       itemsStore.removeListener('change', this.onChange);
   }
    componentDidMount() {
        api.getItems();
        //register a listener to store emitter
        itemsStore.on('change', this.onChange);
    }

    //read data from a store when store emit a change event
    onChange() {
        console.log('4th Flux step in view');
        this.setState(_getState());
    } 

    render() {
        //define list of items
        let itemsList = this.state.items.map(item => {
            return <li key={item._id}> 
                    <label>{item.title}</label>
                    <span>{item.price}</span>
                 </li>;
        })
        return <ul>{itemsList}</ul>;
    }
}