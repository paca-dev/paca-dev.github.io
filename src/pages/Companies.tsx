import React, { useEffect, useState } from 'react';
import { Search, MapPin, Users, Globe, Building, Star } from 'lucide-react';
import SEO from '../components/SEO';
import companiesData from '../data/companies.json'; // adjust path to your JSON file
import { useApi } from '../contexts/ApiContext';
import { Link } from 'react-router-dom';

const Companies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const { jobs, getJobs } = useApi();
  const companies = companiesData;

  useEffect(() => {
    if (!jobs) {
      getJobs();
      return;
    }
  }, [jobs, getJobs]);
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = searchQuery === '' || 
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSize = sizeFilter === '' || 
      (sizeFilter === 'startup' && company.size.includes('100') && !company.size.includes('1000')) ||
      (sizeFilter === 'medium' && company.size.includes('500')) ||
      (sizeFilter === 'large' && (company.size.includes('1000') || company.size.includes('5000') || company.size.includes('10,000')));
    
    const matchesLocation = locationFilter === '' || company.location === locationFilter;
    
    return matchesSearch && matchesSize && matchesLocation;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Tech Companies in Sophia Antipolis & French Riviera | PACA-Dev"
        description="Discover top tech companies hiring in Sophia Antipolis, Nice, Cannes, and Monaco. Find your dream employer in the French Riviera tech ecosystem."
        keywords="sophia antipolis companies, tech companies nice, french riviera employers, amadeus cisco sap jobs"
      />

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold mb-4">Tech Companies</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Explore innovative companies shaping the future of technology in the French Riviera. 
            From global corporations to exciting startups.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            <select
              value={sizeFilter}
              onChange={(e) => setSizeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Sizes</option>
              <option value="startup">Startup (100-500)</option>
              <option value="medium">Medium (500-1000)</option>
              <option value="large">Large (1000+)</option>
            </select>

            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Locations</option>
              <option value="Sophia Antipolis">Sophia Antipolis</option>
              <option value="Nice">Nice</option>
              <option value="Cannes">Cannes</option>
              <option value="Monaco">Monaco</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCompanies.length} of {companies.length} companies
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCompanies.map((company) => (
          <div
            key={company.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200"
          >
            <div className="flex flex-col sm:flex-row items-start sm:justify-between mb-4">
              <div className="flex items-start space-x-4">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-16 h-16 max-w-full rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{company.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {company.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {company.size}
                    </div>
                   
                  </div>
                  
                </div>
              </div>
              <div className="text-right mt-4 sm:mt-0 flex-shrink-0">
                {jobs && (
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                    { jobs.filter(j=> j.company.toLowerCase().includes(company.name.split(" ")[0].toLowerCase())  ).length.toString() } open jobs
                  </div>
                )}
                <a
                  href={`https://${company.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                >
                  <Globe className="h-4 w-4 mr-1" />
                  {company.website}
                </a>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{company.description}</p>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Technologies & Focus Areas:</h4>
              <div className="flex flex-wrap gap-2">
                {company.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Benefits & Perks:</h4>
              <div className="grid grid-cols-2 gap-1">
                {company.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2"></span>
                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              {/* <button className="text-blue-600 hover:text-blue-800 font-medium">
                Learn More →
              </button> */}
              {jobs && (
                <Link
                  to={`/jobs?search=${encodeURIComponent(company.name.split(" ")[0])}`}
                  className="bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-block text-center"
                >
                  <button className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    View Jobs ({ jobs.filter(j=> j.company.toLowerCase().includes(company.name.split(" ")[0].toLowerCase())  ).length.toString() })
                  </button>

                </Link>
              )}
            </div>
          </div>
        ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <Building className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No companies found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or explore all companies.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Companies;