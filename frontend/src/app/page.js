import Image from 'next/image';

async function getPageData() {
  try {
    const res = await fetch(
      'http://127.0.0.1:8000/api/v2/pages/?type=home.HomePage&fields=hero_title,hero_description,hero_fine_print,hero_image,gallery_images',
      { cache: 'no-store' }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.items?.[0] ?? null;
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const page = await getPageData();

  const heroTitle = page?.hero_title || "A private villa near Saint Tropez, designed for slow days and unforgettable nights";
  const heroDescription = page?.hero_description || "Four bedrooms, four bathrooms, heated pool, set within 3,000m² surrounded by vineyards and oak forests. Close to the energy of the Riviera, yet completely your own space to switch off.";
  const heroFinePrint = page?.hero_fine_print || "*Peak summer weeks are limited and typically book several months in advance starting at £7,000.";

  const heroImageUrl = page?.hero_image?.meta?.download_url
    ? `http://127.0.0.1:8000${page.hero_image.meta.download_url}`
    : null;

  const galleryImages = page?.gallery_images ?? [];

  return (
    <main className="landing-page">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-left">
            <h1 className="hero-title">{heroTitle}</h1>
          </div>

          <div className="hero-right">
            <p className="hero-description">{heroDescription}</p>

            <div className="hero-buttons">
              <a href="#" className="btn-primary">Check availability</a>
              <a href="#" className="btn-secondary">Explore the villa</a>
            </div>

            <p className="hero-fine-print">{heroFinePrint}</p>

            <div className="hero-image-wrapper">
              {heroImageUrl ? (
                <Image
                  src={heroImageUrl}
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

        <div className="hero-stats" style={{ backgroundColor: '#DEE3DE' }}>
          <div className="stat-item">
            <span className="stat-number">200</span>
            <span className="stat-desc">m² of calm, light filled living</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item"><span className="stat-number">3000</span>
            <span className="stat-desc">m2 of Private Grounds</span></div>
          <div className="stat-divider"></div>
          <div className="stat-item"><span className="stat-number">4</span>
            <span className="stat-desc">Bedrooms sleeps 8</span></div>
          <div className="stat-divider"></div>
          <div className="stat-item"><span className="stat-number">15</span>
            <span className="stat-desc">mins from Saint Tropez</span></div>
          <div className="stat-divider"></div>
          <div className="stat-item"><span className="stat-number">∞</span>
            <span className="stat-desc">Ways to Unwind</span></div>
        </div>

        {galleryImages.length > 0 && (
          <div className="gallery-section">
            <h2 className="gallery-heading">Gallery</h2>
            <div className="gallery-grid">
              {galleryImages.map((item, index) => {
                const imgUrl = item?.image?.url
                  ? (item.image.url.startsWith('http') ? item.image.url : `http://127.0.0.1:8000${item.image.url}`)
                  : null;
                return (
                  <div key={index} className="gallery-item">
                    {imgUrl && (
                      <Image
                        src={imgUrl}
                        alt={item.caption || `Gallery image ${index + 1}`}
                        width={600}
                        height={600}
                        style={{ width: '100%', height: 'auto', borderRadius: '12px', objectFit: 'cover', aspectRatio: '1/1' }}
                        unoptimized
                      />
                    )}
                    {item.caption && <p className="gallery-caption">{item.caption}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
