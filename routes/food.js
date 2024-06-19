const express = require("express");
const router = express.Router({ mergeParams: true });
const Food = require("../models/food.js");


//home route
 router.get("/", async (req, res) => {
    let allItems = await Food.find()
    res.render("./food/index.ejs", { allItems });
});
// menu burger
 router.get("/burger", async (rq, res) => {
    let type = "Burger";
    let allItems = await Food.find({ type: "burger" })
    // console.log(allItems);
    res.render("./food/items.ejs", { allItems, type});
});
// menu pizza
 router.get("/pizza", async (rq, res) => {
    let type = "Pizza";
    let allItems = await Food.find({ type: "pizza" })
    // console.log(allItems);
    res.render("./food/items.ejs", { allItems, type});
})
//menu pizza
 router.get("/fry", async (rq, res) => {
    let type = "Fry";
    let allItems = await Food.find({ type: "fry" })
    // console.log(allItems);
    res.render("./food/items.ejs", { allItems, type});
});
//menu set Menu
 router.get("/setmenu", async (rq, res) => {
    let type = "Set Menu";
    let allItems = await Food.find({ type: "setmenu" });
    // console.log(allItems);
    res.render("./food/items.ejs", { allItems, type});
});

//menu softDrinks
 router.get("/softdrinks", async (rq, res) => {
    let type = "Soft Drinks";
    let allItems = await Food.find({ type: "Soft Drinks" });
    // console.log(allItems);
    res.render("./food/items.ejs", { allItems, type});
});


module.exports = router;

