import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import BooksReducer from '../reducers/books';
import CartReducer from '../reducers/cart';
import firebaseAuth from '../reducers/firebaseauth';
import UserReducer from '../reducers/userauth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const userpresistConfig = {
    key: 'user',
    storage
}

// const cartpresistConfig = {
//     key: 'cart',
//     storage
// }

const userpersistedReducer =  persistReducer(userpresistConfig, UserReducer);
//const cartpersistedReducer =  persistReducer(cartpresistConfig, CartReducer);

export default () => {
    const store = createStore(
        combineReducers({
            books: BooksReducer, 
            carts: CartReducer,
            user: userpersistedReducer,
            firebaseAuthUser: firebaseAuth
        }), composeEnhancers(applyMiddleware(thunk))
    );
    const persistor = persistStore(store);
    return {store, persistor};
};

