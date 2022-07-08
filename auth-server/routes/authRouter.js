const express = require("express");
const { accessToken, fetchNewAccessToken, authorize } = require("../controller/auth.controller");
const router = express.Router();

router.post('/getAccessToken', accessToken);
router.post('/refresh', fetchNewAccessToken);
router.get('/authorize', authorize);
module.exports = router;

/*

*/