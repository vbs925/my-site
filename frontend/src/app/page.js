import Image from 'next/image';
import HomeComfortsGallery from './HomeComfortsGallery';
import ReviewsSection from './ReviewsSection';
import BookingSection from './BookingSection';
import StepsSection from './StepsSection';
import WhyBookDirectly from './WhyBookDirectly';
import ConfidenceSection from './ConfidenceSection';

async function getPageData() {
  try {
    const res = await fetch(
      'http://127.0.0.1:8000/api/v2/pages/?type=home.HomePage&fields=hero_title,hero_description,hero_fine_print,hero_image,gallery_images,ps_label,ps_heading,ps_description,ps_image_left,ps_image_right,ra_label,ra_heading,ra_description,ra_feature1_title,ra_feature1_desc,ra_feature2_title,ra_feature2_desc,ra_image,ra_button_text,rg_label,rg_heading,rg_description,rg_button1_text,rg_button2_text,rg_image,rg_image_caption_title,rg_image_caption_desc,hc_label,hc_top_heading,hc_top_description,hc_top_button,hc_bottom_heading,hc_bottom_description,home_comforts_images,olp_label,olp_heading,olp_description_1,olp_description_2,olp_button_text,olp_outdoor_image,olp_outdoor_title,olp_outdoor_desc,olp_pool_image,olp_pool_title,olp_pool_desc,sur_label,sur_heading,sur_description,sur_button_text,sur_image_left,sur_image_right,rev_heading,rev_description,reviews,book_label,book_heading,book_description,whn_heading,whn_steps,why_heading,why_image,why_btn1_text,why_btn2_text,why_benefits,bwc_heading,bwc_items',
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
  const psLabel = page?.ps_label || 'Private Setting';
  const psHeading = page?.ps_heading || 'A private setting, with the Riviera within easy reach';
  const psDescription = page?.ps_description || 'Hidden among ancient oaks, yet just minutes from Saint Tropez and Pampelonne Beach. Begin your day in complete stillness, and lit with sunset on the terrace or dinner and dancing by the sea along the Riviera coastline.';

  const psImageLeftUrl = page?.ps_image_left?.url
    ? (page.ps_image_left.url.startsWith('http') ? page.ps_image_left.url : `http://127.0.0.1:8000${page.ps_image_left.url}`)
    : '/images/pic6.png';

  const psImageRightUrl = page?.ps_image_right?.url
    ? (page.ps_image_right.url.startsWith('http') ? page.ps_image_right.url : `http://127.0.0.1:8000${page.ps_image_right.url}`)
    : '/images/pic1.png';

  // Rooms & Amenities section — CMS data with fallbacks
  const raLabel = page?.ra_label || 'Rooms & Amenities';
  const raHeading = page?.ra_heading || 'Space to breathe, designed for real living';
  const raDescription = page?.ra_description || 'High ceilings, natural light, and generous spaces that invite you to slow down. Cook together, eat outside, open the doors and let the day unfold naturally.';
  const raFeature1Title = page?.ra_feature1_title || 'Living spaces';
  const raFeature1Desc = page?.ra_feature1_desc || 'Open, airy, and quietly luxurious. Space to gather, connect, and relax without ever feeling crowded.';
  const raFeature2Title = page?.ra_feature2_title || 'Bedrooms';
  const raFeature2Desc = page?.ra_feature2_desc || 'Calm, private, and beautifully simple. Designed for deep rest and slow mornings.';
  const raButtonText = page?.ra_button_text || 'Discover';
  const raImageUrl = page?.ra_image?.url
    ? (page.ra_image.url.startsWith('http') ? page.ra_image.url : `http://127.0.0.1:8000${page.ra_image.url}`)
    : '/images/living1.avif';

  // Retreats & Gatherings section — CMS data with fallbacks
  const rgLabel = page?.rg_label || 'Retreats & Gatherings';
  const rgHeading = page?.rg_heading || 'Host your vision in a setting made for it';
  const rgDescription = page?.rg_description || 'Maison Tropez welcomes more than travelers. Yoga instructors bring their students here to practice among the oaks. Artists and writers organize workshops in the quiet light. Families gather for retreats that matter. The villa\'s generous spaces and peaceful setting become the canvas for whatever you wish to create.';
  const rgButton1Text = page?.rg_button1_text || 'Inquire';
  const rgButton2Text = page?.rg_button2_text || 'Next';
  const rgImageCaptionTitle = page?.rg_image_caption_title || 'Yoga and wellness retreats';
  const rgImageCaptionDesc = page?.rg_image_caption_desc || 'The forest and silence create the perfect foundation for practice and restoration.';
  const rgImageUrl = page?.rg_image?.url
    ? (page.rg_image.url.startsWith('http') ? page.rg_image.url : `http://127.0.0.1:8000${page.rg_image.url}`)
    : '/images/pplpic.jpg';

  // Home Comforts section — CMS data with fallbacks
  const hcLabel = page?.hc_label || 'Home Comforts';
  const hcTopHeading = page?.hc_top_heading || 'Everything you need,\nwithout compromise';
  const hcTopDescription = page?.hc_top_description || 'A fully equipped kitchen, cool interiors in summer, warmth in winter, and spaces that feel like home from the moment you arrive.';
  const hcTopButton = page?.hc_top_button || 'Learn more';
  const hcBottomHeading = page?.hc_bottom_heading || 'Thoughtfully designed\nso you can switch off';
  const hcBottomDescription = page?.hc_bottom_description || 'Fast wifi when you need it, quiet when you don\'t. Air conditioning, fireplace, outdoor dining, and every detail in place so your stay feels effortless.';

  // Format the images array
  const hcImages = (page?.home_comforts_images && page.home_comforts_images.length > 0)
    ? page.home_comforts_images.map(imgData => {
      const url = imgData.image?.url;
      return url ? (url.startsWith('http') ? url : `http://127.0.0.1:8000${url}`) : null;
    }).filter(Boolean)
    : null;

  // Outdoor Living & Pool section — CMS data with fallbacks
  const olpLabel = page?.olp_label || 'Outdoor Living & Pool';
  const olpHeading = page?.olp_heading || 'What the villa offers to\nmake your stay seamless';
  const olpDesc1 = page?.olp_description_1 || 'Outdoor living here is effortless and inviting with long lunches under the shade drift into evenings that stretch gently into the night, offering space to gather with others or simply sit back and breathe.';
  const olpDesc2 = page?.olp_description_2 || 'Just steps away, the pool becomes a natural extension of this rhythm, a place to cool off, unwind, or spend entire days lounging by the water, where some of the best memories quietly take shape.';
  const olpButton = page?.olp_button_text || 'Learn more';
  const olpOutdoorTitle = page?.olp_outdoor_title || 'Outdoor living';
  const olpOutdoorDesc = page?.olp_outdoor_desc || 'Long lunches under shade, evenings that stretch into night. Space to gather, or simply sit and breathe.';
  const olpPoolTitle = page?.olp_pool_title || 'Pool';
  const olpPoolDesc = page?.olp_pool_desc || 'Cool off, unwind, or spend the whole day poolside. This is where most memories are made.';

  const olpOutdoorImage = page?.olp_outdoor_image?.url
    ? (page.olp_outdoor_image.url.startsWith('http') ? page.olp_outdoor_image.url : `http://127.0.0.1:8000${page.olp_outdoor_image.url}`)
    : '/images/olpic.png';

  const olpPoolImage = page?.olp_pool_image?.url
    ? (page.olp_pool_image.url.startsWith('http') ? page.olp_pool_image.url : `http://127.0.0.1:8000${page.olp_pool_image.url}`)
    : '/images/poolpic.png';

  // Surroundings section — CMS data with fallbacks
  const surLabel = page?.sur_label || 'Surroundings';
  const surHeading = page?.sur_heading || 'The best of the South of France,\nwith complete peace and privacy';
  const surDescription = page?.sur_description || 'Surrounded by vineyards and forest, yet minutes from Saint Tropez. Close enough for beach clubs and restaurants, far enough for complete peace.';
  const surButton = page?.sur_button_text || 'Explore';

  const surImageLeftUrl = page?.sur_image_left?.url
    ? (page.sur_image_left.url.startsWith('http') ? page.sur_image_left.url : `http://127.0.0.1:8000${page.sur_image_left.url}`)
    : '/images/outpic.png';

  const surImageRightUrl = page?.sur_image_right?.url
    ? (page.sur_image_right.url.startsWith('http') ? page.sur_image_right.url : `http://127.0.0.1:8000${page.sur_image_right.url}`)
    : '/images/pic.png';

  // Reviews section — CMS data with fallbacks
  const revHeading = page?.rev_heading || 'A place guests return to';
  const revDescription = page?.rev_description || 'Guests return year after year for the calm, the setting, and the feeling of complete escape';
  const cmsReviews = (page?.reviews && page.reviews.length > 0)
    ? page.reviews.map(r => ({
        stars: r.stars,
        text: r.text,
        author_name: r.author_name,
        author_title: r.author_title,
        img: r.author_image?.url
          ? (r.author_image.url.startsWith('http') ? r.author_image.url : `http://127.0.0.1:8000${r.author_image.url}`)
          : null,
      }))
    : null;

  // Planning & Booking section
  const bookLabel = page?.book_label;
  const bookHeading = page?.book_heading;
  const bookDescription = page?.book_description;

  // What Happens Next section
  const whnHeading = page?.whn_heading;
  const whnSteps = page?.whn_steps || [];

  // Why Book Directly section
  const whyHeading = page?.why_heading;
  const whyImage = page?.why_image;
  const whyBtn1 = page?.why_btn1_text;
  const whyBtn2 = page?.why_btn2_text;
  const whyBenefits = page?.why_benefits || [];

  // Book With Confidence section
  const bwcHeading = page?.bwc_heading;
  const bwcItems = page?.bwc_items || [];

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

      {/* Home Comforts Section */}
      <section className="hc-section">

        {/* Block 1: text left + green triangle top-right */}
        <div className="hc-top-block">
          <div className="hc-top-inner">
            <div className="hc-text-col">
              <span className="hc-label">{hcLabel}</span>
              <h2 className="hc-heading">
                {hcTopHeading.split('\n').map((line, i) => <span key={i}>{line}{i < hcTopHeading.split('\n').length - 1 && <br />}</span>)}
              </h2>
              <p className="hc-description">{hcTopDescription}</p>
              <a href="#" className="hc-learn-btn">{hcTopButton}</a>
            </div>
            <div className="hc-triangle-top-right" aria-hidden="true" />
          </div>
        </div>

        {/* Photo grid: 5 + 5 scrolling rows */}
        <HomeComfortsGallery cmsImages={hcImages} />

        {/* Block 2: green triangle bottom-left + text right */}
        <div className="hc-bottom-block">
          <div className="hc-bottom-inner">
            <div className="hc-triangle-bottom-left" aria-hidden="true" />
            <div className="hc-bottom-text">
              <h2 className="hc-bottom-heading">
                {hcBottomHeading.split('\n').map((line, i) => <span key={i}>{line}{i < hcBottomHeading.split('\n').length - 1 && <br />}</span>)}
              </h2>
              <p className="hc-bottom-description">{hcBottomDescription}</p>
            </div>
          </div>
        </div>

      </section>

      {/* Outdoor Living & Pool Section */}
      <section className="olp-section">
        <div className="olp-grid">

          {/* Left Column */}
          <div className="olp-col olp-col-left">
            <div className="olp-text-block">
              <span className="olp-label">{olpLabel}</span>
              <h2 className="olp-heading">
                {olpHeading.split('\n').map((line, i) => <span key={i}>{line}{i < olpHeading.split('\n').length - 1 && <br />}</span>)}
              </h2>
              <div className="olp-description-wrapper">
                <p className="olp-description">{olpDesc1}</p>
                <p className="olp-description">{olpDesc2}</p>
              </div>
              <a href="#" className="olp-btn btn-primary-scd">{olpButton}</a>
            </div>

            <div className="olp-card">
              <div className="olp-image-wrapper">
                <Image src={olpOutdoorImage} alt={olpOutdoorTitle} fill unoptimized style={{ objectFit: 'cover' }} />
              </div>
              <div className="olp-card-text">
                <h3 className="olp-card-title">{olpOutdoorTitle}</h3>
                <p className="olp-card-desc">{olpOutdoorDesc}</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="olp-col olp-col-right">
            <div className="olp-card pool-card">
              <div className="olp-image-wrapper pool-image">
                <Image src={olpPoolImage} alt={olpPoolTitle} fill unoptimized style={{ objectFit: 'cover' }} />
              </div>
              <div className="olp-card-text">
                <h3 className="olp-card-title">{olpPoolTitle}</h3>
                <p className="olp-card-desc">{olpPoolDesc}</p>
              </div>
            </div>

            <div className="olp-decorative-triangle" aria-hidden="true" />
          </div>

        </div>
      </section>

      {/* Surroundings Section */}
      <section className="sur-section">
        <div className="sur-inner">

          {/* Images Layout (Left Column) */}
          <div className="sur-images-col">
            <div className="sur-inner-col sur-inner-left">
              <div className="sur-image-left-wrapper">
                <Image src={surImageLeftUrl} alt="Surroundings" fill unoptimized style={{ objectFit: 'cover' }} />
              </div>
              <div className="sur-triangle" aria-hidden="true" />
            </div>

            <div className="sur-inner-col sur-inner-right">
              <div className="sur-image-right-wrapper">
                <Image src={surImageRightUrl} alt="Surroundings Landscape" fill unoptimized style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>

          {/* Text Content (Right Column) */}
          <div className="sur-content-col">
            <span className="sur-label">{surLabel}</span>
            <h2 className="sur-heading">
              {surHeading.split('\n').map((line, i) => <span key={i}>{line}{i < surHeading.split('\n').length - 1 && <br />}</span>)}
            </h2>
            <p className="sur-description">{surDescription}</p>
            <a href="#" className="sur-btn-outline">{surButton}</a>
          </div>

        </div>
      </section>

      <ReviewsSection
        heading={revHeading}
        description={revDescription}
        cmsReviews={cmsReviews}
      />

      <div className="booking-flow-wrapper">
        <BookingSection 
          label={bookLabel}
          heading={bookHeading}
          description={bookDescription}
        />

        <StepsSection 
          heading={whnHeading}
          steps={whnSteps}
        />

        <WhyBookDirectly 
          heading={whyHeading}
          image={whyImage}
          btn1Text={whyBtn1}
          btn2Text={whyBtn2}
          benefits={whyBenefits}
        />

        <ConfidenceSection 
          heading={bwcHeading}
          items={bwcItems}
        />
      </div>

    </main>

  );
}
