const express = require('express');
const { create, update, getCart } = require('../controller/cartController');
const { validateToken } = require('../external/auth.service');
const router = express.Router();

router.post('/create', [validateToken], create);
router.put('/update/:id', update);
router.get('/cart/:cartId', getCart);

module.exports = router;