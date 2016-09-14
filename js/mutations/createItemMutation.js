// @flow
import Relay from 'react-relay';

class createItemMutation extends Relay.Mutation {
    getMutation() {
        return Relay.QL`mutation {createItem}`;
    }

    getVariables() {
        return {
            title: this.props.title,
            price: this.props.price
        };
    }

    getFatQuery() {
        return Relay.QL`
            fragment on CreateItemPayload {
                itemEdge,
                store { itemConnection },
            }`;
    }

    getConfigs() {
        return [{
            type: 'RANGE_ADD',
            parentName: 'store',
            parentID: this.props.store.id,
            connectionName: 'itemConnection',
            edgeName: 'itemEdge',
            rangeBehaviors: {
                '': 'append'
            },
        }];
    }
}

export default createItemMutation;