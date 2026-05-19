const express = require('express');
const router = express.Router();
const {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
  searchComplaintsByLocation,
} = require('../controllers/complaintController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getComplaints)
  .post(protect, createComplaint);

router.route('/search')
  .get(protect, searchComplaintsByLocation);

router.route('/:id')
  .get(protect, getComplaintById)
  .put(protect, admin, updateComplaint)
  .delete(protect, admin, deleteComplaint);

module.exports = router;
