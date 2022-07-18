const ProductRepository = require("../../dao/repository/product.repository");
const newProduct = require('../mock-data/product.json');
const {mockRequest, mockResponse} = require('../interceptor');
const ProductController = require("../../controller/productController");
const errorConstants = require("../../constants/errorConstants");
let req, res;
beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
})

describe('Test all behaviours of ProductController.create', () => {
    beforeEach(() => {
        req.body = {};
    });
    it('should call ProductController.createProduct method and add new product in DB', async() => {
        req.body = newProduct;
        const spy = jest.spyOn(ProductRepository, 'createProduct')
        .mockImplementation(
            (newProduct) => Promise.resolve(newProduct)
        );

        await ProductController.createProduct(req, res);

        console.log(res);
        await expect(spy).toHaveBeenCalled();
        expect(ProductRepository.createProduct).toHaveBeenCalledWith(newProduct);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(newProduct);
    });
    it('should throw 400 when ProductController.createProduct called with no product name', async() => {
        await ProductController.createProduct(req, res);
        
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalled();
    });
    it('should throw 400 when ProductController.createProduct called with no categoryId', async() => {
        req.body = {
            name: newProduct.name,
            description: newProduct.description,
            price: newProduct.price,
            categoryId: newProduct.categoryId
        };
        delete req.body.categoryId;

        await ProductController.createProduct(req, res);
        
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalled();
    });
    it('Should throws duplicate product name when ProductController.createProduct is called', async() => {
        req.body = newProduct;
        res = mockResponse();
        console.log(newProduct);
        const spy = jest.spyOn(ProductRepository, 'createProduct')
                    .mockImplementation(
                        (newProduct) => {
                            const error = new Error('Duplicate name!');
                            error.name = errorConstants.UNIQUE_KEY_CONSTRAINT_VALIDATION_ERROR;
                            return Promise.reject(error);
                        });
        await ProductController.createProduct(req, res);

        await expect(spy).toHaveBeenCalled();
        expect(ProductRepository.createProduct).toHaveBeenCalledWith(newProduct);
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            message: `Product name - ${newProduct.name} already exists in the System!`
        });
    });
})

describe('Test all behaviours for ProductController.fetchProductByName', () => {
    it('Should fetch product when called with valid Product Name', async() => {
        req.params.name = 'ValidCategoryName';
        const spy = jest.spyOn(ProductRepository, 'fetchProductsByCriteria')
        .mockImplementation(({}) => Promise.resolve(newProduct))

        await ProductController.fetchProuctsByName(req, res);
        expect(spy).toHaveBeenCalledWith({
            where : {
                name: req.params.name
            }
        });
        expect(ProductRepository.fetchProductsByCriteria).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(newProduct);
    });
    it('Should send 500 as status, when there is some error in fetch Product by name', async() => {
        req.params.name = 'AnyRandomName';
        const spy = jest.spyOn(ProductRepository, 'fetchProductsByCriteria')
        .mockImplementation(({}) => Promise.reject(new Error('Error in processing request!')));
        await ProductController.fetchProuctsByName(req, res);
        await expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({message: 'Error occured in proccessing the request, Please try again after sometime!'});
    });
})

/*
    ProductController (I write the same unit test cases checking all the features of ProdRepo - mock
         + I will write new unit test cases checking all the features of ProdController.)
            - ProductRepository (I wrote unit test cases checking all the features)
                 - Sequelize

*/