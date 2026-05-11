import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { GraduationCap, Utensils, ShoppingCart, Building2, Briefcase, ArrowLeft, Play } from "lucide-react";
import "./Industries.css";

/* ─── DATA ─────────────────────────────────────────────────────────────── */
const industries = [
  {
    id: "education",
    label: "Schools & Education",
    icon: <GraduationCap size={26} />,
    accent: "#F39221",
    description:
      "We craft compelling digital identities for schools, colleges, and ed-tech platforms — from vibrant social media campaigns to high-converting admission landing pages.",
    tags: ["Social Media", "Website Design", "SEO", "Ad Campaigns"],
    images: [
      {
        src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
        caption: "School Branding",
      },
      {
        src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80",
        caption: "Campus Campaign",
      },
      {
        src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80",
        caption: "Social Creatives",
      },
      {
        src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
        caption: "Ad Design",
      },
    ],
    videos: [
      {
        src: "https://videos.pexels.com/video-files/5198697/5198697-uhd_2560_1440_25fps.mp4",
        poster: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
        caption: "Admission Drive Reel",
      },
      {
        src: "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4",
        poster: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80",
        caption: "Campus Promo",
      },
      {
        src: "https://videos.pexels.com/video-files/8087880/8087880-hd_1920_1080_30fps.mp4",
        poster: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80",
        caption: "Results Story",
      },
      {
        src: "https://videos.pexels.com/video-files/4143953/4143953-uhd_3840_2160_25fps.mp4",
        poster: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
        caption: "Teacher Feature",
      },
    ],
  },
  {
    id: "restaurants",
    label: "Restaurants & Cafes",
    icon: <Utensils size={26} />,
    accent: "#E85D3A",
    description:
      "We make food brands irresistible online — drool-worthy photography mockups, reels, menus, and targeted ads that fill your tables every day.",
    tags: ["Food Photography", "Reels", "Google My Business", "Meta Ads"],
    images: [
      {
        src: "https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=600&q=80",
        caption: "Menu Design",
      },
      {
        src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
        caption: "Social Post",
      },
      {
        src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80",
        caption: "Brand Identity",
      },
      {
        src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
        caption: "Offer Creative",
      },
    ],
    videos: [
      {
        src: "https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4",
        poster: "https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=600&q=80",
        caption: "Chef's Special Reel",
      },
      {
        src: "https://videos.pexels.com/video-files/1199387/1199387-hd_1920_1080_30fps.mp4",
        poster: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
        caption: "Café Ambience",
      },
      {
        src: "https://videos.pexels.com/video-files/4253925/4253925-uhd_3840_2160_25fps.mp4",
        poster: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80",
        caption: "Opening Event",
      },
      {
        src: "https://videos.pexels.com/video-files/4379932/4379932-hd_1920_1080_25fps.mp4",
        poster: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
        caption: "Dish Highlight",
      },
    ],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    icon: <ShoppingCart size={26} />,
    accent: "#3D7E8C",
    description:
      "From product listings to full-funnel performance marketing — we help online stores scale with strategy, design, and data.",
    tags: ["Product Shoots", "Store Design", "Performance Marketing", "Email"],
    images: [
      {
        src: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80",
        caption: "Product Page",
      },
      {
        src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
        caption: "Brand Shoot",
      },
      {
        src: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&q=80",
        caption: "Ad Creative",
      },
      {
        src: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&q=80",
        caption: "Packaging Design",
      },
    ],
    videos: [
      {
        src: "https://videos.pexels.com/video-files/3449528/3449528-hd_1920_1080_30fps.mp4",
        poster: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80",
        caption: "Launch Reel",
      },
      {
        src: "https://videos.pexels.com/video-files/4065933/4065933-uhd_2560_1440_25fps.mp4",
        poster: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
        caption: "Unboxing Video",
      },
      {
        src: "https://videos.pexels.com/video-files/7551442/7551442-hd_1920_1080_30fps.mp4",
        poster: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&q=80",
        caption: "Sale Campaign",
      },
      {
        src: "https://videos.pexels.com/video-files/7578543/7578543-hd_1920_1080_30fps.mp4",
        poster: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&q=80",
        caption: "Testimonial Reel",
      },
    ],
  },
  {
    id: "realestate",
    label: "Real Estate",
    icon: <Building2 size={26} />,
    accent: "#6C63FF",
    description:
      "We position properties and builders with authority — stunning visuals, virtual tours, lead-gen funnels, and local SEO that brings serious buyers.",
    tags: ["Virtual Tours", "Lead Gen", "Drone Shoots", "Google Ads"],
    images: [
      {
        src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
        caption: "Property Brochure",
      },
      {
        src: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&q=80",
        caption: "Social Ad",
      },
      {
        src: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=600&q=80",
        caption: "Exterior Shot",
      },
      {
        src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
        caption: "Interior Design",
      },
    ],
    videos: [
      {
        src: "https://videos.pexels.com/video-files/1390942/1390942-hd_1920_1080_30fps.mp4",
        poster: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
        caption: "Property Walkthrough",
      },
      {
        src: "https://videos.pexels.com/video-files/3255536/3255536-hd_1920_1080_25fps.mp4",
        poster: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&q=80",
        caption: "Drone Aerial",
      },
      {
        src: "https://videos.pexels.com/video-files/4816276/4816276-uhd_2560_1440_25fps.mp4",
        poster: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=600&q=80",
        caption: "Builder Profile",
      },
      {
        src: "https://videos.pexels.com/video-files/7578544/7578544-hd_1920_1080_30fps.mp4",
        poster: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
        caption: "Client Story",
      },
    ],
  },
  {
    id: "services",
    label: "Service Businesses",
    icon: <Briefcase size={26} />,
    accent: "#22C55E",
    description:
      "Salons, clinics, law firms, gyms — we build local authority and online trust through powerful content, reviews, and digital infrastructure.",
    tags: ["Local SEO", "Content Marketing", "Website", "Review Management"],
    images: [
      {
        src: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&q=80",
        caption: "Salon Branding",
      },
      {
        src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
        caption: "Clinic Campaign",
      },
      {
        src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
        caption: "Gym Promo",
      },
      {
        src: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=600&q=80",
        caption: "Office Shoot",
      },
    ],
    videos: [
      {
        src: "https://videos.pexels.com/video-files/4253924/4253924-uhd_3840_2160_25fps.mp4",
        poster: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&q=80",
        caption: "Service Reel",
      },
      {
        src: "https://videos.pexels.com/video-files/3253866/3253866-uhd_3840_2160_25fps.mp4",
        poster: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
        caption: "Client Journey",
      },
      {
        src: "https://videos.pexels.com/video-files/6963944/6963944-hd_1920_1080_30fps.mp4",
        poster: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
        caption: "Transformation Story",
      },
      {
        src: "https://videos.pexels.com/video-files/7550831/7550831-hd_1920_1080_25fps.mp4",
        poster: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=600&q=80",
        caption: "Brand Film",
      },
    ],
  },
];

/* ─── VIDEO CARD ─────────────────────────────────────────────────────── */
function VideoCard({ video, accent }) {
  const ref = useRef(null);

  const handleMouseEnter = () => {
    if (ref.current) {
      ref.current.play();
    }
  };
  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.pause();
      ref.current.currentTime = 0;
    }
  };

  return (
    <div
      className="iw-media-card iw-video-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ "--accent": accent }}
    >
      <video
        ref={ref}
        src={video.src}
        poster={video.poster}
        muted
        loop
        playsInline
        preload="none"
        className="iw-video-el"
      />
      <div className="iw-play-badge">
        <Play size={14} fill="white" />
        <span>Hover to Play</span>
      </div>
      <div className="iw-media-caption">{video.caption}</div>
    </div>
  );
}

/* ─── INDUSTRY SECTION ───────────────────────────────────────────────── */
function IndustrySection({ industry }) {
  return (
    <section
      id={industry.id}
      className="iw-industry-section"
      style={{ "--accent": industry.accent }}
    >
      {/* Header */}
      <div className="iw-section-header">
        <div className="iw-icon-chip" style={{ background: industry.accent + "22", border: `1.5px solid ${industry.accent}55` }}>
          <span style={{ color: industry.accent }}>{industry.icon}</span>
        </div>
        <div>
          <h2 className="iw-section-title">{industry.label}</h2>
          <p className="iw-section-desc">{industry.description}</p>
          <div className="iw-tags">
            {industry.tags.map((t) => (
              <span key={t} className="iw-tag" style={{ color: industry.accent, borderColor: industry.accent + "55" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Social Media — Images */}
      <div className="iw-subsection">
        <div className="iw-sub-label">
          <span className="iw-sub-line" style={{ background: industry.accent }} />
          Social Media
          <span className="iw-sub-line" />
        </div>
        <div className="iw-media-grid">
          {industry.images.map((img, i) => (
            <div key={i} className="iw-media-card iw-img-card" style={{ "--accent": industry.accent }}>
              <img src={img.src} alt={img.caption} loading="lazy" />
              <div className="iw-media-caption">{img.caption}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Reels */}
      <div className="iw-subsection">
        <div className="iw-sub-label">
          <span className="iw-sub-line" style={{ background: industry.accent }} />
          Video Reels
          <span className="iw-sub-line" />
        </div>
        <div className="iw-media-grid">
          {industry.videos.map((vid, i) => (
            <VideoCard key={i} video={vid} accent={industry.accent} />
          ))}
        </div>
      </div>

      <div className="iw-section-divider" style={{ background: `linear-gradient(90deg, transparent, ${industry.accent}55, transparent)` }} />
    </section>
  );
}

/* ─── MAIN PAGE ──────────────────────────────────────────────────────── */
export default function IndustriesWeWorkWith() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash?.replace("#", "");
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location]);

  return (
    <div className="iw-page">
      {/* ── HERO ── */}
      <div className="iw-hero">
        <div className="iw-hero-noise" />
        <div className="iw-hero-glow" />
        <a href="/" className="iw-back-btn">
          <ArrowLeft size={16} /> Back to Home
        </a>
        <p className="iw-hero-eyebrow">Our Work Across Industries</p>
        <h1 className="iw-hero-title">
          Industries<br />
          <span className="iw-hero-accent">We Work With</span>
        </h1>
        <p className="iw-hero-sub">
          From classrooms to kitchens, showrooms to storefronts — we've built digital growth engines across every vertical.
        </p>
        {/* Pill Nav */}
        <nav className="iw-pill-nav">
          {industries.map((ind) => (
            <a
              key={ind.id}
              href={`#${ind.id}`}
              className="iw-pill"
              style={{ "--accent": ind.accent }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(ind.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              <span style={{ color: ind.accent }}>{ind.icon}</span>
              {ind.label}
            </a>
          ))}
        </nav>
      </div>

      {/* ── INDUSTRY SECTIONS ── */}
      <div className="iw-content">
        {industries.map((ind) => (
          <IndustrySection key={ind.id} industry={ind} />
        ))}
      </div>

      {/* ── CTA ── */}
      <div className="iw-cta-block">
        <div className="iw-cta-glow" />
        <h2 className="iw-cta-title">Ready to Dominate Your Industry?</h2>
        <p className="iw-cta-sub">Let's build something that makes your competitors nervous.</p>
        <a href="/contact" className="iw-cta-btn">Let's Talk →</a>
      </div>
    </div>
  );
}