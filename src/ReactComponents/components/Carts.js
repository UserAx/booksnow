import React from 'react';
import {connect} from 'react-redux';
import Cart from './Cart';
import totalPrice from '../../selector/totalPrice';

export const Carts = (props) => (
    <div className="carts--defaultstate">
        {props.carts.length > 0 && (
            <div>
                <span  className="total">Total:</span>
                <span  className="total totalprice--price">NPR {props.totalPrice}</span>
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
    </div>        
);

const mapStateToProps = (state) => {
    return {
        carts: state.carts,
        totalPrice: totalPrice(state.carts)
    }
}

export default connect(mapStateToProps)(Carts);