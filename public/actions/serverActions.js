import appDispatcher from '../appDispatcher';
import {actionTypes} from '../actionTypes';

let serverActions = {
    reciveItems(items) {
        console.log('2nd Flux in action');
        appDispatcher.dispatch({
            actionType: actionTypes.GET_ITEMS,
            items
        })
    }
}

export default serverActions;