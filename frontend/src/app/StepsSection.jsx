import Image from 'next/image';

const DEFAULT_STEPS = [
  {
    title: "Select your dates",
    description: "Visit the calendar to see when Maison Tropez is open. Whether you're planning a family escape or a cultural retreat, find the window that fits you.",
    imagePath: "http://127.0.0.1:8000/media/images/dates.jpg"
  },
  {
    title: "Share your vision",
    description: "Tell us about your group, your needs, any special requests. We'll confirm everything and prepare the villa for your arrival.",
    imagePath: "http://127.0.0.1:8000/media/images/vision.jpg"
  },
  {
    title: "Confirm details",
    description: "The villa is ready. The oak forest is quiet. The vineyards stretch toward the horizon. Your retreat begins now.",
    imagePath: "http://127.0.0.1:8000/media/images/details.jpg"
  },
  {
    title: "Arrive and settle",
    description: "Whether you seek a quiet family escape or wish to host a workshop among the oaks, the villa's schedule awaits your selection.",
    imagePath: "http://127.0.0.1:8000/media/images/settle.jpg"
  }
];

export default function StepsSection({ heading, steps }) {
  const displaySteps = (steps && steps.length > 0) ? steps : DEFAULT_STEPS;

  return (
    <section className="steps-section">
      <div className="steps-inner">
        <h2 className="steps-heading">{heading || "What Happens Next"}</h2>

        <div className="steps-grid">
          {displaySteps.map((step, index) => {
            const imgUrl = step.image?.url
              ? (step.image.url.startsWith('http') ? step.image.url : `http://127.0.0.1:8000${step.image.url}`)
              : step.imagePath; // fallback hardcoded if any

            return (
              <div key={index} className="step-item">
                <div className="step-image-wrap">
                  {imgUrl ? (
                    <Image
                      src={imgUrl}
                      alt={step.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      unoptimized
                    />
                  ) : (
                    <div className="step-placeholder" />
                  )}
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
