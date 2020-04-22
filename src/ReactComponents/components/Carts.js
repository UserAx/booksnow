import React from 'react';
import {connect} from 'react-redux';
import Cart from './Cart';
import totalPrice from '../../selector/totalPrice';

export const Carts = (props) => (
    <div className="carts--defaultstate">
        {props.carts.length > 0 && (
            <div>
                <span  className="total">Total:</span>
                <span  className="total totalprice--price">Rs {props.totalPrice}</span>
            </div>
        )}
        <div>
                {props.carts.length === 0 ? (
                        <h4 className="carts_empty">Empty cart. Select something to buy.</h4>
                ) : (
                    props.carts.map((cart) => {
                        return (
                            <Cart key={cart.id} {...cart} />
                        )
                    })
                )}
        </div>
        {props.carts.length === 0 ? (<></>) : 
        (<div className="checkout">
            <button className="checkout__button" onClick={() => {props.history.push('/checkout')}}>Check Out</button>
        </div>)}
    </div>        
);

const mapStateToProps = (state) => {
    return {
        carts: state.carts,
        totalPrice: state.carts ? totalPrice(state.carts) : 0
    }
}

export default connect(mapStateToProps)(Carts);