const res = require('express/lib/response');
const categoryRepository = require('../dao/repository/category.repository');
const errorConstants = require("../constants/errorConstants")
const addCategory = (req, res) => {
    const body = req.body;
    //name -> nonNull, description -> may or may not be present
    if(!body.name) {
        res.status(400).send({
            message: "Name cannot be empty!"
        })
        return;
    }
    categoryRepository.addCategory({
        name: body.name,
        description: body.description
    }).then(result => {
        console.log(`category name: ${result.name} was created successfully!`);
        res.status(201).send(result);
    }).catch(error => {
        if(error.name === 'SequelizeUniqueConstraintError') {
            console.log(error.errors[0]);
            res.status(400).send({
                message: `${body.name} already exists!`
            });
            return;
        }
        throw error;
    })
    .catch(error => {
        console.log(`Error in creating category: ${body.name}. Error message: ${error.message}`);
        res.status(500).send({
            message: "Error in creating Category. Please try again after sometime!"
        })
    })
}

const fetchAllCategories = (req, res) => {
    categoryRepository.fetchAllCategories()
    .then(categories => {
        res.status(200).send(categories);
    }).catch(error => {
        console.log(error.message);
        res.status(500).send("Error in loading all categories, Please try again after sometime!");
    })
}

const fetchCategoryByID = (req, res) => {
    const categoryId = req.params.categoryId;
    categoryRepository.fetchCategoryByID(categoryId)
    .then(result => {
        if(!result) {
            throw new Error(errorConstants.MISSING_CATEGORY);
            // res.status(404).send({
            //     "message": "The requested category Id doesn't exist in the system!"
            // });
            // return;
        }
        res.status(200).send(result);
    })
    .catch(error => {
        if(error.message === errorConstants.MISSING_CATEGORY) {
            res.status(404).send({
                "message": "The requested category Id doesn't exist in the system!"
            });
        }
    })
    .catch(error => {
        res.status(500)
        .send({
            message:"Error in loading category from database, Please try again after sometime!"
        })
    })
}

const fetchCategoryByName = (req, res) => {
    categoryRepository.fetchCategoriesByCriteria({
        where: {
            name: req.params.name
        }
    }).then(result => res.status(200).send(result))
    .catch((error) => {
        //1. name doesn't exist - client error
        res.status(500)
        .send({message: 'Error occured in processing the request. Please try aga in sometime!'})
    })
} 
module.exports = {
    addCategory: addCategory,
    fetchAllCategories: fetchAllCategories,
    fetchCategoryByID: fetchCategoryByID,
    fetchCategoryByName: fetchCategoryByName
}