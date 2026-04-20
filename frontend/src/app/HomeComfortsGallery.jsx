'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const imagesTop = [
  '/images/dis1.png',
  '/images/dis2.png',
  '/images/dis3.jpg',
  '/images/dis4.png',
  '/images/dis5.png',
];

const imagesBottom = [
  '/images/dis6.png',
  '/images/dis7.png',
  '/images/dis8.png',
  '/images/dis9.png',
  '/images/dis10.png',
];

export default function HomeComfortsGallery({ cmsImages }) {
  const containerRef = useRef(null);
  const topRowRef = useRef(null);
  const bottomRowRef = useRef(null);

  // If we have cmsImages, use them, otherwise fallback to local defaults
  const resolvedImages = cmsImages && cmsImages.length > 0 
    ? cmsImages 
    : [...imagesTop, ...imagesBottom];
    
  // Split the images evenly between top and bottom rows
  const midpoint = Math.ceil(resolvedImages.length / 2);
  const activeTopImages = resolvedImages.slice(0, midpoint);
  const activeBottomImages = resolvedImages.slice(midpoint);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !topRowRef.current || !bottomRowRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // If the section is in view
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        // Calculate the scroll progress of the container through the viewport
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        
        // Top row goes right: we start it off negatively offset (-10%)
        const topTranslate = -10 + (progress * 6.6); 
        
        // Bottom row goes left: we start it off close to 0 and move it negatively
        const bottomTranslate = -3.3 - (progress * 6.6); 

        topRowRef.current.style.transform = `translateX(${topTranslate}%)`;
        bottomRowRef.current.style.transform = `translateX(${bottomTranslate}%)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="hc-gallery-container" 
      ref={containerRef}
      style={{ 
        overflow: 'hidden', 
        width: '100%', 
        padding: '2rem 0', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem' 
      }}
    >
      {/* Top Row */}
      <div 
        ref={topRowRef}
        style={{ 
          display: 'flex', 
          width: 'max-content',
          gap: '1.5rem',
          willChange: 'transform'
        }}
      >
        {/* Tripled arrays to ensure there's enough content to scroll without seeing the edge */}
        {[...activeTopImages, ...activeTopImages, ...activeTopImages].map((src, idx) => (
          <div key={`top-${idx}`} style={{ width: '28vw', height: 'clamp(160px, 20vw, 260px)', position: 'relative', borderRadius: 'var(--image-radius)', overflow: 'hidden' }}>
            <Image 
              src={src} 
              alt="Villa Comforts Top" 
              fill 
              style={{ objectFit: 'cover' }} 
              unoptimized 
            />
          </div>
        ))}
      </div>

      {/* Bottom Row */}
      <div 
        ref={bottomRowRef}
        style={{ 
          display: 'flex', 
          width: 'max-content',
          gap: '1.5rem',
          willChange: 'transform'
        }}
      >
        {[...activeBottomImages, ...activeBottomImages, ...activeBottomImages].map((src, idx) => (
          <div key={`bot-${idx}`} style={{ width: '28vw', height: 'clamp(160px, 20vw, 260px)', position: 'relative', borderRadius: 'var(--image-radius)', overflow: 'hidden' }}>
            <Image 
              src={src} 
              alt="Villa Comforts Bottom" 
              fill 
              style={{ objectFit: 'cover' }} 
              unoptimized 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
