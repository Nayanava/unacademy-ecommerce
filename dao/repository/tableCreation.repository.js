const dbConnections = require("./dbConnection");
const categoryRepository = require("./category.repository");

exports.initializeTables = () => {
    categoryRepository.createCategoryTable(true);
}