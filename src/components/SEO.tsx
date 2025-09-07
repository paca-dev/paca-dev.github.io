import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'PACA-Dev - Tech Jobs in Sophia Antipolis & French Riviera',
  description = 'Find your dream tech job in Sophia Antipolis and the French Riviera. Browse opportunities, read our expat guide, and connect with innovative companies.',
  keywords = 'sophia antipolis jobs, tech jobs france, developer jobs nice, expat tech jobs, french riviera careers',
  image = '/og-image.jpg',
  url = 'https://paca-dev.com',
  type = 'website'
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="PACA-Dev" />
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "PACA-Dev",
          "url": "https://paca-dev.com",
          "logo": "https://paca-dev.com/logo.png",
          "description": description,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Sophia Antipolis",
            "addressCountry": "France"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;