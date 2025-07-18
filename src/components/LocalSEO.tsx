import React from 'react';
import { StructuredData } from './StructuredData';
import { napData } from './NAP';

export const LocalSEO: React.FC = () => {
  const businessData = {
    businessName: napData.businessName,
    address: {
      streetAddress: napData.address.street,
      addressLocality: napData.address.city,
      addressRegion: napData.address.state,
      postalCode: napData.address.zipCode,
      addressCountry: "US"
    },
    phone: napData.phone,
    email: napData.email,
    website: napData.website,
    description: "Elite personal training services in New York City. Transform powerfully with proven methods, personalized coaching, and unwavering dedication to your fitness goals. Certified trainer with 10+ years experience.",
    priceRange: "$$",
    openingHours: napData.hours,
    geo: {
      latitude: 40.7589, // NYC coordinates - update with actual location
      longitude: -73.9851
    },
    socialMedia: {
      instagram: "https://instagram.com/bethybaby213"
    },
    services: [
      "Personal Training",
      "Online Fitness Coaching", 
      "Nutrition Guidance",
      "Strength Training",
      "Weight Loss Coaching",
      "Muscle Building Programs",
      "Fitness Assessments"
    ],
    image: "https://fitwithbeth.com/beth-pro.jpg"
  };

  return (
    <>
      {/* Meta tags for local SEO */}
      <meta name="geo.region" content="US-NY" />
      <meta name="geo.placename" content="New York" />
      <meta name="geo.position" content="40.7589;-73.9851" />
      <meta name="ICBM" content="40.7589, -73.9851" />
      
      {/* Local business keywords */}
      <meta name="keywords" content="personal trainer New York, NYC fitness coach, elite personal training Manhattan, weight loss trainer NYC, strength training New York, certified personal trainer Manhattan, fitness coaching NYC, online personal trainer New York" />
      
      {/* Structured data */}
      <StructuredData {...businessData} />
    </>
  );
};