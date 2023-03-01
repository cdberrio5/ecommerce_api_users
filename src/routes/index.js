const express = require("express");
const router = express.Router();

const controller = require("../controllers/index");

router.post("/users/auth/login", controller.login);
router.post("/users/auth/register", controller.register);
router.post("/users/auth/validate", controller.validate);
router.post("/users/auth/forgot", controller.forgot);
router.post("/users/auth/restore", controller.restore);

module.exports = router;