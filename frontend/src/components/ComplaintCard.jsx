import { Link } from 'react-router-dom';
import { MdLocationOn, MdAccessTime } from 'react-icons/md';

const ComplaintCard = ({ complaint }) => {
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
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const date = new Date(complaint.createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-200 flex flex-col h-full">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
            {complaint.status}
          </span>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
            {complaint.category}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2" title={complaint.title}>
          {complaint.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {complaint.description}
        </p>
      </div>

      <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 space-y-2">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center text-gray-500">
            <MdLocationOn className="mr-1" />
            <span className="truncate max-w-[120px]" title={complaint.location}>{complaint.location}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <MdAccessTime className="mr-1" />
            <span>{date}</span>
          </div>
        </div>
        
        <div className="pt-3 mt-3 border-t border-gray-200 flex justify-between items-center">
           <div className={`text-xs font-semibold px-2 py-1 border rounded-md ${getPriorityColor(complaint.aiPriority)}`}>
              AI Priority: {complaint.aiPriority}
           </div>
           <Link 
            to={`/complaint/${complaint._id}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
          >
            View Details &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComplaintCard;
