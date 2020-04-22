import React from 'react';
import {Link} from 'react-router-dom';
import Carts from './Carts';
import {connect} from 'react-redux';
import {logout, startLogout} from '../../actions/firebaseauth';
import {removeUser} from '../../actions/userauth';

export const Header = (props) => (
    <div>
            <div className="Header">
            <div className="Header_logotitle">
                <img src="images/books_1.jpg" width="75" height="75"/>
                <Link to="/" ><h2>BooksNow</h2></Link>
            </div>
            <div className="Header_items">
                    <div className="cartbox">
                        <span className="cartsbox_title">Cart</span>
                        <input className="cartsbox_toggler" type="checkbox" />
                        <Carts history={props.history}/>
                    </div>
                <div className="Header_links">   
                    {props.Authenticated ? (<button onClick={async () => {
                        if(props.firebaseAuthenticated){
                            await props.startLogout();
                            props.logout();
                            props.history.push('/');
                        } else if(props.userAuthenticated){
                            props.removeUser();
                            props.history.push('/');
                        }
                    }}>Log Out</button>)
                        : 
                    (<Link to="/sign-up">Sign Up</Link>)}
                </div>
                <Link to="/contact">Contact</Link>
            </div>
        </div>
    </div>
);  

const mapStateToProps = (state) => {
    return {
        Authenticated: !!state.firebaseAuthUser.uid || !!state.user.id,
        firebaseAuthenticated: !!state.firebaseAuthUser.uid,
        userAuthenticated: !!state.user.id,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        startLogout: () => dispatch(startLogout()),
        logout: () => dispatch(logout()),
        removeUser: () => dispatch(removeUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);