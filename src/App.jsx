import React, { useState, useEffect } from 'react';
import './index.css';

// Door Scene Component
function DoorScene({ onOpen }) {
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  const handleInteraction = () => {
    const now = Date.now();
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
      // On mobile, single tap opens the door
      onOpen();
    } else {
      // On desktop, use double-click
      if (now - lastClickTime < 300) {
        setClickCount(clickCount + 1);
        if (clickCount >= 1) {
          onOpen();
          setClickCount(0);
        }
      } else {
        setClickCount(1);
      }
      setLastClickTime(now);
    }
  };

  return (
    <div className="door-scene" onClick={handleInteraction} onDoubleClick={handleInteraction}>
      <div className="door-frame" role="button" aria-label="Tap to open the decorated door">
        <div className="door-panel door-left">
          <div className="door-decoration">
            <span className="deity-icon">🌸</span>
            <p>Tribhuvana<br />(Teja)</p>
          </div>
        </div>
        <div className="door-panel door-right">
          <div className="door-decoration">
            <span className="deity-icon">👰</span>
            <p>Bishanth</p>
          </div>
        </div>
        <div className="door-handle">Tap to open</div>
      </div>
    </div>
  );
}

// Countdown Component
function Countdown() {
  const [countdown, setCountdown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const updateCountdown = () => {
      const targetDate = new Date('2026-05-09T09:40:00');
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        setCountdown({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
      const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
      const minutes = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, '0');
      const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

      setCountdown({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown-card">
      <h3>Countdown</h3>
      <div className="countdown-grid">
        <div>
          <span className="count-value">{countdown.days}</span>
          <span>Days</span>
        </div>
        <div>
          <span className="count-value">{countdown.hours}</span>
          <span>Hours</span>
        </div>
        <div>
          <span className="count-value">{countdown.minutes}</span>
          <span>Minutes</span>
        </div>
        <div>
          <span className="count-value">{countdown.seconds}</span>
          <span>Seconds</span>
        </div>
      </div>
    </div>
  );
}

// Hero Component
function Hero() {
  return (
    <header className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="hero-label">You are invited</p>
        <h1>Tribhuvana & Bishanth</h1>
        <p className="hero-subtitle">Join us for a celebration of love and togetherness.</p>
        <div className="hero-details">
          <span>May 09, 2026</span>
          <span>SVL Arena</span>
        </div>
      </div>
    </header>
  );
}

// Intro Section Component
function IntroSection() {
  return (
    <section className="section intro">
      <div>
        <h2>Our story</h2>
        <p>Sample moments appear below as photo placeholders. Replace them later with your own wedding memories.</p>
      </div>
      <Countdown />
    </section>
  );
}

// Details Section Component
function DetailsSection() {
  return (
    <section className="section details">
      <h2>Event details</h2>
      <div className="card-grid">
        <article className="info-card">
          <h3>Ceremony</h3>
          <p>May 09, 2026 at 9:40 AM</p>
          <p>SVL Arena</p>
          <a href="https://maps.app.goo.gl/Rvu1adbTjan7JmZi9" target="_blank" rel="noopener noreferrer">
            View ceremony location
          </a>
        </article>
        <article className="info-card">
          <h3>Reception</h3>
          <p>May 10, 2026 at 2:00 PM</p>
          <p>Reception venue</p>
          <a href="https://maps.app.goo.gl/AoeUW49b75vCQsJV6" target="_blank" rel="noopener noreferrer">
            View reception location
          </a>
        </article>
        <article className="info-card">
          <h3>Dress code</h3>
          <p>Elegant ethnic occasion wear with comfortable shoes for celebrations.</p>
        </article>
      </div>
    </section>
  );
}

// Bride and Groom Section Component
function BrideGroomSection() {
  const [photoVisible, setPhotoVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector('.bride-groom');
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          setPhotoVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="section bride-groom">
      <h2>Our Love Story</h2>
      <div className="couple-grid">
        <article className={`couple-card ${photoVisible ? 'photo-visible' : ''}`}>
          <div
            className="couple-photo"
            style={{ backgroundImage: "url('/Teja.jpeg')" }}
          />
          <h3>Tribhuvana</h3>
          <p className="nickname">Teja</p>
          <p className="description">Bride - A woman of grace, elegance, and warmth.</p>
        </article>
        <article className={`couple-card ${photoVisible ? 'photo-visible' : ''}`}>
          <div
            className="couple-photo"
            style={{ backgroundImage: "url('/Bishanth.jpeg')" }}
          />
          <h3>Bishanth</h3>
          <p className="nickname">Groom</p>
          <p className="description">Groom - A man of strength, kindness, and devotion.</p>
        </article>
      </div>
    </section>
  );
}

// Photo Stack Section Component
function PhotoStackSection() {
  return (
    <section className="section photo-stack">
      <h2>Photo journey</h2>
      <div className="stack-container">
        <article
          className="stack-card"
          style={{ backgroundImage: "url('https://placehold.co/900x680?text=Our+Story+4')" }}
        >
          <span>Memories unfolding</span>
        </article>
        <article
          className="stack-card"
          style={{ backgroundImage: "url('https://placehold.co/900x680?text=Our+Story+5')" }}
        >
          <span>Closer together</span>
        </article>
        <article
          className="stack-card"
          style={{ backgroundImage: "url('https://placehold.co/900x680?text=Our+Story+6')" }}
        >
          <span>Forever begins</span>
        </article>
      </div>
    </section>
  );
}

// RSVP Section Component
function RSVPSection() {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name').trim();
    const attending = formData.get('attending');

    if (!name || !attending) {
      setFeedback('Please fill in your name and attendance choice.');
      return;
    }

    setFeedback(`Thank you, ${name}! Your RSVP is recorded as "${attending}."`);
    e.target.reset();
  };

  return (
    <section className="section rsvp">
      <div className="rsvp-text">
        <h2>RSVP</h2>
        <p>Please let us know if you can join by sending us a message below.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" name="name" placeholder="Jane Doe" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="jane@example.com" required />

        <label htmlFor="attending">Will you attend?</label>
        <select id="attending" name="attending" required>
          <option value="">Select an option</option>
          <option value="yes">Yes, can't wait</option>
          <option value="maybe">Maybe</option>
          <option value="no">Sadly no</option>
        </select>

        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="4" placeholder="Your note for us..." />

        <button type="submit">Send RSVP</button>
        <p className="form-feedback">{feedback}</p>
      </form>
    </section>
  );
}

// Main App Component
function App() {
  const [doorOpened, setDoorOpened] = useState(false);

  const handleDoorOpen = () => {
    setDoorOpened(true);
  };

  return (
    <div className="app">
      {!doorOpened && <DoorScene onOpen={handleDoorOpen} />}
      <div className={`page-shell ${doorOpened ? 'visible' : ''}`}>
        <Hero />
        <IntroSection />
        <DetailsSection />
        <BrideGroomSection />
        <PhotoStackSection />
        <RSVPSection />
      </div>
    </div>
  );
}

export default App;
