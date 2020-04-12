//item consists of book id, title and price.

export const addItem = (item) => ({
    type: 'ADD_ITEM',
    item
});

export const removeItem = (id = '') => ({
    type: 'REMOVE_ITEM',
    id
});

export const reduceItem = (id = '', originalPrice=0) => ({
    type: 'REDUCE_ITEM',
    id,
    originalPrice
});