import React, { useEffect } from 'react';
import { 
  MapPin, 
  DollarSign, 
  Home, 
  FileText, 
  Users, 
  Briefcase,
  Car,
  GraduationCap,
  Heart,
  Coffee
} from 'lucide-react';
import SEO from '../components/SEO';

const ExpatGuide = () => {

  useEffect(() => {
      // Scroll to top when component mounts or slug changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const guideSection = [
    {
      icon: Home,
      title: 'Finding Housing',
      description: 'Best neighborhoods, rental tips, and what to expect',
      items: [
        'Sophia Antipolis: Modern apartments near tech companies, €800-1200/month for 1BR',
        'Antibes: Charming old town, beach access, €700-1000/month for 1BR', 
        'Nice: Vibrant city life, excellent transport, €900-1300/month for 1BR',
        'Cannes: Luxury lifestyle, higher costs, €1000-1500/month for 1BR'
      ]
    },
    {
      icon: DollarSign,
      title: 'Salary Expectations',
      description: 'Competitive compensation in the French Riviera tech scene',
      items: [
        'Junior Developer: €35,000 - €45,000 annually',
        'Senior Developer: €55,000 - €75,000 annually',
        'Tech Lead/Architect: €70,000 - €90,000 annually',
        'Product Manager: €60,000 - €80,000 annually'
      ]
    },
    {
      icon: FileText,
      title: 'Legal Requirements',
      description: 'Visas, work permits, and employment contracts',
      items: [
        'EU Citizens: Right to work immediately, just need to register',
        'Non-EU: Work visa required, employer must sponsor',
        'Freelancing: Auto-entrepreneur status available for consultants',
        'Taxes: ~30% effective rate, but excellent social benefits'
      ]
    },
    {
      icon: Car,
      title: 'Transportation',
      description: 'Getting around the French Riviera',
      items: [
        'Car recommended for Sophia Antipolis (limited public transport)',
        'Nice has excellent tram and bus systems',
        'Regional trains connect major cities efficiently',
        'Bike-friendly cities with growing cycling infrastructure'
      ]
    },
    {
      icon: Users,
      title: 'Social Integration',
      description: 'Building connections and finding community',
      items: [
        'Tech meetups in Nice and Sophia Antipolis',
        'French language classes highly recommended',
        'International communities in major cities',
        'Networking events and professional associations'
      ]
    },
    {
      icon: Heart,
      title: 'Quality of Life',
      description: 'Why the French Riviera is perfect for tech professionals',
      items: [
        '300+ sunny days per year, Mediterranean climate',
        'World-class beaches within 30 minutes of work',
        'Excellent work-life balance culture',
        'Rich cultural scene with festivals and events'
      ]
    }
  ];

  const costOfLiving = [
    { category: 'Rent (1BR apartment)', nice: '€900-1300', sophia: '€800-1200', cannes: '€1000-1500' },
    { category: 'Utilities (monthly)', nice: '€80-120', sophia: '€70-100', cannes: '€90-130' },
    { category: 'Groceries (monthly)', nice: '€300-400', sophia: '€280-350', cannes: '€320-450' },
    { category: 'Transportation', nice: '€45/month', sophia: '€150/month (car)', cannes: '€50/month' },
    { category: 'Internet', nice: '€30-40', sophia: '€30-40', cannes: '€30-40' },
    { category: 'Dining out (meal)', nice: '€15-25', sophia: '€12-20', cannes: '€18-30' }
  ];

  const careerTips = [
    {
      title: 'Start as a Contractor?',
      advice: 'Great for testing the market and building network. Auto-entrepreneur status offers flexibility. Consider after gaining local experience.',
      pros: ['Higher hourly rates', 'Tax advantages', 'Flexibility'],
      cons: ['No paid vacation', 'Less job security', 'Need to find own clients']
    },
    {
      title: 'Language Requirements',
      advice: 'English is common in tech, but French opens more opportunities. Start learning immediately for better integration.',
      level: 'B2 French recommended for senior roles'
    },
    {
      title: 'Networking Strategy',
      advice: 'Attend meetups, join professional associations, use LinkedIn effectively. French business culture values personal relationships.',
      events: ['French Riviera Tech Meetups', 'Sophia Business Angels', 'Women in Tech Nice']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Expat Guide - Moving to Sophia Antipolis & French Riviera | PACA-Dev"
        description="Complete guide for international tech professionals moving to Sophia Antipolis, Nice, and the French Riviera. Housing, salaries, visas, and integration tips."
        keywords="sophia antipolis expat guide, french riviera tech jobs, moving to france developer, tech visa france"
      />

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Your Complete Expat Guide
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Everything you need to know about moving to and thriving in the French Riviera tech ecosystem. 
              From finding housing to understanding salary expectations and building your network.
            </p>
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <MapPin className="h-5 w-5 mr-2" />
              <span>Sophia Antipolis • Nice • Cannes • Monaco</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Essential Guide Sections */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Essential Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guideSection.map((section, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <section.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                    <p className="text-sm text-gray-600">{section.description}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-gray-700 flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Cost of Living Table */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Cost of Living Comparison</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Nice</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Sophia Antipolis</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Cannes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {costOfLiving.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{row.nice}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{row.sophia}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{row.cannes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-4 text-center">
            * Prices are approximate and vary based on location, season, and personal preferences
          </p>
        </section>

        {/* Career Strategy */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Career Strategy & Advancement</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {careerTips.map((tip, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{tip.title}</h3>
                <p className="text-gray-700 mb-4">{tip.advice}</p>
                
                {tip.pros && tip.cons && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-green-800 mb-2">Pros:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {tip.pros.map((pro, i) => (
                          <li key={i} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2"></span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-800 mb-2">Cons:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {tip.cons.map((con, i) => (
                          <li key={i} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                
                {tip.level && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium">{tip.level}</p>
                  </div>
                )}
                
                {tip.events && (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-800 mb-2">Recommended Events:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {tip.events.map((event, i) => (
                        <li key={i} className="flex items-center">
                          <Coffee className="h-3 w-3 mr-2 text-gray-400" />
                          {event}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quick Start Checklist */}
        <section className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Your First 30 Days Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Week 1-2: Essentials</h3>
              <ul className="space-y-2">
                {[
                  'Open French bank account',
                  'Register for social security',
                  'Find temporary accommodation',
                  'Get French SIM card',
                  'Apply for tax number (numéro fiscal)'
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <input type="checkbox" className="mr-3 rounded" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Week 3-4: Integration</h3>
              <ul className="space-y-2">
                {[
                  'Attend first tech meetup',
                  'Start French language classes',
                  'Explore neighborhoods for permanent housing',
                  'Connect with expat communities',
                  'Set up utilities and internet'
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <input type="checkbox" className="mr-3 rounded" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExpatGuide;