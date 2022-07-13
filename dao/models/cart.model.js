/*
1. cartId
2. ProductId, Quantity and Price

*/
exports.defineCart = (conn, DataTypes) => {
    const Cart = conn.define('cart', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Cart;
}