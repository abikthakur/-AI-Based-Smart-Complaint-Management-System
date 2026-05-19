const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
    },
    location: {
      type: String,
      required: [true, 'Please add a location'],
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Resolved', 'Rejected'],
      default: 'Pending',
    },
    aiPriority: {
      type: String,
      default: 'Not Analyzed',
    },
    aiDepartment: {
      type: String,
      default: 'Pending Assignment',
    },
    aiSummary: {
      type: String,
    },
    aiResponse: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Complaint', complaintSchema);
