import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import AppRoute, {history} from './routers/AppRoute';
import {Provider} from 'react-redux';
import configureStore from './store/store';
import {PersistGate} from 'redux-persist/integration/react'
import {firebase} from './firebase/firebase';
import {startSetBooks} from './actions/books';
import {login} from './actions/firebaseauth';

const {store, persistor} = configureStore();

const JSX = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AppRoute />
        </PersistGate>
    </Provider>
);

const renderApp = () => {
    ReactDOM.render(<JSX/>, document.getElementById('root'));
}

store.dispatch(startSetBooks()).then(() => {renderApp()}).catch((e) => console.log(e));

firebase.auth().onAuthStateChanged((user) => {
    if(user){
        store.dispatch(login(user.uid));
        console.log('User login');
    }
});