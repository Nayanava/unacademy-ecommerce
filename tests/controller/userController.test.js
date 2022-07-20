const UserRepository = require("../../dao/repository/user.repository");
const newUser = require('../mock-data/userdata.json');
const {mockRequest, mockResponse} = require('../interceptor');
const UserController = require("../../controller/userController");
const errorConstants = require("../../constants/errorConstants");
let req, res;
beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
})

describe('Test all behaviours of UserController.registerUser', () => {
    beforeEach(() => {
        req.body = {};
    });
    it('should call UserController.registerUser method and add new user in DB', async() => {
        req.body = newUser;
        const spy = jest.spyOn(UserRepository, 'registerUser')
        .mockImplementation(
            (newUser) => Promise.resolve(newUser)
        );

        await UserController.registerUser(req, res);

        // console.log(res);
        await expect(spy).toHaveBeenCalled();
        expect(UserRepository.registerUser).toHaveBeenCalledWith(newUser);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(newUser);
    });
    /* it('should throw 400 when ProductController.createProduct called with no product name', async() => {
        await UserController.createProduct(req, res);
        
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

        await UserController.createProduct(req, res);
        
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalled();
    });
    it('Should throws duplicate product name when ProductController.createProduct is called', async() => {
        req.body = newProduct;
        res = mockResponse();
        // console.log(newProduct);
        const spy = jest.spyOn(UserRepository, 'createProduct')
                    .mockImplementation(
                        (newProduct) => {
                            const error = new Error('Duplicate name!');
                            error.name = errorConstants.UNIQUE_KEY_CONSTRAINT_VALIDATION_ERROR;
                            return Promise.reject(error);
                        });
        await UserController.createProduct(req, res);

        await expect(spy).toHaveBeenCalled();
        expect(UserRepository.createProduct).toHaveBeenCalledWith(newProduct);
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            message: `Product name - ${newProduct.name} already exists in the System!`
        });
    }); */
})

