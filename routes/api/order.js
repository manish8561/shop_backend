const express = require("express");
const router = express.Router();
const auth = require("../auth");
// Require the controllers WHICH WE DID NOT CREATE YET!!
const order = require("../../controllers/order");

// a simple test url to check that all of our files are communicating correctly.
router.get("/get", order.getAll);
router.post("/add", order.add);
router.put("/update/:id", order.update);
router.delete("/delete/:id", order.deleteOrder);
router.get("/user/:user", order.userOrders);

module.exports = router;
