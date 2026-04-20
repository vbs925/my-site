"use client";

import { useState } from 'react';
import Image from 'next/image';

const REVIEWS = [
  {
    stars: 5,
    text: "We came to escape the city and found something we didn't expect — a place where time actually stops. The oaks, the light, the silence. We will be back.",
    author_name: "Claire Moreau",
    author_title: "Architect, Paris",
    img: "/images/dp1.png",
  },
  {
    stars: 5,
    text: "The villa is serene and beautifully positioned, with incredible outdoor space and views. It feels like a private retreat, yet everything is within easy reach. We will absolutely return.",
    author_name: "Thomas Leclerc",
    author_title: "Writer, Lyon",
    img: "/images/dp2.jpg",
  },
  {
    stars: 5,
    text: "We hosted a yoga retreat here. The setting did half the work — the oaks, the light, the silence. Our guests still speak of it months later.",
    author_name: "Isabelle Rousseau",
    author_title: "Wellness instructor, Marseille",
    img: "/images/dp3.jpg",
  },
];

function Stars({ count }) {
  return (
    <div className="rv-stars">
      {[1,2,3,4,5].map(n => (
        <span key={n} className={n <= count ? 'rv-star filled' : 'rv-star'}>★</span>
      ))}
    </div>
  );
}

function ReviewCard({ review, position }) {
  return (
    <div className={`rv-card rv-card--${position}`}>
      <Stars count={review.stars} />
      <p className="rv-text">&ldquo;{review.text}&rdquo;</p>
      <div className="rv-author">
        <div className="rv-avatar">
          <Image
            src={review.img}
            alt={review.author_name}
            fill
            sizes="56px"
            style={{ objectFit: 'cover' }}
            unoptimized
          />
        </div>
        <div className="rv-author-info">
          <span className="rv-author-name">{review.author_name}</span>
          <span className="rv-author-title">{review.author_title}</span>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSection({ heading, description, cmsReviews }) {
  const reviews = (cmsReviews && cmsReviews.length > 0) ? cmsReviews : REVIEWS;
  const n = reviews.length;
  const [active, setActive] = useState(0);

  const prev = (active - 1 + n) % n;
  const next = (active + 1) % n;

  const ArrowIcon = ({ dir }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points={dir === 'left' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'} />
    </svg>
  );

  return (
    <section className="rv-section">
      <div className="rv-triangle" aria-hidden="true" />
      <div className="rv-inner">
        <div className="rv-header">
          <h2 className="rv-heading">{heading || 'A place guests return to'}</h2>
          <p className="rv-desc">{description || 'Guests return year after year for the calm, the setting, and the feeling of complete escape'}</p>
        </div>

        {/* Carousel: arrow | cards | arrow */}
        <div className="rv-carousel">
          <button className="rv-btn" onClick={() => setActive(prev)} aria-label="Previous review">
            <ArrowIcon dir="left" />
          </button>

          <div className="rv-stage">
            <ReviewCard review={reviews[prev]} position="left" />
            <ReviewCard review={reviews[active]} position="center" />
            <ReviewCard review={reviews[next]} position="right" />
          </div>

          <button className="rv-btn" onClick={() => setActive(next)} aria-label="Next review">
            <ArrowIcon dir="right" />
          </button>
        </div>
      </div>
    </section>
  );
}
