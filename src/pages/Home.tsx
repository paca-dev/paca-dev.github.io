import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Users, 
  TrendingUp, 
  BookOpen,
  CheckCircle,
  ArrowRight,
  Upload,
  Zap,
  Shield,
  Clock,
  Globe,
  Sparkles
} from 'lucide-react';
import SEO from '../components/SEO';
import NewsletterSubscription from '../components/NewsletterSubscription';
import companiesData from '../data/companies.json'; // adjust path to your JSON file
import { useApi } from '../contexts/ApiContext';
import blogPostData from '../data/blog.json';
import { useNavigate } from 'react-router-dom';
import JobMatchBarometer from '../components/JobMatchBarometer';
import CVUploadModal from '../components/CVUploadModal';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { jobs, loading, getJobs } = useApi();
  const companies = companiesData;
  const blogPosts = blogPostData;
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  // On mount, refresh jobs if not loaded
  useEffect(() => {
    if (!jobs) {
      getJobs();
    }
  }, [jobs, getJobs]);
  
  const stats = [
    { label: 'Active Jobs', value: loading ? '...' : jobs?.length ?? 0, icon: Briefcase },
    { label: 'Companies', value: companies.length + '+', icon: Users },
    { label: 'Success Stories', value: '200+', icon: TrendingUp },
    { label: 'Blog Articles', value: blogPosts.length + '', icon: BookOpen }
  ];

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      navigate(`/jobs?search=${encodeURIComponent(trimmedQuery)}`);
    }
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };


  // Use jobs from context or fallback to empty array while loading
  const featuredJobs = jobs===null ? []: jobs.splice(0,4) ;
  const expatBenefits = [
    'Comprehensive salary guides for the region',
    'Housing and neighborhood recommendations',
    'Visa and work permit guidance',
    'Networking events and community access',
    'Cultural integration tips and resources',
    'Tax and legal advice for expatriates'
  ];

  // Demo data for the barometer showcase
  const demoMatches = [
    {
      title: 'Senior React Developer',
      company: 'TechCorp SA',
      matchPercentage: 92,
      matchedSkills: ['React', 'TypeScript', 'Node.js'],
      missingSkills: ['GraphQL'],
      experienceMatch: true,
      salaryMatch: true,
      locationMatch: true
    },
    {
      title: 'DevOps Engineer',
      company: 'CloudTech',
      matchPercentage: 78,
      matchedSkills: ['AWS', 'Docker', 'Python'],
      missingSkills: ['Kubernetes', 'Terraform'],
      experienceMatch: true,
      salaryMatch: false,
      locationMatch: true
    },
    {
      title: 'Product Manager',
      company: 'StartupHub',
      matchPercentage: 65,
      matchedSkills: ['Agile', 'Analytics'],
      missingSkills: ['Product Strategy', 'User Research'],
      experienceMatch: false,
      salaryMatch: true,
      locationMatch: true
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO />

      {/* Hero Section with Animated Background */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 text-white py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-40 left-1/2 w-60 h-60 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border border-white/20">
              <Sparkles className="h-4 w-4 mr-2 text-yellow-300" />
              <span className="text-sm font-medium">AI-Powered Job Matching</span>
              <div className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>

            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
              Your Tech Career in
              <span className="block bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent animate-gradient">
                South of France
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              Discover tech opportunities on the French Riviera (PACA region).
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-3xl mx-auto mb-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-2 shadow-2xl">
                  <div className="flex items-center">
                    <div className="flex-1 relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search for jobs, companies, or skills..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 text-gray-900 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                      />
                    </div>
                    <button 
                      className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                      onClick={()=>handleSearch()}
                      >
                      Search Jobs
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <Link
                to="/jobs"
                className="group bg-white text-blue-800 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
              >
                <Briefcase className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                Browse All Jobs
              </Link>
              
              <button
                onClick={() => setIsCVModalOpen(true)}
                className="group bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
              >
                <Upload className="h-5 w-5 mr-2 group-hover:translate-y-1 transition-transform" />
                Upload CV & Get Matches
                <Sparkles className="h-4 w-4 ml-2 text-yellow-200" />
              </button>
              
              <Link
                to="/expat-guide"
                className="group border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-800 transition-all duration-300 transform hover:scale-105 flex items-center"
              >
                <Globe className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                Expat Guide
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-blue-200">
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                <span className="text-sm">Privacy Protected</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span className="text-sm">Instant Analysis</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="text-sm">100% Free</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-lg mb-4">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Jobs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Opportunities</h2>
            <p className="text-lg text-gray-600">Hand-picked jobs from top tech companies in the region</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {featuredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                    <p className="text-blue-600 font-medium">{job.company}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    job.type === 'Full-time' ? 'bg-green-100 text-green-800' :
                    job.type === 'Internship' ? 'bg-purple-100 text-purple-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {job.type}
                  </span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{job.location}</span>
                  {job.remote && (
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Remote OK</span>
                  )}
                </div>
                
                <div className="text-green-600 font-semibold mb-4">{job.salary}</div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link
                  to={`/job/${job.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  View Details <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/jobs"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* AI Matching Showcase */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Zap className="h-4 w-4 mr-2" />
              AI-Powered Job Matching
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              See How Well Jobs Match Your Profile
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI analyzes your CV and shows you exactly how well each job matches your skills, 
              experience, and preferences. No more guessing - see your compatibility at a glance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {demoMatches.map((match, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{match.title}</h3>
                  <p className="text-blue-600 font-medium">{match.company}</p>
                </div>
                <JobMatchBarometer
                  matchPercentage={match.matchPercentage}
                  matchedSkills={match.matchedSkills}
                  missingSkills={match.missingSkills}
                  experienceMatch={match.experienceMatch}
                  salaryMatch={match.salaryMatch}
                  locationMatch={match.locationMatch}
                  size="small"
                  showDetails={false}
                />
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Match Score</span>
                    <span className={`text-sm font-semibold ${
                      match.matchPercentage >= 80 ? 'text-green-600' :
                      match.matchPercentage >= 60 ? 'text-yellow-600' :
                      'text-orange-600'
                    }`}>
                      {match.matchPercentage >= 80 ? 'Excellent' :
                       match.matchPercentage >= 60 ? 'Good' : 'Fair'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setIsCVModalOpen(true)}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold flex items-center mx-auto"
            >
              <Upload className="h-5 w-5 mr-2" />
              Upload Your CV to See Real Matches
            </button>
            <p className="text-sm text-gray-600 mt-2">
              Free • Instant Analysis • Privacy Protected
            </p>
          </div>
        </div>
      </section>

      {/* Expat Benefits */}
      <section className="py-16 bg-gradient-to-r from-teal-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Perfect for International Professionals
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Moving to the French Riviera for work? We've got you covered with comprehensive 
                guides and resources specifically designed for international tech professionals.
              </p>
              <ul className="space-y-4">
                {expatBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/expat-guide"
                className="inline-block mt-8 bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Explore Expat Guide
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Sophia Antipolis tech park"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSubscription />

      <CVUploadModal 
        isOpen={isCVModalOpen} 
        onClose={() => setIsCVModalOpen(false)}
        onSuccess={() => {
          // Redirect to jobs page or dashboard after successful upload
          setTimeout(() => {
            window.location.href = user ? '/#/dashboard' : '/#/jobs';
          }, 2000);
        }}
      />
   
    </div>

    
  );
};

export default Home;