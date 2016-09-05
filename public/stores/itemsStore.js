import {actionTypes} from '../actionTypes';
import appDispatcher from '../appDispatcher';
import {EventEmitter} from 'events'; 

let _items = [];
class itemsStore extends EventEmitter{
    //register store with dispatcher
    constructor(proporties) {
        super(proporties);

        appDispatcher.register(action => {
            switch(action.actionType){
                case actionTypes.GET_ITEMS:
                console.log('3rd Flux step in store');
                    _items = action.items;
                    this.emit('change');
                break;
                default:
                
            }

        });
    }

    returnItems() {
        return _items;
    }
}

export default new itemsStore();