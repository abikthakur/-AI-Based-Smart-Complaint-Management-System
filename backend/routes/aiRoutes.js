const express = require('express');
const router = express.Router();
const { analyzeComplaintText } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/analyze', protect, analyzeComplaintText);

module.exports = router;
