import { useState, useRef, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
 
  :root {
    --blue-950: #060e1e;
    --blue-900: #0b1a35;
    --blue-800: #112d5e;
    --blue-700: #1a3f7a;
    --blue-600: #2563eb;
    --blue-500: #3b82f6;
    --blue-400: #60a5fa;
    --blue-300: #93c5fd;
    --blue-200: #bfdbfe;
    --blue-100: #dbeafe;
    --blue-50:  #eff6ff;
    --white: #ffffff;
    --off-white: #f8faff;
    --gray-100: #f1f5f9;
    --gray-200: #e2e8f0;
    --gray-400: #94a3b8;
    --gray-600: #475569;
    --cyan: #06b6d4;
    --cyan-light: #cffafe;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; scroll-behavior: smooth; }

  .lp-root {
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
    background: var(--off-white);
    color: var(--blue-950);
  }

  /* ---------- ANIMATIONS ---------- */
  @keyframes fadeInUp   { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeInLeft { from { opacity:0; transform:translateX(-50px); } to { opacity:1; transform:translateX(0); } }
  @keyframes fadeInRight{ from { opacity:0; transform:translateX(50px); } to { opacity:1; transform:translateX(0); } }
  @keyframes float      { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-16px);} }
  @keyframes spin-slow  { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
  @keyframes shimmer    { 0%{background-position:-200% center;} 100%{background-position:200% center;} }
  @keyframes pulse-ring { 0%{transform:scale(0.9);opacity:0.7;} 100%{transform:scale(1.3);opacity:0;} }
  @keyframes blob       { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%;} 50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%;} }
  @keyframes marquee    { from{transform:translateX(0);} to{transform:translateX(-50%);} }

  .reveal { opacity: 0; transform: translateY(36px); transition: opacity 0.75s ease, transform 0.75s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-left { opacity: 0; transform: translateX(-50px); transition: opacity 0.75s ease, transform 0.75s ease; }
  .reveal-left.visible { opacity: 1; transform: translateX(0); }
  .reveal-right { opacity: 0; transform: translateX(50px); transition: opacity 0.75s ease, transform 0.75s ease; }
  .reveal-right.visible { opacity: 1; transform: translateX(0); }

  /* ---------- NAV ---------- */
  .lp-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1rem 7vw;
    height: 100px;
    background: rgba(6,14,30,0.75);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(96,165,250,0.1);
    transition: background 0.3s, box-shadow 0.3s;
  }
  .lp-nav.scrolled {
    background: rgba(6,14,30,0.95);
    box-shadow: 0 4px 40px rgba(0,0,0,0.4);
  }
  .lp-logo {
    font-family: 'Sora', sans-serif;
    font-size: 1.5rem;
    font-weight: 800;
    background: linear-gradient(120deg, #fff 30%, var(--blue-300) 80%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.5px;
  }
  .lp-logo span { color: var(--cyan); -webkit-text-fill-color: var(--cyan); }
  .lp-nav-links {
    display: flex; align-items: center; gap: 36px;
    list-style: none;
  }
  .lp-nav-links a {
    color: rgba(255,255,255,0.7);
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 400;
    transition: color 0.2s;
    letter-spacing: 0.2px;
  }
  .lp-nav-links a:hover { color: white; }
  .lp-nav-cta {
    padding: 10px 24px;
    background: linear-gradient(135deg, var(--blue-600), var(--blue-500));
    color: white;
    border: none;
    border-radius: 100px;
    font-family: 'Sora', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.25s;
    box-shadow: 0 4px 16px rgba(37,99,235,0.4);
  }
  .lp-nav-cta:hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(37,99,235,0.6); }

  /* ---------- HERO ---------- */
  .lp-hero {
    position: relative;
    min-height: 100vh;
    background: linear-gradient(170deg, var(--blue-950) 0%, var(--blue-900) 50%, #0d2245 100%);
    display: flex; align-items: center;
    padding: 120px 7vw 80px;
    overflow: hidden;
  }
  .lp-hero-bg-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(37,99,235,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(37,99,235,0.05) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }
  .lp-hero-blob1 {
    position: absolute; top: -100px; right: -100px;
    width: 550px; height: 550px;
    background: radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%);
    border-radius: 50%; animation: float 8s ease-in-out infinite;
    pointer-events: none;
  }
  .lp-hero-blob2 {
    position: absolute; bottom: -80px; left: 30%;
    width: 350px; height: 350px;
    background: radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%);
    border-radius: 50%; animation: float 11s ease-in-out infinite reverse;
    pointer-events: none;
  }
  .lp-hero-content {
    position: relative; z-index: 2;
    max-width: 640px;
    animation: fadeInLeft 1s ease both;
  }
  .lp-hero-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(37,99,235,0.15);
    border: 1px solid rgba(96,165,250,0.3);
    border-radius: 100px;
    padding: 6px 18px;
    font-size: 0.78rem;
    font-weight: 500;
    color: var(--blue-300);
    letter-spacing: 1.2px;
    text-transform: uppercase;
    margin-bottom: 24px;
  }
  .lp-hero-dot { width: 6px; height: 6px; background: var(--cyan); border-radius: 50%; animation: pulse-ring 1.5s ease-out infinite; }
  .lp-hero-title {
    font-family: 'Sora', sans-serif;
    font-size: clamp(2.5rem, 6vw, 4.2rem);
    font-weight: 900;
    line-height: 1.08;
    color: white;
    margin-bottom: 10px;
    letter-spacing: -1px;
  }
  .lp-hero-title-accent {
    background: linear-gradient(120deg, var(--blue-300), var(--cyan));
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s linear infinite;
  }
  .lp-hero-sub {
    font-size: 1.1rem;
    color: rgba(255,255,255,0.6);
    line-height: 1.7;
    margin-bottom: 36px;
    max-width: 500px;
    font-weight: 300;
  }
  .lp-hero-btns { display: flex; gap: 16px; flex-wrap: wrap; align-items: center; margin-bottom: 52px; }
  .btn-primary {
    display: flex; align-items: center; gap: 8px;
    padding: 15px 32px;
    background: linear-gradient(135deg, var(--blue-600), var(--blue-500), var(--cyan));
    background-size: 200% auto;
    color: white;
    border: none; border-radius: 14px;
    font-family: 'Sora', sans-serif;
    font-size: 0.95rem; font-weight: 700;
    cursor: pointer;
    transition: all 0.35s ease;
    box-shadow: 0 4px 24px rgba(37,99,235,0.45);
    text-decoration: none;
  }
  .btn-primary:hover {
    background-position: right center;
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(37,99,235,0.65);
  }
  .btn-ghost {
    display: flex; align-items: center; gap: 8px;
    padding: 15px 28px;
    background: transparent;
    color: rgba(255,255,255,0.8);
    border: 1px solid rgba(96,165,250,0.3);
    border-radius: 14px;
    font-family: 'Sora', sans-serif;
    font-size: 0.95rem; font-weight: 600;
    cursor: pointer;
    transition: all 0.25s ease;
    text-decoration: none;
  }
  .btn-ghost:hover { border-color: var(--blue-400); color: white; background: rgba(37,99,235,0.1); }
  .lp-hero-stats {
    display: flex; gap: 36px; flex-wrap: wrap;
  }
  .lp-stat-item { }
  .lp-stat-num {
    font-family: 'Sora', sans-serif;
    font-size: 1.8rem; font-weight: 800;
    color: white;
    background: linear-gradient(120deg, #fff, var(--blue-300));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .lp-stat-label { font-size: 0.8rem; color: rgba(255,255,255,0.45); margin-top: 2px; }

  /* Hero image area */
  .lp-hero-visual {
    position: absolute; right: 7vw; top: 50%; transform: translateY(-50%);
    width: clamp(300px, 38vw, 560px);
    animation: fadeInRight 1s 0.2s ease both;
    z-index: 2;
  }
  .lp-hero-img-wrap {
    position: relative;
    border-radius: 28px;
    overflow: hidden;
    box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(96,165,250,0.15);
    aspect-ratio: 4/3;
  }
  .lp-hero-img-wrap img { width:100%; height:100%; object-fit:cover; display:block; }
  .lp-img-placeholder {
    width:100%; height:100%;
    background: linear-gradient(135deg, rgba(37,99,235,0.2), rgba(6,182,212,0.1));
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 12px; color: rgba(96,165,250,0.6);
    border: 2px dashed rgba(96,165,250,0.25);
    border-radius: 26px;
    cursor: pointer;
    transition: all 0.25s;
    padding: 24px;
    text-align: center;
  }
  .lp-img-placeholder:hover { border-color: var(--blue-400); background: rgba(37,99,235,0.15); }
  .lp-img-placeholder-icon { font-size: 2.5rem; opacity: 0.6; }
  .lp-img-placeholder-text { font-size: 0.85rem; font-weight: 500; }
  .lp-img-placeholder-sub { font-size: 0.75rem; opacity: 0.6; }
  .lp-hero-badge {
    position: absolute; bottom: -16px; left: -20px;
    background: white;
    border-radius: 16px;
    padding: 14px 18px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.25);
    display: flex; align-items: center; gap: 10px;
  }
  .lp-hero-badge-icon { font-size: 1.5rem; }
  .lp-hero-badge-text { font-family:'Sora',sans-serif; font-size:0.8rem; font-weight:700; color:var(--blue-900); }
  .lp-hero-badge-sub { font-size:0.72rem; color:var(--gray-400); }
  .lp-hero-ring {
    position: absolute; top: -20px; right: -20px;
    width: 100px; height: 100px;
    border: 2px solid rgba(6,182,212,0.3);
    border-radius: 50%;
    animation: spin-slow 12s linear infinite;
  }
  .lp-hero-ring::after {
    content: ''; position: absolute; top: 8px; left: 8px; right: 8px; bottom: 8px;
    border: 1px dashed rgba(96,165,250,0.2); border-radius: 50%;
  }

  /* ---------- MARQUEE ---------- */
  .lp-marquee-wrap {
    background: var(--blue-950);
    border-top: 1px solid rgba(96,165,250,0.1);
    border-bottom: 1px solid rgba(96,165,250,0.1);
    padding: 18px 0;
    overflow: hidden;
  }
  .lp-marquee-track {
    display: flex; gap: 0;
    animation: marquee 22s linear infinite;
    width: max-content;
  }
  .lp-marquee-item {
    display: flex; align-items: center; gap: 12px;
    padding: 0 36px;
    font-family: 'Sora', sans-serif;
    font-size: 0.8rem; font-weight: 600;
    color: rgba(96,165,250,0.5);
    letter-spacing: 2px; text-transform: uppercase;
    white-space: nowrap;
  }
  .lp-marquee-dot { width: 4px; height: 4px; background: var(--cyan); border-radius: 50%; opacity: 0.6; }

  /* ---------- SECTION WRAPPER ---------- */
  .lp-section {
    padding: 100px 7vw;
  }
  .lp-section.alt { background: var(--off-white); }
  .lp-section.dark {
    background: linear-gradient(170deg, var(--blue-950) 0%, var(--blue-900) 100%);
    color: white;
  }
  .lp-section-tag {
    display: inline-block;
    padding: 5px 16px;
    background: var(--blue-100);
    color: var(--blue-700);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    border-radius: 100px;
    margin-bottom: 14px;
  }
  .dark .lp-section-tag {
    background: rgba(37,99,235,0.2);
    color: var(--blue-300);
  }
  .lp-section-title {
    font-family: 'Sora', sans-serif;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.5px;
    margin-bottom: 16px;
    color: var(--blue-950);
  }
  .dark .lp-section-title { color: white; }
  .lp-section-sub {
    font-size: 1.05rem;
    color: var(--gray-600);
    line-height: 1.7;
    max-width: 520px;
    font-weight: 300;
  }
  .dark .lp-section-sub { color: rgba(255,255,255,0.55); }
  .lp-section-header { margin-bottom: 56px; }
  .lp-section-header.center { text-align: center; display: flex; flex-direction: column; align-items: center; }
  .lp-section-header.center .lp-section-sub { margin: 0 auto; }

  /* ---------- SERVICES ---------- */
  .lp-services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 24px;
  }
  .lp-service-card {
    background: white;
    border: 1px solid var(--gray-200);
    border-radius: 24px;
    padding: 32px 28px;
    transition: all 0.35s ease;
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }
  .lp-service-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--blue-600), var(--cyan));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }
  .lp-service-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 60px rgba(37,99,235,0.12);
    border-color: var(--blue-200);
  }
  .lp-service-card:hover::before { transform: scaleX(1); }
  .lp-service-img-wrap {
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: 14px;
    overflow: hidden;
    margin-bottom: 24px;
    background: var(--blue-50);
  }
  .lp-service-img-wrap img { width:100%; height:100%; object-fit:cover; }
  .lp-service-icon {
    width: 52px; height: 52px;
    background: linear-gradient(135deg, var(--blue-600), var(--blue-500));
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.4rem;
    margin-bottom: 18px;
    box-shadow: 0 4px 16px rgba(37,99,235,0.3);
  }
  .lp-service-name {
    font-family: 'Sora', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--blue-950);
    margin-bottom: 8px;
  }
  .lp-service-desc {
    font-size: 0.875rem;
    color: var(--gray-600);
    line-height: 1.65;
  }
  .lp-service-arrow {
    display: inline-flex; align-items: center; gap: 6px;
    margin-top: 18px;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--blue-600);
    transition: gap 0.2s;
  }
  .lp-service-card:hover .lp-service-arrow { gap: 10px; }

  /* ---------- ABOUT ---------- */
  .lp-about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 72px;
    align-items: center;
  }
  .lp-about-img-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 16px;
  }
  .lp-about-img-main {
    grid-column: span 2;
    aspect-ratio: 16/9;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 12px 40px rgba(37,99,235,0.15);
  }
  .lp-about-img-sm {
    aspect-ratio: 1;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  }
  .lp-about-img-main img, .lp-about-img-sm img { width:100%; height:100%; object-fit:cover; }
  .lp-features-list { display: flex; flex-direction: column; gap: 20px; margin-top: 32px; }
  .lp-feature-item {
    display: flex; gap: 14px; align-items: flex-start;
  }
  .lp-feature-icon {
    width: 38px; height: 38px;
    background: var(--blue-100);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .lp-feature-title { font-family:'Sora',sans-serif; font-size:0.9rem; font-weight:700; color:var(--blue-950); margin-bottom:3px; }
  .lp-feature-desc { font-size:0.82rem; color:var(--gray-600); line-height:1.6; }

  /* ---------- HOW IT WORKS ---------- */
  .lp-steps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 32px;
    position: relative;
  }
  .lp-steps-grid::before {
    content: '';
    position: absolute; top: 36px; left: 14%; right: 14%;
    height: 1px;
    background: linear-gradient(90deg, var(--blue-600), var(--cyan), var(--blue-600));
    opacity: 0.3;
  }
  .lp-step {
    text-align: center;
    position: relative;
  }
  .lp-step-num {
    width: 72px; height: 72px;
    background: linear-gradient(135deg, var(--blue-600), var(--blue-500));
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Sora', sans-serif;
    font-size: 1.4rem; font-weight: 800;
    color: white;
    margin: 0 auto 20px;
    box-shadow: 0 4px 20px rgba(37,99,235,0.45);
    position: relative;
    z-index: 1;
  }
  .lp-step-num::after {
    content: '';
    position: absolute; inset: -4px;
    border-radius: 50%;
    border: 1px dashed rgba(37,99,235,0.3);
    animation: spin-slow 10s linear infinite;
  }
  .lp-step-title { font-family:'Sora',sans-serif; font-size:1rem; font-weight:700; color:white; margin-bottom:8px; }
  .lp-step-desc { font-size:0.85rem; color:rgba(255,255,255,0.5); line-height:1.65; }

  /* ---------- TESTIMONIALS ---------- */
  .lp-testi-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
  }
  .lp-testi-card {
    background: white;
    border: 1px solid var(--gray-200);
    border-radius: 24px;
    padding: 32px 28px;
    transition: all 0.3s ease;
    position: relative;
  }
  .lp-testi-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(37,99,235,0.1); border-color: var(--blue-200); }
  .lp-testi-quote { font-size: 2.5rem; color: var(--blue-200); font-family: Georgia,serif; line-height: 1; margin-bottom: 14px; }
  .lp-testi-text { font-size:0.9rem; color:var(--gray-600); line-height:1.7; margin-bottom:20px; }
  .lp-testi-author { display:flex; align-items:center; gap:12px; }
  .lp-testi-avatar {
    width:42px; height:42px; border-radius:50%;
    background: linear-gradient(135deg, var(--blue-600), var(--cyan));
    display:flex; align-items:center; justify-content:center;
    font-size:1.1rem;
  }
  .lp-testi-name { font-family:'Sora',sans-serif; font-size:0.85rem; font-weight:700; color:var(--blue-950); }
  .lp-testi-role { font-size:0.75rem; color:var(--gray-400); }
  .lp-testi-stars { color: #f59e0b; font-size:0.85rem; margin-bottom:12px; }

  /* ---------- CONTACT ---------- */
  .lp-contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 72px;
    align-items: start;
  }
  .lp-contact-info { }
  .lp-contact-info-items { display:flex; flex-direction:column; gap:24px; margin-top:32px; }
  .lp-contact-info-item { display:flex; gap:16px; align-items:center; }
  .lp-contact-icon {
    width:46px; height:46px;
    background: var(--blue-100);
    border-radius:12px;
    display:flex; align-items:center; justify-content:center;
    font-size:1.2rem; flex-shrink:0;
  }
  .lp-contact-label { font-family:'Sora',sans-serif; font-size:0.75rem; font-weight:700; color:var(--blue-700); letter-spacing:0.5px; text-transform:uppercase; margin-bottom:2px; }
  .lp-contact-value { font-size:0.9rem; color:var(--gray-600); }

  /* Contact img */
  .lp-contact-img-wrap {
    width: 100%;
    aspect-ratio: 4/3;
    border-radius: 20px;
    overflow: hidden;
    margin-top: 32px;
    box-shadow: 0 12px 40px rgba(37,99,235,0.12);
  }
  .lp-contact-img-wrap img { width:100%; height:100%; object-fit:cover; }

  .lp-form-wrap {
    background: white;
    border: 1px solid var(--gray-200);
    border-radius: 28px;
    padding: 40px 36px;
    box-shadow: 0 8px 40px rgba(37,99,235,0.08);
  }
  .lp-form-title { font-family:'Sora',sans-serif; font-size:1.3rem; font-weight:800; color:var(--blue-950); margin-bottom:24px; }
  .lp-form-row { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  .lp-form-field { display:flex; flex-direction:column; gap:6px; margin-bottom:16px; }
  .lp-form-label { font-size:0.78rem; font-weight:600; color:var(--blue-700); letter-spacing:0.5px; text-transform:uppercase; }
  .lp-form-input, .lp-form-textarea, .lp-form-select {
    padding: 12px 16px;
    border: 1.5px solid var(--gray-200);
    border-radius: 12px;
    font-family:'DM Sans',sans-serif;
    font-size: 0.9rem;
    color: var(--blue-950);
    outline: none;
    transition: all 0.25s;
    background: var(--gray-50);
    width: 100%;
  }
  .lp-form-input:focus, .lp-form-textarea:focus, .lp-form-select:focus {
    border-color: var(--blue-500);
    background: white;
    box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
  }
  .lp-form-textarea { resize:vertical; min-height:110px; }
  .lp-form-submit {
    width:100%;
    padding: 15px;
    background: linear-gradient(135deg, var(--blue-600), var(--blue-500), var(--cyan));
    background-size: 200% auto;
    color: white;
    border: none; border-radius: 14px;
    font-family:'Sora',sans-serif;
    font-size:0.95rem; font-weight:700;
    cursor:pointer;
    transition: all 0.35s ease;
    box-shadow: 0 4px 20px rgba(37,99,235,0.35);
    margin-top:6px;
  }
  .lp-form-submit:hover {
    background-position: right center;
    transform: translateY(-1px);
    box-shadow: 0 8px 28px rgba(37,99,235,0.55);
  }

  /* ---------- FOOTER ---------- */
  .lp-footer {
    background: var(--blue-950);
    color: rgba(255,255,255,0.5);
    padding: 48px 7vw 32px;
    border-top: 1px solid rgba(96,165,250,0.1);
  }
  .lp-footer-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 32px;
    margin-bottom: 40px;
    padding-bottom: 40px;
    border-bottom: 1px solid rgba(96,165,250,0.08);
  }
  .lp-footer-brand { max-width: 280px; }
  .lp-footer-tagline { font-size:0.85rem; line-height:1.65; margin-top:10px; }
  .lp-footer-links-group { }
  .lp-footer-links-title { font-family:'Sora',sans-serif; font-size:0.8rem; font-weight:700; color:white; letter-spacing:1px; text-transform:uppercase; margin-bottom:14px; }
  .lp-footer-links { display:flex; flex-direction:column; gap:10px; list-style:none; }
  .lp-footer-links a { font-size:0.85rem; color:rgba(255,255,255,0.45); text-decoration:none; transition:color 0.2s; }
  .lp-footer-links a:hover { color:white; }
  .lp-footer-bottom {
    display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;
    font-size:0.8rem;
  }
  .lp-footer-social { display:flex; gap:12px; }
  .lp-footer-social-btn {
    width:36px; height:36px;
    background: rgba(255,255,255,0.06);
    border-radius:10px;
    border: 1px solid rgba(96,165,250,0.15);
    display:flex; align-items:center; justify-content:center;
    cursor:pointer;
    transition: all 0.2s;
    font-size:1rem;
  }
  .lp-footer-social-btn:hover { background:rgba(37,99,235,0.25); border-color:var(--blue-400); }

  /* ---------- RESPONSIVE ---------- */
  @media (max-width: 900px) {
    .lp-hero { flex-direction:column; padding: 100px 5vw 60px; min-height: auto; }
    .lp-hero-visual { position:relative; right:auto; top:auto; transform:none; width:100%; max-width:480px; margin:48px auto 0; }
    .lp-about-grid, .lp-contact-grid { grid-template-columns:1fr; gap:40px; }
    .lp-form-row { grid-template-columns:1fr; }
    .lp-nav-links { display:none; }
    .lp-section { padding: 72px 5vw; }
  }
  @media (max-width: 600px) {
    .lp-hero-title { font-size:2.2rem; }
    .lp-hero-stats { gap:20px; }
    .lp-service-card { padding:24px 20px; }
    .lp-form-wrap { padding:28px 20px; }
  }

  /* Upload input hidden */
  .lp-file-input { display:none; }
`;

// Image slot component
function ImgSlot({ src, onUpload, className, style, rounded = "20px", aspect = "16/9" }) {
  const ref = useRef();
  return (
    <div
      style={{ borderRadius: rounded, overflow: "hidden", aspectRatio: aspect, background: "#eff6ff", ...style }}
      className={className}
    >
      {src ? (
        <img src={src} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} onClick={() => ref.current.click()} />
      ) : (
        <div
          onClick={() => ref.current.click()}
          style={{
            width:"100%", height:"100%",
            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
            gap:"10px",
            background: "linear-gradient(135deg, rgba(37,99,235,0.06), rgba(6,182,212,0.04))",
            border: "2px dashed rgba(37,99,235,0.2)",
            borderRadius: rounded,
            cursor:"pointer",
            transition:"all 0.25s",
            padding:"20px", textAlign:"center",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(37,99,235,0.45)"; e.currentTarget.style.background="rgba(37,99,235,0.08)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(37,99,235,0.2)"; e.currentTarget.style.background="linear-gradient(135deg, rgba(37,99,235,0.06), rgba(6,182,212,0.04))"; }}
        >
          <div style={{ fontSize:"2rem", opacity:0.5 }}>🖼️</div>
          <div style={{ fontSize:"0.78rem", fontWeight:600, color:"#2563eb", opacity:0.7 }}>Click to upload image</div>
          <div style={{ fontSize:"0.7rem", color:"#94a3b8" }}>JPG, PNG, WebP</div>
        </div>
      )}
      <input ref={ref} type="file" accept="image/*" className="lp-file-input" onChange={e => {
        if (e.target.files[0]) onUpload(URL.createObjectURL(e.target.files[0]));
      }} />
    </div>
  );
}

// Scroll reveal hook
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const SERVICES = [
  { icon: "🎯", name: "Influencer Marketing", desc: "Connect with the right creators to amplify your brand message and reach your target audience authentically." },
  { icon: "📊", name: "Campaign Analytics", desc: "Deep data insights on every campaign — reach, engagement, conversions, and ROI tracked in real time." },
  { icon: "🤝", name: "Brand Partnerships", desc: "Forge long-term collaborations between brands and creators that drive sustained growth and loyalty." },
  { icon: "✨", name: "Content Strategy", desc: "End-to-end content planning and creative direction tailored to platform algorithms and audience behavior." },
  { icon: "🚀", name: "Growth Acceleration", desc: "Supercharge your follower growth and brand awareness through data-driven influencer amplification." },
  { icon: "🛡️", name: "Compliance & Safety", desc: "Ensure every collaboration meets platform guidelines, disclosure norms, and brand safety standards." },
];

const TESTIMONIALS = [
  { quote: "This platform completely changed how we work with creators. Our ROI tripled in just two months.", name: "Ananya Kapoor", role: "CMO, FitZone Pro", icon: "👩‍💼", stars: 5 },
  { quote: "Finding the right brand partners used to take weeks. Now it takes hours. Absolute game changer.", name: "Rishi Malhotra", role: "Tech Influencer, 420K subs", icon: "🎙️", stars: 5 },
  { quote: "The analytics dashboard is incredible. We can see exactly what's working and double down on it.", name: "Priya Desai", role: "Marketing Lead, TasteIt", icon: "📱", stars: 5 },
];

const HOW_IT_WORKS = [
  { num: "01", title: "Create Your Profile", desc: "Set up your influencer or brand profile with all the details that matter most to partners." },
  { num: "02", title: "Discover & Match", desc: "Browse verified profiles filtered by niche, audience, budget, and platform preferences." },
  { num: "03", title: "Collaborate & Create", desc: "Connect directly, align on deliverables, and launch campaigns that resonate and convert." },
  { num: "04", title: "Track & Scale", desc: "Monitor performance metrics and scale what works — continuously and efficiently." },
];

const MARQUEE_ITEMS = ["Influencer Marketing","Brand Partnerships","Content Strategy","Audience Growth","Campaign Analytics","ROI Tracking","Creator Economy","Authentic Reach"];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [imgs, setImgs] = useState({
    hero: null,
    service1: null, service2: null, service3: null, service4: null, service5: null, service6: null,
    about_main: null, about_sm1: null, about_sm2: null,
    contact: null,
  });
  const [toast, setToast] = useState(false);

  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const setImg = (key, url) => setImgs(prev => ({ ...prev, [key]: url }));

  const handleContact = (e) => {
    e.preventDefault();
    setToast(true);
    setTimeout(() => setToast(false), 3500);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="lp-root">

        {/* NAV */}
        <nav className={`lp-nav ${scrolled ? "scrolled" : ""}`}>
          <div className="lp-logo">Collab<span>X</span></div>
          <ul className="lp-nav-links">
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#how">How It Works</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <button className="lp-nav-cta">Get Started →</button>
        </nav>

{/* HERO */}
<section className="lp-hero" id="home">
  <div className="lp-hero-bg-grid" />
  <div className="lp-hero-blob1" />
  <div className="lp-hero-blob2" />

  <div className="lp-hero-content">
    <div className="lp-hero-eyebrow">
      <span className="lp-hero-dot" />
      India's #1 Influencer Platform
    </div>
    <h1 className="lp-hero-title">
      <span 
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          // You can handle saving the text here if needed, e.g., console.log(e.target.innerText)
        }}
        style={{ outline: "none" }}
      >
        Where Brands Meet
      </span>
      <br />
      <span 
        className="lp-hero-title-accent"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          // You can handle saving the text here if needed
        }}
        style={{ outline: "none" }}
      >
        Real Creators
      </span>
    </h1>
    <p className="lp-hero-sub">
      CollabX connects brands with the perfect influencers — from nano creators to mega stars — to run campaigns that actually convert.
    </p>
    <div className="lp-hero-btns">
      <a href="#services" className="btn-primary">Explore Services →</a>
      <a href="#how" className="btn-ghost">▶ See How It Works</a>
    </div>
    <div className="lp-hero-stats">
      <div className="lp-stat-item">
        <div className="lp-stat-num">12K+</div>
        <div className="lp-stat-label">Verified Creators</div>
      </div>
      <div className="lp-stat-item">
        <div className="lp-stat-num">3,400+</div>
        <div className="lp-stat-label">Brand Campaigns</div>
      </div>
      <div className="lp-stat-item">
        <div className="lp-stat-num">98%</div>
        <div className="lp-stat-label">Client Satisfaction</div>
      </div>
    </div>
  </div>

  <div className="lp-hero-visual">
    <div className="lp-hero-ring" />
    <div className="lp-hero-img-wrap">
      <ImgSlot src={imgs.hero} onUpload={url => setImg("hero", url)} rounded="28px" aspect="4/3" />
    </div>
    <div className="lp-hero-badge">
      <div className="lp-hero-badge-icon">🚀</div>
      <div>
        <div className="lp-hero-badge-text">Campaign Live!</div>
        <div className="lp-hero-badge-sub">+2.4M Impressions Today</div>
      </div>
    </div>
  </div>
</section>

        {/* MARQUEE */}
        <div className="lp-marquee-wrap">
          <div className="lp-marquee-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <div key={i} className="lp-marquee-item">
                <div className="lp-marquee-dot" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* SERVICES */}
        <section className="lp-section alt" id="services">
          <div className="lp-section-header center reveal">
            <span className="lp-section-tag">Our Services</span>
            <h2 className="lp-section-title">Everything You Need to<br />Run Winning Campaigns</h2>
            <p className="lp-section-sub">From discovery to delivery, we power every stage of your influencer marketing journey.</p>
          </div>
          <div className="lp-services-grid">
            {SERVICES.map((svc, i) => (
              <div className="lp-service-card reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <ImgSlot
                  src={imgs[`service${i+1}`]}
                  onUpload={url => setImg(`service${i+1}`, url)}
                  style={{ marginBottom: 20 }}
                  rounded="14px"
                  aspect="16/9"
                />
                <div className="lp-service-icon">{svc.icon}</div>
                <div className="lp-service-name">{svc.name}</div>
                <div className="lp-service-desc">{svc.desc}</div>
                <div className="lp-service-arrow">Learn more →</div>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section className="lp-section" id="about">
          <div className="lp-about-grid">
            <div className="reveal-left">
              <div className="lp-about-img-grid">
                <div className="lp-about-img-main">
                  <ImgSlot src={imgs.about_main} onUpload={url => setImg("about_main", url)} rounded="20px" aspect="16/9" />
                </div>
                <div className="lp-about-img-sm">
                  <ImgSlot src={imgs.about_sm1} onUpload={url => setImg("about_sm1", url)} rounded="16px" aspect="1" />
                </div>
                <div className="lp-about-img-sm">
                  <ImgSlot src={imgs.about_sm2} onUpload={url => setImg("about_sm2", url)} rounded="16px" aspect="1" />
                </div>
              </div>
            </div>
            <div className="reveal-right">
              <span className="lp-section-tag">About Us</span>
              <h2 className="lp-section-title">Built for the New Era of Creator Commerce</h2>
              <p className="lp-section-sub">We're a team of marketers, engineers, and creators who believe the future of advertising is authentic human connection.</p>
              <div className="lp-features-list">
                {[
                  { icon:"🎯", title:"Precision Matching", desc:"AI-powered matchmaking ensures you find the exact right creator for your niche and budget." },
                  { icon:"🔒", title:"Verified Profiles", desc:"Every influencer on our platform is verified for authenticity — no fake followers, ever." },
                  { icon:"📈", title:"Proven ROI", desc:"Our campaigns average 4.2x return on ad spend across all categories and platforms." },
                ].map((f,i) => (
                  <div className="lp-feature-item" key={i}>
                    <div className="lp-feature-icon">{f.icon}</div>
                    <div>
                      <div className="lp-feature-title">{f.title}</div>
                      <div className="lp-feature-desc">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="lp-section dark" id="how">
          <div className="lp-section-header center reveal">
            <span className="lp-section-tag">How It Works</span>
            <h2 className="lp-section-title">From Zero to Campaign Live<br />in Four Simple Steps</h2>
            <p className="lp-section-sub">Our streamlined process gets brands and creators collaborating faster than ever before.</p>
          </div>
          <div className="lp-steps-grid">
            {HOW_IT_WORKS.map((step, i) => (
              <div className="lp-step reveal" key={i} style={{ transitionDelay:`${i*0.12}s` }}>
                <div className="lp-step-num">{step.num}</div>
                <div className="lp-step-title">{step.title}</div>
                <div className="lp-step-desc">{step.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="lp-section alt" id="testimonials">
          <div className="lp-section-header center reveal">
            <span className="lp-section-tag">Testimonials</span>
            <h2 className="lp-section-title">Loved by Brands<br />and Creators Alike</h2>
            <p className="lp-section-sub">Don't take our word for it — hear from people who've scaled their growth with CollabX.</p>
          </div>
          <div className="lp-testi-grid">
            {TESTIMONIALS.map((t,i) => (
              <div className="lp-testi-card reveal" key={i} style={{ transitionDelay:`${i*0.1}s` }}>
                <div className="lp-testi-stars">{"★".repeat(t.stars)}</div>
                <div className="lp-testi-quote">"</div>
                <div className="lp-testi-text">{t.quote}</div>
                <div className="lp-testi-author">
                  <div className="lp-testi-avatar">{t.icon}</div>
                  <div>
                    <div className="lp-testi-name">{t.name}</div>
                    <div className="lp-testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="lp-section" id="contact">
          <div className="lp-contact-grid">
            <div className="reveal-left">
              <span className="lp-section-tag">Contact Us</span>
              <h2 className="lp-section-title">Let's Start Something Big Together</h2>
              <p className="lp-section-sub">Whether you're a brand ready to launch or a creator looking for opportunities — we're here for you.</p>
              <div className="lp-contact-info-items">
                {[
                  { icon:"📧", label:"Email", val:"hello@collabx.in" },
                  { icon:"📞", label:"Phone", val:"+91 98765 43210" },
                  { icon:"📍", label:"Office", val:"Mumbai, Maharashtra, India" },
                  { icon:"⏰", label:"Working Hours", val:"Mon–Sat, 9 AM – 7 PM" },
                ].map((item,i) => (
                  <div className="lp-contact-info-item" key={i}>
                    <div className="lp-contact-icon">{item.icon}</div>
                    <div>
                      <div className="lp-contact-label">{item.label}</div>
                      <div className="lp-contact-value">{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="lp-contact-img-wrap">
                <ImgSlot src={imgs.contact} onUpload={url => setImg("contact", url)} rounded="20px" aspect="4/3" />
              </div>
            </div>
            <div className="reveal-right">
              <div className="lp-form-wrap">
                <div className="lp-form-title">Send Us a Message ✉️</div>
                <form onSubmit={handleContact}>
                  <div className="lp-form-row">
                    <div className="lp-form-field">
                      <label className="lp-form-label">First Name</label>
                      <input className="lp-form-input" placeholder="Rahul" />
                    </div>
                    <div className="lp-form-field">
                      <label className="lp-form-label">Last Name</label>
                      <input className="lp-form-input" placeholder="Sharma" />
                    </div>
                  </div>
                  <div className="lp-form-field">
                    <label className="lp-form-label">Email</label>
                    <input className="lp-form-input" type="email" placeholder="you@email.com" />
                  </div>
                  <div className="lp-form-field">
                    <label className="lp-form-label">Phone</label>
                    <input className="lp-form-input" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="lp-form-field">
                    <label className="lp-form-label">I Am A…</label>
                    <select className="lp-form-select" defaultValue="">
                      <option value="" disabled>Select your role</option>
                      <option>Influencer / Creator</option>
                      <option>Brand / Marketer</option>
                      <option>Agency</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="lp-form-field">
                    <label className="lp-form-label">Subject</label>
                    <input className="lp-form-input" placeholder="What's this about?" />
                  </div>
                  <div className="lp-form-field">
                    <label className="lp-form-label">Message</label>
                    <textarea className="lp-form-textarea" placeholder="Tell us how we can help you..." />
                  </div>
                  <button type="submit" className="lp-form-submit">Send Message 🚀</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="lp-footer">
          <div className="lp-footer-top">
            <div className="lp-footer-brand">
              <div className="lp-logo">Collab<span>X</span></div>
              <div className="lp-footer-tagline">India's leading influencer-brand matchmaking platform. Real creators, real results.</div>
            </div>
            <div className="lp-footer-links-group">
              <div className="lp-footer-links-title">Company</div>
              <ul className="lp-footer-links">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Press</a></li>
              </ul>
            </div>
            <div className="lp-footer-links-group">
              <div className="lp-footer-links-title">Services</div>
              <ul className="lp-footer-links">
                <li><a href="#">For Brands</a></li>
                <li><a href="#">For Creators</a></li>
                <li><a href="#">Analytics</a></li>
                <li><a href="#">Pricing</a></li>
              </ul>
            </div>
            <div className="lp-footer-links-group">
              <div className="lp-footer-links-title">Legal</div>
              <ul className="lp-footer-links">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="lp-footer-bottom">
            <div>© 2026 CollabX. All rights reserved.</div>
            <div className="lp-footer-social">
              {["📸","▶️","🐦","💼"].map((icon,i) => (
                <div key={i} className="lp-footer-social-btn">{icon}</div>
              ))}
            </div>
          </div>
        </footer>

        {toast && (
          <div style={{
            position:"fixed", bottom:32, left:"50%", transform:"translateX(-50%)",
            background:"linear-gradient(135deg,#1a3f7a,#2563eb)",
            color:"white", padding:"14px 28px", borderRadius:14,
            fontFamily:"'Sora',sans-serif", fontWeight:600, fontSize:"0.9rem",
            boxShadow:"0 8px 32px rgba(0,0,0,0.3)", zIndex:9999,
            border:"1px solid rgba(96,165,250,0.3)",
            display:"flex", alignItems:"center", gap:10,
            animation:"fadeInUp 0.4s ease",
          }}>
            ✅ Message sent! We'll get back to you within 24 hours.
          </div>
        )}
      </div>
    </>
  );
}
