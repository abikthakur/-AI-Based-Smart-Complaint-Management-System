import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { MdCheckCircle, MdErrorOutline } from 'react-icons/md';

const RegisterComplaint = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const categories = [
    'Water', 'Electricity', 'Garbage', 'Roads', 'Drainage', 'Internet/Network', 'Other'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await api.post('/complaints', formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit complaint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[calc(100vh-130px)] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
          <MdCheckCircle className="mx-auto text-6xl text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Complaint Submitted!</h2>
          <p className="text-gray-600 mb-6">Your complaint has been successfully registered and is being analyzed by our AI.</p>
          <div className="animate-pulse flex space-x-4 justify-center">
             <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
             <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
             <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-400 mt-4">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-blue-600 px-6 py-8 text-white text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">File a New Complaint</h1>
          <p className="text-blue-100 text-sm md:text-base max-w-xl mx-auto">
            Provide details about the issue. Our AI will automatically analyze it and assign it to the correct department.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          {error && (
            <div className="bg-red-50 p-4 rounded-md flex items-start gap-3">
              <MdErrorOutline className="text-red-500 text-xl flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Complaint Title *</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              placeholder="e.g. Broken water pipe on Main St."
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                name="category"
                id="category"
                required
                className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="" disabled>Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Specific Location *</label>
              <input
                type="text"
                name="location"
                id="location"
                required
                placeholder="City, Area, Landmark"
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Detailed Description *</label>
            <textarea
              name="description"
              id="description"
              rows="5"
              required
              placeholder="Describe the issue in detail. The more context you provide, the better our AI can analyze and route it."
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="mr-4 px-6 py-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center min-w-[140px] transition-colors disabled:opacity-70"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : 'Submit Complaint'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterComplaint;
