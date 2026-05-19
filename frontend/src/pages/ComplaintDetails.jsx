import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { MdArrowBack, MdLocationOn, MdDateRange, MdPerson, MdEmail, MdDelete, MdUpdate } from 'react-icons/md';
import { FaRobot } from 'react-icons/fa';

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState('');
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  const fetchComplaint = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/complaints/${id}`);
      setComplaint(res.data);
      setStatusUpdate(res.data.status);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load complaint details');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (statusUpdate === complaint.status) return;
    try {
      setUpdating(true);
      const res = await api.put(`/complaints/${id}`, { status: statusUpdate });
      setComplaint(res.data);
      alert('Status updated successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
      setStatusUpdate(complaint.status);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this complaint? This cannot be undone.')) return;
    
    try {
      setDeleting(true);
      await api.delete(`/complaints/${id}`);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete complaint');
      setDeleting(false);
    }
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (error || !complaint) return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-red-50 text-red-700 rounded-xl shadow-sm text-center">
      <p className="text-lg font-medium">{error || 'Complaint not found'}</p>
      <Link to="/dashboard" className="mt-4 inline-block text-blue-600 hover:underline">
        &larr; Back to Dashboard
      </Link>
    </div>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 border border-red-200';
      case 'Medium': return 'text-orange-600 bg-orange-50 border border-orange-200';
      case 'Low': return 'text-green-600 bg-green-50 border border-green-200';
      default: return 'text-gray-600 bg-gray-50 border border-gray-200';
    }
  };

  const date = new Date(complaint.createdAt).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition">
          <MdArrowBack className="mr-1" /> Back to Dashboard
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header Section */}
        <div className="p-6 md:p-8 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
            <div>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                {complaint.category}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                {complaint.title}
              </h1>
            </div>
            
            <div className="flex flex-col items-start md:items-end gap-2">
              <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${getStatusColor(complaint.status)}`}>
                {complaint.status}
              </span>
              
              {user.role === 'Admin' && (
                <div className="flex items-center gap-2 mt-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
                  <select
                    value={statusUpdate}
                    onChange={(e) => setStatusUpdate(e.target.value)}
                    className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    disabled={updating}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <button
                    onClick={handleStatusUpdate}
                    disabled={updating || statusUpdate === complaint.status}
                    className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
                    title="Update Status"
                  >
                    <MdUpdate size={18} />
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 disabled:opacity-50 transition ml-2"
                    title="Delete Complaint"
                  >
                    <MdDelete size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-4">
            <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100">
              <MdDateRange className="mr-2 text-gray-400" size={18} />
              {date}
            </div>
            <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100">
              <MdLocationOn className="mr-2 text-gray-400" size={18} />
              {complaint.location}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Main Content */}
          <div className="p-6 md:p-8 flex-grow border-b md:border-b-0 md:border-r border-gray-100 md:w-2/3">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Description</h3>
            <div className="prose prose-blue text-gray-700 whitespace-pre-wrap leading-relaxed bg-gray-50 p-6 rounded-xl border border-gray-100">
              {complaint.description}
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mt-8 mb-4">Reporter Details</h3>
            <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col gap-3 shadow-sm">
              <div className="flex items-center text-gray-700">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                  <MdPerson />
                </div>
                <span className="font-medium">{complaint.name}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                  <MdEmail />
                </div>
                <span>{complaint.email}</span>
              </div>
            </div>
          </div>

          {/* AI Insights Sidebar */}
          <div className="p-6 md:p-8 bg-blue-50 md:w-1/3">
            <div className="flex items-center gap-2 mb-6 text-blue-800 border-b border-blue-200 pb-4">
              <FaRobot size={24} />
              <h2 className="text-xl font-bold tracking-tight">AI Analysis</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Priority Level</p>
                <div className={`inline-block px-3 py-1 rounded-md text-sm font-bold shadow-sm ${getPriorityColor(complaint.aiPriority)}`}>
                  {complaint.aiPriority || 'Unassigned'}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Suggested Department</p>
                <p className="text-gray-900 font-medium bg-white px-3 py-2 rounded-md shadow-sm border border-blue-100">
                  {complaint.aiDepartment || 'Pending Assignment'}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Summary</p>
                <p className="text-gray-700 text-sm leading-relaxed bg-white p-3 rounded-md shadow-sm border border-blue-100">
                  {complaint.aiSummary || 'No summary generated yet.'}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Auto-Response sent to user</p>
                <div className="bg-white p-3 rounded-md border-l-4 border-blue-500 shadow-sm text-sm text-gray-600 italic">
                  "{complaint.aiResponse || 'No auto-response available.'}"
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;
