const categoryRepository = require("../dao/repository/category.repository");

const addNewCategory = (req, res) => {
    const body = req.body;
    if(!req.body.name) {
        res.status(400).send({
            message: "Category name can't be empty!"
        });
        return;
    }
    categoryRepository.createCategory({
        name: req.body.name,
        description: req.body.description
    }).then(result => {
        console.log(`category name: [${result.name}] was created successfully`);
        res.status(201).send(result)
    }).catch(error => {
        if(error.name === 'SequelizeUniqueConstraintError') {
            console.log(`[${req.body.name}] category already exsists in the system!`);
            res.status(400).send({message: `[${req.body.name}] category already exsists in the system!`})

            return;
        }
        throw error;
    }).catch(error => {
        console.log(`Error in creating category: [${req.body.name}]. Error message: ${error}`)
        res.status(500).send({
            "message": "Error in creating category!"
        })
    })
}

module.exports = {
    create: addNewCategory,
}