import React from 'react';
import {Link} from 'react-router-dom';
import Carts from './Carts';

export const Header = () => (
    <div>
            <div className="Header">
            <div className="Header_logotitle">
                <img src="images/books_1.jpg" width="75" height="75"/>
                <a href='/'><h2>BooksNow</h2></a>
            </div>
            <div className="Header_items">
                    <div className="cartbox">
                        <span className="cartsbox_title">Cart</span>
                        <input className="cartsbox_toggler" type="checkbox" />
                        <Carts/>
                    </div>
                    {/* <a href = '#'>Cart</a> */}
                <div className="Header_links">   
                    {/* <input type="checkbox"/> */}
                    <Link to="/sign-in">Sign In</Link>
                    <Link to="/contact">Contact</Link>
                </div>
            </div>
        </div>
    </div>
);  