const Complaint = require('../models/Complaint');
const { analyzeComplaint } = require('../services/aiService');

// @desc    Create a complaint
// @route   POST /api/complaints
// @access  Private
const createComplaint = async (req, res, next) => {
  try {
    const { title, description, category, location } = req.body;

    if (!title || !description || !category || !location) {
      res.status(400);
      throw new Error('Please fill all required fields');
    }

    // Trigger AI Analysis
    const aiResult = await analyzeComplaint(description);

    const complaint = await Complaint.create({
      name: req.user.name,
      email: req.user.email,
      title,
      description,
      category,
      location,
      aiPriority: aiResult.priority,
      aiDepartment: aiResult.department,
      aiSummary: aiResult.summary,
      aiResponse: aiResult.response,
    });

    res.status(201).json(complaint);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all complaints
// @route   GET /api/complaints
// @access  Private (Admin can see all, Users might see only theirs or public ones - based on requirements, assuming public/all for now or admin)
const getComplaints = async (req, res, next) => {
  try {
    // If admin, return all. If user, return only theirs.
    let query = {};
    if (req.user.role !== 'Admin') {
      query.email = req.user.email; 
    }

    // Allow filtering
    if (req.query.status) {
      query.status = req.query.status;
    }
    if (req.query.category) {
      query.category = req.query.category;
    }

    const complaints = await Complaint.find(query).sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single complaint
// @route   GET /api/complaints/:id
// @access  Private
const getComplaintById = async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      res.status(404);
      throw new Error('Complaint not found');
    }

    // Optional: Check if user owns it or is admin
    if (complaint.email !== req.user.email && req.user.role !== 'Admin') {
       res.status(401);
       throw new Error('Not authorized to view this complaint');
    }

    res.status(200).json(complaint);
  } catch (error) {
    next(error);
  }
};

// @desc    Update complaint status
// @route   PUT /api/complaints/:id
// @access  Private/Admin
const updateComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      res.status(404);
      throw new Error('Complaint not found');
    }

    // Only admin can update status freely
    if (req.user.role !== 'Admin') {
      res.status(401);
      throw new Error('User not authorized to update');
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedComplaint);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete complaint
// @route   DELETE /api/complaints/:id
// @access  Private/Admin
const deleteComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      res.status(404);
      throw new Error('Complaint not found');
    }

    if (req.user.role !== 'Admin') {
      res.status(401);
      throw new Error('User not authorized to delete');
    }

    await complaint.deleteOne();

    res.status(200).json({ id: req.params.id, message: 'Complaint deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Search complaint by location
// @route   GET /api/complaints/search?location=...
// @access  Private
const searchComplaintsByLocation = async (req, res, next) => {
  try {
    const location = req.query.location;
    
    if (!location) {
      res.status(400);
      throw new Error('Please provide a location to search');
    }

    // Regex for case-insensitive partial match
    const complaints = await Complaint.find({
      location: { $regex: location, $options: 'i' }
    });

    res.status(200).json(complaints);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
  searchComplaintsByLocation
};
