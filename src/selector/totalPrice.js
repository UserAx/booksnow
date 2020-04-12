export default (items) => {
    if(items.length == 0) {
        return 0;
    }else {
        return items.map((item) => item.price).reduce((sum, currentPrice) => sum+currentPrice);
    }
}