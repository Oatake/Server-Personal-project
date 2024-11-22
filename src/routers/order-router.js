const express = require("express");
const {receiveOrder, kitchenOrder, updateOrder, getBills, paidOrder} = require("../controllers/order-controller");
const router = express.Router()

router.post("/", receiveOrder)
router.get("/kitchen", kitchenOrder)
router.patch("/", updateOrder)
router.patch("/paid", paidOrder)
router.get("/summary/:table", getBills)
module.exports = router;