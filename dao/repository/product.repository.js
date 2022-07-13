/*
1. define the table, create, retrieve By productId, listAllProducts, listProductsByCategoryId
2. update and delete
*/

const defineCategory = require("../models/Category.model");
const {defineProduct} = require("../models/product.model");
const dbConnection = require("./dbConnection");

const Product = defineProduct(dbConnection.connection, dbConnection.DataTypes);

//because we have a foreign key relationship, we need the other table also
createProductTable = async (forceCreation) => {
    const category = defineCategory(dbConnection.connection, dbConnection.DataTypes);
    Product.belongsTo(category, {
        foreignKey: "categoryId",
        targetKey: "id",
      });
    await Product.sync({force: forceCreation});
}

const addProduct = async(product) => {
    return await Product.create({
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        price: product.price,
        categoryId: product.categoryId
    });
}

//TODO:: add multiple products at one time
const createMultipleProducts = async(products) => {

}

const fetchProductById = async (id) => {
    return await Product.findByPk(id);
}

const fetchAllProducts = async() => {
    return await Product.findAll();
}

//TODO:: implement this
const fetchProductsByCriteria = async (criteria) => {
    return await Product.findAll(criteria);
}

module.exports = {
    Product: Product,
    createProductTable: createProductTable,
    createProduct: addProduct,
    fetchAllProducts: fetchAllProducts,
    fetchProductById: fetchProductById,
    fetchProductsByCriteria: fetchProductsByCriteria
}