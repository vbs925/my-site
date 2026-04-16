import Image from 'next/image';

async function getPageData() {
  try {
    const res = await fetch(
      'http://127.0.0.1:8000/api/v2/pages/?type=home.HomePage&fields=hero_title,hero_description,hero_fine_print,hero_image,gallery_images,ps_label,ps_heading,ps_description,ps_image_left,ps_image_right,ra_label,ra_heading,ra_description,ra_feature1_title,ra_feature1_desc,ra_feature2_title,ra_feature2_desc,ra_image,ra_button_text,rg_label,rg_heading,rg_description,rg_button1_text,rg_button2_text,rg_image,rg_image_caption_title,rg_image_caption_desc',
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
  const heroTitle = 
    page?.hero_title || 
    "A private villa near Saint Tropez, designed for slow days and unforgettable nights";

  const heroDescription = 
    page?.hero_description || 
    "Four bedrooms, four bathrooms, heated pool, set within 3,000m² surrounded by vineyards " +
    "and oak forests. Close to the energy of the Riviera, yet completely your own space to switch off.";

  const heroFinePrint = 
    page?.hero_fine_print || 
    "*Peak summer weeks are limited and typically book several months in advance starting at £7,000.";

  const heroImageUrl = page?.hero_image?.meta?.download_url
    ? `http://127.0.0.1:8000${page.hero_image.meta.download_url}`
    : null;

  const galleryImages = page?.gallery_images ?? [];

  // Private Setting section — CMS data with fallbacks
  const psLabel       = page?.ps_label       || 'Private Setting';
  const psHeading     = page?.ps_heading     || 'A private setting, with the Riviera within easy reach';
  const psDescription = page?.ps_description || 'Hidden among ancient oaks, yet just minutes from Saint Tropez and Pampelonne Beach. Begin your day in complete stillness, and lit with sunset on the terrace or dinner and dancing by the sea along the Riviera coastline.';

  const psImageLeftUrl  = page?.ps_image_left?.url
    ? (page.ps_image_left.url.startsWith('http') ? page.ps_image_left.url : `http://127.0.0.1:8000${page.ps_image_left.url}`)
    : '/images/pic6.png';

  const psImageRightUrl = page?.ps_image_right?.url
    ? (page.ps_image_right.url.startsWith('http') ? page.ps_image_right.url : `http://127.0.0.1:8000${page.ps_image_right.url}`)
    : '/images/pic1.png';

  // Rooms & Amenities section — CMS data with fallbacks
  const raLabel       = page?.ra_label       || 'Rooms & Amenities';
  const raHeading     = page?.ra_heading     || 'Space to breathe, designed for real living';
  const raDescription = page?.ra_description || 'High ceilings, natural light, and generous spaces that invite you to slow down. Cook together, eat outside, open the doors and let the day unfold naturally.';
  const raFeature1Title = page?.ra_feature1_title || 'Living spaces';
  const raFeature1Desc  = page?.ra_feature1_desc  || 'Open, airy, and quietly luxurious. Space to gather, connect, and relax without ever feeling crowded.';
  const raFeature2Title = page?.ra_feature2_title || 'Bedrooms';
  const raFeature2Desc  = page?.ra_feature2_desc  || 'Calm, private, and beautifully simple. Designed for deep rest and slow mornings.';
  const raButtonText    = page?.ra_button_text    || 'Discover';
  const raImageUrl = page?.ra_image?.url
    ? (page.ra_image.url.startsWith('http') ? page.ra_image.url : `http://127.0.0.1:8000${page.ra_image.url}`)
    : '/images/living1.avif';

  // Retreats & Gatherings section — CMS data with fallbacks
  const rgLabel            = page?.rg_label             || 'Retreats & Gatherings';
  const rgHeading          = page?.rg_heading           || 'Host your vision in a setting made for it';
  const rgDescription      = page?.rg_description       || 'Maison Tropez welcomes more than travelers. Yoga instructors bring their students here to practice among the oaks. Artists and writers organize workshops in the quiet light. Families gather for retreats that matter. The villa\'s generous spaces and peaceful setting become the canvas for whatever you wish to create.';
  const rgButton1Text      = page?.rg_button1_text      || 'Inquire';
  const rgButton2Text      = page?.rg_button2_text      || 'Next';
  const rgImageCaptionTitle = page?.rg_image_caption_title || 'Yoga and wellness retreats';
  const rgImageCaptionDesc  = page?.rg_image_caption_desc  || 'The forest and silence create the perfect foundation for practice and restoration.';
  const rgImageUrl = page?.rg_image?.url
    ? (page.rg_image.url.startsWith('http') ? page.rg_image.url : `http://127.0.0.1:8000${page.rg_image.url}`)
    : '/images/pplpic.jpg';

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

      </section>

      <div className="stats-wrapper" style={{ backgroundColor: '#DEE3DE', width: '100%' }}>
        <div className="hero-stats" style={{ maxWidth: '1400px', margin: '0 auto', borderTop: 'none' }}>
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

      {/* Private Setting Section */}
      <section className="private-setting-section">
        <div className="private-setting-inner">

          <div className="ps-left">
            <span className="ps-label">{psLabel}</span>
            <h2 className="ps-heading">{psHeading}</h2>
            <div className="ps-image-left">
              <Image
                src={psImageLeftUrl}
                alt="Private setting left image"
                width={800}
                height={600}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                unoptimized
              />
            </div>
          </div>

          <div className="ps-right">
            <div className="ps-image-right">
              <Image
                src={psImageRightUrl}
                alt="Private setting right image"
                width={800}
                height={600}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                unoptimized
              />
            </div>
            <p className="ps-description">{psDescription}</p>
            <a href="#" className="ps-discover-btn">Discover</a>
          </div>

        </div>
      </section>

      {/* Rooms & Amenities Section */}
      <section className="ra-section">
        <div className="ra-inner">

          {/* Left: image */}
          <div className="ra-image-col">
            {raImageUrl ? (
              <Image
                src={raImageUrl}
                alt="Rooms and amenities image"
                width={800}
                height={600}
                className="ra-img"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                unoptimized
              />
            ) : (
              <div className="ra-img-placeholder" />
            )}
          </div>

          {/* Right: content */}
          <div className="ra-content-col">
            <span className="ra-label">{raLabel}</span>
            <h2 className="ra-heading">{raHeading}</h2>
            <p className="ra-description">{raDescription}</p>

            <div className="ra-features">
              <div className="ra-feature">
                <h3 className="ra-feature-title">{raFeature1Title}</h3>
                <p className="ra-feature-desc">{raFeature1Desc}</p>
              </div>
              <div className="ra-feature">
                <h3 className="ra-feature-title">{raFeature2Title}</h3>
                <p className="ra-feature-desc">{raFeature2Desc}</p>
              </div>
            </div>

            <a href="#" className="ra-discover-btn">{raButtonText}</a>
          </div>

        </div>
      </section>

      {/* Retreats & Gatherings Section */}
      <section className="rg-section">
        <div className="rg-inner">

          {/* Left: label + heading + description + buttons */}
          <div className="rg-content-col">
            <span className="rg-label">{rgLabel}</span>
            <h2 className="rg-heading">{rgHeading}</h2>
            <p className="rg-description">{rgDescription}</p>
            <div className="rg-buttons">
              <a href="#" className="rg-btn-primary">{rgButton1Text}</a>
              <a href="#" className="rg-btn-text">{rgButton2Text} &rsaquo;</a>
            </div>
          </div>

          {/* Right: image + caption */}
          <div className="rg-image-col">
            <div className="rg-image-wrapper">
              <Image
                src={rgImageUrl}
                alt="Retreats and gatherings image"
                width={800}
                height={600}
                className="rg-img"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                unoptimized
              />
            </div>
            <div className="rg-caption">
              <h3 className="rg-caption-title">{rgImageCaptionTitle}</h3>
              <p className="rg-caption-desc">{rgImageCaptionDesc}</p>
            </div>
          </div>

        </div>
      </section>

    </main>

  );
}
