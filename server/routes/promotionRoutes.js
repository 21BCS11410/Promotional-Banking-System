const express = require('express');
const router = express.Router();
const { handlePromotion, deletePromotion } = require('../controllers/promotionController');

// POST route to handle promotion logic
router.post('/create', handlePromotion);

// DELETE route to delete promotion entry by account number
router.delete('/delete', deletePromotion);

module.exports = router;
