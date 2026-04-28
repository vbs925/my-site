"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HeroSection({ title, description, finePrint, imageUrl }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // If we scroll down more than 220px, change the image
      if (window.scrollY > 220) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use a second image for the scroll effect (e.g. from the newly added images)
  const alternateImage = '/images/pic.png';
  const currentImage = scrolled ? alternateImage : imageUrl;

  return (
    <section className={`hero-section ${scrolled ? 'scrolled' : ''}`}>
      <div className="hero-content">
        <div className="hero-left">
          <h1 className="hero-title">{title}</h1>
        </div>

        <div className="hero-right">
          <p className="hero-description">{description}</p>

          <div className="hero-buttons">
            <a href="#" className="btn-primary">Check availability</a>
            <a href="#" className="btn-secondary">Explore the villa</a>
          </div>

          <p className="hero-fine-print">{finePrint}</p>

          {/* Old image — stays exactly here in the right column */}
          <div className="hero-image-wrapper">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="Villa hero image"
                className="hero-img hero-img-old"
                fill
                style={{ objectFit: 'cover' }}
                priority
                unoptimized
              />
            )}
          </div>
        </div>

        {/* New image — spans BOTH columns (full width) */}
        <div className="hero-image-wrapper-new">
          {alternateImage && (
            <Image
              src={alternateImage}
              alt="Villa hero image alternate"
              className="hero-img hero-img-new"
              fill
              style={{ objectFit: 'cover' }}
              priority
              unoptimized
            />
          )}
        </div>
      </div>
    </section>
  );
}
