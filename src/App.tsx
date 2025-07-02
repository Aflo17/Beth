import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  Dumbbell, 
  Users, 
  Monitor, 
  Apple,
  Star,
  Calendar,
  Mail,
  Phone,
  Instagram,
  Award,
  Target,
  TrendingUp
} from 'lucide-react';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    primaryGoal: '',
    preferredSchedule: '',
    additionalInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'programs', 'about', 'transformations', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        primaryGoal: formData.primaryGoal,
        preferredSchedule: formData.preferredSchedule,
        additionalInfo: formData.additionalInfo,
        submittedAt: new Date().toISOString(),
        source: 'Fit With Beth Website'
      };

      const response = await fetch('https://hook.us2.make.com/mq91na4nlrfl3nntrqike8xaia94pobf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSubmitMessage('Thank you! Your assessment request has been submitted. We\'ll contact you within 24-48 hours to schedule your free session.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          primaryGoal: '',
          preferredSchedule: '',
          additionalInfo: ''
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      setSubmitMessage('There was an error submitting your request. Please try again or contact us directly.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-glossy-white text-warm-bronze-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-glossy-white/95 backdrop-blur-sm py-3 shadow-lg' : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img 
              src="/beth-circular-logo.png" 
              alt="Fit With Beth Logo" 
              className="h-8 w-8 sm:h-10 sm:w-10 object-contain rounded-full shadow-sm"
            />
            <div className="text-lg sm:text-2xl font-bold text-warm-bronze-900">
              Fit With <span className="text-rose-gold-500">Beth</span>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {['home', 'programs', 'about', 'transformations', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`capitalize font-medium transition-colors duration-200 ${
                  activeSection === section ? 'text-rose-gold-500' : 'text-warm-bronze-700 hover:text-rose-gold-500'
                }`}
              >
                {section === 'transformations' ? 'Results' : section}
              </button>
            ))}
          </div>

          <button 
            onClick={() => scrollToSection('contact')}
            className="bg-rose-gold-500 hover:bg-soft-pink-500 text-white px-3 py-2 sm:px-6 sm:py-2 rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-warm-bronze-900/70 to-rose-gold-900/60"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-4 sm:mb-6 leading-tight text-white">
            TRANSFORM
            <span className="block text-rose-gold-300">POWERFULLY</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-soft-pink-100 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Elite personal training that builds champions. Unleash your potential with proven methods and unwavering dedication.
          </p>
          
          <button 
            onClick={() => scrollToSection('programs')}
            className="bg-gradient-to-r from-rose-gold-500 to-soft-pink-500 hover:from-soft-pink-500 hover:to-rose-gold-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            START YOUR JOURNEY
          </button>
        </div>

        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={24} className="text-white/70 sm:w-8 sm:h-8" />
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-black mb-4 text-warm-bronze-900">
              TRAINING <span className="text-rose-gold-500">PROGRAMS</span>
            </h2>
            <p className="text-lg sm:text-xl text-warm-bronze-600 max-w-3xl mx-auto">
              Choose your path to greatness. Each program is designed to push your limits and deliver transformative results.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-center justify-items-center max-w-5xl mx-auto">
            {[
              {
                icon: <Target size={32} className="sm:w-12 sm:h-12" />,
                title: "1-ON-1 COACHING",
                description: "Personalized training with direct access to elite-level coaching and custom programming.",
                features: ["Custom Workout Plans", "Nutrition Guidance", "24/7 Support", "Progress Tracking"]
              },
              {
                icon: <Monitor size={32} className="sm:w-12 sm:h-12" />,
                title: "ONLINE PROGRAMMING",
                description: "World-class training programs delivered digitally with video guidance and support.",
                features: ["Flexible Scheduling", "Video Tutorials", "Progress Analytics", "Global Access"]
              },
              {
                icon: <Apple size={32} className="sm:w-12 sm:h-12" />,
                title: "NUTRITION GUIDANCE",
                description: "Science-based nutrition strategies that fuel performance and accelerate results.",
                features: ["Meal Planning", "Macro Coaching", "Supplement Guide", "Lifestyle Integration"]
              }
            ].map((program, index) => (
              <div 
                key={index}
                className="group bg-gradient-to-br from-glossy-white to-soft-pink-50 rounded-2xl p-6 sm:p-8 hover:from-soft-pink-50 hover:to-rose-gold-50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-soft-shadow hover:border-rose-gold-300 flex flex-col h-full w-full max-w-sm"
              >
                <div className="text-rose-gold-500 mb-4 sm:mb-6 group-hover:text-rose-gold-600 transition-colors duration-300">
                  {program.icon}
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-warm-bronze-900 group-hover:text-rose-gold-600 transition-colors duration-300">
                  {program.title}
                </h3>
                
                <p className="text-warm-bronze-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {program.description}
                </p>

                <ul className="space-y-2 mb-6 sm:mb-8 flex-grow">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-xs sm:text-sm text-warm-bronze-700">
                      <div className="w-2 h-2 bg-rose-gold-500 rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full bg-gradient-to-r from-rose-gold-500 to-soft-pink-500 hover:from-soft-pink-500 hover:to-rose-gold-500 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base mt-auto"
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-20 bg-gradient-to-br from-soft-pink-50 to-rose-gold-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-5xl font-black mb-6 sm:mb-8 text-warm-bronze-900">
                BUILT <span className="text-rose-gold-500">DIFFERENT</span>
              </h2>
              
              <p className="text-lg sm:text-xl text-warm-bronze-700 mb-6 sm:mb-8 leading-relaxed">
                With over a decade of experience transforming lives, I've developed a methodology that goes beyond traditional fitness. My approach combines scientific precision with relentless intensity to create champions.
              </p>

              <p className="text-base sm:text-lg text-warm-bronze-600 mb-8 sm:mb-12 leading-relaxed">
                Every client receives a personalized roadmap designed to break through plateaus and exceed expectations. This isn't just about fitness, it's about building unbreakable mental fortitude and lifelong habits that define success.
              </p>

              <div className="grid grid-cols-2 gap-6 sm:gap-12 mb-8 sm:mb-12">
                {[
                  { number: "10+", label: "Years Training", cert: "NCSF-CPT" },
                  { number: "100+", label: "Transformations", cert: "NPC NYS GP 2024 WW Overall Champion" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl sm:text-5xl font-black text-rose-gold-500 mb-2">{stat.number}</div>
                    <div className="text-warm-bronze-600 font-medium text-sm sm:text-base mb-3">{stat.label}</div>
                    <div className="bg-rose-gold-100 text-rose-gold-700 px-3 py-2 sm:px-4 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold border border-rose-gold-200 shadow-sm">
                      {stat.cert}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <img 
                  src="/beth-pro.jpg"
                  alt="Personal Trainer"
                  className="rounded-2xl shadow-2xl w-full h-[400px] sm:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-warm-bronze-900/30 to-transparent rounded-2xl"></div>
                <div className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-gradient-to-r from-rose-gold-500 to-soft-pink-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-lg">
                  <Award size={12} className="inline mr-1 sm:mr-2 sm:w-4 sm:h-4" />
                  ELITE TRAINER
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transformations Section */}
      <section id="transformations" className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-black mb-4 text-warm-bronze-900">
              REAL <span className="text-rose-gold-500">RESULTS</span>
            </h2>
            <p className="text-lg sm:text-xl text-warm-bronze-600 max-w-3xl mx-auto">
              These transformations speak louder than words. Every success story represents dedication, consistency, and the power of proper guidance.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "Sarah M.",
                result: "Lost 45 lbs in 6 months",
                quote: "The most life-changing experience. Not just physically, but mentally I'm a completely different person.",
                image: "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
              },
              {
                name: "Mike R.",
                result: "Gained 25 lbs muscle",
                quote: "Finally broke through my plateau. The systematic approach made all the difference in my strength gains.",
                image: "https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
              },
              {
                name: "Jessica L.",
                result: "Marathon PR by 45 minutes",
                quote: "Thought I'd hit my limit, but this training revealed potential I never knew I had. Absolutely incredible results.",
                image: "https://images.pexels.com/photos/3768593/pexels-photo-3768593.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="group bg-gradient-to-br from-glossy-white to-soft-pink-50 rounded-2xl overflow-hidden hover:from-soft-pink-50 hover:to-rose-gold-50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-soft-shadow hover:border-rose-gold-300"
              >
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-warm-bronze-900/60 to-transparent"></div>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                    <div className="text-soft-pink-200 font-bold text-sm sm:text-lg">{testimonial.result}</div>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6">
                  <div className="flex items-center mb-3 sm:mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="text-rose-gold-500 fill-current sm:w-4 sm:h-4" />
                    ))}
                  </div>
                  
                  <p className="text-warm-bronze-700 italic mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="font-bold text-warm-bronze-900 text-sm sm:text-base">{testimonial.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-20 bg-gradient-to-br from-soft-pink-50 to-rose-gold-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div>
              <h2 className="text-3xl sm:text-5xl font-black mb-6 sm:mb-8 text-warm-bronze-900">
                START YOUR <span className="text-rose-gold-500">TRANSFORMATION</span>
              </h2>
              
              <p className="text-lg sm:text-xl text-warm-bronze-700 mb-8 sm:mb-12 leading-relaxed">
                Ready to unlock your potential? Book your free assessment and discover what's possible when you train with purpose and precision.
              </p>

              <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
                <div className="flex items-center">
                  <Mail className="text-rose-gold-500 mr-3 sm:mr-4 flex-shrink-0" size={20} />
                  <span className="text-base sm:text-lg text-warm-bronze-700">beth@fitwithbeth.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="text-rose-gold-500 mr-3 sm:mr-4 flex-shrink-0" size={20} />
                  <span className="text-base sm:text-lg text-warm-bronze-700">(646) 463-0893</span>
                </div>
                <div className="flex items-center">
                  <Instagram className="text-rose-gold-500 mr-3 sm:mr-4 flex-shrink-0" size={20} />
                  <span className="text-base sm:text-lg text-warm-bronze-700">@bethybaby213</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-rose-gold-100 to-soft-pink-100 border border-rose-gold-200 rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-rose-gold-700 mb-3 sm:mb-4">Free Assessment Includes:</h3>
                <ul className="space-y-2 sm:space-y-3">
                  {[
                    "Complete fitness evaluation",
                    "Goal-setting consultation"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <TrendingUp size={14} className="text-rose-gold-500 mr-2 sm:mr-3 flex-shrink-0 sm:w-4 sm:h-4" />
                      <span className="text-warm-bronze-700 text-sm sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-soft-shadow">
              <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-warm-bronze-700 mb-2 font-medium text-sm sm:text-base">First Name</label>
                    <input 
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-glossy-white border border-soft-shadow rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 text-warm-bronze-900 focus:border-rose-gold-500 focus:outline-none focus:ring-2 focus:ring-rose-gold-200 transition-colors duration-200 text-sm sm:text-base"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-warm-bronze-700 mb-2 font-medium text-sm sm:text-base">Last Name</label>
                    <input 
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-glossy-white border border-soft-shadow rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 text-warm-bronze-900 focus:border-rose-gold-500 focus:outline-none focus:ring-2 focus:ring-rose-gold-200 transition-colors duration-200 text-sm sm:text-base"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-warm-bronze-700 mb-2 font-medium text-sm sm:text-base">Email</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-glossy-white border border-soft-shadow rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 text-warm-bronze-900 focus:border-rose-gold-500 focus:outline-none focus:ring-2 focus:ring-rose-gold-200 transition-colors duration-200 text-sm sm:text-base"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label className="block text-warm-bronze-700 mb-2 font-medium text-sm sm:text-base">Phone Number</label>
                  <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-glossy-white border border-soft-shadow rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 text-warm-bronze-900 focus:border-rose-gold-500 focus:outline-none focus:ring-2 focus:ring-rose-gold-200 transition-colors duration-200 text-sm sm:text-base"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-warm-bronze-700 mb-2 font-medium text-sm sm:text-base">Primary Goal</label>
                  <select 
                    name="primaryGoal"
                    value={formData.primaryGoal}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-glossy-white border border-soft-shadow rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 text-warm-bronze-900 focus:border-rose-gold-500 focus:outline-none focus:ring-2 focus:ring-rose-gold-200 transition-colors duration-200 text-sm sm:text-base"
                  >
                    <option value="">Select your primary goal</option>
                    <option value="weight-loss">Weight Loss</option>
                    <option value="muscle-gain">Muscle Gain</option>
                    <option value="strength">Strength Training</option>
                    <option value="endurance">Endurance</option>
                    <option value="general">General Fitness</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-warm-bronze-700 mb-2 font-medium text-sm sm:text-base">Preferred Schedule</label>
                  <select 
                    name="preferredSchedule"
                    value={formData.preferredSchedule}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-glossy-white border border-soft-shadow rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 text-warm-bronze-900 focus:border-rose-gold-500 focus:outline-none focus:ring-2 focus:ring-rose-gold-200 transition-colors duration-200 text-sm sm:text-base"
                  >
                    <option value="">Select preferred time</option>
                    <option value="morning">Morning (6AM - 10AM)</option>
                    <option value="afternoon">Afternoon (12PM - 4PM)</option>
                    <option value="evening">Evening (5PM - 8PM)</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-warm-bronze-700 mb-2 font-medium text-sm sm:text-base">Additional Information</label>
                  <textarea 
                    rows={3}
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    className="w-full bg-glossy-white border border-soft-shadow rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 text-warm-bronze-900 focus:border-rose-gold-500 focus:outline-none focus:ring-2 focus:ring-rose-gold-200 transition-colors duration-200 resize-none text-sm sm:text-base"
                    placeholder="Tell us about your fitness background, injuries, or specific goals..."
                  ></textarea>
                </div>

                {submitMessage && (
                  <div className={`p-3 sm:p-4 rounded-lg text-sm sm:text-base ${
                    submitMessage.includes('Thank you') 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {submitMessage}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-rose-gold-500 to-soft-pink-500 hover:from-soft-pink-500 hover:to-rose-gold-500 text-white font-bold py-3 sm:py-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
                >
                  <Calendar size={16} className="mr-2 sm:w-5 sm:h-5" />
                  {isSubmitting ? 'SUBMITTING...' : 'BOOK FREE ASSESSMENT'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 sm:py-12 border-t border-soft-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4 md:mb-0">
              <img 
                src="/beth-circular-logo.png" 
                alt="Fit With Beth Logo" 
                className="h-6 w-6 sm:h-8 sm:w-8 object-contain rounded-full shadow-sm"
              />
              <div className="text-lg sm:text-2xl font-bold text-warm-bronze-900">
                Fit With <span className="text-rose-gold-500">Beth</span>
              </div>
            </div>
            
            <div className="text-warm-bronze-600 text-center md:text-right">
              <p className="mb-1 sm:mb-2 text-sm sm:text-base">© 2025 Fit With Beth. All rights reserved.</p>
              <p className="text-xs sm:text-sm">Transform Powerfully. Built by Dreams Flo</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;