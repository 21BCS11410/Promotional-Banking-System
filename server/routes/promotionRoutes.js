const express = require('express');
const router = express.Router();
const { handlePromotion } = require('../controllers/promotionController');

// POST route to handle promotion logic
router.post('/create', handlePromotion);

module.exports = router;
