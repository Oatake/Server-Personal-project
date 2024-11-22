const express = require('express');
const { getAllUser, removeUser, updateUserRole } = require('../controllers/user-controller');
const router = express.Router()

router.get('/', getAllUser)
router.delete('/:userId', removeUser)
router.patch('/', updateUserRole)
module.exports = router;