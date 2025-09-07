import React, { useEffect, useState } from 'react';
import { Search, MapPin, Filter, Briefcase, Clock, DollarSign, X } from 'lucide-react';
import SEO from '../components/SEO';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApi } from '../contexts/ApiContext';
import JobModal from '../components/JobModal';
import FilterToggleButton from '../components/FilterToggleButton';

const Jobs = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get('search'); // returns string or null if not present

  const [uniqueLocations, setUniqueLocations] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState(search || '');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [remoteFilter, setRemoteFilter] = useState('');
  const { jobs, loading, getJobs } = useApi();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const navigate = useNavigate();

  // Find job by id once jobs are available
  useEffect(() => {
    // Scroll to top when component mounts or slug changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  // const jobs = jobsData;
  // On mount, refresh jobs if not loaded
  useEffect(() => {
    if (!jobs) {
      getJobs();
      return;
    }
    // Extract unique non-empty locations safely
    const locations = Array.from(
      new Set(jobs.map(job => job.location).filter(loc => !!loc))
    );
    setUniqueLocations(locations);
  }, [jobs, getJobs]);

  useEffect(() => {
    filtersOpen == true &&  window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filtersOpen]);
  const alljobs = jobs || [];
  
  const openJobModal = (job: any) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const closeJobModal = () => {
    setModalOpen(false);
    setSelectedJob(null);
  };
  
  const filteredJobs = alljobs.filter(job => {
    const matchesSearch = searchQuery === '' || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(job.tags) && job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesLocation = locationFilter === '' || job.location === locationFilter;
    const matchesType = typeFilter === '' || job.type === typeFilter;
    const matchesRemote = remoteFilter === '' || 
      (remoteFilter === 'remote' && job.remote) ||
      (remoteFilter === 'onsite' && !job.remote);

    return matchesSearch && matchesLocation && matchesType && matchesRemote;
  });

  function extractUrl(text: string): string | null {
    // Regex to match http or https URL
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const match = text.match(urlRegex);
    return match ? match[0] : null;
  }
    
  return (
    <div className="min-h-screen bg-gray-50">
      <JobModal job={selectedJob} isOpen={modalOpen} onClose={closeJobModal}><></></JobModal>
      <SEO 
        title="Tech Jobs in Sophia Antipolis & French Riviera | PACA-Dev"
        description="Browse the latest tech job opportunities in Sophia Antipolis, Nice, Cannes, and Monaco. Find developer, data science, and tech management positions."
        keywords="sophia antipolis jobs, tech jobs nice, developer jobs cannes, remote jobs france"
      />
      
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tech Jobs</h1>
          <p className="text-gray-600">Discover amazing opportunities in the French Riviera tech ecosystem</p>
        </div>
      </div>

      {/* Floating filter toggle button bottom-right */}
      <button
        onClick={() => setFiltersOpen(!filtersOpen)}
        aria-expanded={filtersOpen}
        aria-controls="filters-sidebar"
        title="Toggle filters"
        className="fixed bottom-5 right-5 p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center text-gray-600 lg:hidden z-50"
      >
        <FilterToggleButton isOpen={filtersOpen} onToggle={() => setFiltersOpen(!filtersOpen)} />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <div
            id="filters-sidebar"
            className={`bg-white rounded-lg shadow-sm p-6 top-24 lg:block ${
              filtersOpen ? 'block' : 'hidden'
            } lg:w-1/4`}
            style={{ maxHeight: 'calc(100vh - 6rem)', overflowY: 'auto' }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </h3>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Job title, company, skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Location */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Locations</option>
                {/* Dynamically generate options */}
                {uniqueLocations.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            {/* Remote */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Style
              </label>
              <select
                value={remoteFilter}
                onChange={(e) => setRemoteFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All</option>
                <option value="remote">Remote OK</option>
                <option value="onsite">On-site Only</option>
              </select>
            </div>

            <button
              onClick={() => {
                setSearchQuery('');
                setLocationFilter('');
                setTypeFilter('');
                setRemoteFilter('');
              }}
              className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
          
          {/* Filter pills */}
          {searchQuery.trim() !== '' && (
          <div className="mb-4 flex flex-wrap gap-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {searchQuery.split(/\s+/).map((word, index) => (
              <div
                key={index}
                className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-medium"
              >
                <span>{word}</span>
                <button
                  onClick={() => {
                    const words = searchQuery.split(/\s+/);
                    words.splice(index, 1);
                    setSearchQuery(words.join(' '));
                  }}
                  className="ml-2 focus:outline-none"
                  aria-label={`Remove filter ${word}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}


          {/* Jobs List */}
          <div className="lg:w-3/4">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                Showing {filteredJobs.length} of {alljobs.length} jobs
              </p>
            </div>

            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6 border border-gray-200"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 space-y-4 sm:space-y-0 sm:space-x-6">
                    <div className="flex items-center space-x-4 flex-shrink-0">
                      <img
                        src={`https://ui-avatars.com/api/?name=${job.company}&background=1e3a8a&color=fff` }
                        alt={job.company}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 break-words">
                        {job.title}
                      </h3>
                      <p className="text-blue-600 font-medium mb-1 truncate">{job.company}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center whitespace-nowrap">
                          <MapPin className="h-4 w-4 mr-1" />
                          { job.location.length > 40 ? job.location.slice(0, 40 - 3) + '...' : job.location }
                        </div>
                        <div className="flex items-center whitespace-nowrap">
                          <Briefcase className="h-4 w-4 mr-1" />
                          {job.type}
                        </div>
                        <div className="flex items-center whitespace-nowrap">
                          <Clock className="h-4 w-4 mr-1" />
                          {job.postedAt?.slice?.(0, 10)}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end flex-shrink-0">
                      {job.salary == 'Salary not specified'?<>
                      </>: <>
                        <div className="flex items-center text-green-600 font-semibold mb-2 whitespace-nowrap">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {job.salary}
                        </div>
                      </>}
                      
                      
                      {job.remote && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs md:text-sm">
                          Remote OK
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-3 sm:line-clamp-5">{job.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {Array.isArray(job.tags) ? (
                      job.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs sm:text-sm"
                        >
                          {tag}
                        </span>
                      ))
                    ) : null}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                    <Link to={`/job/${job.id}`} className='w-full sm:w-auto' >
                      <button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto text-center">
                          View Details →
                      </button>
                    </Link>
                    {extractUrl(job.applyUrl) && (
                      <Link to={extractUrl(job.applyUrl) }>
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                            Apply Now
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                {loading === true ? <>
                  <div className="flex justify-center mb-2">
                    {/* Spinner (simple Tailwind + SVG or CSS) */}
                    <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading</h3>
                </>:<>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                </>}
                <p className="text-gray-600">Try adjusting your search criteria or check back later for new opportunities.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Jobs;