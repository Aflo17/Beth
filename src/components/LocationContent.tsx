import React from 'react';
import { MapPin, Users, Award, Target } from 'lucide-react';

export const LocationContent: React.FC = () => {
  const locationStats = [
    {
      icon: <Users size={24} />,
      number: "500+",
      label: "NYC Clients Transformed",
      description: "Helping New Yorkers achieve their fitness goals"
    },
    {
      icon: <Award size={24} />,
      number: "10+",
      label: "Years in NYC",
      description: "Serving the Manhattan fitness community"
    },
    {
      icon: <Target size={24} />,
      number: "95%",
      label: "Client Success Rate",
      description: "Proven results in New York City"
    }
  ];

  const neighborhoods = [
    "Manhattan", "Upper East Side", "Upper West Side", "Midtown",
    "Chelsea", "Greenwich Village", "SoHo", "Tribeca",
    "Financial District", "Lower East Side"
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-soft-pink-50 to-rose-gold-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Location Hero */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <MapPin size={32} className="text-rose-gold-500 mr-3" />
            <h2 className="text-4xl sm:text-5xl font-black text-warm-bronze-900">
              NYC'S <span className="text-rose-gold-500">ELITE TRAINER</span>
            </h2>
          </div>
          <p className="text-xl text-warm-bronze-700 max-w-3xl mx-auto leading-relaxed">
            Bringing world-class personal training to New York City. From Manhattan studios to online coaching, 
            we're transforming lives across the five boroughs.
          </p>
        </div>

        {/* Location Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {locationStats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border border-soft-shadow"
            >
              <div className="text-rose-gold-500 mb-4 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-4xl font-black text-warm-bronze-900 mb-2">{stat.number}</div>
              <div className="text-lg font-bold text-rose-gold-600 mb-2">{stat.label}</div>
              <div className="text-warm-bronze-600">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Service Areas */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-soft-shadow">
          <h3 className="text-2xl font-bold text-warm-bronze-900 mb-6 text-center">
            Serving New York City Areas
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {neighborhoods.map((neighborhood, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-soft-pink-50 to-rose-gold-50 rounded-lg p-3 text-center border border-rose-gold-200 hover:border-rose-gold-400 transition-colors duration-200"
              >
                <span className="text-warm-bronze-700 font-medium text-sm">{neighborhood}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <p className="text-warm-bronze-600">
              <strong>Online Training Available Worldwide</strong> • In-Person Sessions in Manhattan
            </p>
          </div>
        </div>

        {/* Local Testimonial */}
        <div className="mt-16 bg-gradient-to-br from-rose-gold-100 to-soft-pink-100 rounded-2xl p-8 border border-rose-gold-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-warm-bronze-900 mb-4">
              Why NYC Chooses Fit With Beth
            </h3>
            <blockquote className="text-lg text-warm-bronze-700 italic mb-4 max-w-3xl mx-auto">
              "In a city that never sleeps, Beth understands the unique challenges New Yorkers face. 
              Her flexible scheduling and results-driven approach make fitness achievable even with the busiest Manhattan lifestyle."
            </blockquote>
            <div className="text-rose-gold-600 font-bold">- Sarah M., Upper East Side Client</div>
          </div>
        </div>
      </div>
    </section>
  );
};