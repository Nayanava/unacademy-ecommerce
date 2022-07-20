const CartRepository = require('../../dao/repository/cart.repositroy');
const newCart = require('../mock-data/cart.json');
const newUser = require('../mock-data/user.json');
const {mockRequest, mockResponse} = require('../interceptor');
const CartController = require("../../controller/cartController");
const errorConstants = require("../../constants/errorConstants");

let req, res;
beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
})

describe('Test all behaviours of CartController.create', () => {
    beforeEach(() => {
        req.body = {};
    });
    it('should call CartController.Cart.create method and add new cart in DB', async() => {
        req.body = newCart;
        req.user = newUser;
        const spy = jest.spyOn(CartRepository.Cart, 'create')
        .mockImplementation(
            (newCart) => Promise.resolve(newCart)
        );

        await CartController.create(req, res);

        await expect(spy).toHaveBeenCalled();
        expect(CartRepository.Cart.create).toHaveBeenCalledWith(newCart);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(newCart);
    });
    it('should throw 400 when CartController.createCart called with no cart info', async() => {
        req.body = {};
        req.user = newUser;
        await CartController.create(req, res);
        
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalled();
    });
});