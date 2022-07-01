const categoryRouter = require("./categoryRouter");
exports.createRoutes = (app) => {
    app.use("/category", categoryRouter);
}