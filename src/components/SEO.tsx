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
  url = 'https://paca-dev.rivieraapps.com',
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
      
      {/* Additional SEO meta tags */}
      <meta name="geo.region" content="FR-06" />
      <meta name="geo.placename" content="Sophia Antipolis" />
      <meta name="geo.position" content="43.6167;7.0667" />
      <meta name="ICBM" content="43.6167, 7.0667" />
      
      {/* Language and locale */}
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="fr_FR" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "PACA-Dev",
          "url": "https://paca-dev.rivieraapps.com",
          "logo": "https://paca-dev.rivieraapps.com/logo.png",
          "description": description,
          "sameAs": [
            "https://linkedin.com/company/paca-dev",
            "https://twitter.com/pacadev",
            "https://github.com/paca-dev"
          ],
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Sophia Antipolis",
            "addressRegion": "Provence-Alpes-Côte d'Azur",
            "addressCountry": "FR"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "hello@paca-dev.rivieraapps.com"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;