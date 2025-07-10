const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controller/userController');

// Optional: Protect route if only admin should access
// const { protect, isAdmin } = require('../middleware/authMiddleware');

router.get('/all', /*protect, isAdmin,*/ getAllUsers);

module.exports = router;
