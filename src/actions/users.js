import database from '../firebase/firebase';

export const addUser = ({id}) => ({
        type: 'ADD_USER',
        id
});

export const removeUser = (email) => ({
    type: 'REMOVE_USER',
    email
});

export const editUser = (id, updates) => ({
    type: 'EDIT_USER',
    id,
    updates
});

export const setUser = ({id, username, books, role}) => ({
    type: 'SET_USER',
    id,
    username,
    books,
    role
});

export const startSignUpUser = (userData) => {
    return (dispatch, getState) => {
        const user = {...userData, role: "USER", books: {purchased: {}, topurchase: {}}};
        return database.ref('users').push(user).then((ref) => {
            dispatch(addUser({id: ref.key, ...user}));
        });
    }
}

export const startLogInUser = () => {
    return (dispatch, getState) => {
        return database.ref(`users/${id}`).once('value').then((snapshot) => {
            dispatch(setUser({id: snapshot.key, ...snapshot.val()}));
        });
    }
};

export const startDeleteUser = (id) => {
    return (dispatch, getState) => {
        return database.ref(`users/${id}`).remove().then(() => {
            dispatch(removeUser(id));
        });
    }
}

export const startEditUser = (id, updates) => {
    return (dispatch, getState) => {
        return database.ref(`users/${id}`).update(updates).then(() => {
            dispatch(editUser(id, updates));
        });
    }
}