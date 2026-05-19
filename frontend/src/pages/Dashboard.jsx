import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import ComplaintCard from '../components/ComplaintCard';
import { MdSearch, MdFilterList } from 'react-icons/md';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filtering states
  const [searchLocation, setSearchLocation] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    fetchComplaints();
  }, [statusFilter, categoryFilter]);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      let url = '/complaints?';
      if (statusFilter) url += `status=${statusFilter}&`;
      if (categoryFilter) url += `category=${categoryFilter}&`;
      
      const res = await api.get(url);
      setComplaints(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch complaints');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchLocation.trim()) {
      fetchComplaints();
      return;
    }
    
    try {
      setLoading(true);
      const res = await api.get(`/complaints/search?location=${searchLocation}`);
      setComplaints(res.data);
      setError(null);
    } catch (err) {
      setError('Search failed');
    } finally {
      setLoading(false);
    }
  };

  // Simple stats for Admin
  const totalComplaints = complaints.length;
  const pendingComplaints = complaints.filter(c => c.status === 'Pending').length;
  const resolvedComplaints = complaints.filter(c => c.status === 'Resolved').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {user.role === 'Admin' ? 'Admin Dashboard' : 'My Complaints'}
          </h1>
          <p className="text-gray-500 mt-1">Manage and track reported issues.</p>
        </div>
      </div>

      {/* Admin Stats Section */}
      {user.role === 'Admin' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Complaints</p>
              <p className="text-3xl font-bold text-gray-900">{totalComplaints}</p>
            </div>
            <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
               <MdFilterList size={24}/>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">{pendingComplaints}</p>
            </div>
             <div className="h-12 w-12 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-600">
               <MdFilterList size={24}/>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Resolved</p>
              <p className="text-3xl font-bold text-green-600">{resolvedComplaints}</p>
            </div>
             <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
               <MdFilterList size={24}/>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <form onSubmit={handleSearch} className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search by Location</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdSearch className="text-gray-400 text-xl" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g. Ghaziabad, New York, Main Street..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
            </form>
          </div>
          
          <div className="w-full md:w-48">
             <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
             <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
             >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Rejected">Rejected</option>
             </select>
          </div>

          <div className="w-full md:w-48">
             <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
             <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
             >
                <option value="">All Categories</option>
                <option value="Water">Water</option>
                <option value="Electricity">Electricity</option>
                <option value="Roads">Roads</option>
                <option value="Garbage">Garbage</option>
                <option value="Other">Other</option>
             </select>
          </div>
          
          <div className="flex items-center">
            <button 
              onClick={() => { setStatusFilter(''); setCategoryFilter(''); setSearchLocation(''); fetchComplaints(); }}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Complaints List */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="text-center py-10 bg-red-50 rounded-xl text-red-600">
          {error}
        </div>
      ) : complaints.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
             <MdFilterList className="w-full h-full" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No complaints found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map((complaint) => (
            <ComplaintCard key={complaint._id} complaint={complaint} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
