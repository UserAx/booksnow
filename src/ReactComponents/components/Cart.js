import React from 'react';
import {reduceItem, removeItem} from '../../actions/cart';
import { connect } from 'react-redux';

// export const Cart = ({id, title, price, quantity, reduceItem}) => (
//     <div>
//         <div>
//             <h4>{title}</h4>
//             <div>
//                 <span>{quantity}</span>
//                 <button onClick={reduceItem(id)}>-</button>
//             </div>
//         </div>
//         <div>
//             <h5>{id}</h5>
//             <h5>{price}</h5>
//         </div>
//     </div>
// );

export class Cart extends React.Component {

    state = {
        originalPrice: this.props.price
    }

    handleReduceItem = () => {
        this.props.reduceItem(this.props.id, this.state.originalPrice);
    }

    handleRemoveItem = () => {
        this.props.removeItem(this.props.id);
    }

    render() {
        return (
            <div className="cart">
                <div className="cartitems">
                    <span>{this.props.title}</span>
                    <span>{this.props.quantity}</span>
                </div>
                <div className="cartitem_info">
                    <div>
                        <button className="cartitem_info_quantityinfo_button" onClick={this.handleReduceItem}>-</button>
                        <button className="cartitem_info_quantityinfo_button" onClick={this.handleRemoveItem}>x</button>
                    </div>
                    <span>{this.props.price}</span>
                </div>
            </div>    
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        reduceItem: (id, originalPrice) => dispatch(reduceItem(id, originalPrice)),
        removeItem: (id) => dispatch(removeItem(id))
    }
}

export default connect(undefined, mapDispatchToProps)(Cart);