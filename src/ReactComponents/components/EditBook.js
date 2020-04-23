import React from 'react';
import {connect} from 'react-redux';
import {startEditBook} from '../../actions/books';
import {BookForm} from './BookForm';

export class EditBook extends React.Component {
    
    onSubmitHandle = async (book) => {
        await this.props.startEditBook(this.props.book.id, book);
        this.props.history.push(`/books/${this.props.book.id}`);
    }

    render() {
        return (
            <div>
                <BookForm {...this.props.book} onSubmitHandle={this.onSubmitHandle} />
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        book: state.books.find((book) => {return book.id === props.match.params.id})
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startEditBook: (id, book) => dispatch(startEditBook(id, book))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBook);