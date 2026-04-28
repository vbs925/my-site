"use client";
import { useState } from "react";
import Image from "next/image";

export default function RetreatsGatheringsSection({
  slides,
  label,
  heading,
  description,
  button1Text,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const handleNext = () => {
    if (animating) return;
    setAnimating(true);

    // After exit animation finishes, flip to next slide and play enter
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
      setAnimating(false);
    }, 400);
  };

  const slide = slides[activeIndex];
  const progressPct = ((activeIndex + 1) / slides.length) * 100;

  return (
    <section className="rg-section">
      <div className="rg-inner">

        {/* Left: STATIC — never animates */}
        <div className="rg-content-col">
          <span className="rg-label">{label}</span>
          <h2 className="rg-heading">{heading}</h2>
          <p className="rg-description">{description}</p>
          <div className="rg-buttons">
            <a href="#" className="rg-btn-primary">{button1Text}</a>
            <button onClick={handleNext} className="rg-btn-text rg-next-btn">
              Next &rsaquo;
            </button>
          </div>
        </div>

        {/* Right: ANIMATED — image + caption slide up on Next */}
        <div
          key={activeIndex}
          className={`rg-image-col rg-animate ${animating ? "rg-exit-up" : "rg-enter"}`}
        >
          <div className="rg-image-wrapper">
            <Image
              src={slide.imageUrl}
              alt={slide.captionTitle}
              width={800}
              height={600}
              className="rg-img"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              unoptimized
            />
          </div>
          <div className="rg-caption">
            <h3 className="rg-caption-title">{slide.captionTitle}</h3>
            <p className="rg-caption-desc">{slide.captionDesc}</p>
          </div>

          {/* Thin progress line below caption */}
          <div className="rg-progress-track">
            <div
              className="rg-progress-fill"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
