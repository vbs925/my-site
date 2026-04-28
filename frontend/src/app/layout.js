import './globals.css';
import Image from 'next/image';

import Footer from './Footer';

export const metadata = {
  title: 'Maison Tropez',
  description: 'A private villa near Saint Tropez',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Abyssinica+SIL&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Lora:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning={true}>
        <header className="main-header">
          <div className="header-container">
            <div className="logo">
              <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Image
                  src="/images/logog.png"
                  alt="Maison Tropez Logo"
                  width={36}
                  height={36}
                  style={{ objectFit: 'contain' }}
                  priority
                />
                Maison Tropez
              </a>
            </div>
            <nav className="main-nav">
              <ul>
                <li><a href="#">The Villa</a></li>
                <li><a href="#">Gallery</a></li>
                <li><a href="#">Location</a></li>
                <li><a href="#" className="btn-primary-scd">Book Now</a></li>
              </ul>
            </nav>
          </div>
        </header>
        {children}
        <Footer />
      </body>
    </html>
  );
}
