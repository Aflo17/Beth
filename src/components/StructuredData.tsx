import React from 'react';

interface StructuredDataProps {
  businessName: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  phone: string;
  email: string;
  website: string;
  description: string;
  priceRange: string;
  openingHours: string[];
  geo: {
    latitude: number;
    longitude: number;
  };
  socialMedia: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  services: string[];
  image: string;
}

export const StructuredData: React.FC<StructuredDataProps> = ({
  businessName,
  address,
  phone,
  email,
  website,
  description,
  priceRange,
  openingHours,
  geo,
  socialMedia,
  services,
  image
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": website,
    "name": businessName,
    "description": description,
    "url": website,
    "telephone": phone,
    "email": email,
    "priceRange": priceRange,
    "image": image,
    "logo": image,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.streetAddress,
      "addressLocality": address.addressLocality,
      "addressRegion": address.addressRegion,
      "postalCode": address.postalCode,
      "addressCountry": address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": geo.latitude,
      "longitude": geo.longitude
    },
    "openingHoursSpecification": openingHours.map(hours => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": hours.split(': ')[0],
      "opens": hours.split(': ')[1]?.split('-')[0],
      "closes": hours.split(': ')[1]?.split('-')[1]
    })),
    "sameAs": Object.values(socialMedia).filter(Boolean),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Personal Training Services",
      "itemListElement": services.map((service, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service
        }
      }))
    },
    "areaServed": {
      "@type": "City",
      "name": address.addressLocality
    },
    "paymentAccepted": "Cash, Credit Card, Debit Card, Online Payment",
    "currenciesAccepted": "USD"
  };

  // Fitness Business specific structured data
  const fitnessBusinessData = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "@id": `${website}#fitness`,
    "name": businessName,
    "description": description,
    "url": website,
    "telephone": phone,
    "email": email,
    "address": structuredData.address,
    "geo": structuredData.geo,
    "openingHoursSpecification": structuredData.openingHoursSpecification,
    "sameAs": structuredData.sameAs,
    "sport": "Fitness Training",
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Personal Training",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification", 
        "name": "Online Training",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Nutrition Coaching",
        "value": true
      }
    ]
  };

  // Professional Service structured data
  const professionalServiceData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${website}#service`,
    "name": businessName,
    "description": description,
    "url": website,
    "telephone": phone,
    "email": email,
    "address": structuredData.address,
    "geo": structuredData.geo,
    "openingHoursSpecification": structuredData.openingHoursSpecification,
    "sameAs": structuredData.sameAs,
    "serviceType": "Personal Training",
    "provider": {
      "@type": "Person",
      "name": "Beth",
      "jobTitle": "Certified Personal Trainer",
      "description": "Elite personal trainer with over 10 years of experience"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(fitnessBusinessData, null, 2)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceData, null, 2)
        }}
      />
    </>
  );
};