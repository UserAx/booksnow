import React from 'react';
import {Switch, Router, Route} from 'react-router-dom';
import createHistroy from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';
import Books from '../ReactComponents/components/Books';
import Header from '../ReactComponents/components/Header';
import Contact from '../ReactComponents/components/Contact';
import SignUp from '../ReactComponents/components/SignUp';
import BookDetails from '../ReactComponents/components/BookDetails';
import LogIn from '../ReactComponents/components/LogIn';
import AddBook from '../ReactComponents/components/AddBook';
import EditBook from '../ReactComponents/components/EditBook';
import InjectedCheckout from '../ReactComponents/components/Checkout';

export const history = createHistroy();

export default () => (
    <Router history={history}>
        <div>
            <Header history={history} />
            <Switch>
                <Route component={Books} path="/" exact={true}/>
                <Route component={Contact} path="/contact"/>
                <Route component={SignUp} path="/sign-up"/>
                <Route component={LogIn} path="/log-in"/>
                <Route component={BookDetails} path="/books/:id"/>
                <PrivateRoute component={EditBook} path="/edit/book/:id"/>
                <PrivateRoute component={AddBook} path="/add/book"/>
                <Route component={InjectedCheckout} path="/checkout" />
            </Switch>
        </div>
    </Router>
);

