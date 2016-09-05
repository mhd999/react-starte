import {get} from 'jquery';
import serverActions from './actions/serverActions';

let api = {
    getItems() {
        console.log('1st Flux step api call ');
        get('api/v1/items').done(res => {
            serverActions.reciveItems(res);
        })
    }
}

export default api;