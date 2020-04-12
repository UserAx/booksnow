const cartDefault = [];

export default (state=cartDefault, action) => {
    switch(action.type){
        case 'ADD_ITEM':
            const duplicate = !(state.every((item) => item.id !== action.item.id));
            //Returns true if no element in the array has the same id as the one that is being added.
            //Then I flip the value so that it easy to understand why the if statement will run. 
            if(duplicate){
                const price = action.item.price; 
                state.forEach((item) => {
                    if(item.id === action.item.id){
                        item.quantity = item.quantity +1;
                        item.price = item.price+price;
                        return [...state];
                    }
                });
            }else{
                return [...state, action.item];
            }
        case 'REDUCE_ITEM':
            state.forEach((item) => {
                if(item.id === action.id){
                    if(item.quantity > 1){
                        item.quantity = item.quantity - 1;
                        item.price = item.price - action.originalPrice;
                    }   
                }
            });
            return [...state];
        case 'REMOVE_ITEM': return state.filter(({id}) => id !== action.id);
        default: return state;
    }
}