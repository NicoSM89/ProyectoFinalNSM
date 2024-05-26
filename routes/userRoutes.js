const express = require('express');
const { getAllUsers, cleanInactiveUsers, modifyUserRole, deleteUser } = require('../controllers/userController');
const router = express.Router();

router.get('/', getAllUsers);
router.delete('/', cleanInactiveUsers);
router.post('/modify-role', modifyUserRole);
router.post('/delete', deleteUser);

module.exports = router;
