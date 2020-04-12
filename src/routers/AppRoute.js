import React from 'react';
import {Switch, Router, Route} from 'react-router-dom';
import createHistroy from 'history/createBrowserHistory';
import PublicRoute from './PublicRoute';
import HomePage from '../ReactComponents/pages/HomePage';

export const history = createHistroy();

export default () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route component={HomePage} path="/" exact={true}/>
            </Switch>
        </div>
    </Router>
);

