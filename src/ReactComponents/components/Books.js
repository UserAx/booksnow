import React from 'react';
import {connect} from 'react-redux';
import Book from './Book';

export const Books = (props) => (
    <div>
        <div className="books_container">
            {props.books.length === 0 ?
            (<div>
                <h4>Empty Shelf. Please wait until we have restocked.</h4>
            </div>) :
            (props.books.map((book) => {
                return (<Book key={book.id} {...book}/>);
            }))}
        </div>
        {props.authenticatedAdmin ? (
            <div  className="books_addBook">
                <button className="books_addBook_Button" onClick={() => {props.history.push('/add/book');}}
                >Add Book</button> 
            </div>
        ): (<div></div>)}
    </div>
);

const mapStateToProps = (state) => {
    return {
        books: state.books,
        authenticatedAdmin: state.user.role === 'ADMIN' 
    }
};

export default connect(mapStateToProps, undefined)(Books);