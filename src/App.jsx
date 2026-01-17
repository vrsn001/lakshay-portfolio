import { useState, useEffect, useRef } from 'react'
import { StampCard, PostalBadge } from '@/components/ui/StampCard'
import { Analytics } from '@vercel/analytics/react'
import './index.css'

// Import photos
import profilePhoto from './assets/lakshay_photo.png'
import profilePhotoStamp from './assets/lakshay_photo_stamp.png'
import profilePhotoCandid from './assets/lakshay_photo_candid.png'

function App() {
  const [countersStarted, setCountersStarted] = useState(false)
  const statsRef = useRef(null)

  // Counter animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countersStarted) {
          setCountersStarted(true)
        }
      },
      { threshold: 0.5 }
    )
    if (statsRef.current) {
      observer.observe(statsRef.current)
    }
    return () => observer.disconnect()
  }, [countersStarted])



  return (
    <div className="app">
      <div className="content">
        {/* Navigation */}
        <nav className="nav">
          <div className="nav-container">
            <a href="#hero" className="nav-logo">
              <span className="nav-logo-hindi">लक्ष्य</span>
              LR
            </a>
            <div className="nav-menu">
              <a href="#about" className="nav-link">About</a>
              <a href="#experience" className="nav-link">Experience</a>
              <a href="#skills" className="nav-link">Skills</a>
              <a href="#education" className="nav-link">Education</a>
              <a href="#contact" className="nav-link">Contact</a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero section" id="hero">
          <div className="container">
            <div className="hero-content">
              {/* Photo Stamp */}
              <div className="hero-stamp-wrapper">
                <div className="hero-photo-styled">
                  <img src={profilePhotoCandid} alt="Lakshay Rohilla - Campaign Manager" />
                </div>
              </div>

              {/* Hero Text */}
              <div className="hero-text">
                <p className="hero-greeting">→ Hello, I'm</p>
                <div className="hero-name-wrapper">
                  <span className="hero-name-hindi">लक्षय रोहिल्ला</span>
                  <span className="hero-name">LAKSHAY ROHILLA</span>
                </div>
                <p className="hero-tagline">I make brands go viral ✦</p>
                <p className="hero-description">
                  <span className="highlight">2+ YEARS</span> turning films, OTT releases, products & marketing campaigns
                  into internet sensations with <span className="highlight">100M+ REACH</span> &
                  <span className="highlight"> 2M+ ENGAGEMENTS</span>.
                </p>
                <div className="hero-cta">
                  <a href="#contact" className="btn btn-primary">Let's Chat →</a>
                  <a href="#experience" className="btn btn-secondary">View My Work</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats" ref={statsRef}>
          <div className="stats-border-top"></div>
          <div className="stats-container">
            <StatItem target={100} suffix="M+" label="Reach" started={countersStarted} />
            <StatItem target={2} suffix="M+" label="Engagements" started={countersStarted} />
            <StatItem target={500} suffix="+" label="Creators Managed" started={countersStarted} />
            <StatItem target={2} suffix="+" label="Years Experience" started={countersStarted} />
          </div>
          <div className="stats-border-bottom"></div>
        </section>

        {/* About Section */}
        <section className="section" id="about">
          <div className="container">
            <h2 className="section-title">
              <span className="title-text">
                <span className="title-hindi">परिचय</span>
                ABOUT ME
              </span>
            </h2>
            <div className="about-content">
              <StampCard stampNumber="002" className="about-stamp">
                <div className="about-note">
                  "I help companies go viral on social media. If this portfolio doesn't convince you, let's chat!"
                </div>
                <div className="about-text">
                  <p>
                    I'm a <strong>Campaign Manager</strong> and <strong>Influencer Relations Manager</strong> who
                    specializes in crafting buzz-worthy campaigns that capture attention, spark engagement, and deliver measurable results.
                  </p>
                  <p>
                    My expertise spans across <span className="highlight">X (Twitter)</span>,
                    <span className="highlight"> LinkedIn</span>, <span className="highlight"> Instagram</span>, and
                    <span className="highlight"> YouTube</span>.
                  </p>
                </div>
              </StampCard>
              <StampCard stampNumber="003" className="about-stamp">
                <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '24px', letterSpacing: '3px', marginBottom: '20px' }}>
                  AREA OF EXPERTISE
                </h3>
                <div className="expertise-grid">
                  <div className="expertise-item">
                    <span className="expertise-icon">📈</span>
                    Viral Campaigns
                  </div>
                  <div className="expertise-item">
                    <span className="expertise-icon">🤝</span>
                    Creator Outreach
                  </div>
                  <div className="expertise-item">
                    <span className="expertise-icon">𝕏</span>
                    X (Twitter)
                  </div>
                  <div className="expertise-item">
                    <span className="expertise-icon">in</span>
                    LinkedIn
                  </div>
                  <div className="expertise-item">
                    <span className="expertise-icon">🎯</span>
                    Influencer Marketing
                  </div>
                  <div className="expertise-item">
                    <span className="expertise-icon">🚀</span>
                    Launch Strategy
                  </div>
                </div>
              </StampCard>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="section" id="experience">
          <div className="container">
            <h2 className="section-title">
              <span className="title-text">
                <span className="title-hindi">अनुभव</span>
                WORK EXPERIENCE
              </span>
            </h2>
            <div className="timeline">
              <TimelineItem
                number="01"
                date="Jul 2024 - Present"
                title="Campaign Manager"
                company="Creativefuel"
                companyUrl="https://creativefuel.io/"
                type="Full-time"
                location="📍 Indore, India"
                isCurrentJob={true}
                bullets={[
                  "Lead end-to-end product launches from brief to viral moment",
                  "Cut content approval time by 40% with streamlined workflows",
                  "Track reach, engagement, and retention metrics"
                ]}
              />
              <TimelineItem
                number="02"
                date="Oct 2023 - Oct 2024"
                title="Creator Outreach Coordinator"
                company="WLDD Private Limited"
                companyUrl="https://www.wldd.in/"
                type="Full-time"
                location="📍 Bengaluru, India"
                bullets={[
                  "Launched viral campaigns: 100M+ reach, 2M+ engagements",
                  "Built creator network of 500+ influencers",
                  "Spotted trends before they peaked"
                ]}
              />
              <TimelineItem
                number="03"
                date="Nov 2022 - Mar 2023"
                title="Digital Marketing Associate"
                company="Thrillophilia.com"
                companyUrl="https://www.thrillophilia.com/"
                type="Full-time"
                location="📍 Jaipur, India"
                bullets={[
                  "Drove organic traffic through SEO strategies",
                  "Conducted keyword research and link-building"
                ]}
              />
              <TimelineItem
                number="04"
                date="Jan 2020 - Nov 2022"
                title="Beta Tester"
                company="Avalon Labs"
                type="Contract"
                location="📍 Bengaluru, India"
                bullets={[
                  "Identified 200+ product issues pre-launch"
                ]}
              />
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="section" id="skills">
          <div className="container">
            <h2 className="section-title">
              <span className="title-text">
                <span className="title-hindi">कौशल</span>
                SKILLS & PLATFORMS
              </span>
            </h2>
            <div className="skills-grid">
              <StampCard stampNumber="004" className="skills-category">
                <h3>CORE SKILLS</h3>
                <div className="skill-items">
                  <SkillItem icon="📊" name="Performance Metrics" />
                  <SkillItem icon="🎯" name="Campaign Strategy" />
                  <SkillItem icon="🤝" name="Creator Relations" />
                  <SkillItem icon="📈" name="Growth Hacking" />
                  <SkillItem icon="✍️" name="Content Strategy" />
                  <SkillItem icon="🔍" name="Trend Analysis" />
                </div>
              </StampCard>
              <StampCard stampNumber="005" className="skills-category">
                <h3>PLATFORMS</h3>
                <div className="skill-items">
                  <SkillItem icon="𝕏" name="X / Twitter" />
                  <SkillItem icon="in" name="LinkedIn" />
                  <SkillItem icon="📸" name="Instagram" />
                  <SkillItem icon="▶️" name="YouTube" />
                  <SkillItem icon="🧵" name="Threads" />
                  <SkillItem icon="📊" name="Analytics" />
                </div>
              </StampCard>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="section" id="education">
          <div className="container">
            <h2 className="section-title">
              <span className="title-text">
                <span className="title-hindi">शिक्षा</span>
                EDUCATION
              </span>
            </h2>
            <div className="education-grid">
              <StampCard stampNumber="006" className="education-stamp">
                <div className="education-content">
                  <span className="edu-icon">🎓</span>
                  <div>
                    <div className="edu-year">2019 - 2023</div>
                    <div className="edu-degree">B.TECH, COMPUTER SCIENCE</div>
                    <div className="edu-school">Uttarakhand Technical University</div>
                    <div className="edu-location">Dehradun, India</div>
                  </div>
                </div>
              </StampCard>
              <StampCard stampNumber="007" className="education-stamp cert-stamp">
                <div className="cert-content">
                  <span>🏆</span>
                  <span>GOOGLE DIGITAL MARKETING</span>
                </div>
              </StampCard>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section contact-section" id="contact">
          <div className="container">
            <h2 className="section-title">
              <span className="title-text">
                <span className="title-hindi">संपर्क</span>
                LET'S CONNECT
              </span>
            </h2>
            <div className="contact-content">
              <StampCard stampNumber="008" showBarcode className="contact-stamp">
                <div className="contact-note">
                  "Let's create your next viral campaign. Drop me a line!"
                </div>
                <div className="contact-links">
                  <a href="mailto:laksh.rohilla@outlook.com" className="contact-link">
                    <span>📧</span>
                    <span>laksh.rohilla@outlook.com</span>
                  </a>
                  <a href="https://linkedin.com/in/lakshayrohilla" target="_blank" rel="noreferrer" className="contact-link">
                    <span>🔗</span>
                    <span>linkedin.com/in/lakshayrohilla</span>
                  </a>
                  <div className="contact-link">
                    <span>📍</span>
                    <span>Indore, India</span>
                  </div>
                </div>
                <a href="mailto:laksh.rohilla@outlook.com" className="btn btn-primary">
                  GET IN TOUCH →
                </a>
              </StampCard>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p className="footer-text">Stamped & Sealed by Lakshay Rohilla © 2026</p>
        </footer>
      </div>
      <Analytics />
    </div>
  )
}

// Counter Component
function StatItem({ target, suffix, label, started }) {
  const [count, setCount] = useState(0)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    if (!started) return

    let start = 0
    const duration = 2000
    const startTime = performance.now()

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOut * target))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCompleted(true)
      }
    }
    requestAnimationFrame(animate)
  }, [started, target])

  return (
    <div className={`stat-item ${completed ? 'completed' : ''}`}>
      <span className="stat-number">{count}</span>
      <span className="stat-suffix">{suffix}</span>
      <div className="stat-label">{label}</div>
    </div>
  )
}

// Timeline Item Component
function TimelineItem({ number, date, title, company, companyUrl, type, location, bullets, isCurrentJob }) {
  return (
    <div className="timeline-item">
      <div className="timeline-marker">{number}</div>
      <StampCard className="timeline-stamp">
        <div className="timeline-date">
          {isCurrentJob && <span className="status-indicator"></span>}
          {date}
        </div>
        <h3 className="timeline-title">{title}</h3>
        <div className="timeline-company">
          {companyUrl ? (
            <a href={companyUrl} target="_blank" rel="noopener noreferrer" className="company-name company-link">
              {company}
            </a>
          ) : (
            <span className="company-name">{company}</span>
          )}
          <span className="job-type">{type}</span>
        </div>
        <div className="timeline-location">{location}</div>
        <ul className="timeline-bullets">
          {bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
      </StampCard>
    </div>
  )
}

// Skill Item Component
function SkillItem({ icon, name }) {
  return (
    <div className="skill-item">
      <div className="skill-icon">{icon}</div>
      <div className="skill-name">{name}</div>
    </div>
  )
}

export default App
