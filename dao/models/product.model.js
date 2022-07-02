/*
    1. what are the different columns that we need to store as part of products
    2. what are the different types of queries that can come on the product table.
  
    columns - a, b, c, 
    in order to fetch data our query is depending on these three columns - a, b and c
    index for a, index for b, index for c

    when the search happens - 
    a - emailId or account number or mobile number
    b - type of transaction - peer to peer, scan and pay, bank_transfer, bill_payment
    c - month of transaction

    select * from table where a = 'emailId';
    => listing all the transactions that I have done.

    select * from table where a = 'emailId' and b = 'bill_payment';
    => list all the transaction that I have done for bill_payment

    select * from table where a = 'emailId' and b = 'bill_payment' && c = 'June';
    => list all the transactions that I have done for bill_payment only in June;

    => create index (a, b, c) 
    => even if only a come,
        or only a and b comes 
        or a and b and c comes in query
    All the  above three scenarios can be handled using one single index
*/

/*
    id, name, description, image, price, category_id
*/

/*
Important links - https://sequelize.org/docs/v6/core-concepts/assocs/#:~:text=hasMany(B)%20association%20means%20that,unless%20they%20are%20already%20present)
https://sebhastian.com/sequelize-foreign-key/
*/
exports.defineProduct = (connection, DataTypes) => {
    const product = connection.define('product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT
        },
        imageUrl: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return product;
}