import database from '../firebase/firebase';

export const addUser = ({id, username, purchases, role, email}) => ({//I can pass a user object here and it will get only the id.
    type: 'ADD_USER',
    id, 
    username,
    purchases,
    role, 
    email
});

export const removeUser = () => ({
    type: 'REMOVE_USER'
});

export const editUser = (id, updates) => ({
    type: 'EDIT_USER',
    id,
    updates
});

export const setUser = ({id, username, purchases = {}, role, email}) => ({
    type: 'SET_USER',
    id,
    username,
    purchases,
    role,
    email
});

export const startSignUpUser = (userData) => {
    return (dispatch, getState) => {
        const user = {...userData, role: "USER", purchases: {}};
        return database.ref('users').push(user).then((ref) => {
            dispatch(addUser({id: ref.key, ...user}));
        });
    }
}

export const startLogInUser = (email, password) => {
    return (dispatch, getState) => {
        return database.ref('users').once('value').then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const user = childSnapshot.val();
                if(user.email === email){
                    if(user.password === password){
                        return dispatch(setUser({...user, id: childSnapshot.key}));
                    }
                }
            });
        });
    };
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