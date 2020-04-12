import React from 'react';
import ReactDOM from 'react-dom';
import AppRoute, {history} from './routers/AppRoute';
import {Provider} from 'react-redux';
import configureStore from './store/store';
import {firebase} from './firebase/firebase';
import {startSetBooks} from './actions/books';
import 'normalize.css/normalize.css';
import './styles/styles.scss';


const store = configureStore();

const JSX = () => (
    <Provider store={store}>
        <AppRoute />
    </Provider>
);

const renderApp = () => {
    ReactDOM.render(<JSX/>, document.getElementById('root'));
}

store.dispatch(startSetBooks()).then(() => {renderApp()}).catch((e) => console.log(e));