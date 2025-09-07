import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Mail, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-500 rounded-lg flex items-center justify-center">
                <img 
                  src="/favicon.ico" 
                  alt="Logo" 
                  className="w-5 h-5 object-contain"
                />
              </div>
              <span className="text-xl font-bold">PACA-Dev</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Your gateway to tech opportunities in Sophia Antipolis and the French Riviera. 
              Connecting talented developers with innovative companies.
            </p>
            <div className="flex items-center space-x-2 text-gray-300">
              <MapPin className="h-4 w-4" />
              <span>Sophia Antipolis, France</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="text-gray-300 hover:text-white transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/expat-guide" className="text-gray-300 hover:text-white transition-colors">
                  Expat Guide
                </Link>
              </li>
              <li>
                <Link to="/companies" className="text-gray-300 hover:text-white transition-colors">
                  Companies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/salary-guide" className="text-gray-300 hover:text-white transition-colors">
                  Salary Guide
                </Link>
              </li>
              <li>
                <Link to="/living-costs" className="text-gray-300 hover:text-white transition-colors">
                  Cost of Living
                </Link>
              </li>
              <li>
                <Link to="/visa-guide" className="text-gray-300 hover:text-white transition-colors">
                  Visa Information
                </Link>
              </li>
              <li>
                <Link to="/housing" className="text-gray-300 hover:text-white transition-colors">
                  Housing Guide
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 PACA-Dev. Made with <Heart className="h-4 w-4 inline text-red-500" /> for the tech community.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;