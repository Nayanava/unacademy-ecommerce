exports.validateAddOrUpdateCategoryRequest = (req, res, next) => {
    if(!req.body) {
        res.status(400).send({message: 'Request body cannot be empty!'});
        return;
    }
    if(!req.body.name) {
        res.status(400).send({message: 'Category name cannot be empty!'});
        return;
    }
    next();
}

exports.validateAddOrUpdateProductRequest = (req, res, next) => {
    if(!req.body) {
        res.status(400).send({message: 'Request body cannot be empty!'});
        return;
    }
    if(!req.body.name) {
        res.status(400).send({message: 'Product name cannot be empty!'});
        return;
    }
    if(!req.body.categoryId) {
        res.status(400).send({message: 'CategoryId cannot be empty!'});
        return;
    }
    if(typeof req.body.categoryId !== 'number') {
        res.status(400).send({message: 'Invalid CategoryId!'});
        return;
    }
    next();
}

// exports.validateName = (req, res, next) => {
//     if(!req.body.name) {
        
//     }
// }