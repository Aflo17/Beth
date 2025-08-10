import Link from 'next/link';
import { Play, Star, Users, Shield, Crown, CheckCircle } from 'lucide-react';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <Crown className={styles.logoIcon} />
            <span className={styles.logoText}>FitWithBeth Premium</span>
          </div>
          <nav className={styles.nav}>
            <Link href="/members" className={styles.navLink}>
              Member Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Transform Your Fitness Journey
            <span className={styles.heroAccent}>With Premium Content</span>
          </h1>
          <p className={styles.heroDescription}>
            Access exclusive workout videos, personalized training programs, and expert guidance 
            from certified fitness professionals. Join thousands who've already transformed their lives.
          </p>
          <div className={styles.heroActions}>
            <Link href="/members" className={styles.ctaButton}>
              <Play className={styles.buttonIcon} />
              Start Your Journey
            </Link>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <Users className={styles.statIcon} />
                <span>1000+ Members</span>
              </div>
              <div className={styles.stat}>
                <Star className={styles.statIcon} />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Why Choose Our Platform?</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <Play className={styles.featureIcon} />
              <h3>Premium Video Library</h3>
              <p>Access hundreds of high-quality workout videos with new content added weekly.</p>
            </div>
            <div className={styles.featureCard}>
              <Shield className={styles.featureIcon} />
              <h3>Secure Streaming</h3>
              <p>Your content is protected with enterprise-grade security and encrypted streaming.</p>
            </div>
            <div className={styles.featureCard}>
              <Users className={styles.featureIcon} />
              <h3>Expert Guidance</h3>
              <p>Learn from certified trainers with years of experience in fitness and nutrition.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className={styles.pricing}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Simple, Transparent Pricing</h2>
          <div className={styles.pricingCard}>
            <div className={styles.pricingHeader}>
              <Crown className={styles.pricingIcon} />
              <h3>Premium Membership</h3>
              <div className={styles.price}>
                <span className={styles.priceAmount}>$29</span>
                <span className={styles.pricePeriod}>/month</span>
              </div>
            </div>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                <CheckCircle className={styles.checkIcon} />
                Unlimited access to all videos
              </li>
              <li className={styles.featureItem}>
                <CheckCircle className={styles.checkIcon} />
                New content added weekly
              </li>
              <li className={styles.featureItem}>
                <CheckCircle className={styles.checkIcon} />
                HD streaming quality
              </li>
              <li className={styles.featureItem}>
                <CheckCircle className={styles.checkIcon} />
                Mobile and desktop access
              </li>
              <li className={styles.featureItem}>
                <CheckCircle className={styles.checkIcon} />
                Cancel anytime
              </li>
            </ul>
            <Link href="/members" className={styles.pricingButton}>
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonials}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>What Our Members Say</h2>
          <div className={styles.testimonialGrid}>
            <div className={styles.testimonialCard}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={styles.starIcon} />
                ))}
              </div>
              <p>"The video quality is amazing and the workouts are so effective. I've seen incredible results in just 3 months!"</p>
              <div className={styles.testimonialAuthor}>- Sarah M.</div>
            </div>
            <div className={styles.testimonialCard}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={styles.starIcon} />
                ))}
              </div>
              <p>"Finally found a platform that keeps me motivated. The variety of workouts means I never get bored."</p>
              <div className={styles.testimonialAuthor}>- Mike R.</div>
            </div>
            <div className={styles.testimonialCard}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={styles.starIcon} />
                ))}
              </div>
              <p>"Professional quality content at an affordable price. Best investment I've made for my health."</p>
              <div className={styles.testimonialAuthor}>- Jessica L.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Transform Your Fitness?</h2>
          <p className={styles.ctaDescription}>
            Join thousands of members who are already seeing amazing results. Start your journey today!
          </p>
          <Link href="/members" className={styles.ctaButton}>
            <Play className={styles.buttonIcon} />
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <Crown className={styles.logoIcon} />
            <span className={styles.logoText}>FitWithBeth Premium</span>
          </div>
          <div className={styles.footerLinks}>
            <Link href="/members" className={styles.footerLink}>Members</Link>
            <span className={styles.footerText}>© 2025 FitWithBeth Premium. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}