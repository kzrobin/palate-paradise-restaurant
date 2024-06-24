const express = require("express");
const router = express.Router({ mergeParams: true });
const Food = require("../models/food.js");
const foodController = require("../controller/food.js");

//home route
router.get("", foodController.index);
//item route
router.get("/item/:id", foodController.item);
router.get("/type/:type", foodController.type);
//search route
router.get("/search",foodController.search);

module.exports = router;

