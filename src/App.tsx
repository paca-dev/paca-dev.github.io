import React, { useEffect } from 'react';
import { HashRouter , Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Blog from './pages/Blog';
import ExpatGuide from './pages/ExpatGuide';
import Companies from './pages/Companies';
import Dashboard from './pages/Dashboard';
import { ApiProvider } from './contexts/ApiContext';
import Article from './pages/Article';
import Job from './pages/Job';
import ReactGA from 'react-ga4';

// Initialize Google Analytics with your Measurement ID
ReactGA.initialize('G-MZ9Z412YK3');
// Component to track page views on route change
const GAListener = () => {
  const location = useLocation();

  useEffect(() => {
    // Send pageview with path and search params
    ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
  }, [location]);

  return null;
};

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <ApiProvider>
          <HashRouter>
            <GAListener />
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/jobs" element={<Jobs />} />
                  <Route path="/job/:id" element={<Job />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/article/:slug" element={<Article />} /> {/* Article page */}
                  <Route path="/expat-guide" element={<ExpatGuide />} />
                  <Route path="/companies" element={<Companies />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </main>
              <Footer />
            </div>
            <Toaster position="top-right" />
          </HashRouter>
        </ApiProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;