import React from 'react';
import {connect} from 'react-redux';
import {startEditBook, startRemoveBook} from '../../actions/books';
import {addItem} from '../../actions/cart';
import moment from 'moment';

export const BookDetails = (props) => (
    <div className="bookdetails">
        <div className="bookdetails__container">
            <img className="bookdetails__image" src={'../'+"images/books/"+`${props.book.id}.jpg`}/>
            <div className="bookdetails__info">
                <h2>Title - <span>{props.book.title}</span></h2>
                <h2>Author - <span>{props.book.author}</span></h2>
                <h2>ISBN - <span>{props.book.isbn ? props.book.isbn : 'N/A'}</span></h2>
                <h2>Price - <span>NPR {props.book.price}</span></h2>
                <h2>Ratings - <span>{props.book.ratings ? props.book.ratings : 'N/A'}</span></h2>
                <h2>Published Date - <span>{ props.book.published ? moment(props.book.published).format('MMMM Do, YYYY') : 'N/A'}</span></h2>
                <h2>Description - <div className="bookdetails__info__description"><span>{props.book.description}</span></div></h2>
            </div>
            {props.Authenticated ? (
                <div className="bookdetails_buttonsoverlap__admin">
                    <button onClick={()=>{
                        props.history.push(`/edit/book/${props.book.id}`);
                    }}
                    className="bookdetails_buttonsoverlap__buttons--admin">Edit Book</button>
                    <button onClick={() => {
                        props.startRemoveBook(props.book.id);
                        props.history.push(`/`);
                    }}
                    className="bookdetails_buttonsoverlap__buttons--admin">Remove Book</button>
                </div>
            ): (
                    <div className="bookdetails_buttonsoverlap__user">
                        <button onClick={() => {
                            const {id, title, price, quantity=1} = props.book;
                            const item = {id, title, price, quantity};
                            props.addItem(item);
                        }
                        }
                        className="bookdetails_buttonsoverlap__buttons--addtocart">Add to Cart</button>
                    </div>
                )}
            </div>
        {/* Deal with comments at the end. */}
        {/* <div>
            <span>Reviews from our users:</span>
            {props.comments.length > 0 ? (
            <div>
            </div>):(
                props.comments.map((comment) => 
                {
                    return (<div>
                        <h4>{comment.user_id}</h4>
                        <span>{comment.comment}</span>
                    </div>)
                })
            )}
        </div> */}
    </div>
);

const mapStateToProps = (state, props) => {
    return {
        book: state.books.find((book) => {
            return book.id === props.match.params.id;
        }),
        Authenticated: state.user.role === 'ADMIN'
    }
};

const mapDispatchToProps = (dispatch) =>{
    // if(Authenticated.id){
    //     //Check here if a user is logged in and if that user is from the admin database or has the admin role.
    // }
        return {
            startEditBook: (id, updates) => dispatch(startEditBook(id, updates)),
            startRemoveBook: (id) => dispatch(startRemoveBook(id)),
            addItem: (item) => dispatch(addItem(item))
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetails);