import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import BooksReducer from '../reducers/books';
import CartReducer from '../reducers/cart';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({books: BooksReducer, carts: CartReducer}), composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};