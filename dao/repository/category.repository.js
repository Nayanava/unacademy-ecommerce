/*

    Homework: Fetch a category by its name
    Sample example:
    https://stackoverflow.com/questions/59111392/using-findbypk-and-where-condition-in-sequelize

*/

const dbConnection = require("./dbConnection");
const defineCategory = require("../models/category.model");
const { connection } = require("./dbConnection");
//function to create a new row in the Category table
//function to select a row from the Category table
//function to update a row in the Category table
//delete a row from the Category table
//function to show all categories

const Category = defineCategory(dbConnection.connection, dbConnection.DataTypes);

const createCategoryTable = async (forceCreation) => {
    await Category.sync({force: forceCreation})
}

//function to create a new row in the Category table
const save = async (category) => {
    return await Category.create({
        name: category.name,
        description: category.description
    });
}

const fetchCategoryByID = async (id) => {
    return await Category.findByPk(id);
}

const fetchAllCategories = async() => {
    return await Category.findAll();
}

module.exports = {
    createCategoryTable: createCategoryTable,
    createCategory: save,
    fetchCategoryByID: fetchCategoryByID,
    fetchAllCategories: fetchAllCategories
}