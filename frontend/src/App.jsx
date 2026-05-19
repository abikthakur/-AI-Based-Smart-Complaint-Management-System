import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import RegisterComplaint from './pages/RegisterComplaint';
import ComplaintDetails from './pages/ComplaintDetails';

const NotFound = () => <div className="p-8 text-center text-2xl font-bold text-red-500">404 Not Found</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow w-full">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/register-complaint" 
              element={
                <ProtectedRoute>
                  <RegisterComplaint />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/complaint/:id" 
              element={
                <ProtectedRoute>
                  <ComplaintDetails />
                </ProtectedRoute>
              } 
            />

            {/* Catch All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        {/* Simple Footer */}
        <footer className="bg-gray-800 text-white py-6 text-center">
          <p>&copy; {new Date().getFullYear()} AI Smart Complaint Management System. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
