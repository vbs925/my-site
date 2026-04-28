"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function SurroundingsSection({
  surLabel,
  surHeading,
  surDescription,
  surButton,
  surImageLeftUrl,
  surImageRightUrl,
}) {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;

      // 0 = section just entering, 1 = section fully scrolled past
      const total = rect.height + windowH;
      const scrolled = windowH - rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));

      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Two-phase sine arches — alternating one after the other:
  // Left  peaks at progress ≈ 0.25  (first quarter of scroll)
  // Right peaks at progress ≈ 0.75  (third quarter of scroll)
  const leftScale  = 1 + 0.16 * Math.max(0, Math.sin(progress * Math.PI * 2));
  const rightScale = 1 + 0.16 * Math.max(0, Math.sin((progress - 0.5) * Math.PI * 2));

  // Text drifts very slightly based on which image is dominant
  const textShift = (leftScale - rightScale) * -18; // leans toward the taller image

  return (
    <section ref={sectionRef} className="sur-section">
      <div className="sur-inner">

        {/* Images column */}
        <div className="sur-images-col">
          <div className="sur-inner-col sur-inner-left">
            <div
              className="sur-image-left-wrapper"
              style={{
                transform: `scale(${leftScale.toFixed(4)})`,
                transformOrigin: "bottom center",
                transition: "transform 0.12s ease-out",
                zIndex: leftScale > rightScale ? 2 : 1,
              }}
            >
              <Image
                src={surImageLeftUrl}
                alt="Surroundings"
                fill
                unoptimized
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="sur-triangle" aria-hidden="true" />
          </div>

          <div className="sur-inner-col sur-inner-right">
            <div
              className="sur-image-right-wrapper"
              style={{
                transform: `scale(${rightScale.toFixed(4)})`,
                transformOrigin: "top center",
                transition: "transform 0.12s ease-out",
                zIndex: rightScale > leftScale ? 2 : 1,
              }}
            >
              <Image
                src={surImageRightUrl}
                alt="Surroundings Landscape"
                fill
                unoptimized
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>

        {/* Text column — shifts subtly with the dominant image */}
        <div
          className="sur-content-col"
          style={{
            transform: `translateY(${textShift.toFixed(2)}px)`,
            transition: "transform 0.12s ease-out",
          }}
        >
          <span className="sur-label">{surLabel}</span>
          <h2 className="sur-heading">
            {surHeading.split("\n").map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </h2>
          <p className="sur-description">{surDescription}</p>
          <a href="#" className="sur-btn-outline">{surButton}</a>
        </div>

      </div>
    </section>
  );
}
