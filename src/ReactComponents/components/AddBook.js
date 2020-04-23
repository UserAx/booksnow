import React from 'react';
import {connect} from 'react-redux';
import {startAddBook} from '../../actions/books';
import {BookForm} from './BookForm';

export class AddBook extends React.Component{
    onSubmitHandle = async (book) => {
        await this.props.startAddBook(book);
        this.props.history.push('/');
    }
    
    render(){
        return (
            <div>
                <BookForm onSubmitHandle={this.onSubmitHandle} />
            </div>
        )
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        startAddBook: (book) => dispatch(startAddBook(book))
    }
}

export default connect(undefined, mapDispatchToProps)(AddBook);