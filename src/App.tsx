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
  TrendingUp,
  ArrowLeft,
  X
} from 'lucide-react';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
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

  // Reviews shown on main page
  const mainPageReviews = [
    {
      name: "Constance B.",
      result: "7 Years Strong: Personalized Workouts That Keep Me Moving at 76",
      quote: "I've been using Beth for 7 years.  I'm 76 years old and have rheumatoid arthritis.  My workouts with her keep me limber.  She adjusts them depending on how I'm feeling.  On top of that she has a lovely personality that makes the sessions enjoyable.  When I'm away, I continue the workouts through FaceTime."
    },
    {
      name: "Carmen L., MD",
      result: "6 Years of Strength: A Doctor's Praise for Beth's Transformative Training",
      quote: "I've had the pleasure of training with Beth for six years, and they've been my best years in terms of fitness, energy, and overall well-being. Beth is deeply committed, knowledgeable, and versatile--offering everything from kickboxing and HIIT to yoga, cardio, and strength training. Her passion and personalized approach make every session both effective and enjoyable."
    },             
    {
      name: "Adela P.",
      result: "A True Treasure: Beth's Impact on My Daughter's Growth",
      quote: "Beth has been working with my daughter Eve, who has Down Syndrome for more than three years now. She is kind, patient, and awesome! I can see an overall improvement in Eve's energy level and body definition. Beth is an absolute treasure!!"
    },
  ];

  // All reviews for the modal (includes main page reviews + additional ones)
  const allReviews = [
    ...mainPageReviews,
    {
      name: "Melissa V.",
      result: "From Beginner to Confident: Beth Is the Coach Who Keeps You Going",
      quote: "Beth is an amazing fitness coach! I started working with her in 2017 with no gym experience, and she provided me with the fundamental knowledge I needed to enter the gym with confidence. I moved away and reconnected with Beth in 2023 after learning she offers training virtually. We've been back at it for two years, and her careful attention to planning my workout and meals around my busy schedule is top tier. Beth is the accountability partner everyone needs. She takes your journey very seriously and is sure to stretch you based on your fitness goals. I highly recommend training with Beth - whether you're trying to build confidence with starting your fitness journey, committed to simply moving your body every day, or looking to achieve a specific physique, she's the coach to call! I highly recommend!"
    },
    {
      name: "Shamika O.",
      result: "Skilled, Supportive, and Results-Driven: Beth Is the Real Deal",
      quote: "I've been working with Beth for 1 year, and I can confidently say she is the best trainer I've ever had. From day one, she took the time to really understand my fitness goals and created a personalized plan that was both challenging and realistic for me. What sets Beth apart is her ability to push me to my limits while keeping the sessions fun and motivating. She always knows exactly when to encourage me to go harder and when to adjust the workout if something doesn't feel right. I've made so much progress, not just physically but also mentally. Her positive attitude and consistent support make a huge difference! Her knowledge of different exercises, proper form, and injury prevention is top-notch. Whether I'm lifting weights, doing cardio, or focusing on flexibility, I feel safe and confident knowing she's there to guide me. If you're looking for a trainer who's not only skilled but also genuinely cares about your success, Beth is the one! I couldn't recommend her more."
    },
    {
      name: "Michelle C.",
      result: "From Spartan Races to Cancer Recovery: A Trainer Who Truly Shows Up",
      quote: "Beth has been a light that ignites my motivation and has been a supportive trainer and coach. I've trained with Beth for a few years and through my journey of strength and cancer she has been able to adjust and adapt to my needs. She pushed me when I was at my strongest to be better and to prepare for a spartan and help me keep myself strong when I was at my weakest. She listens with compassion and understanding but will hold you accountable for you to be your best self. Her guidance and knowledge to be your best self is incomparable to any trainer I have worked with before."
    },
    {
      name: "Marylee C.",
      result: "More Than Fitness: Beth Helped Me Become My Best Self",
      quote: "Working with Beth has been one of the best decisions I've ever made. From day one, she believed in me even when I didn't believe in myself. Her knowledge, support, and dedication helped me transform not only my body but my mindset too. Every session was challenging, motivating, and tailored specifically to my goals. Beth pushed me beyond my limits in the best way possible & because of that, I've gained strength, confidence, and energy I never thought I had. She taught me proper form, held me accountable, and celebrated every milestone with me big or small. This journey wasn't just about weight loss or muscle gain it was about becoming the best version of myself, and I couldn't have done it without her guidance. If you're looking for someone who genuinely cares and will help you get real, lasting results,  Beth is the one to go to. Highly recommend -- 10/10!"
    },
    {
      name: "Ashley P.",
      result: "8 Years Strong: Beth Is the Trainer I Trust Most",
      quote: "I've known Beth for over 8 years and been training with her on and off ever since. Beth is one of the only people I would ever trust to guide me in my fitness journey. Beth has a wealth of knowledge and truly cares about each of her clients! She will push you to your limits and put not only your physical toughness, but your mental toughness to the test. If you're looking for someone to train with I'd highly recommend you to train with Beth!!"
    },
    {
      name: "Camelia G.",
      result: "Kind, Persistent, and Uplifting: Beth Brings Out Your Best",
      quote: "I have been training with Beth for almost a year! she is kindest and most persevering trainer! she has techniques to address your weakness and praising kindly your progress! wholeheartedly recommended !"
    },
    {
      name: "Modia A.",
      result: "Worth the Commute: No One Trains Like Beth",
      quote: "Beth is the best trainer I've ever worked with. I used to commute from New Jersey to New York just to train with her. I worked with a few other trainers, but none of them came close to the level of motivation, support, and expertise Beth brings to every session. She truly knows how to push you without making you feel overwhelmed, and she always finds a way to keep things fun and challenging. I've never felt stronger, more confident, or more capable in my workouts than when I was training with her. If you're looking for someone who genuinely cares about your progress and knows how to get results, Beth is the one."
    },
    {
      name: "Victoria N.",
      result: "Recovery, Growth, and Long-Term Results: Beth Delivers It All",
      quote: "I've been training with Beth for the past five years, and I truly can't imagine working with anyone else. She's not only incredibly kind and supportive, but she also holds you to a high standard of accountability that keeps you focused and motivated. After injuring my back two years ago, Beth was the only person I trusted to guide me through both recovery and rebuilding my strength. Her knowledge, care, and dedication to her clients are unmatched. She always shows up ready to challenge me and push me to be my best, and I'm fully committed to continuing this journey with her for the long haul. Nothing but the best things to say -- Beth genuinely cares, and it shows in every session."
    },
    {
      name: "Cristina O.",
      result: "Grateful for 6 Years of Support, Strength, and Friendship",
      quote: "I met Beth 6 years ago in a commercial gym where I had no idea what I was doing. Not only has she been my trainer ever since, but she's become my friend. Beth's dedication to her clients goes far beyond what the job description requires. She goes above and beyond and it shows in the results. I can't say enough how thankful I am for her!"
    },    
    {
      name: "Cristina O.",
      result: "Beth Is the Best Trainer I’ve Had and the Best Decision for My Well-Being",
      quote: "Beth is hands-down the best trainer I've ever worked with. Not only is she incredibly knowledgeable and professional, but she's also one of the most supportive and down-to-earth people I know. I started working with her to get stronger and feel better in my body, and I can honestly say it's been one of the best decisions I've made for myself. Beth really listens--she takes the time to understand your goals, your limitations, and what actually motivates you. I have knee issues, and she's been so thoughtful with modifying exercises so I can still get a great workout without hurting myself. Her sessions are always challenging but never overwhelming, and she somehow manages to make working out something I actually look forward to. I can tell you she genuinely cares about the people she works with. She's encouraging, real, and always shows up with great energy. She's helped me stay consistent, feel more confident, and celebrate my progress--even on the tough days. If you're looking for a trainer who knows her stuff, meets you where you're at, and makes you feel like you can actually reach your goals, Beth is your girl. I can't recommend her enough."
    },    
  ];

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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isReviewsModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isReviewsModalOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isReviewsModalOpen) {
        setIsReviewsModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isReviewsModalOpen]);

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
        setSubmitMessage('Thank you! Your request has been submitted. I\'ll reach out within 24–48 hours to schedule your free session. If you don\'t see my email, check your spam folder.');
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

  const ReviewCard = ({ review, index }: { review: typeof allReviews[0], index: number }) => (
    <div 
      className="group bg-gradient-to-br from-glossy-white to-soft-pink-50 rounded-2xl p-6 sm:p-8 hover:from-soft-pink-50 hover:to-rose-gold-50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-soft-shadow hover:border-rose-gold-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="mb-4 sm:mb-6">
        <div className="text-rose-gold-500 font-bold text-lg sm:text-xl mb-2">{review.result}</div>
        <div className="flex items-center mb-3 sm:mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className="text-rose-gold-500 fill-current sm:w-4 sm:h-4" />
          ))}
        </div>
      </div>
      
      <p className="text-warm-bronze-700 italic mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
        "{review.quote}"
      </p>
      
      <div className="font-bold text-warm-bronze-900 text-sm sm:text-base">{review.name}</div>
    </div>
  );

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
              Every success story represents dedication, consistency, and the power of proper guidance.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {mainPageReviews.map((review, index) => (
              <ReviewCard key={index} review={review} index={index} />
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <button 
              onClick={() => setIsReviewsModalOpen(true)}
              className="bg-gradient-to-r from-rose-gold-500 to-soft-pink-500 hover:from-soft-pink-500 hover:to-rose-gold-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              See All Reviews
            </button>
          </div>
        </div>
      </section>

      {/* Reviews Modal */}
      {isReviewsModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-warm-bronze-900/80 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setIsReviewsModalOpen(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative w-full h-full max-w-none bg-white overflow-hidden animate-fade-in-up">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-soft-shadow px-4 sm:px-6 py-4 sm:py-6">
              <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <button
                    onClick={() => setIsReviewsModalOpen(false)}
                    className="p-2 hover:bg-soft-pink-50 rounded-full transition-colors duration-200"
                    aria-label="Go back"
                  >
                    <ArrowLeft size={20} className="text-warm-bronze-700 sm:w-6 sm:h-6" />
                  </button>
                  <h2 className="text-2xl sm:text-4xl font-black text-warm-bronze-900">
                    ALL <span className="text-rose-gold-500">REVIEWS</span>
                  </h2>
                </div>
                
                <button
                  onClick={() => setIsReviewsModalOpen(false)}
                  className="p-2 hover:bg-soft-pink-50 rounded-full transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <X size={20} className="text-warm-bronze-700 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="h-full overflow-y-auto pb-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {allReviews.map((review, index) => (
                    <div
                      key={index}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <ReviewCard review={review} index={index} />
                    </div>
                  ))}
                </div>
                
                {/* Call to Action in Modal */}
                <div className="text-center mt-12 sm:mt-16">
                  <div className="bg-gradient-to-br from-soft-pink-50 to-rose-gold-50 rounded-2xl p-6 sm:p-8 border border-rose-gold-200">
                    <h3 className="text-2xl sm:text-3xl font-black text-warm-bronze-900 mb-4">
                      Ready to Join Them?
                    </h3>
                    <p className="text-warm-bronze-600 mb-6 sm:mb-8 text-base sm:text-lg">
                      Start your transformation journey today with a free assessment.
                    </p>
                    <button 
                      onClick={() => {
                        setIsReviewsModalOpen(false);
                        scrollToSection('contact');
                      }}
                      className="bg-gradient-to-r from-rose-gold-500 to-soft-pink-500 hover:from-soft-pink-500 hover:to-rose-gold-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Get Started Today
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-20 bg-gradient-to-br from-soft-pink-50 to-rose-gold-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="flex flex-col justify-center">
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