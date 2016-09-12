// @flow
import React from 'react';
import Relay from 'react-relay';

class Items extends React.Component {
    static propTypes = {
        limit: React.PropTypes.number
    }
    static defaultProps = {
        limit: 1
    }

    render() {
        //define list of items
        let itemsList = this.state.items.slice(0, this.props.limit).map(item => {
            return <li key={item._id}>
                <label>{item.title}</label>
                <span>{item.price}</span>
            </li>;
        })
        return (<ul>{itemsList}</ul>);
    }
}
//Declare the data requerments for this Component and create a relay container
Items = Relay.createContainer(Items, {
    
})

export default Items;