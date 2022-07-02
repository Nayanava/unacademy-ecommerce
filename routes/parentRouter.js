//api endpoint for category creation
// -> http://localhost:8080/category/create
// api endpoint for category fetch
// -> http://localhost:8080/category/{categoryId}

const categoryRouter = require('./categoryRouter');
const productRouter = require('./productRouter');
exports.createRoutes = (app) => {
    app.use("/category", categoryRouter);
    app.use("/product", productRouter);
}