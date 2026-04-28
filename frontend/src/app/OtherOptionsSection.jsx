import Image from 'next/image';

export default function OtherOptionsSection({
  label,
  heading,
  description,
  buttonText,
  buttonUrl,
  image
}) {
  const imgUrl = image?.url
    ? (image.url.startsWith('http') ? image.url : `${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}`}${image.url}`)
    : "/images/scoot.png"; // Fallback image

  return (
    <section className="oor-section">
      <div className="oor-inner">

        {/* Left: Image */}
        <div className="oor-image-col">
          <div className="oor-image-wrap">
            {imgUrl ? (
              <Image
                src={imgUrl}
                alt={heading || "Scottish retreat"}
                fill
                style={{ objectFit: 'cover' }}
                unoptimized
              />
            ) : (
              <div className="oor-placeholder" />
            )}
          </div>
        </div>

        {/* Right: Content */}
        <div className="oor-content-col">
          <span className="oor-label">{label || "Other Options"}</span>
          <h2 className="oor-heading">{heading || "Discover our Scottish retreat"}</h2>
          <p className="oor-description">{description || "We also welcome guests to our villa in the Scottish Highlands."}</p>
          <a href={buttonUrl || "#"} className="oor-btn">{buttonText || "Explore"}</a>
        </div>

      </div>
    </section>
  );
}
