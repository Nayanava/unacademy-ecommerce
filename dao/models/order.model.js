/*
1. order disbursement Id,
2. {
    [productIds, quantity, price]
}

3. order and product - many to many relationship.

4. id, 
user - many orders, order - user. (many to one relationship)

5. User.hasMany(Orders) - userId as a foreign key in Orders.

6. overall cost - one single column
7. status of the order.
*/