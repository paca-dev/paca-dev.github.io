import React, { useState } from 'react';
import { 
  User, 
  Briefcase, 
  BookmarkIcon, 
  Bell, 
  Upload, 
  FileText, 
  Settings,
  Mail,
  MapPin,
  Calendar
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SEO from '../components/SEO';

const Dashboard = () => {
  const { user } = useAuth();
  const [cvText, setCvText] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const handleCvUpload = async () => {
    if (!cvText.trim()) return;
    
    // TODO: Send to backend API
    console.log('Uploading CV:', cvText);
    // Show success message
  };

  const savedJobs = [
    {
      id: '1',
      title: 'Senior React Developer',
      company: 'TechCorp SA',
      location: 'Sophia Antipolis',
      savedAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'DevOps Engineer',
      company: 'CloudTech',
      location: 'Antibes',
      savedAt: '2024-01-14'
    }
  ];

  const applications = [
    {
      id: '1',
      title: 'Full Stack Developer',
      company: 'StartupHub',
      status: 'Interview Scheduled',
      appliedAt: '2024-01-10',
      statusColor: 'text-blue-600 bg-blue-100'
    },
    {
      id: '2',
      title: 'Product Manager',
      company: 'InnovTech',
      status: 'Under Review',
      appliedAt: '2024-01-08',
      statusColor: 'text-yellow-600 bg-yellow-100'
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in Required</h2>
          <p className="text-gray-600">Please sign in to access your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Dashboard | PACA-Dev"
        description="Manage your job applications, saved jobs, and profile on PACA-Dev."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=1e3a8a&color=fff`}
                alt={user.displayName || 'User'}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {user.displayName}!
                </h1>
                <p className="text-gray-600 flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  {user.email}
                </p>
              </div>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', name: 'Overview', icon: Briefcase },
              { id: 'saved-jobs', name: 'Saved Jobs', icon: BookmarkIcon },
              { id: 'applications', name: 'Applications', icon: FileText },
              { id: 'cv-upload', name: 'CV & Profile', icon: Upload },
              { id: 'notifications', name: 'Notifications', icon: Bell }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Applications</h3>
                <div className="text-3xl font-bold text-blue-600 mb-1">2</div>
                <p className="text-sm text-gray-600">Active applications</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Saved Jobs</h3>
                <div className="text-3xl font-bold text-green-600 mb-1">5</div>
                <p className="text-sm text-gray-600">Jobs in your watchlist</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Views</h3>
                <div className="text-3xl font-bold text-purple-600 mb-1">12</div>
                <p className="text-sm text-gray-600">This month</p>
              </div>
            </div>
          )}

          {/* Saved Jobs Tab */}
          {activeTab === 'saved-jobs' && (
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Saved Jobs</h2>
                <p className="text-gray-600">Jobs you've bookmarked for later</p>
              </div>
              <div className="divide-y divide-gray-200">
                {savedJobs.map((job) => (
                  <div key={job.id} className="p-6 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                      <p className="text-blue-600 font-medium">{job.company}</p>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                        <Calendar className="h-4 w-4 ml-4 mr-1" />
                        Saved {job.savedAt}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">View</button>
                      <button className="text-red-600 hover:text-red-800">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Applications Tab */}
          {activeTab === 'applications' && (
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Job Applications</h2>
                <p className="text-gray-600">Track your application status</p>
              </div>
              <div className="divide-y divide-gray-200">
                {applications.map((app) => (
                  <div key={app.id} className="p-6 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{app.title}</h3>
                      <p className="text-blue-600 font-medium">{app.company}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${app.statusColor}`}>
                          {app.status}
                        </span>
                        <span className="text-sm text-gray-600">Applied {app.appliedAt}</span>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800">View Details</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CV Upload Tab */}
          {activeTab === 'cv-upload' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">CV & Profile</h2>
              <p className="text-gray-600 mb-6">
                Upload your CV in text format to help our AI match you with relevant job opportunities.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Paste your CV text here:
                  </label>
                  <textarea
                    value={cvText}
                    onChange={(e) => setCvText(e.target.value)}
                    rows={12}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Paste your complete CV text here. Include your experience, skills, education, and any other relevant information..."
                  />
                </div>
                
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">
                    {cvText.length} characters
                  </p>
                  <button
                    onClick={handleCvUpload}
                    disabled={!cvText.trim()}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Save CV
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Notification Preferences</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-md font-medium text-gray-900">Email Notifications</h3>
                    <p className="text-sm text-gray-600">Receive job alerts via email</p>
                  </div>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded" defaultChecked />
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-md font-medium text-gray-900">Matching Jobs</h3>
                    <p className="text-sm text-gray-600">Get notified when jobs match your CV</p>
                  </div>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded" defaultChecked />
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-md font-medium text-gray-900">Blog Updates</h3>
                    <p className="text-sm text-gray-600">New articles and career tips</p>
                  </div>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded" />
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-md font-medium text-gray-900">Company Updates</h3>
                    <p className="text-sm text-gray-600">News from companies you follow</p>
                  </div>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded" />
                  </label>
                </div>
              </div>
              
              <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Save Preferences
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;