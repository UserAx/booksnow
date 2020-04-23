import React, {useState} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import {connect} from 'react-redux';
import totalPrice from '../../selector/totalPrice';
import {startEditUser} from '../../actions/userauth'; 
import checkoutDataValidator from '../../utils/checkoutDataValidator';

export const Checkout = (props) => {
    const [checkoutError, setCheckoutError] = useState(undefined);
    const stripe = useStripe();
    const elements = useElements();

    const getBooksId = (books) => {
        if(books.length > 0){
            return books.map((book) => {
                return book.id;
            });
        }
        return [];
    }

    const stripeTokenHandler = async(token, amount, description) => {
        const response = await fetch('/chargebooks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({token, amount, description})
          });
        return response.json();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
            
        try{
            // const {error, paymentMethod} = await stripe.createPaymentMethod({
            //     type: 'card',
            //     card: elements.getElement(CardElement)
            // });

            const Card = elements.getElement(CardElement);
            
            const {token} = await stripe.createToken(Card);
            const buyer = props.user_id ? (props.user_id) : ('Anonymous');
            const booksid = getBooksId(props.carts);
            const $form = document.querySelector('form');
            const emailText = $form.querySelectorAll('input')[0].value;
            const phoneText = $form.querySelectorAll('input')[1].value;
            const Location = $form.querySelectorAll('input')[2].value;
            const {email, phone, dataerror} = checkoutDataValidator(emailText, phoneText);
            if(dataerror){
                setCheckoutError(dataerror.error);
                throw new Error(dataerror.error);
            }
            setCheckoutError(undefined);
            const description = 'Order placed for books: '+ booksid.toString().concat(' ') + 'by ' + buyer + `(email: ${emailText} and number: ${phoneText})` + ' to location: '+Location;
            const response = await stripeTokenHandler(token, props.totalPrice, description);
            
            // const purchases = [];
            
            // props.carts.forEach((cart) => {
            //     purchases.push({book_id: cart.id, book_title: cart.title, book_amount: cart.price, book_quantity: cart.quantity });
            // });

            
            // if(props.user){
            //     const userExistingPurchases = props.user.purchases;
                
            //     if(!userExistingPurchases){
            //         console.log("no books purchased until now.");
            //         await startEditUser(props.user.id, purchases);
            //     }else{
                    
            //     }
            // }
            if(response.success){
                alert('Payment successful');
            }

        }catch(e) {
            console.log(e);
            alert('Failed to make payment. Please check your card credentials correctly.');
        }
};

    return (
        <div className="checkout__payment">
            <span className="checkout__payment__title">Receipt</span>
            {props.carts.length > 0 ? (
                <div className="checkout__payment__cart__details">
                    <div className="checkout__payment__cart__details__title">
                        <span>Books</span>
                        <span>Amount</span>
                    </div>
                        {props.carts.map((cart) => (
                        <div className="checkout__payment__cart_details__book" key={cart.id}>
                            <div className="checkout__payment__cart_details__bookinfos">
                                <span>{cart.title}</span>
                                <span>{cart.quantity}</span>
                            </div>
                            <span className="checkout__payment__cart_details__bookinfos__price">{cart.price}</span>
                        </div>
                        ))}
                    <div className="checkout__payment__cart_details__totalprice">
                        <span>Total</span>
                        <span>{props.totalPrice}</span>
                    </div>
                </div>
            ) : (<h2>Please select to something to buy first.</h2>)}
            <div className="checkout__payment__form__container">
            {checkoutError && <div className="checkout__payment__error"><span>{checkoutError}</span></div>}
                <form className="checkout__payment__form" onSubmit={handleSubmit}>
                    <input type="text" required placeholder="Your Email" className="checkout__payment__form__container__input" />
                    <input type="text" required placeholder="Your Phone Number" className="checkout__payment__form__container__input" />
                    <input type="text" required placeholder="Your Detailed Location" className="checkout__payment__form__container__input" />
                    <CardElement amount={props.totalPrice && props.totalPrice} className="checkout__payment__form__cardelement"/>
                    <div className="checkout__payment__form__buttoncontainer">
                        <button className="checkout__payment__form__button" type="submit" disabled={!stripe || !props.carts.length}>Pay</button>
                    </div>
                </form>
            </div>
        </div>
    );
    
}

const stripePromise = loadStripe('pk_test_F9lyeV3Afi6f8fHlhCrlb9su00MeE1EVZ6');

const mapStateToProps = (state) => {
    return {
        carts: state.carts,
        totalPrice: state.carts ? totalPrice(state.carts) : 0,
        user_id: state.user.id
    }
};



export const InjectedCheckout = ({carts, totalPrice, user_id}) => {
    return (
        <Elements stripe={stripePromise}>
            <Checkout carts={carts} totalPrice={totalPrice} user_id={user_id}/>
        </Elements>
    )
};

export default connect(mapStateToProps, undefined)(InjectedCheckout);