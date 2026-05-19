const { analyzeComplaint } = require('../services/aiService');

// @desc    Analyze a complaint text manually (Testing/API specific)
// @route   POST /api/ai/analyze
// @access  Private
const analyzeComplaintText = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text) {
      res.status(400);
      throw new Error('Please provide text to analyze');
    }

    const aiResult = await analyzeComplaint(text);

    res.status(200).json(aiResult);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  analyzeComplaintText,
};
