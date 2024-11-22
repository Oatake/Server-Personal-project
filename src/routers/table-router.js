const express = require("express");
const { getTablestatus, updateTableStatus } = require("../controllers/table-controller");

const router = express.Router()

router.get('/', getTablestatus)
router.patch('/', updateTableStatus)


module.exports = router;