import Image from 'next/image';

const DEFAULT_BENEFITS = [
  { text: "Best available rates" },
  { text: "Direct communication and flexibility" },
  { text: "Priority for returning guests" },
  { text: "Tailored recommendations before your stay" }
];

export default function WhyBookDirectly({ heading, image, btn1Text, btn2Text, benefits }) {
  const displayBenefits = (benefits && benefits.length > 0) ? benefits : DEFAULT_BENEFITS;
  const imgUrl = image?.url 
    ? (image.url.startsWith('http') ? image.url : `http://127.0.0.1:8000${image.url}`)
    : "http://127.0.0.1:8000/media/images/living1.avif";

  return (
    <section className="why-book-section">
      <div className="why-inner">
        <div className="why-grid">
          {/* Left: Heading & Image */}
          <div className="why-image-col">
            <h2 className="why-heading">{heading || "Why Book Directly With Us"}</h2>
            <div className="why-image-wrap">
              {imgUrl ? (
                <Image src={imgUrl} alt="Why book directly" fill style={{ objectFit: 'cover' }} unoptimized />
              ) : (
                <div className="why-placeholder" />
              )}
            </div>
          </div>
          
          {/* Right: Benefits & Buttons */}
          <div className="why-content-col">
            <div className="why-benefits-list">
              {displayBenefits.map((b, i) => (
                <p key={i} className="why-benefit-item">{b.text}</p>
              ))}
            </div>
            
            <div className="why-buttons">
              <a href="#" className="why-btn-primary">{btn1Text || "Book Now"}</a>
              <a href="#" className="why-btn-outline">{btn2Text || "Inquire"}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
