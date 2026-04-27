import Image from 'next/image';

export default function PlatformBookingSection({
  heading = "Prefer to book via a platform",
  description = "You can also find us on Airbnb or Booking.com if you prefer, while still enjoying the same experience and service.",
  btn1Text = "Airbnb",
  btn1Url = "https://www.airbnb.co.in/rooms/1660873017752952178?unique_share_id=e24ea51a-3da9-4928-9b82-be17f9762382&viralityEntryPoint=1&s=76&locale=en&_set_bev_on_new_domain=1776686101_EANTVhODIyM2Q4Mm&set_everest_cookie_on_new_domain=1776686101.EAODBmYzkxNjEyYTBlOD.fF-GiLsgGRsyqrSktX6oiinFCNIhTxQnpeBaE_qgMCI&source_impression_id=p3_1776686102_P3wsV2-vzo6aCh-u",
  btn2Text = "Booking.com",
  btn2Url = "https://www.booking.com/hotel/fr/villa-des-vignes-cogolin.en-gb.html?chal_t=1776686117545&force_referer=",
  image = null
}) {
  return (
    <section className="pbp-section">
      <div className="pbp-inner">
        <h2 className="pbp-heading">{heading}</h2>
        <p className="pbp-description">{description}</p>

        <div className="pbp-buttons">
          <a href={btn1Url || "https://www.airbnb.co.in/rooms/1660873017752952178?unique_share_id=e24ea51a-3da9-4928-9b82-be17f9762382&viralityEntryPoint=1&s=76&locale=en&_set_bev_on_new_domain=1776686101_EANTVhODIyM2Q4Mm&set_everest_cookie_on_new_domain=1776686101.EAODBmYzkxNjEyYTBlOD.fF-GiLsgGRsyqrSktX6oiinFCNIhTxQnpeBaE_qgMCI&source_impression_id=p3_1776686102_P3wsV2-vzo6aCh-u"} className="pbp-btn-primary" target="_blank" rel="noopener noreferrer">
            {btn1Text}
          </a>
          <a href={btn2Url || "https://www.booking.com/hotel/fr/villa-des-vignes-cogolin.en-gb.html?chal_t=1776686117545&force_referer="} className="pbp-btn-secondary" target="_blank" rel="noopener noreferrer">
            {btn2Text}
          </a>
        </div>

        <div className="pbp-image-wrapper">
          {image ? (
            <Image
              src={image}
              alt="Platform booking"
              fill
              className="pbp-image"
              unoptimized
            />
          ) : (
            <Image
              src="/images/bigpic.png"
              alt="Maison Tropez Sunset"
              fill
              className="pbp-image"
              unoptimized
            />
          )}
        </div>
      </div>
    </section>
  );
}
