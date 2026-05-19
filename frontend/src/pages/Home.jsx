import { Link } from 'react-router-dom';
import { MdSpeed, MdAutoGraph, MdSupportAgent } from 'react-icons/md';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-20 px-4 sm:px-6 lg:px-8 flex-grow flex items-center">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Smart AI-Powered <br className="hidden md:block"/> Complaint Resolution
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10 font-light">
            Report civic issues instantly. Our AI automatically analyzes, prioritizes, and routes your complaints to the correct department for faster resolution.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register-complaint" className="bg-white text-blue-700 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition transform hover:-translate-y-1">
              Report an Issue
            </Link>
            <Link to="/dashboard" className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-blue-700 transition transform hover:-translate-y-1">
              Track Status
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">How AI Makes It Better</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">We use advanced natural language processing to understand and categorize your complaints automatically.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="h-14 w-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <MdSpeed className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Routing</h3>
              <p className="text-gray-600 leading-relaxed">
                No more wondering which department to contact. The AI reads your complaint and instantly assigns it to Water, Electricity, Roads, etc.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="h-14 w-14 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                <MdAutoGraph className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Prioritization</h3>
              <p className="text-gray-600 leading-relaxed">
                Urgent issues like active water leaks or live wire damage are automatically flagged as High Priority for immediate attention.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="h-14 w-14 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <MdSupportAgent className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Auto-Responses</h3>
              <p className="text-gray-600 leading-relaxed">
                Get an instant, context-aware acknowledgment explaining what steps will be taken next to resolve your specific problem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section (Static for landing page) */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-extrabold text-blue-600">95%</div>
              <div className="mt-2 text-sm font-medium text-gray-500 uppercase tracking-wide">Routing Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-blue-600">2.5h</div>
              <div className="mt-2 text-sm font-medium text-gray-500 uppercase tracking-wide">Avg. Response Time</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-blue-600">12k+</div>
              <div className="mt-2 text-sm font-medium text-gray-500 uppercase tracking-wide">Issues Resolved</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-blue-600">24/7</div>
              <div className="mt-2 text-sm font-medium text-gray-500 uppercase tracking-wide">AI Availability</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
