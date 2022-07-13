const { response } = require("express");
const req = require("express/lib/request");
const { validateToken } = require("../../external/auth.service");

exports.validateToken = (req, res, next) => {
    
    //1. we have to authorize the user - call the authServer,
    //2. we have to decode the access token
    //3. we have to add the user details in the req body.
    const authToken = req.headers['authorization'];
    validateToken(authToken).then(res => {
        if(res.status == 200) {
            console.log('successfully validated user!');
            req.user = res.data;
            next();
        } else if(res.status == 401) {
                res.status(401);
        } else if(res.status == 403) {
            res.status(403);
        } else {
            res.status(500).send({
                message: 'Unable to validate user. Please try again after sometime!'
            })
        }
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            message: 'Unable to validate user. Please try again after sometime!'
        })
    })
}

exports.validateAdmin = (req, res, next) => {
    if(!(req.user && req.user.permission === 'ADMIN')) {
        console.log(req.user.permission);
        res.status(401).send({message: `User doesn't have the required permissions`});
        return;
    }
    next();
}

/*

products, price, quantity

cart and product - 
a product can belong to many carts.
a cart can have many products.

many to many relationship. 
- belongsTo and hasOne - learnt already
- belongsToMany 
*/