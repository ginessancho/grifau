'use client';

import { useState, FormEvent } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage('Welcome to the GRIFAU family. We shall be in touch.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Connection error. Please try again.');
    }
  };

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="container header-inner">
          <a href="/" className="logo">
            GRIF<span>AU</span>
          </a>
          <a href="#subscribe" className="nav-link">
            Join the Waitlist
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content animate-fade-in">
              <p className="hero-eyebrow">Introducing GRIFAU</p>
              <h1 className="hero-title">
                Pure Water,<br />
                <em>Pure Elegance</em>
              </h1>
              <p className="hero-subtitle">
                Where British refinement meets French sophistication
              </p>
              <p className="hero-description">
                The world&apos;s most advanced water filtration system,
                housed within an object of enduring beauty. GRIFAU removes
                PFAS, microplastics, and harmful contaminants—delivering
                water as nature intended.
              </p>
              <a href="#subscribe" className="btn btn-primary">
                Request Early Access
              </a>
            </div>
            <div className="hero-image-container animate-fade-in-delay">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="hero-image animate-float"
                poster="/faucet-hero.png"
              >
                <source src="/faucet-hero.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <div className="section-header">
            <p className="section-eyebrow">Revolutionary Technology</p>
            <h2 className="section-title">Uncompromising Purity</h2>
            <div className="divider"></div>
            <p className="section-description">
              Three pillars of protection, elegantly engineered
            </p>
          </div>

          <div className="features-grid">
            <article className="feature-card">
              <div className="feature-icon">I</div>
              <h3 className="feature-title">PFAS Elimination</h3>
              <p className="feature-description">
                Our proprietary membrane technology captures and neutralizes
                forever chemicals at the molecular level. 99.9% removal rate,
                laboratory certified.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon">II</div>
              <h3 className="feature-title">Microplastic Defence</h3>
              <p className="feature-description">
                Advanced nano-filtration intercepts particles invisible to the
                human eye. Protecting your body from the modern world&apos;s
                invisible invaders.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon">III</div>
              <h3 className="feature-title">Complete Purification</h3>
              <p className="feature-description">
                Heavy metals, chlorine, pesticides, pharmaceutical residues—
                systematically removed while preserving essential minerals
                for optimal health.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="philosophy">
        <div className="container">
          <div className="philosophy-grid">
            <div className="philosophy-content">
              <p className="section-eyebrow">Our Philosophy</p>
              <h2 className="section-title">The Art of Water</h2>
              <div className="divider" style={{ margin: '1.5rem 0', background: 'var(--gray-700)' }}></div>
              <blockquote className="philosophy-quote">
                &ldquo;We believe that the vessel which delivers life&apos;s most
                essential element should be nothing less than a masterpiece.&rdquo;
              </blockquote>
              <p className="philosophy-text">
                GRIFAU represents a new paradigm—where uncompromising health
                technology exists in perfect harmony with objects of genuine
                beauty. This is not merely a product. It is a statement of
                values, a daily ritual, a quiet revolution in how we care
                for ourselves and those we love.
              </p>
            </div>
            <div className="philosophy-visual">
              <span className="philosophy-symbol">G</span>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter" id="subscribe">
        <div className="container">
          <div className="newsletter-content">
            <h2 className="newsletter-title">Join the Movement</h2>
            <p className="newsletter-subtitle">
              Be among the first to experience GRIFAU
            </p>
            <div className="ornament">❧</div>

            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'loading'}
                id="email-input"
              />
              <button
                type="submit"
                className={`btn btn-primary ${status === 'loading' ? 'loading' : ''}`}
                disabled={status === 'loading'}
                id="submit-button"
              >
                {status === 'loading' ? '' : 'Subscribe'}
              </button>
            </form>

            {message && (
              <div className={`form-message ${status === 'success' ? 'success' : 'error'}`}>
                {message}
              </div>
            )}

            <p className="newsletter-privacy">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <span className="footer-logo">GRIFAU</span>
          <p className="footer-text">© 2025 GRIFAU. All rights reserved.</p>
          <nav className="footer-links">
            <a href="#" className="footer-link">Privacy</a>
            <a href="#" className="footer-link">Terms</a>
            <a href="#" className="footer-link">Contact</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
