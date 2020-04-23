const defaultuser = {};

export default (state= defaultuser, action) => {
    switch(action.type){
        case 'ADD_USER':
            return {id: action.id, email: action.email, role: action.role, username: action.username, purchases: action.purchases};
        case 'REMOVE_USER':
            return {};
        case 'EDIT_USER':
            return {...state, ...action.updates};
        case 'SET_USER':
            return {id: action.id, email: action.email, role: action.role, username: action.username, purchases: action.purchases};
        default:
            return state;
    }
}