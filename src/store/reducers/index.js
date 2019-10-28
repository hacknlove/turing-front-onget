import {combineReducers} from 'redux';
import products from './products';
import product from './product';

const createReducer = (asyncReducers) =>
    combineReducers({
        products,
        product,
        ...asyncReducers
    });

export default createReducer;
