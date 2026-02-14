import React, { useState, useEffect, useRef } from 'react';
import { getCalApi } from "@calcom/embed-react";
import GradientText from '../components/GradientText';
import CountUp from '../components/CountUp';
import SplitText from '../components/SplitText';
import Magnetic from '../components/Magnetic';
import ParallaxElement from '../components/ParallaxElement';
import TiltCard from '../components/TiltCard';
import TypewriterText from '../components/TypewriterText';
import { StampCard } from '@/components/ui/StampCard';
import { FaXTwitter, FaDiscord, FaGithub, FaThreads, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa6';
import {
    TrendingUp,
    Handshake,
    Target,
    Rocket,
    MapPin,
    BarChart3,
    PenLine,
    Search,
    GraduationCap,
    Trophy,
    Mail,
    Link,
    Download
} from 'lucide-react';
import CampaignLogoLoop from '../components/CampaignLogoLoop';
import WavyDivider from '../components/WavyDivider';
import MovieQuotes from '../components/MovieQuotes';
import profilePhotoCandid from '../assets/lakshay_photo_stamp_v2.png';

// Stat Component with spring-based counting + gradient shimmer
function StatItem({ target, suffix, label, started }) {
    return (
        <div className="stat-item">
            <div className="stat-number-wrapper">
                <GradientText
                    colors={['#F5F0E1', '#C49A3C', '#F5F0E1']} // cream → gold → cream
                    animationSpeed={3}
                    className="stat-number"
                >
                    <CountUp
                        to={target}
                        from={0}
                        duration={2}
                        startWhen={started}
                    />
                </GradientText>
                <span className="stat-suffix">{suffix}</span>
            </div>
            <div className="stat-label">{label}</div>
        </div>
    )
}

// Timeline Item Component
function TimelineItem({ number, date, title, company, companyUrl, type, location, bullets, isCurrentJob, showBrands, brandsImage, postmarkCity, postmarkDate, postmarkNote }) {
    return (
        <div className="timeline-item">
            <div className="timeline-marker">{number}</div>

            <StampCard
                className="timeline-stamp"
                stampNumber={number}
                postmark={postmarkCity && (
                    <ParallaxElement offset={30} style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}>
                        <div className="postmark">
                            <div className="postmark-inner"></div>
                            <div className="postmark-city">{postmarkCity}</div>
                            <div className="postmark-date">{postmarkDate}</div>
                            <div className="postmark-note">{postmarkNote}</div>
                            <div className="postmark-lines"></div>
                        </div>
                    </ParallaxElement>
                )}
            >
                <div className="timeline-date">
                    {isCurrentJob && <span className="status-indicator"></span>}
                    {date}
                </div>
                <h3 className="timeline-title">{title}</h3>
                <div className="timeline-company">
                    {companyUrl ? (
                        <span className="company-wrapper">
                            <a href={companyUrl} target="_blank" rel="noopener noreferrer" className="company-name company-link">
                                {company}
                            </a>
                            {showBrands && brandsImage && (
                                <div className="brand-tooltip">
                                    <div className="brand-tooltip-header">Brands I've worked with:</div>
                                    <img src={brandsImage} alt="Brands worked with" className="brand-logos" />
                                </div>
                            )}
                        </span>
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

export default function Home({ isMobile }) {
    const [countersStarted, setCountersStarted] = useState(false);
    const statsRef = useRef(null);

    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ "namespace": "15min" });
            cal("ui", { "theme": "dark", "styles": { "branding": { "brandColor": "#000000" } }, "hideEventTypeDetails": false, "layout": "month_view" });
        })();
    }, []);

    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ "namespace": "30min" });
            cal("ui", { "theme": "dark", "styles": { "branding": { "brandColor": "#000000" } }, "hideEventTypeDetails": false, "layout": "month_view" });
        })();
    }, []);

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

    // Scroll reveal animation observer
    useEffect(() => {
        // Only select elements within this component to avoid issues if we switch pages
        const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .timeline-item')

        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed')
                    }
                })
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        )

        revealElements.forEach((el) => revealObserver.observe(el))
        return () => revealObserver.disconnect()
    }, [])

    return (
        <>
            {/* Hero Section */}
            <section className="hero section" id="hero">
                <div className="container">
                    <div className="hero-content">
                        {/* Photo Stamp */}
                        <div className="hero-stamp-wrapper">
                            <div className="hero-photo-styled">
                                <div className="stamp-header">
                                    <span className="stamp-number">Nº 001</span>
                                </div>
                                <div className="stamp-image-container">
                                    <img src={profilePhotoCandid} alt="Lakshay Rohilla - Campaign Manager" loading="eager" width="400" height="400" fetchPriority="high" />
                                </div>
                                <div className="stamp-footer">
                                    <div className="stamp-role">CAMPAIGN MANAGER</div>
                                    <div className="stamp-barcode-group">
                                        <div className="stamp-barcode"></div>
                                        <div className="stamp-barcode-text">LR-2020-2026</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hero Text */}
                        <div className="hero-text">
                            <p className="hero-greeting">→ Hello, I'm</p>
                            <div className="hero-name-wrapper">
                                <span className="hero-name-hindi">लक्षय रोहिल्ला</span>
                                <span className="hero-name">
                                    LAKSHAY ROHILLA
                                </span>
                            </div>
                            <p className="hero-tagline">Turning launches into conversations ✦</p>
                            <p className="hero-description">
                                <span className="highlight">3+ YEARS</span> planning influencer campaigns for films, OTT launches &
                                brands. <span className="highlight">1000M+ REACH</span> &
                                <span className="highlight"> 80M+ ENGAGEMENTS</span> across platforms.
                            </p>
                            <div className="hero-cta">
                                <Magnetic>
                                    <a
                                        href="#contact"
                                        className="btn btn-primary"
                                    >
                                        Let's Chat →
                                    </a>
                                </Magnetic>
                                <Magnetic>
                                    <a href="#experience" className="btn btn-secondary">View My Work</a>
                                </Magnetic>
                                <Magnetic>
                                    <a
                                        href={isMobile ? "/Lakshay Rohilla Resume Mobile.pdf" : "/Lakshay_Rohilla_Resume.pdf"}
                                        download={isMobile ? "Lakshay Rohilla Resume Mobile.pdf" : "Lakshay_Rohilla_Resume.pdf"}
                                        className="btn btn-secondary btn-resume"
                                    >
                                        <Download size={16} /> Resume
                                    </a>
                                </Magnetic>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats" ref={statsRef}>
                <div className="stats-border-top"></div>
                <div className="stats-container">
                    <StatItem target={1000} suffix="M+" label="Reach" started={countersStarted} />
                    <StatItem target={80} suffix="M+" label="Engagements" started={countersStarted} />
                    <StatItem target={1500} suffix="+" label="Creators Managed" started={countersStarted} />
                    <StatItem target={3} suffix="+" label="Years Experience" started={countersStarted} />
                </div>
                <div className="stats-border-bottom"></div>
                <div className="stats-border-bottom"></div>
            </section>

            <WavyDivider color="var(--stamp-red)" />

            {/* Movie Quotes Section */}
            <MovieQuotes />

            <WavyDivider color="#c73e3a" />

            {/* About Section */}
            <section className="section" id="about">
                <div className="container">
                    <h2 className="section-title scroll-reveal">
                        <span className="title-text">
                            <span className="title-hindi">परिचय</span>
                            <SplitText text="ABOUT ME" animation="fadeUp" splitBy="word" />
                        </span>
                    </h2>
                    <div className="about-content">
                        <TiltCard>
                            <StampCard stampNumber="002" className="about-stamp scroll-reveal-left delay-1">
                                <div className="about-note">
                                    "I figure out what makes people share things, then I do it at scale for brands."
                                </div>
                                <div className="about-text">
                                    <p>
                                        I'm a <strong>Campaign Manager</strong> who plans and executes influencer campaigns
                                        for film, OTT, and product launches. From finding the right creators to making
                                        sure the numbers actually move.
                                    </p>
                                    <p className="about-platforms">
                                        <span className="highlight">X (Twitter)</span>{' '}
                                        <span className="highlight">Instagram</span>{' '}
                                        <span className="highlight">YouTube</span>{' '}
                                        <span className="highlight">LinkedIn</span>
                                    </p>
                                </div>
                            </StampCard>
                        </TiltCard>
                        <TiltCard>
                            <StampCard stampNumber="003" className="about-stamp scroll-reveal-right delay-2">
                                <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '24px', letterSpacing: '3px', marginBottom: '20px' }}>
                                    AREA OF EXPERTISE
                                </h3>
                                <div className="expertise-grid">
                                    <div className="expertise-item">
                                        <span className="expertise-icon"><TrendingUp size={20} /></span>
                                        Viral Campaigns
                                    </div>
                                    <div className="expertise-item">
                                        <span className="expertise-icon"><Handshake size={20} /></span>
                                        Creator Outreach
                                    </div>
                                    <div className="expertise-item">
                                        <span className="expertise-icon"><FaXTwitter size={18} /></span>
                                        X (Twitter)
                                    </div>
                                    <div className="expertise-item">
                                        <span className="expertise-icon"><FaLinkedinIn size={18} /></span>
                                        LinkedIn
                                    </div>
                                    <div className="expertise-item">
                                        <span className="expertise-icon"><Target size={20} /></span>
                                        Influencer Marketing
                                    </div>
                                    <div className="expertise-item">
                                        <span className="expertise-icon"><Rocket size={20} /></span>
                                        Launch Strategy
                                    </div>
                                </div>
                            </StampCard>
                        </TiltCard>
                    </div>
                </div>
            </section>

            <WavyDivider color="#c73e3a" />

            {/* Experience Section */}
            <section className="section" id="experience">
                <div className="container">
                    <h2 className="section-title scroll-reveal">
                        <span className="title-text">
                            <span className="title-hindi">अनुभव</span>
                            <SplitText text="WORK EXPERIENCE" animation="fadeUp" splitBy="word" />
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
                            location={<><MapPin size={14} /> Indore, India</>}
                            isCurrentJob={true}
                            postmarkCity="INDORE"
                            postmarkDate="12 JUL 2024"
                            postmarkNote="EXPRESS"
                            bullets={[
                                "Plan and run influencer campaigns for movie premieres, OTT shows, and product launches — 250M+ reach and 20M+ engagements across platforms",
                                "Own campaigns end-to-end: briefing, creator selection, content review, scheduling, and reporting",
                                "Coordinate with 50+ creators per campaign across Instagram, X, and YouTube",
                                <>Built <a href="https://textstudio.netlify.app/" target="_blank" rel="noopener noreferrer" className="inline-link">TextCraft</a>, a free online text tool for case conversion, word counting, and text transformation</>
                            ]}
                        />
                        <TimelineItem
                            number="02"
                            date="Oct 2023 - Oct 2024"
                            title="Media Planning Coordinator"
                            company="WLDD Private Limited"
                            companyUrl="https://www.wldd.in/"
                            type="Full-time"
                            location={<><MapPin size={14} /> Bengaluru, India</>}
                            postmarkCity="BENGALURU"
                            postmarkDate="24 OCT 2023"
                            postmarkNote="REGISTERED"
                            bullets={[
                                "Led influencer campaigns generating 650M+ organic reach and 52M+ engagements across X, Instagram, and YouTube",
                                "Shaped campaign concepts and creator briefs in collaboration with brand and content teams",
                                "Managed content production pipeline: briefing designers, reviewing creatives, and coordinating distribution",
                                "Managed campaign budgets, optimizing spend-per-engagement across 20+ campaigns"
                            ]}
                        />
                        <TimelineItem
                            number="03"
                            date="Nov 2022 - Mar 2023"
                            title="Digital Marketing Associate"
                            company="Thrillophilia.com"
                            companyUrl="https://www.thrillophilia.com/"
                            type="Full-time"
                            location={<><MapPin size={14} /> Jaipur, India</>}
                            postmarkCity="JAIPUR"
                            postmarkDate="15 NOV 2022"
                            postmarkNote="PARCEL"
                            bullets={[
                                "Drove organic traffic growth through keyword research and on-page SEO",
                                "Built quality backlinks and analyzed competitor strategies to improve search rankings"
                            ]}
                        />
                        <TimelineItem
                            number="04"
                            date="Jan 2020 - Nov 2022"
                            title="Beta Tester"
                            company="Avalon Labs"
                            type="Contract"
                            location={<><MapPin size={14} /> Bengaluru, India</>}
                            postmarkCity="BENGALURU"
                            postmarkDate="15 JAN 2020"
                            postmarkNote="MAIL"
                            bullets={[
                                "Identified 200+ product issues pre-launch"
                            ]}
                        />
                    </div>
                </div>
            </section>

            {/* Creative Fuel - Brands Worked With */}
            <CampaignLogoLoop />

            <WavyDivider color="#c73e3a" />

            {/* Skills Section */}
            <section className="section" id="skills">
                <div className="container">
                    <h2 className="section-title scroll-reveal">
                        <span className="title-text">
                            <span className="title-hindi">कौशल</span>
                            <SplitText text="SKILLS & PLATFORMS" animation="fadeUp" splitBy="word" />
                        </span>
                    </h2>
                    <div className="skills-grid">
                        <StampCard stampNumber="004" className="skills-category scroll-reveal-left delay-1">
                            <h3>CORE SKILLS</h3>
                            <div className="skill-items">
                                <SkillItem icon={<BarChart3 size={20} />} name="Performance Metrics" />
                                <SkillItem icon={<Target size={20} />} name="Campaign Strategy" />
                                <SkillItem icon={<Handshake size={20} />} name="Creator Relations" />
                                <SkillItem icon={<TrendingUp size={20} />} name="Growth Hacking" />
                                <SkillItem icon={<PenLine size={20} />} name="Content Strategy" />
                                <SkillItem icon={<Search size={20} />} name="Trend Analysis" />
                            </div>
                        </StampCard>
                        <StampCard stampNumber="005" className="skills-category scroll-reveal-right delay-2">
                            <h3>PLATFORMS</h3>
                            <div className="skill-items">
                                <SkillItem icon={<FaXTwitter size={18} />} name="X / Twitter" />
                                <SkillItem icon={<FaLinkedinIn size={18} />} name="LinkedIn" />
                                <SkillItem icon={<FaInstagram size={18} />} name="Instagram" />
                                <SkillItem icon={<FaYoutube size={18} />} name="YouTube" />
                                <SkillItem icon={<FaThreads size={18} />} name="Threads" />
                                <SkillItem icon={<BarChart3 size={20} />} name="Analytics" />
                            </div>
                        </StampCard>
                    </div>
                </div>
            </section>

            <WavyDivider color="#c73e3a" />

            {/* Education Section */}
            <section className="section" id="education">
                <div className="container">
                    <h2 className="section-title scroll-reveal">
                        <span className="title-text">
                            <span className="title-hindi">शिक्षा</span>
                            <SplitText text="EDUCATION" animation="fadeUp" splitBy="word" />
                        </span>
                    </h2>
                    <div className="education-grid">
                        <StampCard stampNumber="006" className="education-stamp">
                            <div className="education-content">
                                <span className="edu-icon"><GraduationCap size={32} /></span>
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
                                <span><Trophy size={24} /></span>
                                <span>GOOGLE DIGITAL MARKETING</span>
                            </div>
                        </StampCard>
                    </div>
                </div>
            </section>

            <WavyDivider color="#c73e3a" />

            {/* Contact Section */}
            <section className="section contact-section" id="contact">
                <div className="container">
                    <h2 className="section-title scroll-reveal">
                        <span className="title-text">
                            <span className="title-hindi">संपर्क</span>
                            <SplitText text="LET'S CONNECT" animation="fadeUp" splitBy="word" />
                        </span>
                    </h2>
                    <div className="contact-content">
                        <StampCard stampNumber="008" showBarcode className="contact-stamp scroll-reveal delay-1">
                            <div className="contact-note">
                                <TypewriterText text="Got a launch coming up? Let's talk." />
                            </div>
                            <div className="contact-links">
                                <a href="mailto:laksh.rohilla@outlook.com" className="contact-link">
                                    <span><Mail size={18} /></span>
                                    <span>laksh.rohilla@outlook.com</span>
                                </a>
                                <a href="https://linkedin.com/in/lakshayrohilla" target="_blank" rel="noreferrer" className="contact-link">
                                    <span><Link size={18} /></span>
                                    <span>linkedin.com/in/lakshayrohilla</span>
                                </a>
                                <div className="contact-link">
                                    <span><MapPin size={18} /></span>
                                    <span>Indore, India</span>
                                </div>
                            </div>
                            <div className="contact-booking-buttons">
                                <Magnetic>
                                    <button
                                        data-cal-namespace="15min"
                                        data-cal-link="lakshayy/15min"
                                        data-cal-config='{"layout":"month_view"}'
                                        className="btn btn-primary"
                                        style={{ width: '100%', marginBottom: '12px' }}
                                    >
                                        QUICK CHAT (15 MIN) →
                                    </button>
                                </Magnetic>
                                <Magnetic>
                                    <button
                                        data-cal-namespace="30min"
                                        data-cal-link="lakshayy/30min"
                                        data-cal-config='{"layout":"month_view"}'
                                        className="btn btn-secondary"
                                        style={{ width: '100%' }}
                                    >
                                        DEEP DIVE (30 MIN) →
                                    </button>
                                </Magnetic>
                            </div>

                            {/* Find Me On - Social Links */}
                            <div className="social-section">
                                <div className="social-title">FIND ME ON</div>
                                <div className="social-links">
                                    <Magnetic>
                                        <a href="https://x.com/LakshLogic" target="_blank" rel="noreferrer" className="social-link">
                                            <FaXTwitter className="social-icon" />
                                            <span className="social-handle">@LakshLogic</span>
                                        </a>
                                    </Magnetic>
                                    <Magnetic>
                                        <a href="https://discord.com/users/khawabizada" target="_blank" rel="noreferrer" className="social-link">
                                            <FaDiscord className="social-icon" />
                                            <span className="social-handle">khawabizada</span>
                                        </a>
                                    </Magnetic>
                                    <Magnetic>
                                        <a href="https://github.com/vrsn001" target="_blank" rel="noreferrer" className="social-link">
                                            <FaGithub className="social-icon" />
                                            <span className="social-handle">vrsn001</span>
                                        </a>
                                    </Magnetic>
                                    <Magnetic>
                                        <a href="https://www.instagram.com/lakshiraa/" target="_blank" rel="noreferrer" className="social-link">
                                            <FaInstagram className="social-icon" />
                                            <span className="social-handle">lakshiraa</span>
                                        </a>
                                    </Magnetic>
                                </div>
                            </div>
                        </StampCard>
                    </div>
                </div>
            </section>
        </>
    );
}
