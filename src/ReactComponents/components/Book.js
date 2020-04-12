import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {addItem, removeItem} from '../../actions/cart';

// export const Book = ({id, title, price}) => (
//     <Link to={`/books/${id}`}>
//         <div>
//             <img src={`images/books/${id}.jpg`} width="250" height="250"/>
//             <h4>{title}</h4>
//             <h4>{price}</h4>
//         </div>
//         <button>Add to Cart</button>
//     </Link>
// );

export class Book extends React.Component {
    state = {
        id: this.props.id,
        title: this.props.title,
        price: this.props.price,
        quantity: 1
    }

    handleAddCart = () => {
        //this.setState(() => ({quantity : quantity + 1}));
        const id = this.state.id;
        const title = this.state.title;
        const price = this.state.price;
        const quantity = this.state.quantity;
        const item = {id, title, price, quantity};
        //this.props.removeItem(id);
        this.props.addItem(item);
    }

    render(){
        return (
                <div className="books_container_book">
                    <Link to={`/books/${this.state.id}`}>
                            <img className="book_image" src={`images/books/${this.state.id}.jpg`} width="200" height="250"/>
                    </Link>
                    <div className="book_shortinfo">
                        <h4>{this.state.title}</h4>
                        <h4>NPR {this.state.price}</h4>
                    </div>
                    <button className= "books_container_button" onClick={this.handleAddCart}>Add to Cart</button>
                </div>
        );
    }
}

const mapDistachToProps = (dispatch) => {
    return {
        addItem: (item) => dispatch(addItem(item))
    }
};

export default connect(undefined, mapDistachToProps)(Book);