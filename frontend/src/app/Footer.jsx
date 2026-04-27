'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <footer className="site-footer">

      {/* ── Newsletter Bar ── */}
      <div className="footer-newsletter">
        <div className="footer-newsletter-inner">
          <div className="footer-nl-left">
            <p className="footer-nl-heading">Stay informed</p>
            <p className="footer-nl-sub">Receive updates about seasonal retreats and cultural events</p>
          </div>
          <div className="footer-nl-right">
            <form className="footer-nl-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                className="footer-nl-input"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="footer-nl-btn">Subscribe</button>
            </form>
            <p className="footer-nl-privacy">
              We respect your privacy and handle data responsibly.{' '}
              <a href="#">We respect your privacy and handle data responsibly</a>
            </p>
          </div>
        </div>
      </div>

      {/* ── Main Footer Body ── */}
      <div className="footer-body">
        <div className="footer-body-inner">

          {/* Logo column */}
          <div className="footer-logo-col">
            <a href="/" className="footer-logo-link">
              <Image
                src="/images/logog.png"
                alt="Maison Tropez Logo"
                width={38}
                height={38}
                style={{ objectFit: 'contain' }}
              />
              <span className="footer-logo-text">Maison<br />Tropez</span>
            </a>
          </div>

          {/* Nav columns */}
          <nav className="footer-nav-cols">

            <div className="footer-nav-col">
              <h4 className="footer-nav-heading">Explore</h4>
              <ul>
                <li><a href="#">The villa</a></li>
                <li><a href="#">Accommodations</a></li>
                <li><a href="#">Amenities</a></li>
                <li><a href="#">Availability</a></li>
                <li><a href="#">Gallery</a></li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <h4 className="footer-nav-heading">Discover</h4>
              <ul>
                <li><a href="#">Activities</a></li>
                <li><a href="#">Surroundings</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Experiences</a></li>
                <li><a href="#">Wellness</a></li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <h4 className="footer-nav-heading">Connect</h4>
              <ul>
                <li><a href="#">Contact us</a></li>
                <li><a href="#">Book now</a></li>
                <li><a href="#">Get in touch</a></li>
                <li><a href="#">Inquire</a></li>
                <li><a href="#">Reserve</a></li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <h4 className="footer-nav-heading">Support</h4>
              <ul>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Cancellation policy</a></li>
                <li><a href="#">House rules</a></li>
                <li><a href="#">Accessibility</a></li>
                <li><a href="#">About</a></li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <h4 className="footer-nav-heading">Our story</h4>
              <ul>
                <li><a href="#">Design philosophy</a></li>
                <li><a href="#">Sustainability practices</a></li>
                <li><a href="#">Community events</a></li>
                <li className="footer-copyright">
                  © 2025 Scottish Villa Retreat.<br />All rights reserved
                </li>
                <li><a href="#">Privacy policy</a></li>
              </ul>
            </div>

          </nav>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <div className="footer-bottom-links">
            <a href="#">Terms of service</a>
            <a href="#">Cookie settings</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookies Settings</a>
          </div>
          <div className="footer-social">
            {/* Facebook */}
            <a href="#" aria-label="Facebook" className="footer-social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" aria-label="Instagram" className="footer-social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            {/* X / Twitter */}
            <a href="#" aria-label="X" className="footer-social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" aria-label="LinkedIn" className="footer-social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            {/* YouTube */}
            <a href="#" aria-label="YouTube" className="footer-social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}
