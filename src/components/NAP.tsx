import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface NAPProps {
  variant?: 'header' | 'footer' | 'contact' | 'inline';
  showIcons?: boolean;
  className?: string;
}

export const NAP: React.FC<NAPProps> = ({ 
  variant = 'inline', 
  showIcons = true, 
  className = '' 
}) => {
  // Consistent NAP data across all components
  const napData = {
    businessName: "Fit With Beth",
    address: {
      street: "New York, NY",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      full: "New York, NY 10001"
    },
    phone: "(646) 463-0893",
    email: "beth@fitwithbeth.com",
    hours: {
      weekdays: "6:00 AM - 8:00 PM",
      saturday: "7:00 AM - 6:00 PM", 
      sunday: "8:00 AM - 5:00 PM"
    }
  };

  const baseClasses = "text-warm-bronze-700";
  
  const renderContent = () => {
    switch (variant) {
      case 'header':
        return (
          <div className={`flex items-center space-x-4 text-sm ${className}`}>
            <div className="flex items-center">
              {showIcons && <Phone size={14} className="mr-1 text-rose-gold-500" />}
              <span className={baseClasses}>{napData.phone}</span>
            </div>
            <div className="flex items-center">
              {showIcons && <MapPin size={14} className="mr-1 text-rose-gold-500" />}
              <span className={baseClasses}>{napData.address.full}</span>
            </div>
          </div>
        );

      case 'footer':
        return (
          <div className={`space-y-2 ${className}`}>
            <h4 className="font-bold text-warm-bronze-900 mb-3">Contact Info</h4>
            <div className="flex items-center">
              {showIcons && <MapPin size={16} className="mr-2 text-rose-gold-500 flex-shrink-0" />}
              <span className={baseClasses}>{napData.address.full}</span>
            </div>
            <div className="flex items-center">
              {showIcons && <Phone size={16} className="mr-2 text-rose-gold-500 flex-shrink-0" />}
              <a href={`tel:${napData.phone}`} className={`${baseClasses} hover:text-rose-gold-500 transition-colors`}>
                {napData.phone}
              </a>
            </div>
            <div className="flex items-center">
              {showIcons && <Mail size={16} className="mr-2 text-rose-gold-500 flex-shrink-0" />}
              <a href={`mailto:${napData.email}`} className={`${baseClasses} hover:text-rose-gold-500 transition-colors`}>
                {napData.email}
              </a>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className={`space-y-6 ${className}`}>
            <div>
              <h3 className="text-xl font-bold text-warm-bronze-900 mb-4">Visit Our Studio</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  {showIcons && <MapPin size={20} className="mr-3 text-rose-gold-500 flex-shrink-0 mt-1" />}
                  <div>
                    <div className="font-medium text-warm-bronze-900">{napData.businessName}</div>
                    <div className={baseClasses}>{napData.address.full}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  {showIcons && <Phone size={20} className="mr-3 text-rose-gold-500 flex-shrink-0" />}
                  <a href={`tel:${napData.phone}`} className={`${baseClasses} hover:text-rose-gold-500 transition-colors font-medium`}>
                    {napData.phone}
                  </a>
                </div>
                <div className="flex items-center">
                  {showIcons && <Mail size={20} className="mr-3 text-rose-gold-500 flex-shrink-0" />}
                  <a href={`mailto:${napData.email}`} className={`${baseClasses} hover:text-rose-gold-500 transition-colors`}>
                    {napData.email}
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-warm-bronze-900 mb-3">Training Hours</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  {showIcons && <Clock size={16} className="mr-2 text-rose-gold-500 flex-shrink-0" />}
                  <span className={baseClasses}>
                    <strong>Mon-Fri:</strong> {napData.hours.weekdays}
                  </span>
                </div>
                <div className="flex items-center">
                  {showIcons && <Clock size={16} className="mr-2 text-rose-gold-500 flex-shrink-0" />}
                  <span className={baseClasses}>
                    <strong>Saturday:</strong> {napData.hours.saturday}
                  </span>
                </div>
                <div className="flex items-center">
                  {showIcons && <Clock size={16} className="mr-2 text-rose-gold-500 flex-shrink-0" />}
                  <span className={baseClasses}>
                    <strong>Sunday:</strong> {napData.hours.sunday}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      default: // inline
        return (
          <span className={`${baseClasses} ${className}`}>
            {napData.businessName} • {napData.address.full} • {napData.phone}
          </span>
        );
    }
  };

  return renderContent();
};

// Export NAP data for use in other components
export const napData = {
  businessName: "Fit With Beth",
  address: {
    street: "New York, NY",
    city: "New York", 
    state: "NY",
    zipCode: "10001",
    full: "New York, NY 10001"
  },
  phone: "(646) 463-0893",
  email: "beth@fitwithbeth.com",
  website: "https://fitwithbeth.com",
  hours: [
    "Monday: 06:00-20:00",
    "Tuesday: 06:00-20:00", 
    "Wednesday: 06:00-20:00",
    "Thursday: 06:00-20:00",
    "Friday: 06:00-20:00",
    "Saturday: 07:00-18:00",
    "Sunday: 08:00-17:00"
  ]
};