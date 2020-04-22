import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

export const PublicRoute = ({
    adminAuthenticated, 
    component: Component, 
    ...rest}) => (
    <Route {...rest} component = {(props) => {
        adminAuthenticated ? (<Component {...props}/>) : (<Redirect to="/" />)
    }} />
);


const mapStateToProps = (state) => (
    {
        adminAuthenticated: !!state.user.role == 'ADMIN'
    }
);

export default connect(mapStateToProps)(PublicRoute);