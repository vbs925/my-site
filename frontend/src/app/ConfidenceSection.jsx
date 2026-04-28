import Image from 'next/image';

const DEFAULT_ITEMS = [
  { text: "Choose your dates and book the villa", imagePath: "/images/b1.jpg" },
  { text: "Direct communication with owners", imagePath: "/images/b2.jpg" },
  { text: "Trusted by guests returning each year", imagePath: "/images/b3.jpg" }
];

export default function ConfidenceSection({ heading, items }) {
  const displayItems = (items && items.length > 0) ? items : DEFAULT_ITEMS;

  return (
    <section className="confidence-section">
      <div className="conf-inner">
        <h2 className="conf-heading">{heading || "Book With Confidence"}</h2>
        
        <div className="conf-grid">
          {displayItems.map((item, i) => {
            const imgUrl = item.image?.url 
              ? (item.image.url.startsWith('http') ? item.image.url : `${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}`}${item.image.url}`)
              : item.imagePath;

            return (
              <div key={i} className="conf-card">
                <div className="conf-image-wrap">
                  {imgUrl ? (
                    <Image src={imgUrl} alt={item.text} fill style={{ objectFit: 'cover' }} unoptimized />
                  ) : (
                    <div className="conf-placeholder" />
                  )}
                  {/* Dark gradient overlay for text readability */}
                  <div className="conf-overlay" />
                </div>
                <p className="conf-text">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="conf-triangle" aria-hidden="true" />
    </section>
  );
}
