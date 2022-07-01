const categoryRepository = require("./category.repository")

exports.initializeTables = (forceCreation) => {
    categoryRepository.createCategoryTable(forceCreation);
}