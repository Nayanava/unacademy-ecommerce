const productRepository = require("../dao/repository/product.repository");
const errorConstants = require("../constants/errorConstants")
const { Op } = require("sequelize");
const createProduct = (req, res) => {
    //1. name should not be null
    //2. categoryId should not be null
    const body = req.body;
    if(!body.name || !body.categoryId) { 
       res.status(400)
       .send({
           message: "Name or CategoryId cannot be null!"
       });
       return;
    }

    productRepository.createProduct({
        name: body.name,
        description: body.description,
        imageUrl: body.imageUrl,
        price: body.price,
        categoryId: body.categoryId
    }).then(result => res.status(201).send(result))
    .catch(error => {
        //1. duplicate name
        if(error.name === errorConstants.UNIQUE_KEY_CONSTRAINT_VALIDATION_ERROR) {
            res.status(400)
            .send({
                message: `Product name - ${body.name} already exists in the System!`
            });
            return;
        }
        throw error;
        //2. invalid categoryId
    }).catch(error => {
        if(error.name === errorConstants.FOREIGN_KEY_CONSTRAINT_VALIDATION_ERROR) {
            console.log(`Invalid categoryId ${body.categoryId}`);
            res.status(400)
            .send({
                message: "Category Id doesn't exist in the System!"
            });
            return;
        }
        throw error;
    }).catch(error => {
        console.log(`Saving ${body.name} to database failed with error ${error.message}`);
        res.status(500).send({
            message: `Unable to save product ${body.name} to DB. Please try again in sometime!`
        })
    })
}


//1. fetch product by name
const fetchProuctsByName = (req, res) => {
    productRepository.fetchProductsByCriteria({
        where: {
            name: req.params.name
        }
    }).then(result =>  res.status(200).send(result))
    .catch(err => {
        //console.log
        res.status(500)
        .send({message: 'Error occured in proccessing the request, Please try again after sometime!'})
    });
}

//2. fetch product by categoryId
const fetchProuctsByCategoryId = (req, res) => {
    let crtieria;
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    if(minPrice && maxPrice) {
        criteria = {
            where: {
                [Op.and]: [
                    {
                        categoryId: req.params.categoryId
                    },
                    {
                        price: {
                            [Op.between]: [minPrice, maxPrice]
                        }
                    }
                ]
            },
            order: [['price', 'ASC']]
        }
    } else {
        criteria = {
            where: {
                categoryId: req.params.categoryId
            }
        }
    }
    productRepository.fetchProductsByCriteria(criteria)
    .then(result =>  res.status(200).send(result))
    .catch(err => {
        //console.log
        res.status(500)
        .send({message: 'Error occured in proccessing the request, Please try again after sometime!'})
    });
}

const search = (req, res) => {
    const keyword = req.query.search;
    const keywords = keyword.split(' ');
    const likeKeywords = [];
    const criteria = {};
    for(let i = 0; i < keywords.length; i++) {
        likeKeywords[i] = {
             name : {
                 [Op.like]: `%${keywords[i]}%`
             }
        }
    }
    criteria.where = {
        [Op.and]: likeKeywords
    }
    console.log(criteria);

    productRepository.fetchProductsByCriteria(criteria)
    .then(result => res.status(200).send(result))
    .catch(error => {
        console.log(error);
        res.status(500)
        .send({message: 'Error occured in proccessing the request, Please try again after sometime!'})
    })
}
module.exports = {
    createProduct: createProduct,
    fetchProuctsByName: fetchProuctsByName,
    fetchProuctsByCategoryId: fetchProuctsByCategoryId,
    search: search
}