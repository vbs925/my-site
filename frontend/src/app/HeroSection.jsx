import Image from 'next/image';

export default function HeroSection({ title, description, finePrint, imageUrl }) {
  return (
    <section className="hero-section">
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

          <div className="hero-image-wrapper">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Villa hero image"
                className="hero-img"
                width={800}
                height={800}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                priority
                unoptimized
              />
            ) : (
              <div style={{ width: '100%', height: '100%', background: '#f5f5f5', borderRadius: '12px' }} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
