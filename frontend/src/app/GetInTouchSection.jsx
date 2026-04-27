export default function GetInTouchSection({
  label,
  heading,
  subheading,
  emailLabel,
  emailDesc,
  email,
  phoneLabel,
  phoneDesc,
  phone,
  locationLabel,
  location,
  mapUrl,
}) {
  return (
    <section className="git-section">
      <div className="git-inner">

        {/* Left: Contact Info */}
        <div className="git-left">
          <span className="git-label">{label || "Connect"}</span>
          <h2 className="git-heading">{heading || "Get in touch"}</h2>
          <p className="git-subheading">
            {subheading || "We respond to inquiries within one business day"}
          </p>

          <div className="git-contacts">

            {/* Email */}
            <div className="git-contact-item">
              <div className="git-contact-header">
                <svg className="git-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span className="git-contact-label">{emailLabel || "Email"}</span>
              </div>
              <p className="git-contact-desc">{emailDesc || "For reservations and questions"}</p>
              <a href={`mailto:${email || "natalie@dancesing.online"}`} className="git-contact-link">
                {email || "natalie@dancesing.online"}
              </a>
            </div>

            {/* Phone */}
            <div className="git-contact-item">
              <div className="git-contact-header">
                <svg className="git-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l1.28-1.29a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="git-contact-label">{phoneLabel || "Phone"}</span>
              </div>
              <p className="git-contact-desc">{phoneDesc || "Reach us during business hours"}</p>
              <a href={`tel:${(phone || "").replace(/\s/g, "")}`} className="git-contact-link">
                {phone || "+33 07712 862823"}
              </a>
            </div>

            {/* Location */}
            <div className="git-contact-item">
              <div className="git-contact-header">
                <svg className="git-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="git-contact-label">{locationLabel || "Location"}</span>
              </div>
              <p className="git-contact-desc">
                {location || "Cogolin, Provence-Alpes-Côte d'Azur, France"}
              </p>
              {mapUrl && (
                <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="git-map-link">
                  View on map <span aria-hidden="true">›</span>
                </a>
              )}
              {!mapUrl && (
                <span className="git-map-link">
                  View on map <span aria-hidden="true">›</span>
                </span>
              )}
            </div>

          </div>
        </div>

        {/* Right: Map Placeholder */}
        <div className="git-right">
          <div className="git-map-placeholder">
            {/* Map will be embedded here later */}
          </div>
        </div>

      </div>
    </section>
  );
}
