import database from '../firebase/firebase';

export const addBook = (book = {}) => ({
        type: 'ADD_BOOK',
        book
});

export const editBook = (id, updates) => ({
        type: 'EDIT_BOOK',
        id,
        updates
});

export const removeBook = (id = '') => ({
        type: 'REMOVE_BOOK',
        id
});

export const setBooks = (books = []) => ({
    type: 'SET_BOOKS',
    books
});

//firebase actions
export const startAddBook = (bookData = {}) => {
    return (dispatch, getState) => {
        //const uid = getState().auth.uid;
        const {
            title = '',
            price = 0,
            descrription = '',
            ratings = 0,
            image = undefined,
            comments = []
        } = bookData;
        const book = {title, price, descrription, ratings, image, comments};
        return database.ref(`books`).push(book).then((ref) => {
          dispatch(addBook({
              id: ref.key,
            ...book
          }));  
        });
    }
}

export const startEditBook = ({id, updates}) => {
    return (dispatch, getState) => {
        //const uid = getState().auth.uid;
        return database.ref(`books/${id}`).update(updates).then(() => {
            dispatch(editBook(id, updates));
        });
    }
}

export const startRemoveBook = (id = '') => {
    return (dispatch, getState) => {
        //const uid = getState().auth.uid;
        return database.ref(`books/${id}`).remove().then(() => {
            dispatch(removeBook(id));
        })
    }
}

export const startSetBooks = () => {
    return (dispatch, getState) => {
        return database.ref('books').once('value').then((snapshot) => {
            const books = [];
            snapshot.forEach((child) => {
                books.push({id: child.key, ...child.val()});
            });
            dispatch(setBooks(books));
        });
    }
}