import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, Search, Tag, X, Filter } from 'lucide-react';
import SEO from '../components/SEO';
import blogPostData from '../data/blog.json';
import FilterToggleButton from '../components/FilterToggleButton';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const blogPosts = blogPostData;

  const categories = ['All', 'Career', 'Lifestyle', 'Legal', 'Companies', 'Culture'];
  useEffect(() => {
    filtersOpen == true &&  window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filtersOpen]);


  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === '' ||
      selectedCategory === 'All' ||
      post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Tech Career Blog | PACA-Dev - Sophia Antipolis & French Riviera"
        description="Read expert insights on tech careers, salaries, living guides, and professional development in Sophia Antipolis and the French Riviera."
        keywords="tech career blog, sophia antipolis guide, french riviera tech jobs, developer lifestyle france"
      />

      <div className="bg-gradient-to-r from-blue-800 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold mb-4">PACA-Dev Blog</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Expert insights, career advice, and practical guides for tech professionals in Sophia Antipolis and the French Riviera.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
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

          {/* Filters Panel */}
          <aside
            id="filters-panel"
            className={`bg-white rounded-lg shadow-sm p-6 top-24
              lg:block
              ${filtersOpen ? 'block' : 'hidden'}
            `}
            style={{ maxHeight: 'calc(100vh - 6rem)', overflowY: 'auto' }}
          >
            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Articles
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategory === category || (selectedCategory === '' && category === 'All')
                        ? 'bg-blue-100 text-blue-800'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['Salary', 'Housing', 'Career', 'Legal', 'Culture', 'Networking'].map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs hover:bg-blue-100 hover:text-blue-800 cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          {/* Blog Posts */}
          <div className="lg:w-3/4">
            <div className="mb-8">
              <p className="text-gray-600">
                Showing {filteredPosts.length} of {blogPosts.length} articles
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.publishedAt).toISOString().slice(0,10)}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime} min
                      </div>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                      <Link to={`/article/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-gray-700 mb-4">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/article/${post.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or browse all articles.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
