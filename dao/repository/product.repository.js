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

const createProduct = async(product) => {
    return await Product.create({
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        price: product.Price,
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
const fetchAllProductsByCategoryId = async(categoryId) => {

}
//TODO:: implement this
const fetchProductByName = async(name) => {

}

module.exports = {
    createProductTable: createProductTable,
    createProduct: createProduct,
    fetchAllProducts: fetchAllProducts,
    fetchProductsByCategoryId: fetchAllProductsByCategoryId,
    //productByName: fetchProductByName,
    fetchProductById: fetchProductById
}