
const bookstoreDefaultValue = [];

export default (state = bookstoreDefaultValue, action) => {
    switch (action.type) {
        case 'ADD_BOOK': return [...state, action.book];
        case 'EDIT_BOOK': return state.map((book) => {
            if(book.id === action.id){
                return {
                    ...book,
                    ...action.updates
                }
            }else {
                return book;
            }
        });
        case 'REMOVE_BOOK': return state.filter(({id}) => id !== action.id);
        case 'SET_BOOKS': return action.books;
        default: return state;
    }
}