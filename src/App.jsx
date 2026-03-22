// ============================================================
//  App.jsx — AKATech · Redesign Skeuomorphisme Vert/Noir
// ============================================================
import { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import {
  TrendingUp, Users, Clock, Award,
  MessageCircle, Phone, Mail, MapPin, Send,
  Github, Linkedin, Facebook,
  ChevronRight, ChevronLeft,
  ArrowRight, Monitor,
  Zap, Palette, SlidersHorizontal, Headphones, Search, ShieldCheck,
  Star, ExternalLink, Lock,
  Globe, ShoppingCart, Cpu, Server, Wrench,
  MessageSquare, Target, Code, Rocket,
  Check, Menu, X, Play,
  Timer, ShieldCheck as ShieldCheckIcon,
  User, BadgeCheck,
} from 'lucide-react'

// ── PERFORMANCE : LAZY IMAGE ──────────────────────────────────
// Intersection Observer — charge l'image seulement quand visible
function LazyImg({ src, alt, style, className, onError, placeholder }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError]   = useState(false)
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    // Browsers qui supportent native lazy (fallback immédiat)
    if ('loading' in HTMLImageElement.prototype) { setVisible(true); return }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { rootMargin: '200px' }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const handleError = (e) => { setError(true); onError?.(e) }

  return (
    <div ref={ref} style={{ position:'relative', width:'100%', height:'100%', overflow:'hidden', ...(!loaded && !error ? { background:'linear-gradient(135deg,#0a1a0e,#060e09)' } : {}) }}>
      {/* Shimmer skeleton pendant le chargement */}
      {!loaded && !error && visible && (
        <div style={{
          position:'absolute', inset:0,
          background:'linear-gradient(90deg,#0a1a0e 0%,#0e2416 40%,#0a1a0e 80%)',
          backgroundSize:'200% 100%',
          animation:'shimmer 1.6s ease-in-out infinite',
        }}/>
      )}
      {visible && !error && (
        <img
          src={src} alt={alt || ''}
          loading="lazy"
          decoding="async"
          className={className}
          style={{ ...style, opacity: loaded ? 1 : 0, transition:'opacity .4s ease' }}
          onLoad={() => setLoaded(true)}
          onError={handleError}
        />
      )}
      {error && placeholder}
    </div>
  )
}

// ── GLOBAL STYLES INJECTION ──────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=JetBrains+Mono:wght@300;400;600&family=Orbitron:wght@700;900&display=swap');

  :root {
    --g1:#22c864; --g2:#1fb865; --g3:#17a354; --g5:#66ffaa;
    --dark1:#030806; --dark2:#060e09; --dark3:#0a1a0e; --dark4:#0d2415;
    --card:#0b1a10; --card2:#0e2016;
    --border:rgba(34,200,100,.14); --border2:rgba(34,200,100,.28);
    --skeu-shadow: 8px 8px 20px #010402, -4px -4px 14px rgba(34,200,100,.06);
    --skeu-inset: inset 3px 3px 8px #010402, inset -2px -2px 6px rgba(34,200,100,.08);
    --glow: 0 0 30px rgba(34,200,100,.25);
    --glow-lg: 0 0 60px rgba(34,200,100,.3), 0 0 120px rgba(34,200,100,.1);
    --text-main: rgba(255,255,255,.85);
    --text-sub: rgba(255,255,255,.5);
    --text-muted: rgba(255,255,255,.3);
  }

  /* ── LIGHT MODE : uniquement ce que le hook JS ne gère pas ── */
  body.light-mode { background:#ffffff; color:#111111; }

  /* Scrollbar */
  body.light-mode ::-webkit-scrollbar-track { background:#f0f0f0; }
  body.light-mode ::-webkit-scrollbar-thumb { background:#16a34a; }

  /* Nav scrolled */
  body.light-mode .nav-scrolled-bg {
    background: rgba(255,255,255,.95) !important;
    border-bottom-color: rgba(0,0,0,.08) !important;
  }

  /* Cards */
  body.light-mode .sku-card {
    background: #ffffff !important;
    box-shadow: 0 2px 14px rgba(0,0,0,.07) !important;
    border-color: rgba(0,0,0,.08) !important;
  }
  body.light-mode .sku-card:hover {
    box-shadow: 0 6px 24px rgba(0,0,0,.1) !important;
    border-color: rgba(22,163,74,.25) !important;
  }

  /* Boutons */
  body.light-mode .btn-raised { box-shadow: 0 2px 10px rgba(22,163,74,.3) !important; }
  body.light-mode .btn-ghost {
    background: transparent !important; color: #16a34a !important;
    border-color: rgba(22,163,74,.4) !important; box-shadow: none !important;
  }

  /* Section eye + ghost */
  body.light-mode .s-eye { color:#16a34a; }
  body.light-mode .s-eye::before { background:#16a34a; }
  body.light-mode .s-ghost-txt { -webkit-text-stroke:1.5px rgba(0,0,0,.07); }

  /* gradient text */
  body.light-mode .text-gradient-anim {
    background: linear-gradient(135deg,#16a34a,#22c864) !important;
    -webkit-background-clip: text !important; -webkit-text-fill-color: transparent !important;
    background-clip: text !important;
  }

  /* Nav icons + tooltip */
  body.light-mode .nav-icon-btn:hover { background:rgba(0,0,0,.04); }
  body.light-mode .nav-tooltip { background:rgba(255,255,255,.98) !important; color:#111 !important; border-color:rgba(0,0,0,.12) !important; }

  /* Mobile menu */
  body.light-mode .mobile-menu-sheet { background:#ffffff !important; border-top-color:rgba(0,0,0,.08) !important; }
  body.light-mode .mobile-menu-handle { background:rgba(0,0,0,.15) !important; }

  /* Marquee */
  body.light-mode .marquee-item { color:rgba(0,0,0,.4) !important; }
  body.light-mode .marquee-dot  { background:#16a34a !important; }

  /* FAQ */
  body.light-mode .faq-btn:hover { background:rgba(0,0,0,.03) !important; }

  /* Inputs */
  body.light-mode input, body.light-mode textarea, body.light-mode select {
    background: #f5f5f5 !important; color: #111 !important; border-color: rgba(0,0,0,.15) !important;
  }
  body.light-mode input::placeholder, body.light-mode textarea::placeholder { color: #aaa !important; }
  body.light-mode option { background: #fff !important; color: #111 !important; }
  body.light-mode select { color-scheme: light !important; }

  /* Footer */
  body.light-mode footer { background: #f3f3f3 !important; border-top: 1px solid rgba(0,0,0,.07) !important; }

  /* Cursor */
  body.light-mode #micro-cursor { background:#16a34a !important; box-shadow:0 0 8px rgba(22,163,74,.5) !important; }

  /* Theme toggle */
  body.light-mode .theme-toggle { background:rgba(0,0,0,.05) !important; border-color:rgba(0,0,0,.12) !important; color:rgba(0,0,0,.6) !important; }
  body.light-mode .theme-toggle:hover { background:rgba(0,0,0,.09) !important; color:#111 !important; }

  /* Theme toggle button */
  .theme-toggle {
    display:flex; align-items:center; justify-content:center;
    width:36px; height:36px; border-radius:50%; border:none; cursor:pointer;
    background:rgba(34,200,100,.08); border:1px solid rgba(34,200,100,.2);
    color:rgba(255,255,255,.6); transition:all .3s cubic-bezier(.22,1,.36,1);
    flex-shrink:0; position:relative; overflow:hidden;
  }
  .theme-toggle:hover { background:rgba(34,200,100,.15); color:#66ffaa; border-color:rgba(34,200,100,.4); transform:scale(1.08); box-shadow:0 0 16px rgba(34,200,100,.2); }
  body.light-mode .theme-toggle { background:rgba(20,160,70,.1); border-color:rgba(20,160,70,.25); color:rgba(10,40,20,.6); }
  body.light-mode .theme-toggle:hover { background:rgba(20,160,70,.18); color:#0e7a38; }
  @keyframes theme-spin { from{transform:rotate(0deg) scale(1)} to{transform:rotate(360deg) scale(1)} }
  .theme-toggle.spinning svg { animation:theme-spin .4s cubic-bezier(.22,1,.36,1) forwards; }
  ::-webkit-scrollbar { width:3px; }
  ::-webkit-scrollbar-track { background:var(--dark2); }
  ::-webkit-scrollbar-thumb { background:var(--g1); border-radius:2px; }

  a { text-decoration:none; color:inherit; }
  img { max-width:100%; display:block; object-fit:cover; }

  /* ── SKEUOMORPHIC CARD ── */
  .sku-card {
    background:linear-gradient(145deg, var(--card2), var(--card));
    box-shadow: var(--skeu-shadow);
    border:1px solid var(--border);
    border-radius:18px;
    transition:all .3s cubic-bezier(.22,1,.36,1);
  }
  .sku-card:hover {
    box-shadow: 10px 10px 28px #010402, -4px -4px 18px rgba(34,200,100,.1), var(--glow);
    border-color: var(--border2);
    transform:translateY(-4px);
  }

  /* ── RAISED BUTTON ── */
  .btn-raised {
    display:inline-flex; align-items:center; gap:.5rem;
    padding:.85rem 2rem;
    background:linear-gradient(145deg,#27d570,#1aa355);
    color:#fff; font-family:'Syne',sans-serif; font-weight:700; font-size:.9rem;
    border-radius:10px; border:none; cursor:pointer;
    box-shadow: 4px 4px 12px rgba(0,0,0,.6), -2px -2px 8px rgba(100,255,150,.12), inset 0 1px 0 rgba(255,255,255,.15), inset 0 -1px 0 rgba(0,0,0,.2);
    transition:all .22s;
    position:relative; overflow:hidden;
  }
  .btn-raised::after {
    content:''; position:absolute; inset:0;
    background:linear-gradient(120deg,transparent 30%,rgba(255,255,255,.15) 50%,transparent 70%);
    transform:translateX(-100%); transition:.4s;
  }
  .btn-raised:hover { transform:translateY(-2px); box-shadow:6px 6px 18px rgba(0,0,0,.7), -2px -2px 10px rgba(100,255,150,.15), var(--glow); }
  .btn-raised:hover::after { transform:translateX(100%); }
  .btn-raised:active { transform:translateY(1px); box-shadow:2px 2px 8px rgba(0,0,0,.6); }

  /* ── GHOST BUTTON ── */
  .btn-ghost {
    display:inline-flex; align-items:center; gap:.5rem;
    padding:.85rem 2rem;
    background:linear-gradient(145deg, rgba(34,200,100,.06), rgba(34,200,100,.02));
    color:var(--g5); font-family:'Syne',sans-serif; font-weight:700; font-size:.9rem;
    border-radius:10px;
    border:1px solid var(--border2);
    box-shadow: 4px 4px 12px rgba(0,0,0,.5), -2px -2px 8px rgba(34,200,100,.04), inset 0 1px 0 rgba(34,200,100,.08);
    cursor:pointer; transition:all .22s;
  }
  .btn-ghost:hover { background:linear-gradient(145deg, rgba(34,200,100,.12), rgba(34,200,100,.04)); box-shadow: 4px 4px 14px rgba(0,0,0,.6), var(--glow); transform:translateY(-2px); }

  /* ── SECTION EYE ── */
  .s-eye {
    display:inline-flex; align-items:center; gap:.5rem;
    font-family:'JetBrains Mono',monospace; font-size:.65rem;
    letter-spacing:.14em; color:var(--g1); text-transform:uppercase;
    margin-bottom:.8rem;
  }
  .s-eye::before { content:''; width:22px; height:1.5px; background:var(--g1); display:inline-block; }

  /* ── ANIMATIONS ── */
  @keyframes orbPulse { 0%,100%{transform:scale(1);opacity:.7} 50%{transform:scale(1.08);opacity:.95} }
  @keyframes marquee  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes float-y  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes pulse-ring { 0%{transform:scale(1);opacity:.8} 100%{transform:scale(2);opacity:0} }
  @keyframes gearSpin { to{transform:rotate(360deg)} }
  @keyframes gearCnt  { to{transform:rotate(-360deg)} }
  @keyframes akaGlowPulse { 0%,100%{filter:drop-shadow(0 0 7px rgba(34,200,100,.4))} 50%{filter:drop-shadow(0 0 18px rgba(34,200,100,.8))} }
  @keyframes akaTextIn { from{opacity:0;transform:translateX(-14px)} to{opacity:1;transform:translateX(0)} }
  @keyframes akaLineExpand { from{transform:scaleX(0);opacity:0} to{transform:scaleX(1);opacity:1} }
  @keyframes akaFadeSlide { from{opacity:0;transform:translateY(3px)} to{opacity:1;transform:translateY(0)} }
  @keyframes akaScan { 0%{background-position:0 -40px} 100%{background-position:0 200%} }
  @keyframes akaDotPulse { 0%,100%{opacity:.5} 50%{opacity:1} }
  @keyframes akaLineTrace { 0%{stroke-dashoffset:44;opacity:.3} 50%{stroke-dashoffset:0;opacity:1} 100%{stroke-dashoffset:-44;opacity:.3} }
  @keyframes akaParticle { 0%{opacity:0;transform:translate(0,0) scale(.4)} 20%{opacity:.8} 80%{opacity:.35} 100%{opacity:0;transform:translate(var(--ptx),var(--pty)) scale(0)} }
  @keyframes shimmer { 0%{background-position:-400% 0} 100%{background-position:400% 0} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

  /* ── CAROUSEL ── */
  .carousel-track { display:flex; will-change:transform; }
  .no-select { user-select:none; -webkit-user-select:none; }

  /* ── IMG PLACEHOLDER ── */
  .img-ph {
    display:flex; align-items:center; justify-content:center;
    background:linear-gradient(135deg, var(--dark3), var(--dark4));
    color:var(--g1); font-family:'JetBrains Mono',monospace;
    font-size:.65rem; letter-spacing:.08em; text-transform:uppercase;
    flex-direction:column; gap:.4rem;
  }

  /* ── GRID PATTERN ── */
  .grid-bg {
    background-image:linear-gradient(rgba(34,200,100,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(34,200,100,.04) 1px,transparent 1px);
    background-size:50px 50px;
  }

  /* ── NOISE OVERLAY ── */
  .noise::after {
    content:'';position:absolute;inset:0;pointer-events:none;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    opacity:.4;z-index:0;
  }

  /* ── RESPONSIVE GRIDS ── */
  /* ── CONTACT (nouveau système) ── */
  .contact-grid         { display:grid; grid-template-columns:1fr 1.55fr; gap:2.5rem; align-items:start; }
  .contact-left-mobile  { min-width:0; }
  .contact-right-mobile { min-width:0; }
  .contact-section      { padding:7rem 5%; overflow:hidden; }
  .contact-input        { width:100%; max-width:100%; box-sizing:border-box; min-width:0; display:block; }
  .contact-form         { width:100%; min-width:0; box-sizing:border-box; }
  .contact-card-inner   { width:100%; min-width:0; overflow:hidden; box-sizing:border-box; }

  /* Grille contact redessinée */
  .ctt-grid {
    display:grid;
    grid-template-columns:1fr 1.5fr;
    gap:2rem;
    align-items:start;
    width:100%;
    box-sizing:border-box;
  }
  .ctt-form-col { min-width:0; width:100%; box-sizing:border-box; }
  .ctt-info-col { min-width:0; width:100%; box-sizing:border-box; }
  .ctt-row {
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:.8rem;
    width:100%;
    box-sizing:border-box;
  }
  .ctt-field {
    display:flex;
    flex-direction:column;
    gap:.35rem;
    min-width:0;
    width:100%;
    box-sizing:border-box;
  }
  .ctt-label {
    font-family:'JetBrains Mono',monospace;
    font-size:.57rem;
    letter-spacing:.1em;
    color:rgba(34,200,100,.55);
    text-transform:uppercase;
  }
  .form-row       { display:grid; grid-template-columns:1fr 1fr; gap:.9rem; }
  .services-grid  { display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:1.2rem; }
  .trust-grid     { display:grid; grid-template-columns:repeat(4,1fr); gap:1rem; }
  .process-grid   { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:1.2rem; }
  .footer-grid    { display:grid; grid-template-columns:2fr 1fr 1fr 1.2fr; gap:3rem; }
  .pricing-grid   { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:1.4rem; }
  .contact-socials{ display:grid; grid-template-columns:repeat(2,1fr); gap:.7rem; }
  .contact-stat   { display:grid; grid-template-columns:repeat(3,1fr); gap:.7rem; }

  /* ── ABOUT GRID ── */
  .about-grid     { display:grid; grid-template-columns:1fr 1fr; gap:3rem; align-items:center; }
  .about-photos   { display:grid; grid-template-columns:1fr 1fr; grid-template-rows:200px 160px; gap:.8rem; }
  .about-stats    { display:grid; grid-template-columns:repeat(3,1fr); gap:.8rem; }

  /* ── ADVANCED ANIMATION UTILITIES ── */
  @keyframes gradientShift {
    0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%}
  }
  @keyframes borderGlow {
    0%,100%{box-shadow:0 0 8px rgba(34,200,100,.2),inset 0 0 8px rgba(34,200,100,.04)}
    50%{box-shadow:0 0 28px rgba(34,200,100,.5),inset 0 0 14px rgba(34,200,100,.1)}
  }
  @keyframes slideInLeft  { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
  @keyframes slideInRight { from{opacity:0;transform:translateX(40px)}  to{opacity:1;transform:translateX(0)} }
  @keyframes countUp      { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  @keyframes revealLine   { from{width:0;opacity:0} to{width:100%;opacity:1} }
  @keyframes typewriter   { from{width:0} to{width:100%} }
  @keyframes blink        { 0%,100%{opacity:1} 50%{opacity:0} }

  .animated-border {
    position:relative;
  }
  .animated-border::after {
    content:''; position:absolute; bottom:-2px; left:0; width:0; height:2px;
    background:linear-gradient(90deg,#22c864,#66ffaa);
    transition:width .4s ease;
  }
  .animated-border:hover::after { width:100%; }

  .text-gradient-anim {
    background:linear-gradient(270deg,#22c864,#66ffaa,#17a354,#22c864);
    background-size:300% 300%;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-clip:text;
    animation:gradientShift 4s ease infinite;
  }

  .card-glow-anim { animation:borderGlow 3s ease-in-out infinite; }

  /* ── STAGGER REVEAL ── */
  .stagger-child { opacity:0; transform:translateY(24px); transition:opacity .6s ease, transform .6s ease; }
  .stagger-child.visible { opacity:1; transform:translateY(0); }

  /* ── MICRO-INTERACTIONS ── */
  #micro-cursor {
    position:fixed; top:0; left:0; pointer-events:none; z-index:99999;
    width:8px; height:8px; border-radius:50%;
    background:#22c864; box-shadow:0 0 12px rgba(34,200,100,.8);
    transform:translate(-50%,-50%);
    transition:width .18s,height .18s,opacity .18s,background .18s;
    mix-blend-mode:screen;
  }
  #micro-cursor.big { width:34px; height:34px; background:rgba(34,200,100,.1); border:1.5px solid rgba(34,200,100,.55); box-shadow:0 0 20px rgba(34,200,100,.35); }
  #micro-cursor.click { width:16px; height:16px; background:rgba(34,200,100,.65); }

  @keyframes ripple-out { 0%{transform:translate(-50%,-50%) scale(0);opacity:.55} 100%{transform:translate(-50%,-50%) scale(4);opacity:0} }
  .ripple-dot { position:fixed; pointer-events:none; z-index:99998; width:28px; height:28px; border-radius:50%; background:radial-gradient(circle,rgba(34,200,100,.55),transparent 70%); transform:translate(-50%,-50%) scale(0); animation:ripple-out .55s ease-out forwards; }

  .nav-link-wrap { position:relative; display:inline-block; }
  .nav-link-wrap::after { content:''; position:absolute; bottom:-2px; left:50%; right:50%; height:2px; border-radius:2px; background:linear-gradient(90deg,#22c864,#66ffaa); transition:left .25s ease,right .25s ease; }
  .nav-link-wrap:hover::after { left:0; right:0; }

  /* ── NAV HAMBURGER : visible mobile, caché desktop ── */
  .nav-hamburger { display:flex; }
  @media(min-width:768px){ .nav-hamburger { display:none !important; } }

  /* ── NAV ICON LIST : visible desktop, cachée mobile ── */
  .nav-icon-list { display:none; }
  @media(min-width:768px){ .nav-icon-list { display:flex !important; } }
  .nav-icon-btn { position:relative; display:flex; flex-direction:column; align-items:center; gap:2px; padding:.45rem .7rem; cursor:pointer; border-radius:10px; transition:background .2s, color .2s; }
  .nav-icon-btn:hover { background:rgba(34,200,100,.07); }
  .nav-icon-btn svg { transition:filter .25s, transform .25s; }
  .nav-icon-btn:hover svg { filter:drop-shadow(0 0 5px var(--g1)); transform:scale(1.18); }
  .nav-tooltip {
    position:absolute; top:calc(100% + 8px); left:50%; transform:translateX(-50%) translateY(-4px);
    background:rgba(6,14,9,.96); border:1px solid rgba(34,200,100,.28); border-radius:8px;
    padding:.3rem .75rem; font-family:'JetBrains Mono',monospace; font-size:.6rem;
    letter-spacing:.09em; color:#66ffaa; text-transform:uppercase; white-space:nowrap;
    pointer-events:none; opacity:0; transition:opacity .18s, transform .18s;
    box-shadow:0 4px 18px rgba(0,0,0,.55); z-index:9999;
  }
  .nav-icon-btn:hover .nav-tooltip { opacity:1; transform:translateX(-50%) translateY(0); }
  .nav-tooltip::before {
    content:''; position:absolute; top:-5px; left:50%; transform:translateX(-50%);
    border:5px solid transparent; border-top:none; border-bottom:5px solid rgba(34,200,100,.28);
    filter:drop-shadow(0 -1px 0 rgba(34,200,100,.28));
  }

  /* ── SECTION GHOST TITLE ── */
  .s-ghost-wrap { position:relative; display:inline-block; }
  .s-ghost-txt {
    position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
    font-family:'Orbitron','Arial Black',sans-serif; font-weight:900;
    font-size:clamp(3.5rem,9vw,8rem); white-space:nowrap; pointer-events:none;
    color:transparent; -webkit-text-stroke:1px rgba(34,200,100,.07);
    letter-spacing:.06em; text-transform:uppercase; user-select:none; z-index:0;
    animation:ghost-drift 8s ease-in-out infinite;
  }
  @keyframes ghost-drift { 0%,100%{opacity:.65;transform:translate(-50%,-50%) scale(1)} 50%{opacity:.9;transform:translate(-50%,-52%) scale(1.01)} }

  .marquee-item { transition:color .2s,text-shadow .2s; cursor:default; }
  .marquee-item:hover { color:rgba(34,200,100,.9) !important; text-shadow:0 0 12px rgba(34,200,100,.5); }
  .marquee-item:hover .marquee-dot { transform:scale(1.8); background:#66ffaa; box-shadow:0 0 8px rgba(34,200,100,.8); }
  .marquee-dot { transition:transform .2s,background .2s,box-shadow .2s; }

  @keyframes tag-bounce { 0%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} 70%{transform:translateY(-2px)} }
  .skill-tag { cursor:default; transition:background .2s,border-color .2s,color .2s,box-shadow .2s; }
  .skill-tag:hover { background:rgba(34,200,100,.18) !important; border-color:rgba(34,200,100,.45) !important; color:#66ffaa !important; box-shadow:0 0 14px rgba(34,200,100,.25); animation:tag-bounce .4s ease; }

  .feat-row { transition:color .18s,padding-left .18s; cursor:default; color:rgba(255,255,255,.6); }
  .feat-row:hover { color:rgba(255,255,255,.9) !important; padding-left:.5rem; }
  .feat-row:hover svg { filter:drop-shadow(0 0 4px rgba(34,200,100,.7)); }
  body.light-mode .feat-row { color:#333333 !important; }
  body.light-mode .feat-row:hover { color:#111111 !important; }

  .pricing-del { color:rgba(255,255,255,.35); }
  body.light-mode .pricing-del { color:#888888 !important; }

  @keyframes star-pop { 0%{transform:scale(1)} 50%{transform:scale(1.5)} 100%{transform:scale(1)} }
  .star-i { cursor:pointer; display:inline-block; transition:filter .2s; }
  .star-i:hover { animation:star-pop .3s ease; filter:drop-shadow(0 0 6px rgba(245,181,0,.9)); }

  .faq-btn { transition:background .2s,padding-left .2s !important; }
  .faq-btn:hover { background:rgba(34,200,100,.04) !important; padding-left:2rem !important; }
  .faq-question { color:#fff; }
  .faq-answer   { color:rgba(255,255,255,.5); }
  body.light-mode .faq-question { color:#111 !important; }
  body.light-mode .faq-answer   { color:#555 !important; }
  body.light-mode .faq-btn:hover { background:rgba(0,0,0,.03) !important; }

  .field-wrap { position:relative; }
  .field-wrap label { transition:color .2s; }
  .field-wrap:focus-within label { color:rgba(34,200,100,.9) !important; }
  .field-bar { position:absolute; bottom:0; left:0; width:0; height:2px; background:linear-gradient(90deg,#22c864,#66ffaa); border-radius:0 0 10px 10px; transition:width .35s ease; opacity:0; pointer-events:none; }
  .field-wrap:focus-within .field-bar { width:100%; opacity:1; }

  @keyframes icon-spin { 0%{transform:rotate(0deg) scale(1)} 50%{transform:rotate(14deg) scale(1.18)} 100%{transform:rotate(0deg) scale(1)} }
  .social-icon-wrap { transition:transform .2s; }
  .social-icon-wrap:hover { animation:icon-spin .4s ease; }

  .proj-img { transition:transform .45s cubic-bezier(.22,1,.36,1),filter .45s; }
  .proj-card:hover .proj-img { transform:scale(1.08); filter:brightness(1.08) saturate(1.1); }

  @keyframes badge-shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  .tech-badge { transition:background .25s,color .25s,border-color .25s; }
  .tech-badge:hover { background:linear-gradient(90deg,rgba(34,200,100,.06),rgba(102,255,170,.14),rgba(34,200,100,.06)); background-size:200% 100%; animation:badge-shimmer .6s ease; color:#66ffaa !important; border-color:rgba(34,200,100,.4) !important; }

  @keyframes connector-pulse { 0%,100%{opacity:.15} 50%{opacity:.5} }
  .proc-connector { animation:connector-pulse 2.4s ease-in-out infinite; }

  /* ── PROCESS SVG ANIMATED ICONS ── */
  @keyframes proc-rotate  { to{transform:rotate(360deg)} }
  @keyframes proc-ping    { 0%{r:3;opacity:.9} 100%{r:9;opacity:0} }
  @keyframes proc-draw    { from{stroke-dashoffset:60} to{stroke-dashoffset:0} }
  @keyframes proc-blink   { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes proc-rise    { from{transform:translateY(5px);opacity:0} to{transform:translateY(0);opacity:1} }
  @keyframes proc-orbit   { from{transform:rotate(0deg) translateX(9px) rotate(0deg)} to{transform:rotate(360deg) translateX(9px) rotate(-360deg)} }
  @keyframes proc-signal  { 0%,100%{opacity:.2} 33%{opacity:1} }
  @keyframes proc-signal2 { 0%,100%{opacity:.2} 66%{opacity:1} }
  @keyframes proc-signal3 { 0%{opacity:.2} 100%{opacity:1} }
  @keyframes proc-check   { from{stroke-dashoffset:22} to{stroke-dashoffset:0} }
  @keyframes proc-float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
  .proc-icon svg { overflow:visible; }

  @keyframes arrow-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
  #btn-top:hover svg { animation:arrow-bounce .5s ease infinite; }

  .footer-link { transition:color .2s,padding-left .18s !important; }
  .footer-link:hover { padding-left:.55rem !important; }

  /* ── TABLET ── */
  @media(max-width:1024px){
    .footer-grid  { grid-template-columns:1fr 1fr; }
    .trust-grid   { grid-template-columns:repeat(2,1fr); }
    .about-grid   { grid-template-columns:1fr; gap:2.5rem; }
    .about-photos { grid-template-rows:180px 150px; }
  }

  /* ── MOBILE 768px ── */
  @media(max-width:768px){
    /* ── CONTACT : 1 colonne verticale ── */
    .contact-grid         { grid-template-columns:1fr !important; gap:1.5rem !important; }
    .contact-left-mobile  { order:2 !important; width:100% !important; min-width:0 !important; }
    .contact-right-mobile { order:1 !important; width:100% !important; min-width:0 !important; }
    .contact-card         { padding:1.4rem !important; width:100% !important; box-sizing:border-box !important; overflow:hidden !important; }
    .contact-card-inner   { width:100% !important; overflow:hidden !important; }
    .contact-input        { width:100% !important; max-width:100% !important; box-sizing:border-box !important; }
    .contact-form         { width:100% !important; overflow:hidden !important; }
    .contact-socials      { grid-template-columns:1fr 1fr !important; gap:.6rem; }
    .contact-stat         { grid-template-columns:repeat(3,1fr); gap:.5rem; }
    .form-row             { grid-template-columns:1fr !important; gap:.8rem; }
    /* Nouveau système contact */
    .ctt-grid  { grid-template-columns:1fr !important; gap:1.2rem !important; }
    .ctt-form-col { order:1 !important; }
    .ctt-info-col { order:2 !important; }
    .ctt-row   { grid-template-columns:1fr !important; }

    /* ── LAYOUT GÉNÉRAL ── */
    .footer-grid    { grid-template-columns:1fr 1fr; }
    .about-grid     { grid-template-columns:1fr; gap:2rem; }
    .about-photos   { grid-template-columns:1fr 1fr; grid-template-rows:160px 130px; gap:.6rem; }
    .about-stats    { grid-template-columns:repeat(3,1fr); }
    .temo-card      { padding:1.6rem 1.2rem !important; }
    .btn-raised, .btn-ghost { min-height:48px; }
    h2              { font-size:clamp(1.4rem,5vw,2.1rem) !important; }
    section         { padding-left:4% !important; padding-right:4% !important; }

    /* ── HERO TRUST BAR : 4 colonnes horizontales ── */
    .hero-trust-bar {
      display:grid !important;
      grid-template-columns:repeat(4,1fr) !important;
      gap:.35rem !important;
      padding:.7rem .9rem !important;
      width:100% !important;
      max-width:100% !important;
    }

    /* ── CAROUSELS HORIZONTAUX — largeur raisonnable ── */
    /* Services : ~80vw par carte */
    .svc-scroll {
      overflow-x:auto !important;
      scroll-snap-type:x mandatory !important;
      -webkit-overflow-scrolling:touch;
      scrollbar-width:none;
      display:flex !important;
      gap:.8rem;
      padding:0 4% .5rem !important;
      margin:0 -4%;
    }
    .svc-scroll::-webkit-scrollbar { display:none; }
    .svc-scroll > * {
      scroll-snap-align:start;
      min-width:78vw !important;
      max-width:78vw !important;
      flex-shrink:0 !important;
    }

    /* Trust 2×2 */
    .trust-grid { grid-template-columns:repeat(2,1fr) !important; gap:.7rem !important; }

    /* Process : ~72vw par étape */
    .proc-scroll {
      overflow-x:auto !important;
      scroll-snap-type:x mandatory !important;
      -webkit-overflow-scrolling:touch;
      scrollbar-width:none;
      display:flex !important;
      gap:.8rem;
      padding:0 4% .5rem !important;
      margin:0 -4%;
    }
    .proc-scroll::-webkit-scrollbar { display:none; }
    .proc-scroll > * {
      scroll-snap-align:center;
      min-width:72vw !important;
      max-width:72vw !important;
      flex-shrink:0 !important;
    }

    /* Pricing : ~82vw par plan */
    .pricing-mobile-scroll {
      display:flex !important;
      overflow-x:auto !important;
      scroll-snap-type:x mandatory !important;
      -webkit-overflow-scrolling:touch;
      scrollbar-width:none;
      gap:.8rem;
      padding:0 4% .5rem !important;
      margin:0 -4%;
    }
    .pricing-mobile-scroll::-webkit-scrollbar { display:none; }
    .pricing-mobile-scroll > * {
      scroll-snap-align:start;
      min-width:82vw !important;
      max-width:82vw !important;
      flex-shrink:0 !important;
    }

    /* Pricing tabs scroll */
    .pricing-tabs {
      flex-wrap:nowrap !important;
      overflow-x:auto !important;
      justify-content:flex-start !important;
      padding-bottom:.3rem;
      scrollbar-width:none;
      -webkit-overflow-scrolling:touch;
    }
    .pricing-tabs::-webkit-scrollbar { display:none; }
    .pricing-tabs button { flex-shrink:0 !important; }
  }

  /* ── MOBILE 480px ── */
  @media(max-width:480px){
    .footer-grid          { grid-template-columns:1fr; }
    .contact-socials      { grid-template-columns:1fr 1fr !important; }
    .contact-stat         { grid-template-columns:repeat(3,1fr) !important; gap:.3rem; }
    .about-photos         { grid-template-columns:1fr 1fr; grid-template-rows:120px 100px; gap:.4rem; }
    .about-stats          { grid-template-columns:repeat(3,1fr); gap:.4rem; }
    .hero-trust-bar       { gap:.2rem !important; padding:.55rem !important; }
    .hero-cta-row         { flex-direction:column !important; align-items:stretch !important; }
    .hero-cta-row a       { justify-content:center !important; }
    /* Cartes un peu plus larges sur petits écrans */
    .svc-scroll > *           { min-width:86vw !important; max-width:86vw !important; }
    .proc-scroll > *          { min-width:80vw !important; max-width:80vw !important; }
    .pricing-mobile-scroll > *{ min-width:88vw !important; max-width:88vw !important; }
  }

  /* ── SCROLL HINT : CSS-only, style dots comme Réalisations ── */
  .scroll-hint-mobile { display:none; }
  @media(max-width:768px){
    .scroll-hint-mobile {
      display:flex !important;
      align-items:center;
      gap:.5rem;
      margin-bottom:.9rem;
      padding:0 .2rem;
    }
    /* Label texte */
    .scroll-hint-mobile .sh-label {
      font-family:'JetBrains Mono',monospace;
      font-size:.58rem;
      color:rgba(34,200,100,.45);
      letter-spacing:.1em;
      text-transform:uppercase;
    }
    /* Dots identiques aux dots de Réalisations */
    .scroll-hint-mobile .sh-dots {
      display:flex;
      gap:.3rem;
      align-items:center;
      margin-left:auto;
    }
    .scroll-hint-mobile .sh-dot {
      height:6px;
      border-radius:3px;
      background:rgba(34,200,100,.2);
      transition:all .3s;
    }
    .scroll-hint-mobile .sh-dot.active {
      width:20px;
      background:#22c864;
    }
    .scroll-hint-mobile .sh-dot:not(.active) {
      width:6px;
    }
    /* Flèche animée CSS */
    .scroll-hint-mobile .sh-arrow {
      display:flex;
      align-items:center;
      gap:.2rem;
      color:rgba(34,200,100,.5);
    }
    .scroll-hint-mobile .sh-arrow svg {
      animation:sh-bounce 1.3s ease-in-out infinite;
    }
    @keyframes sh-bounce {
      0%,100% { transform:translateX(0); opacity:.4; }
      50%      { transform:translateX(4px); opacity:1; }
    }
  }

  /* ── LOADER RESPONSIVE ── */
  :root { --loader-scale: 1; }
  @media(max-width:768px) { :root { --loader-scale: 0.72; } }
  @media(max-width:480px) { :root { --loader-scale: 0.56; } }
  .loader-wrap {
    width:min(280px, 80vw);
  }
  .loader-logo-size { transition:transform .3s; }
  @media(max-width:768px){
    .loader-logo-size { transform:scale(.75); transform-origin:center; }
    .loader-wrap      { width:min(220px, 78vw); }
    .loader-msg       { font-size:.52rem !important; letter-spacing:.1em !important; }
  }
  @media(max-width:480px){
    .loader-logo-size { transform:scale(.62); transform-origin:center; }
    .loader-wrap      { width:min(180px, 82vw); }
    .loader-msg       { font-size:.48rem !important; letter-spacing:.08em !important; }
  }

  /* ── HAMBURGER BOTTOM SHEET ── */
  .mobile-menu-overlay {
    position:fixed; inset:0; z-index:898;
    background:rgba(0,0,0,.6);
    backdrop-filter:blur(8px);
    -webkit-backdrop-filter:blur(8px);
  }
  .mobile-menu-sheet {
    position:fixed; bottom:0; left:0; right:0; z-index:899;
    background:linear-gradient(180deg,#0d2216 0%,#030806 100%);
    border-top:1px solid rgba(34,200,100,.25);
    border-radius:24px 24px 0 0;
    padding:0 1.4rem calc(env(safe-area-inset-bottom,0px) + 1.5rem);
    box-shadow:0 -12px 48px rgba(0,0,0,.8), 0 -1px 0 rgba(34,200,100,.2);
  }
  .mobile-menu-handle {
    width:44px; height:4px; border-radius:2px;
    background:rgba(34,200,100,.35);
    margin:14px auto 18px;
  }
`

// ── MICRO CURSOR + RIPPLE ─────────────────────────────────────
function MicroCursor() {
  const dot = useRef(null)
  useEffect(() => {
    const el = dot.current; if (!el) return
    let raf
    const move = (e) => {
      raf = requestAnimationFrame(() => {
        el.style.left = e.clientX + 'px'
        el.style.top  = e.clientY + 'px'
      })
    }
    const over = (e) => {
      const t = e.target.closest('a,button,[data-hover]')
      if (t) el.classList.add('big'); else el.classList.remove('big')
    }
    const down = (e) => {
      el.classList.add('click')
      // ripple
      const r = document.createElement('div')
      r.className = 'ripple-dot'
      r.style.left = e.clientX + 'px'
      r.style.top  = e.clientY + 'px'
      document.body.appendChild(r)
      setTimeout(() => r.remove(), 600)
    }
    const up = () => el.classList.remove('click')
    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
    }
  }, [])
  // Only show on non-touch devices
  const [show, setShow] = useState(false)
  useEffect(() => { setShow(!window.matchMedia('(pointer:coarse)').matches) }, [])
  if (!show) return null
  return <div id="micro-cursor" ref={dot}/>
}

// ── THEME CONTEXT + COULEURS ──────────────────────────────────
const ThemeCtx = createContext({ light: false, toggle: () => {} })

// Hook qui retourne les bonnes couleurs selon le mode
function useTheme() {
  const { light } = useContext(ThemeCtx)
  return {
    light,
    // Fonds de sections
    bg:       light ? '#ffffff' : '#030806',
    bgAlt:    light ? '#f5f5f5' : '#060e09',
    bgCard:   light ? '#ffffff' : '#0b1a10',
    // Textes
    textMain: light ? '#111111' : 'rgba(255,255,255,.85)',
    textSub:  light ? '#555555' : 'rgba(255,255,255,.5)',
    textMuted:light ? '#888888' : 'rgba(255,255,255,.3)',
    // Vert
    green:    light ? '#16a34a' : '#22c864',
    greenSub: light ? 'rgba(22,163,74,.55)' : 'rgba(34,200,100,.55)',
    // Bordures
    border:   light ? 'rgba(0,0,0,.09)' : 'rgba(34,200,100,.14)',
    border2:  light ? 'rgba(0,0,0,.16)' : 'rgba(34,200,100,.28)',
    // Inputs
    inputBg:  light ? '#f5f5f5' : 'linear-gradient(145deg,#0b1a10,#0e2016)',
    inputColor:light ? '#111' : 'rgba(255,255,255,.85)',
    // Marquee
    marqueeBg:light ? '#eeeeee' : '#0a1a0e',
  }
}

function ThemeProvider({ children }) {
  const [light, setLight] = useState(() => {
    try { return localStorage.getItem('aka-theme') === 'light' } catch { return false }
  })
  const toggle = () => {
    setLight(v => {
      const next = !v
      try { localStorage.setItem('aka-theme', next ? 'light' : 'dark') } catch {}
      document.body.classList.toggle('light-mode', next)
      return next
    })
  }
  useEffect(() => { document.body.classList.toggle('light-mode', light) }, [])
  return <ThemeCtx.Provider value={{ light, toggle }}>{children}</ThemeCtx.Provider>
}

// ── THEME TOGGLE BUTTON ───────────────────────────────────────
function ThemeToggle() {
  const { light, toggle } = useContext(ThemeCtx)
  const [spin, setSpin] = useState(false)
  const handleClick = () => {
    setSpin(true)
    toggle()
    setTimeout(() => setSpin(false), 420)
  }
  return (
    <button
      className={`theme-toggle${spin ? ' spinning' : ''}`}
      onClick={handleClick}
      title={light ? 'Passer en mode sombre' : 'Passer en mode clair'}
      aria-label="Changer le thème"
    >
      {light ? (
        /* Moon icon */
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>
        </svg>
      ) : (
        /* Sun icon */
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      )}
    </button>
  )
}


function GlobalStyles() {
  useEffect(() => {
    const id = 'akatech-styles'
    if (!document.getElementById(id)) {
      const s = document.createElement('style')
      s.id = id; s.textContent = GLOBAL_CSS
      document.head.appendChild(s)
    }
  }, [])
  return null
}

// ── LOGO ─────────────────────────────────────────────────────
const GEAR_PATH = "M48,8C51,8,53,10,53,13L53,16C56,17,59,18,62,20L65,18C67,15,71,15,74,18L80,24C83,27,83,31,80,34L78,37C80,40,81,43,82,46L85,46C89,46,91,49,91,53L91,61C91,65,89,68,85,68L82,68C81,71,80,74,78,77L80,80C83,83,83,87,80,90L74,96C71,99,67,99,65,96L62,94C59,96,56,97,53,98L53,101C53,105,51,107,48,107L40,107C37,107,35,105,35,101L35,98C32,97,29,96,26,94L23,96C21,99,17,99,14,96L8,90C5,87,5,83,8,80L10,77C8,74,7,71,6,68L3,68C-1,68,-3,65,-3,61L-3,53C-3,49,-1,46,3,46L6,46C7,43,8,40,10,37L8,34C5,31,5,27,8,24L14,18C17,15,21,15,23,18L26,20C29,18,32,17,35,16L35,13C35,10,37,8,40,8Z"
const CL = [{x1:26,y1:57,x2:62,y2:57,sw:2,da:36,del:0},{x1:44,y1:37,x2:44,y2:77,sw:2,da:40,del:.6},{x1:26,y1:57,x2:26,y2:45,sw:1.5,da:12,del:.3},{x1:62,y1:57,x2:62,y2:45,sw:1.5,da:12,del:.9},{x1:26,y1:57,x2:26,y2:69,sw:1.5,da:12,del:1.2},{x1:62,y1:57,x2:62,y2:69,sw:1.5,da:12,del:1.5}]
const CD = [{cx:26,cy:45,d:0},{cx:62,cy:45,d:.4},{cx:26,cy:69,d:.8},{cx:62,cy:69,d:1.2},{cx:44,cy:37,d:.2},{cx:44,cy:77,d:1}]

function Logo({ size=48, animate=true, onClick, showTag=true }) {
  const ptsRef = useRef(null); const timerRef = useRef(null)
  useEffect(() => {
    if (!animate||!ptsRef.current) return
    const spawn=()=>{ const el=ptsRef.current; if(!el) return; const p=document.createElement('div'); p.style.cssText=`position:absolute;width:2px;height:2px;border-radius:50%;background:#44ffaa;opacity:0;left:${Math.random()*100}%;top:${Math.random()*100}%;--ptx:${((Math.random()-.5)*56).toFixed(0)}px;--pty:${(-(Math.random()*48+6)).toFixed(0)}px;--pdur:${(2.4+Math.random()*2.4).toFixed(1)}s;--pdel:${(Math.random()*2.8).toFixed(1)}s;animation:akaParticle var(--pdur) var(--pdel) ease-in-out infinite;`; el.appendChild(p); setTimeout(()=>p.remove(),6000) }
    for(let i=0;i<8;i++) setTimeout(spawn,i*160); timerRef.current=setInterval(spawn,360); return ()=>clearInterval(timerRef.current)
  },[animate])
  const sc=size/48,gearPx=Math.round(72*sc),fSize=Math.round(52*sc),padH=Math.round(16*sc),padV=Math.round(12*sc),gapLogo=Math.round(14*sc),tagSize=Math.round(7.5*sc),haloSz=Math.round(100*sc),showTagVisible=showTag&&size>=34
  return (
    <div onClick={onClick} style={{position:'relative',display:'inline-flex',alignItems:'center',borderRadius:10,overflow:'hidden',flexShrink:0,padding:`${padV}px ${padH+8}px ${padV}px ${padH}px`,gap:gapLogo,cursor:onClick?'pointer':'default',background:'transparent',border:'none'}}>
      {animate&&<div ref={ptsRef} style={{position:'absolute',inset:0,zIndex:1,pointerEvents:'none',overflow:'hidden'}}/>}
      <div style={{position:'relative',zIndex:2,width:gearPx,height:gearPx,flexShrink:0}}>
        <svg style={{width:gearPx,height:gearPx,animation:'gearSpin 8s linear infinite',transformOrigin:'50% 50%',display:'block',overflow:'visible'}} viewBox="0 0 96 96">
          <defs><linearGradient id="akaGG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#55ee99"/><stop offset="100%" stopColor="#1a9954"/></linearGradient><filter id="akaGF"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
          <path filter="url(#akaGF)" fill="url(#akaGG)" d={GEAR_PATH}/><circle cx="44" cy="57" r="23" fill="#050f09"/>
        </svg>
        <svg style={{position:'absolute',top:0,left:0,width:gearPx,height:gearPx,animation:'gearCnt 8s linear infinite',transformOrigin:'50% 50%'}} viewBox="0 0 96 96">
          <defs><filter id="akaCF"><feGaussianBlur stdDeviation="1.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
          <g filter="url(#akaCF)">
            {CL.map((l,i)=><line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#22c864" strokeWidth={l.sw} strokeLinecap="round" strokeDasharray={l.da} style={animate?{animation:`akaLineTrace 2.4s ${l.del}s ease-in-out infinite`}:{opacity:.7}}/>)}
            {CD.map(({cx,cy,d},i)=><circle key={i} cx={cx} cy={cy} r="3" fill="#66ffaa" style={animate?{animation:`akaDotPulse 1.6s ${d}s ease-in-out infinite`}:{opacity:.9}}/>)}
            <circle cx="44" cy="57" r="4.5" fill="#88ffcc" style={animate?{animation:'akaDotPulse 1.1s ease-in-out infinite'}:{opacity:1}}/>
          </g>
        </svg>
      </div>
      <div style={{position:'relative',zIndex:2,display:'flex',flexDirection:'column',gap:1}}>
        <div style={{display:'flex',alignItems:'baseline'}}>
          <span style={{fontFamily:"'Orbitron','Arial Black',sans-serif",fontSize:fSize,fontWeight:900,lineHeight:1,background:'linear-gradient(180deg,#66ffaa,#1fb865)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',filter:'drop-shadow(0 0 8px rgba(34,200,100,.45))',animation:animate?'akaTextIn .85s cubic-bezier(.22,1,.36,1) both, akaGlowPulse 3s ease-in-out 1s infinite':undefined}}>AKA</span>
          <span style={{fontFamily:"'Syne','Arial',sans-serif",fontSize:fSize,fontWeight:200,lineHeight:1,color:'#d0f0e0',letterSpacing:'0.08em',animation:animate?'akaTextIn .85s .16s cubic-bezier(.22,1,.36,1) both':undefined}}>Tech</span>
        </div>
        <div style={{height:1,background:'linear-gradient(90deg,rgba(34,200,100,.75),rgba(34,200,100,.06))',animation:animate?'akaLineExpand .75s .55s ease-out both':undefined,transformOrigin:'left',transform:animate?undefined:'scaleX(1)',opacity:1}}/>
        {showTagVisible&&<div style={{fontFamily:"'JetBrains Mono',sans-serif",fontSize:tagSize,fontWeight:300,letterSpacing:'0.3em',color:'rgba(100,220,160,.5)',textTransform:'uppercase',animation:animate?'akaFadeSlide 1.1s .85s ease both':undefined,whiteSpace:'nowrap'}}>Innovation · Technology · Solutions</div>}
      </div>
    </div>
  )
}

// ── SECTION EYE WITH GHOST BACKDROP ─────────────────────────
function SectionEye({ label, ghost, center }) {
  return (
    <div style={{ position:'relative', marginBottom:'.8rem', display: center ? 'flex' : 'block', justifyContent: center ? 'center' : undefined }}>
      {ghost && (
        <span className="s-ghost-txt" style={{ fontSize:'clamp(2.8rem,7vw,6rem)' }}>
          {ghost}
        </span>
      )}
      <div className="s-eye" style={center ? { justifyContent:'center', position:'relative', zIndex:1 } : { position:'relative', zIndex:1 }}>
        {label}
      </div>
    </div>
  )
}


function Loader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)
  const msgs = ['Initialisation…','Chargement…','Configuration UI…','Lancement…','Prêt !']
  const msg = msgs[Math.min(4, Math.floor(progress/20))]
  useEffect(() => {
    const iv = setInterval(() => {
      setProgress(p => {
        const next = Math.min(p + Math.random()*14+4, 100)
        if(next>=100){ clearInterval(iv); setTimeout(()=>{ setVisible(false); setTimeout(onDone,700) },500) }
        return next
      })
    }, 130)
    return ()=>clearInterval(iv)
  }, [onDone])
  return (
    <AnimatePresence>
      {visible&&(
        <motion.div exit={{opacity:0}} transition={{duration:.7}}
          style={{position:'fixed',inset:0,zIndex:9999,background:'var(--dark1,#030806)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'1.5rem',padding:'1.5rem',boxSizing:'border-box'}}>
          {/* Logo — taille responsive via CSS */}
          <motion.div initial={{opacity:0,scale:.86}} animate={{opacity:1,scale:1}} transition={{duration:.8,ease:[.22,1,.36,1]}}
            style={{transform:'scale(var(--loader-scale,1))',transformOrigin:'center'}}>
            <Logo size={52} animate showTag/>
          </motion.div>
          {/* Barre de progression */}
          <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:.3}}
            style={{width:'min(260px,72vw)'}}>
            <div style={{height:2,background:'rgba(34,200,100,.1)',borderRadius:2,overflow:'hidden',marginBottom:'.5rem'}}>
              <div style={{height:'100%',borderRadius:2,background:'linear-gradient(90deg,#17a354,#66ffaa)',width:`${progress}%`,transition:'width .06s linear'}}/>
            </div>
            <p style={{fontFamily:"'JetBrains Mono',monospace",fontSize:'clamp(.48rem,.12rem + 1.2vw,.6rem)',letterSpacing:'.12em',color:'rgba(34,200,100,.4)',textTransform:'uppercase',textAlign:'center'}}>{msg}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── NAVBAR ───────────────────────────────────────────────────
// Inline SVG icons for each nav item (animated on hover via CSS)
const NAV_ICONS = {
  accueil: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>),
  apropos: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>),
  services: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="8" height="8" rx="1.5"/><rect x="14" y="3" width="8" height="8" rx="1.5"/><rect x="2" y="13" width="8" height="8" rx="1.5"/><rect x="14" y="13" width="8" height="8" rx="1.5"/></svg>),
  projets: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="9" height="9" rx="1.5"/><rect x="13" y="2" width="9" height="5" rx="1.5"/><rect x="13" y="11" width="9" height="11" rx="1.5"/><rect x="2" y="15" width="9" height="7" rx="1.5"/></svg>),
  tarifs: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M12 6v2m0 8v2M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3m.08 4h.01"/></svg>),
  contact: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>),
}
const NAV = [
  {href:'#accueil',  label:'Accueil',      iconKey:'accueil'},
  {href:'#apropos',  label:'À propos',     iconKey:'apropos'},
  {href:'#services', label:'Services',     iconKey:'services'},
  {href:'#projets',  label:'Réalisations', iconKey:'projets'},
  {href:'#tarifs',   label:'Tarifs',       iconKey:'tarifs'},
  {href:'#contact',  label:'Contact',      iconKey:'contact'},
]

function Navbar() {
  const [scrolled,setScrolled]=useState(false)
  const [active,setActive]=useState('')
  const [open,setOpen]=useState(false)
  const T = useTheme()
  useEffect(()=>{
    const fn=()=>{ const y=window.scrollY; setScrolled(y>60); const ss=document.querySelectorAll('section[id],div[id]'); let c=''; ss.forEach(s=>{if(y>=s.offsetTop-130)c=s.id}); setActive(c) }
    window.addEventListener('scroll',fn,{passive:true}); fn(); return()=>window.removeEventListener('scroll',fn)
  },[])

  // Couleurs adaptatives navbar
  const navBg = scrolled ? (T.light ? 'rgba(255,255,255,.95)' : 'rgba(3,8,6,.92)') : 'transparent'
  const navBorder = scrolled ? (T.light ? 'rgba(0,0,0,.08)' : 'rgba(34,200,100,.1)') : 'none'
  const iconColor = T.light ? '#16a34a' : '#22c864'
  const iconActive = T.light ? '#16a34a' : '#22c864'
  // Menu mobile
  const sheetBg = T.light ? '#ffffff' : 'linear-gradient(180deg,#0d2216 0%,#030806 100%)'
  const sheetBorder = T.light ? 'rgba(0,0,0,.08)' : 'rgba(34,200,100,.25)'
  const linkColor = T.light ? 'rgba(0,0,0,.7)' : 'rgba(255,255,255,.75)'
  const linkActive = T.light ? '#16a34a' : '#22c864'
  const linkHoverBg = T.light ? 'rgba(0,0,0,.04)' : 'rgba(34,200,100,.06)'
  const linkHoverColor = T.light ? '#16a34a' : '#66ffaa'
  const handleColor = T.light ? 'rgba(0,0,0,.15)' : 'rgba(34,200,100,.35)'
  const locColor = T.light ? 'rgba(0,0,0,.3)' : 'rgba(255,255,255,.2)'
  const borderRow = T.light ? 'rgba(0,0,0,.06)' : 'rgba(34,200,100,.07)'
  const chevronColor = T.light ? 'rgba(0,0,0,.25)' : 'rgba(34,200,100,.35)'

  return (
    <>
      <motion.nav
        className="fixed left-0 right-0 z-[900]"
        style={{
          top:0, height:64,
          display:'flex', alignItems:'center',
          padding: scrolled ? '0 1.2rem 0 0.5rem' : '0 1.5rem 0 0.5rem',
          background: navBg,
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? `1px solid ${navBorder}` : 'none',
          transition:'all .4s cubic-bezier(.22,1,.36,1)',
        }}
      >
        {/* Logo */}
        <a href="#accueil" style={{flexShrink:0,zIndex:2}}>
          <Logo size={28} animate={false} showTag={false}/>
        </a>

        {/* Desktop icons
            — Avant scroll : s'étalent sur tout l'espace (flex:1, space-evenly)
            — Après scroll  : se compactent à droite (flex:0, flex-end, marginLeft:auto) */}
        <ul
          className="nav-icon-list items-center list-none"
          style={{
            flex: scrolled ? '0 0 auto' : '1',
            justifyContent: scrolled ? 'flex-end' : 'space-evenly',
            marginLeft: scrolled ? 'auto' : '0',
            transition:'all .4s cubic-bezier(.22,1,.36,1)',
            overflow:'hidden',
          }}
        >
          {NAV.map(({href,label,iconKey})=>{
            const isActive = active===href.slice(1)
            return (
              <li key={href} style={{ flex: scrolled ? '0 0 auto' : '1', display:'flex', justifyContent:'center', transition:'flex .4s cubic-bezier(.22,1,.36,1)' }}>
                <a href={href} className="nav-icon-btn"
                  style={{ color: isActive ? iconActive : iconColor, textDecoration:'none', position:'relative', width: scrolled ? 'auto' : '100%', justifyContent:'center' }}
                  onMouseEnter={e=>{ e.currentTarget.style.color=iconActive }}
                  onMouseLeave={e=>{ e.currentTarget.style.color=isActive?iconActive:iconColor }}
                >
                  {isActive && <span style={{position:'absolute',bottom:4,left:'50%',transform:'translateX(-50%)',width:4,height:4,borderRadius:'50%',background:iconActive,boxShadow:`0 0 8px ${iconActive}`}}/>}
                  {NAV_ICONS[iconKey]}
                  <span className="nav-tooltip">{label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        {/* Toggle + hamburger */}
        <div style={{display:'flex',alignItems:'center',gap:'.4rem',marginLeft: scrolled ? '.5rem' : 'auto',flexShrink:0}}>
          <ThemeToggle/>
          <button
            className="nav-hamburger"
            onClick={()=>setOpen(v=>!v)}
            style={{background:'none',border:'none',cursor:'pointer',color:iconActive,padding:'.4rem',borderRadius:8,transition:'background .2s'}}
            onMouseEnter={e=>e.currentTarget.style.background= T.light?'rgba(0,0,0,.05)':'rgba(34,200,100,.08)'}
            onMouseLeave={e=>e.currentTarget.style.background='none'}>
            {open?<X size={22}/>:<Menu size={22}/>}
          </button>
        </div>
      </motion.nav>

      {/* Bottom-sheet mobile menu */}
      <AnimatePresence>
        {open&&(
          <>
            <motion.div
              className="mobile-menu-overlay"
              initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              transition={{duration:.25}}
              onClick={()=>setOpen(false)}
            />
            <motion.div
              initial={{y:'100%'}} animate={{y:0}} exit={{y:'100%'}}
              transition={{type:'spring',stiffness:320,damping:32}}
              style={{
                position:'fixed', bottom:0, left:0, right:0, zIndex:899,
                background: sheetBg,
                borderTop:`1px solid ${sheetBorder}`,
                borderRadius:'24px 24px 0 0',
                padding:`0 1.4rem calc(env(safe-area-inset-bottom,0px) + 1.5rem)`,
                boxShadow: T.light ? '0 -8px 32px rgba(0,0,0,.1)' : '0 -12px 48px rgba(0,0,0,.8)',
              }}
            >
              {/* Handle */}
              <div style={{width:44,height:4,borderRadius:2,background:handleColor,margin:'14px auto 18px'}} onClick={()=>setOpen(false)}/>

              {/* Links */}
              <div style={{display:'flex',flexDirection:'column',gap:'.15rem',marginBottom:'1.2rem'}}>
                {NAV.map(({href,label,iconKey},i)=>(
                  <motion.a key={href} href={href} onClick={()=>setOpen(false)}
                    initial={{opacity:0,x:-16}} animate={{opacity:1,x:0}} transition={{delay:i*.05}}
                    style={{display:'flex',alignItems:'center',gap:'.85rem',padding:'.9rem 1rem',fontSize:'1rem',fontWeight:600,color:active===href.slice(1)?linkActive:linkColor,borderBottom:`1px solid ${borderRow}`,fontFamily:"'Syne',sans-serif",borderRadius:10,transition:'background .2s',textDecoration:'none'}}
                    onMouseEnter={e=>{e.currentTarget.style.background=linkHoverBg;e.currentTarget.style.color=linkHoverColor}}
                    onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=active===href.slice(1)?linkActive:linkColor}}
                  >
                    <span style={{color:active===href.slice(1)?linkActive:iconActive,flexShrink:0,display:'flex',alignItems:'center',opacity:.7}}>{NAV_ICONS[iconKey]}</span>
                    <span style={{flex:1,color:'inherit'}}>{label}</span>
                    <ChevronRight size={14} style={{color:chevronColor,flexShrink:0}}/>
                  </motion.a>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <motion.a href="https://wa.me/2250142507750" target="_blank" rel="noreferrer"
                initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:.35}}
                className="btn-raised" style={{width:'100%',justifyContent:'center',borderRadius:14,padding:'1rem',fontSize:'.92rem'}}>
                <MessageCircle size={16}/>Démarrer sur WhatsApp
              </motion.a>

              {/* Localisation */}
              <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.4}}
                style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'.5rem',marginTop:'1rem',fontSize:'.7rem',color:locColor,fontFamily:"'JetBrains Mono',monospace"}}>
                <MapPin size={11} style={{color:T.light?'rgba(0,0,0,.3)':'rgba(34,200,100,.3)'}}/>
                Abidjan, Côte d'Ivoire
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// ── HERO ─────────────────────────────────────────────────────
const HERO_SLIDES = [
  { img: '/images/hero-bg.jpg', label: 'Solutions Web Sur Mesure' },
  { img: '/images/about-1.jpg', label: 'Design · Performance · Innovation' },
  { img: '/images/about-2.jpg', label: 'Votre Partenaire Digital' },
]

function HeroCarousel() {
  const [slide, setSlide] = useState(0)
  const [imgErrors, setImgErrors] = useState({})
  useEffect(() => {
    const iv = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 5000)
    return () => clearInterval(iv)
  }, [])
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      {HERO_SLIDES.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          opacity: i === slide ? 1 : 0,
          transition: 'opacity 1.2s ease',
        }}>
          {!imgErrors[i] ? (
            <img src={s.img} alt={s.label}
              onError={() => setImgErrors(e => ({ ...e, [i]: true }))}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : null}
          {/* Dark overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(3,8,6,.7) 0%, rgba(3,8,6,.5) 40%, rgba(3,8,6,.85) 100%)' }}/>
        </div>
      ))}
      {/* Slide dots */}
      <div style={{ position: 'absolute', bottom: '8rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '.45rem', zIndex: 10 }}>
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => setSlide(i)} style={{ width: i === slide ? 24 : 7, height: 7, borderRadius: 4, background: i === slide ? '#22c864' : 'rgba(34,200,100,.3)', border: 'none', cursor: 'pointer', transition: 'all .3s', padding: 0 }}/>
        ))}
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section id="accueil" style={{minHeight:'100vh',background:'var(--dark1)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',position:'relative',overflow:'hidden',paddingTop:64,textAlign:'center'}}>
      {/* Hero image carousel background */}
      <HeroCarousel/>

      {/* Grid bg */}
      <div className="grid-bg" style={{position:'absolute',inset:0,opacity:.3,zIndex:1}}/>

      {/* Giant glowing ORB */}
      <div style={{
        position:'absolute', bottom:'-20%', left:'50%', transform:'translateX(-50%)',
        width:'min(900px,130vw)', height:'min(900px,130vw)',
        borderRadius:'50%',
        background:'radial-gradient(ellipse at center, rgba(34,200,100,.22) 0%, rgba(34,200,100,.08) 35%, transparent 65%)',
        animation:'orbPulse 5s ease-in-out infinite',
        pointerEvents:'none', zIndex:2,
      }}/>
      {/* Inner bright core */}
      <div style={{
        position:'absolute', bottom:'-5%', left:'50%', transform:'translateX(-50%)',
        width:'min(400px,70vw)', height:'min(400px,70vw)',
        borderRadius:'50%',
        background:'radial-gradient(ellipse at center, rgba(34,200,100,.35) 0%, rgba(34,200,100,.12) 40%, transparent 70%)',
        filter:'blur(40px)',
        pointerEvents:'none', zIndex:2,
      }}/>

      {/* Floating particle dots */}
      {[...Array(12)].map((_,i)=>(
        <div key={i} style={{
          position:'absolute',
          left:`${10+Math.random()*80}%`, top:`${10+Math.random()*70}%`,
          width:`${2+i%3}px`, height:`${2+i%3}px`,
          borderRadius:'50%', background:'#22c864',
          opacity: .2 + (i%4)*.1,
          animation:`float-y ${3+i*.4}s ease-in-out ${i*.3}s infinite`,
          pointerEvents:'none', zIndex:3,
        }}/>
      ))}

      {/* Content */}
      <div style={{position:'relative',zIndex:10,maxWidth:760,padding:'0 1.5rem'}}>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.1}} style={{display:'inline-flex',alignItems:'center',gap:'.5rem',padding:'.35rem 1rem',background:'rgba(34,200,100,.07)',border:'1px solid rgba(34,200,100,.2)',borderRadius:100,fontSize:'.72rem',fontFamily:"'JetBrains Mono',monospace",letterSpacing:'.1em',color:'#66ffaa',textTransform:'uppercase',marginBottom:'2rem'}}>
          <span style={{width:6,height:6,borderRadius:'50%',background:'#22c864',animation:'pulse-ring 1.8s ease-out infinite'}}/>
          🔥 +10 projets livrés · Abidjan, Côte d'Ivoire
        </motion.div>

        <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:.2}} style={{fontSize:'clamp(2.8rem,6vw,5rem)',fontWeight:800,letterSpacing:'-.04em',lineHeight:1.05,color:'#fff',marginBottom:'1.5rem',fontFamily:"'Syne',sans-serif"}}>
          Votre activité mérite<br/>
          <span style={{background:'linear-gradient(135deg,#66ffaa,#22c864,#17a354)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
            d'attirer plus de clients
          </span>
        </motion.h1>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.35}} style={{maxWidth:540,margin:'0 auto 2.5rem',display:'flex',flexDirection:'column',gap:'.75rem'}}>
          {/* Ligne problème */}
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'.55rem',flexWrap:'wrap'}}>
            {['Pas de site web ?','Peu de visibilité en ligne ?'].map((txt,i)=>(
              <span key={i} style={{
                display:'inline-flex',alignItems:'center',gap:'.35rem',
                padding:'.3rem .85rem',
                background:'rgba(255,80,80,.07)',
                border:'1px solid rgba(255,100,100,.18)',
                borderRadius:100,
                fontSize:'.8rem',
                color:'rgba(255,170,170,.75)',
                fontFamily:"'JetBrains Mono',monospace",
                letterSpacing:'.03em',
              }}>
                <span style={{fontSize:'.7rem'}}>✗</span>{txt}
              </span>
            ))}
          </div>
          {/* Séparateur flèche */}
          <div style={{textAlign:'center',color:'rgba(34,200,100,.4)',fontSize:'.85rem',lineHeight:1}}>↓</div>
          {/* Ligne solution */}
          <p style={{
            fontSize:'1rem',
            color:'rgba(255,255,255,.65)',
            lineHeight:1.8,
            textAlign:'center',
            margin:0,
          }}>
            AKATech transforme votre activité en{' '}
            <span style={{color:'#66ffaa',fontWeight:700}}>machine à attirer des clients</span>
            {' '}— sites vitrines, e-commerce et applications SaaS{' '}
            <span style={{color:'rgba(255,255,255,.45)'}}>sur mesure.</span>
          </p>
        </motion.div>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.45}} style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap',marginBottom:'4rem'}} className="hero-cta-row">
          <a href="https://wa.me/2250142507750?text=Bonjour+AKATech+!" target="_blank" rel="noreferrer" className="btn-raised"><MessageCircle size={16}/>Discuter sur WhatsApp</a>
          <a href="#tarifs" className="btn-ghost">Voir les offres <ChevronRight size={16}/></a>
        </motion.div>

        {/* Trust bar */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.6}}
          className="sku-card hero-trust-bar"
          style={{display:'inline-flex',gap:'2.5rem',padding:'1.2rem 2.5rem',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}
        >
          {[{val:'10+',label:'Projets livrés'},{val:'< 24h',label:'Réponse garantie'},{val:'100%',label:'Sur mesure'},{val:'5★',label:'Clients satisfaits'}].map(({val,label},i)=>(
            <div key={i} style={{textAlign:'center',minWidth:0}}>
              <div className="trust-val" style={{fontFamily:"'Orbitron',sans-serif",fontSize:'1.5rem',fontWeight:900,color:'#22c864',lineHeight:1}}>{val}</div>
              <div className="trust-lbl" style={{fontSize:'.65rem',textTransform:'uppercase',letterSpacing:'.06em',marginTop:'.2rem',fontFamily:"'JetBrains Mono',monospace",whiteSpace:'nowrap'}}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div style={{position:'absolute',bottom:0,left:0,right:0,height:120,background:'linear-gradient(to bottom,transparent,var(--dark1))',zIndex:5}}/>
    </section>
  )
}

// ── MARQUEE ──────────────────────────────────────────────────
const M_ITEMS=['Site Vitrine','E-commerce','Application SaaS','Portfolio','API RESTful','Maintenance','SEO','React','Django','Node.js','MySQL','Tailwind CSS','Python','Vercel']
function MarqueeStrip() {
  const T = useTheme()
  return (
    <div style={{background:T.marqueeBg,borderTop:`1px solid ${T.border}`,borderBottom:`1px solid ${T.border}`,overflow:'hidden',padding:'.85rem 0'}}>
      <div className="flex no-select" style={{animation:'marquee 30s linear infinite',width:'max-content'}}
        onMouseEnter={e=>e.currentTarget.style.animationPlayState='paused'}
        onMouseLeave={e=>e.currentTarget.style.animationPlayState='running'}
      >
        {[...M_ITEMS,...M_ITEMS].map((t,i)=>(
          <span key={i} className="marquee-item" style={{display:'inline-flex',alignItems:'center',gap:'.6rem',padding:'0 1.2rem',fontFamily:"'JetBrains Mono',monospace",fontSize:'.7rem',fontWeight:500,letterSpacing:'.1em',textTransform:'uppercase',whiteSpace:'nowrap'}}>
            <span className="marquee-dot" style={{width:4,height:4,borderRadius:'50%',background:T.green,flexShrink:0}}/>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── ABOUT ────────────────────────────────────────────────────
const ABOUT_PHOTOS = [
  { src: '/images/about-1.jpg', label: 'Équipe AKATech', span: 'tall' },
  { src: '/images/about-2.jpg', label: 'Au bureau' },
  { src: '/images/about-3.jpg', label: 'Collaboration' },
  { src: '/images/about-4.jpg', label: 'Design & Dev' },
]
const ABOUT_STATS = [
  { val: '10+',  label: 'Projets livrés',      icon: Rocket },
  { val: '100%', label: 'Sur mesure',           icon: Palette },
  { val: '24h',  label: 'Réponse garantie',     icon: Zap },
  { val: '5 ★',  label: 'Note clients',         icon: Star },
  { val: '3+',   label: 'Ans d\'expérience',    icon: Award },
  { val: 'CI',   label: 'Basé à Abidjan',       icon: MapPin },
]

function AnimatedCounter({ target, duration = 1800 }) {
  const [display, setDisplay] = useState('0')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  useEffect(() => {
    if (!inView) return
    // Extract numeric part
    const num = parseFloat(target.replace(/[^0-9.]/g, ''))
    const suffix = target.replace(/[0-9.]/g, '')
    if (isNaN(num)) { setDisplay(target); return }
    const steps = 40
    const step = num / steps
    let cur = 0, i = 0
    const iv = setInterval(() => {
      cur = Math.min(cur + step, num)
      i++
      const disp = Number.isInteger(num) ? Math.round(cur) : cur.toFixed(1)
      setDisplay(`${disp}${suffix}`)
      if (i >= steps) { setDisplay(target); clearInterval(iv) }
    }, duration / steps)
    return () => clearInterval(iv)
  }, [inView, target, duration])
  return <span ref={ref}>{display}</span>
}

function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const T = useTheme()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section id="apropos" ref={ref} style={{ padding: '7rem 5%', background: T.bgAlt, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position:'absolute', top:'-15%', right:'-10%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(34,200,100,.07),transparent 65%)', pointerEvents:'none', opacity: T.light?0:1 }}/>
      <div style={{ position:'absolute', bottom:'-10%', left:'-5%', width:380, height:380, borderRadius:'50%', background:'radial-gradient(circle,rgba(34,200,100,.05),transparent 65%)', pointerEvents:'none', opacity: T.light?0:1 }}/>
      <div className="grid-bg" style={{ position:'absolute', inset:0, opacity: T.light?.15:.25 }}/>

      <div style={{ maxWidth:1200, margin:'0 auto', position:'relative', zIndex:1 }}>
        <div className="about-grid">
          <motion.div style={{ y: photoY }}>
            <div className="about-photos" style={{ position:'relative' }}>
              <motion.div whileHover={{ scale:1.03 }} transition={{ duration:.5 }}
                style={{ gridRow:'1 / 3', gridColumn:'1', borderRadius:16, overflow:'hidden', position:'relative', border:`1px solid ${T.border}`, boxShadow:'8px 8px 32px rgba(0,0,0,.3)' }}>
                <LazyImg src={ABOUT_PHOTOS[0].src} alt={ABOUT_PHOTOS[0].label}
                  style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                  placeholder={<div className="img-ph" style={{ height:'100%' }}><Users size={32} style={{ opacity:.3 }}/><span>Équipe</span></div>}
                />
                <div style={{ position:'absolute', bottom:'.8rem', left:'.8rem', padding:'.3rem .85rem', borderRadius:100, background:'rgba(34,200,100,.18)', backdropFilter:'blur(8px)', border:'1px solid rgba(34,200,100,.3)', fontFamily:"'JetBrains Mono',monospace", fontSize:'.58rem', color:'#22c864', letterSpacing:'.1em' }}>
                  // AKATech Team
                </div>
              </motion.div>
              <motion.div whileHover={{ scale:1.04 }} transition={{ duration:.5 }}
                style={{ borderRadius:14, overflow:'hidden', position:'relative', border:`1px solid ${T.border}`, boxShadow:'6px 6px 24px rgba(0,0,0,.2)' }}>
                <LazyImg src={ABOUT_PHOTOS[1].src} alt={ABOUT_PHOTOS[1].label}
                  style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                  placeholder={<div className="img-ph" style={{ height:'100%' }}><Monitor size={28} style={{ opacity:.3 }}/><span>Bureau</span></div>}
                />
              </motion.div>
              <motion.div whileHover={{ scale:1.04 }} transition={{ duration:.5 }}
                style={{ borderRadius:14, overflow:'hidden', position:'relative', border:`1px solid ${T.border}`, boxShadow:'6px 6px 24px rgba(0,0,0,.2)' }}>
                <LazyImg src={ABOUT_PHOTOS[2].src} alt={ABOUT_PHOTOS[2].label}
                  style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                  placeholder={<div className="img-ph" style={{ height:'100%' }}><Code size={28} style={{ opacity:.3 }}/><span>Dev</span></div>}
                />
                <motion.div initial={{ opacity:0, scale:.6 }} animate={inView ? { opacity:1, scale:1 } : {}} transition={{ delay:.8, type:'spring', stiffness:280, damping:20 }}
                  style={{ position:'absolute', top:'-18px', right:'-10px', width:70, height:70, borderRadius:'50%', background:'linear-gradient(145deg,#27d570,#1aa355)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', boxShadow:'4px 4px 16px rgba(0,0,0,.4)', border:'2px solid rgba(255,255,255,.15)' }}>
                  <span style={{ fontFamily:"'Orbitron',sans-serif", fontSize:'.9rem', fontWeight:900, color:'#fff', lineHeight:1 }}>3+</span>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.42rem', color:'rgba(255,255,255,.8)', letterSpacing:'.06em', textTransform:'uppercase', marginTop:2 }}>Années</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity:0, x:30 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ duration:.7, ease:[.22,1,.36,1] }}>
            <SectionEye label="// Qui sommes-nous" ghost="ABOUT"/>
            <h2 style={{ fontSize:'clamp(1.9rem,3.5vw,2.8rem)', fontWeight:800, fontFamily:"'Syne',sans-serif", color:T.textMain, letterSpacing:'-.03em', lineHeight:1.15, marginBottom:'1.4rem' }}>
              Votre croissance digitale,<br/>
              <span className="text-gradient-anim">c'est notre mission</span>
            </h2>
            <motion.div initial={{ scaleX:0, opacity:0 }} animate={inView ? { scaleX:1, opacity:1 } : {}} transition={{ duration:.8, delay:.3 }}
              style={{ height:2, background:'linear-gradient(90deg,#22c864,rgba(34,200,100,.1))', borderRadius:2, marginBottom:'1.5rem', transformOrigin:'left' }}/>
            <p style={{ fontSize:'.92rem', color:T.textSub, lineHeight:1.85, marginBottom:'.9rem' }}>
              <strong style={{ color:T.textMain }}>AKATech</strong> accompagne les entrepreneurs et PME en Côte d'Ivoire qui veulent une présence digitale sérieuse — pour gagner en crédibilité, attirer des clients et automatiser leur activité.
            </p>
            <p style={{ fontSize:'.92rem', color:T.textSub, lineHeight:1.85, marginBottom:'.7rem' }}>
              Je suis <strong style={{ color:T.textMain }}>M'Bollo Aka Elvis</strong>, développeur full-stack basé à Abidjan. Avec 3 ans d'expérience et +10 projets livrés, je conçois des solutions web qui répondent aux réalités du marché africain.
            </p>
            <p style={{ fontSize:'.92rem', color:T.textSub, lineHeight:1.85, marginBottom:'1.4rem' }}>
              Ma méthode : comprendre votre activité d'abord, développer ensuite. Chaque solution est pensée pour votre contexte — pas copié-collé d'un template générique.
            </p>
            <div style={{ padding:'.9rem 1.2rem', borderRadius:12, background: T.light?'rgba(22,163,74,.05)':'rgba(34,200,100,.06)', border:`1px solid ${T.border}`, marginBottom:'2rem', display:'flex', alignItems:'flex-start', gap:'.7rem' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink:0, marginTop:'.15rem' }}>
                <circle cx="10" cy="10" r="9" fill="rgba(34,200,100,.15)" stroke="rgba(34,200,100,.4)" strokeWidth="1.2"/>
                <path d="M7 10h7M11 7l3 3-3 3" stroke={T.green} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="20" strokeDashoffset="20" style={{ animation:'proc-draw 1s ease forwards, proc-float 2s 1s ease-in-out infinite' }}/>
              </svg>
              <p style={{ fontSize:'.88rem', color:T.textSub, lineHeight:1.75, margin:0 }}>
                Une priorité unique : que votre solution digitale <strong style={{ color:T.green }}>attire des clients</strong>, <strong style={{ color:T.green }}>automatise vos tâches répétitives</strong> et <strong style={{ color:T.green }}>génère des revenus pour votre activité</strong>.
              </p>
            </div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'.45rem', marginBottom:'2rem' }}>
              {['React','Django','Python','Node.js','MySQL','Tailwind CSS','Framer Motion','Vercel'].map((s,i) => (
                <motion.span key={s} className="skill-tag"
                  initial={{ opacity:0, y:8 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:.4 + i*.05 }}
                  style={{ padding:'.3rem .8rem', background: T.light?'rgba(22,163,74,.07)':'rgba(34,200,100,.06)', border:`1px solid ${T.border}`, borderRadius:100, fontFamily:"'JetBrains Mono',monospace", fontSize:'.62rem', color:T.green, letterSpacing:'.06em' }}
                >{s}</motion.span>
              ))}
            </div>
            <div className="about-stats" style={{ marginBottom:'2rem' }}>
              {ABOUT_STATS.map(({ val, label, icon:Icon }, i) => (
                <motion.div key={label} initial={{ opacity:0, y:16 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:.5 + i*.07 }}
                  className="sku-card" style={{ padding:'.9rem .7rem', textAlign:'center' }}>
                  <Icon size={14} style={{ color:T.green, margin:'0 auto .3rem' }}/>
                  <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:'1.1rem', fontWeight:900, color:T.green, lineHeight:1 }}><AnimatedCounter target={val}/></div>
                  <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.52rem', color:T.textMuted, textTransform:'uppercase', letterSpacing:'.07em', marginTop:'.25rem', lineHeight:1.3 }}>{label}</div>
                </motion.div>
              ))}
            </div>

            {/* CEO signature */}
            <motion.div initial={{ opacity:0, y:12 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:.9 }}
              style={{ display:'flex', alignItems:'center', gap:'1rem', padding:'1rem 1.3rem', borderRadius:14, background: T.light?'rgba(22,163,74,.04)':'rgba(34,200,100,.04)', border:`1px solid ${T.border}` }}>
              <div style={{ width:46, height:46, borderRadius:'50%', background:'rgba(34,200,100,.15)', border:`2px solid ${T.border2}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="10" r="5.5" fill="rgba(34,200,100,.25)" stroke={T.green} strokeWidth="1.4" style={{ animation:'proc-float 2.5s ease-in-out infinite' }}/>
                  <path d="M4 26 C4 20 8 17 14 17 C20 17 24 20 24 26" stroke={T.green} strokeWidth="1.4" strokeLinecap="round" fill="rgba(34,200,100,.1)" style={{ animation:'proc-float 2.5s .3s ease-in-out infinite' }}/>
                  <circle cx="16.5" cy="8" r="1.2" fill={T.green} opacity=".7" style={{ animation:'proc-blink 2s ease-in-out infinite' }}/>
                </svg>
              </div>
              <div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, color:T.textMain, fontSize:'.88rem' }}>M'Bollo Aka Elvis</div>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.6rem', color:T.greenSub, letterSpacing:'.08em' }}>Fondateur · Développeur Full-Stack · AKATech</div>
              </div>
              <a href="https://akafolio160502.vercel.app/" target="_blank" rel="noreferrer"
                className="btn-raised" style={{ marginLeft:'auto', padding:'.6rem 1.1rem', fontSize:'.78rem', flexShrink:0, display:'inline-flex', alignItems:'center', gap:'.4rem' }}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 11L11 2M11 2H5M11 2V8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                En savoir plus
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ── SCROLL HINT (CSS-only, style identique aux dots de Réalisations) ────
function ScrollHint({ label = 'Faites glisser' }) {
  return (
    <div className="scroll-hint-mobile">
      <div className="sh-arrow">
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M3 2L8 6L3 10" stroke="#22c864" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 2L14 6L9 10" stroke="#22c864" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity=".5"/>
        </svg>
      </div>
      <span className="sh-label">{label}</span>
      <div className="sh-dots">
        <span className="sh-dot active"/>
        <span className="sh-dot"/>
        <span className="sh-dot"/>
      </div>
    </div>
  )
}

// ── SERVICES IMAGE BANNER ────────────────────────────────────
const SVC_BANNER_IMGS = [
  
  '/images/services/ecommerce.jpg',
  '/images/services/saas.jpg',
  
  '/images/services/api.jpg',
  '/images/services/maintenance.jpg',
]

function ServicesBanner() {
  const [active, setActive] = useState(0)
  const [errs, setErrs] = useState({})
  useEffect(() => {
    const iv = setInterval(() => setActive(a => (a + 1) % SVC_BANNER_IMGS.length), 3000)
    return () => clearInterval(iv)
  }, [])
  const anyVisible = SVC_BANNER_IMGS.some((_,i)=>!errs[i])
  if (!anyVisible) return null
  return (
    <div style={{ position: 'relative', height: 220, borderRadius: 18, overflow: 'hidden', marginBottom: '3rem', border: '1px solid rgba(34,200,100,.12)' }}>
      {SVC_BANNER_IMGS.map((src, i) => (
        !errs[i] && (
          <div key={i} style={{ position: 'absolute', inset: 0, opacity: i === active ? 1 : 0, transition: 'opacity 1s ease' }}>
            <img src={src} alt="" loading="lazy" decoding="async" onError={() => setErrs(e => ({ ...e, [i]: true }))} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,26,16,.9) 0%, rgba(10,26,16,.3) 50%, rgba(10,26,16,.7) 100%)' }}/>
          </div>
        )
      ))}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 2.5rem', zIndex: 2 }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.6rem', color: 'rgba(34,200,100,.7)', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: '.5rem' }}>// AKATech · Services</div>
        <div style={{ fontSize: 'clamp(1.1rem,2.5vw,1.6rem)', fontWeight: 800, color: '#fff', fontFamily: "'Syne',sans-serif", lineHeight: 1.2 }}>
          Votre site doit vous rapporter de l'argent.<br/><span style={{ color: '#22c864' }}>On s'en assure.</span>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '.8rem', right: '1rem', display: 'flex', gap: '.35rem', zIndex: 2 }}>
        {SVC_BANNER_IMGS.map((_, i) => !errs[i] && (
          <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? 18 : 6, height: 6, borderRadius: 3, background: i === active ? '#22c864' : 'rgba(255,255,255,.25)', border: 'none', cursor: 'pointer', transition: 'all .25s', padding: 0 }}/>
        ))}
      </div>
    </div>
  )
}

// ── SERVICES ─────────────────────────────────────────────────
const SVCS=[
  {icon:Globe,     n:'01',title:'Site Vitrine',        desc:'Présentez votre activité en ligne, gagnez en crédibilité et recevez des demandes 24h/24 — même quand vous êtes occupé.',price:'Dès 60 000 FCFA',del:'5–14 jours'},
  {icon:ShoppingCart,n:'02',title:'E-commerce',        desc:'Ouvrez votre boutique en ligne et vendez partout en Côte d\'Ivoire. Catalogue, panier, paiement sécurisé, gestion des commandes.',price:'Dès 200 000 FCFA',del:'10j–4 sem'},
  {icon:Cpu,       n:'03',title:'Application SaaS',    desc:'Automatisez la gestion de votre business avec une plateforme sur mesure. Dashboard, authentification, API — prêt à scaler.',price:'Dès 500 000 FCFA',del:'3–8 semaines'},
  {icon:Star,      n:'04',title:'Portfolio',           desc:'Mettez vos réalisations en valeur et attirez de nouvelles opportunités. Design moderne, animations fluides, section projets détaillée.',price:'Dès 50 000 FCFA',del:'3–10 jours'},
  {icon:Server,    n:'05',title:'API RESTful',         desc:'APIs sécurisées, documentées et prêtes pour la production. Connectez vos apps entre elles et gagnez du temps sur l\'intégration.',price:'Sur devis',del:'Selon complexité'},
  {icon:Wrench,    n:'06',title:'Maintenance',         desc:'Votre site toujours à jour, rapide et sécurisé. Corrections de bugs, mises à jour et optimisations — réponse garantie sous 24h.',price:'Sur devis',del:'< 24h'},
]

function Services() {
  const ref=useRef(null); const inView=useInView(ref,{once:true,margin:'-80px'})
  const T=useTheme()
  return (
    <section id="services" ref={ref} style={{padding:'7rem 5%',background:T.bg,position:'relative'}}>
      <div className="grid-bg" style={{position:'absolute',inset:0,opacity:.4}}/>
      <div style={{maxWidth:1200,margin:'0 auto',position:'relative',zIndex:1}}>
        <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.6}} style={{textAlign:'center',marginBottom:'4rem'}}>
          <SectionEye label="// Nos Services" ghost="SERVICES" center/>
          <h2 style={{fontSize:'clamp(1.9rem,3.5vw,2.8rem)',fontWeight:800,fontFamily:"'Syne',sans-serif",letterSpacing:'-.03em',lineHeight:1.15,color:T.textMain}}>
            Des solutions qui travaillent pour vous,<br/>
            <span className="text-gradient-anim">même quand vous dormez</span>
          </h2>
        </motion.div>
        <ServicesBanner/>
        <ScrollHint label="Swipe pour voir les services"/>
        <div className="svc-scroll" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:'1.2rem'}}>
          {SVCS.map(({icon:Icon,n,title,desc,price,del},i)=>(
            <motion.div key={title} className="sku-card" initial={{opacity:0,y:32,scale:.97}} animate={inView?{opacity:1,y:0,scale:1}:{}} transition={{duration:.55,delay:(i%3)*.12}}
              style={{padding:'1.8rem',position:'relative',overflow:'hidden'}}
            >
              <div style={{display:'flex',alignItems:'center',gap:'1rem',marginBottom:'1.2rem'}}>
                <div style={{width:50,height:50,borderRadius:12,background:'rgba(34,200,100,.1)',border:`1px solid ${T.border}`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <Icon size={22} style={{color:T.green}}/>
                </div>
                <div>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:'.58rem',color:T.greenSub,letterSpacing:'.1em',marginBottom:'.2rem'}}>{n}</div>
                  <h3 style={{fontSize:'1rem',fontWeight:700,color:T.textMain,fontFamily:"'Syne',sans-serif"}}>{title}</h3>
                </div>
              </div>
              <p style={{fontSize:'.83rem',color:T.textSub,lineHeight:1.7,marginBottom:'1.2rem'}}>{desc}</p>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'.9rem',borderTop:`1px solid ${T.border}`}}>
                <span style={{fontFamily:"'Orbitron',sans-serif",fontSize:'.78rem',fontWeight:700,color:T.green}}>{price}</span>
                <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:'.62rem',color:T.textMuted,display:'inline-flex',alignItems:'center',gap:3}}><Timer size={11} style={{color:T.green}}/>{del}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── TRUST BAR (Why Us) ───────────────────────────────────────
const TRUST=[
  {n:'01',title:'Livraison dans les délais',    desc:'Pas de mauvaises surprises. Chaque projet est livré à la date convenue, avec un suivi régulier jusqu\'à la mise en ligne.'},
  {n:'02',title:'Design 100% sur mesure',       desc:'Votre site est unique, pensé pour votre activité. Zéro template, zéro copier-coller — une identité visuelle qui vous ressemble.'},
  {n:'03',title:'Support & Formation inclus',   desc:'Vous repartez autonome. Une formation est incluse pour gérer votre site facilement, sans dépendre d\'un technicien.'},
  {n:'04',title:'SEO & Performance optimisés',  desc:'Un site rapide, visible sur Google. Vos clients vous trouvent plus facilement — et votre crédibilité monte instantanément.'},
]

function TrustBar() {
  const ref=useRef(null); const inView=useInView(ref,{once:true,margin:'-60px'})
  const T=useTheme()
  return (
    <section ref={ref} style={{padding:'6rem 5%',background:T.bgAlt,position:'relative',overflow:'hidden'}}>
      <div style={{maxWidth:1200,margin:'0 auto',position:'relative',zIndex:1}}>
        <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.6}} style={{textAlign:'center',marginBottom:'3.5rem'}}>
          <SectionEye label="// Built on Trust" ghost="TRUST" center/>
          <h2 style={{fontSize:'clamp(1.9rem,3vw,2.6rem)',fontWeight:800,fontFamily:"'Syne',sans-serif",color:T.textMain,letterSpacing:'-.03em'}}>
            Pourquoi les entrepreneurs{' '}<span style={{color:T.green}}>choisissent AKATech.</span>
          </h2>
        </motion.div>
        <div className="trust-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'1rem'}}>
          {TRUST.map(({n,title,desc},i)=>(
            <motion.div key={n} className="sku-card" initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:i*.08}} style={{padding:'1.8rem'}}>
              <div style={{fontFamily:"'Orbitron',sans-serif",fontSize:'1.8rem',fontWeight:900,color:T.green,opacity:.3,lineHeight:1,marginBottom:'.8rem'}}>{n}</div>
              <h3 style={{fontSize:'.95rem',fontWeight:700,color:T.textMain,fontFamily:"'Syne',sans-serif",marginBottom:'.4rem'}}>{title}</h3>
              <p style={{fontSize:'.8rem',color:T.textSub,lineHeight:1.6}}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── PROCESS ──────────────────────────────────────────────────
// Icônes SVG animées pour chaque étape
function IconConsultation({ active }) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      {/* Bulle de dialogue principale */}
      <rect x="3" y="4" width="22" height="16" rx="4" stroke="#22c864" strokeWidth="1.8" fill="rgba(34,200,100,.08)"
        style={{ animation: active ? 'proc-float 2s ease-in-out infinite' : 'none' }}/>
      {/* Queue de la bulle */}
      <path d="M8 20 L5 26 L14 20Z" fill="rgba(34,200,100,.15)" stroke="#22c864" strokeWidth="1.4" strokeLinejoin="round"
        style={{ animation: active ? 'proc-float 2s ease-in-out infinite' : 'none' }}/>
      {/* Lignes de texte dans la bulle */}
      <line x1="8" y1="10" x2="20" y2="10" stroke="#66ffaa" strokeWidth="1.5" strokeLinecap="round"
        strokeDasharray="12" style={{ animation: active ? 'proc-draw 1.2s .2s ease-in-out infinite alternate' : 'none', strokeDashoffset: active ? 0 : 12 }}/>
      <line x1="8" y1="14" x2="16" y2="14" stroke="rgba(34,200,100,.5)" strokeWidth="1.5" strokeLinecap="round"
        strokeDasharray="8" style={{ animation: active ? 'proc-draw 1.2s .5s ease-in-out infinite alternate' : 'none', strokeDashoffset: active ? 0 : 8 }}/>
      {/* Point ping réponse */}
      <circle cx="28" cy="8" r="5" fill="rgba(34,200,100,.12)" stroke="#22c864" strokeWidth="1.5"/>
      <circle cx="28" cy="8" r="2.5" fill="#22c864"
        style={{ animation: active ? 'proc-float 1.6s .3s ease-in-out infinite' : 'none' }}/>
      <circle cx="28" cy="8" r="3" fill="none" stroke="#66ffaa" strokeWidth="1" opacity="0"
        style={{ animation: active ? 'proc-ping 1.4s 1s ease-out infinite' : 'none' }}/>
    </svg>
  )
}

function IconStrategie({ active }) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      {/* Cible extérieure */}
      <circle cx="18" cy="18" r="13" stroke="rgba(34,200,100,.2)" strokeWidth="1.2" strokeDasharray="3 3"
        style={{ animation: active ? 'proc-rotate 8s linear infinite' : 'none', transformOrigin:'18px 18px' }}/>
      {/* Cercle milieu */}
      <circle cx="18" cy="18" r="8" stroke="#22c864" strokeWidth="1.6" fill="rgba(34,200,100,.06)"
        style={{ animation: active ? 'proc-float 2.4s ease-in-out infinite' : 'none' }}/>
      {/* Cercle intérieur */}
      <circle cx="18" cy="18" r="3.5" fill="rgba(34,200,100,.25)" stroke="#22c864" strokeWidth="1.4"/>
      {/* Point central */}
      <circle cx="18" cy="18" r="1.5" fill="#66ffaa"
        style={{ animation: active ? 'proc-float 1.8s .2s ease-in-out infinite' : 'none' }}/>
      {/* Croix de visée */}
      <line x1="18" y1="3" x2="18" y2="8" stroke="rgba(34,200,100,.5)" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="18" y1="28" x2="18" y2="33" stroke="rgba(34,200,100,.5)" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="3" y1="18" x2="8" y2="18" stroke="rgba(34,200,100,.5)" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="28" y1="18" x2="33" y2="18" stroke="rgba(34,200,100,.5)" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

function IconDeveloppement({ active }) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      {/* Fenêtre code */}
      <rect x="2" y="5" width="32" height="24" rx="3.5" stroke="#22c864" strokeWidth="1.6" fill="rgba(34,200,100,.06)"/>
      {/* Barre titre */}
      <line x1="2" y1="12" x2="34" y2="12" stroke="rgba(34,200,100,.2)" strokeWidth="1"/>
      {/* Dots barre */}
      <circle cx="7"  cy="8.5" r="1.8" fill="#22c864" opacity="0.7"/>
      <circle cx="12" cy="8.5" r="1.8" fill="rgba(34,200,100,.4)"/>
      <circle cx="17" cy="8.5" r="1.8" fill="rgba(34,200,100,.2)"/>
      {/* Ligne code 1 — chevrons */}
      <path d="M6 17 L10 19.5 L6 22" stroke="#66ffaa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="14" strokeDashoffset="14"
        style={{ animation: active ? 'proc-draw 1s .1s ease forwards, proc-draw 1s 2.1s ease forwards' : 'none' }}/>
      {/* Ligne code 2 */}
      <line x1="13" y1="19.5" x2="22" y2="19.5" stroke="rgba(34,200,100,.6)" strokeWidth="1.4" strokeLinecap="round"
        strokeDasharray="9" strokeDashoffset="9"
        style={{ animation: active ? 'proc-draw 1s .4s ease forwards' : 'none' }}/>
      {/* Ligne code 3 */}
      <line x1="13" y1="23" x2="19" y2="23" stroke="rgba(34,200,100,.35)" strokeWidth="1.4" strokeLinecap="round"
        strokeDasharray="6" strokeDashoffset="6"
        style={{ animation: active ? 'proc-draw 1s .7s ease forwards' : 'none' }}/>
      {/* Curseur clignotant */}
      <rect x="20" y="21.5" width="1.5" height="3" rx=".5" fill="#22c864"
        style={{ animation: active ? 'proc-blink 1s .5s step-end infinite' : 'none' }}/>
    </svg>
  )
}

function IconLivraison({ active }) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      {/* Fusée corps */}
      <path d="M18 4 C18 4 26 10 26 20 L18 30 L10 20 C10 10 18 4 18 4Z"
        fill="rgba(34,200,100,.12)" stroke="#22c864" strokeWidth="1.7" strokeLinejoin="round"
        style={{ animation: active ? 'proc-float 2s ease-in-out infinite' : 'none' }}/>
      {/* Hublot */}
      <circle cx="18" cy="16" r="3.2" fill="rgba(34,200,100,.2)" stroke="#66ffaa" strokeWidth="1.4"/>
      <circle cx="18" cy="16" r="1.4" fill="#66ffaa" opacity=".8"/>
      {/* Aileron gauche */}
      <path d="M10 22 L6 28 L10 26Z" fill="rgba(34,200,100,.2)" stroke="#22c864" strokeWidth="1.2" strokeLinejoin="round"/>
      {/* Aileron droit */}
      <path d="M26 22 L30 28 L26 26Z" fill="rgba(34,200,100,.2)" stroke="#22c864" strokeWidth="1.2" strokeLinejoin="round"/>
      {/* Flamme propulsion */}
      <path d="M15 30 Q18 36 21 30" fill="rgba(34,200,100,.3)" stroke="#66ffaa" strokeWidth="1.2"
        style={{ animation: active ? 'proc-float 0.6s ease-in-out infinite alternate' : 'none' }}/>
      {/* Étoiles */}
      <circle cx="5"  cy="8"  r="1.2" fill="#66ffaa" style={{ animation: active ? 'proc-blink 1.5s .2s ease-in-out infinite' : 'none' }}/>
      <circle cx="30" cy="12" r="1"   fill="#66ffaa" style={{ animation: active ? 'proc-blink 1.5s .7s ease-in-out infinite' : 'none' }}/>
      <circle cx="8"  cy="20" r=".8"  fill="#66ffaa" style={{ animation: active ? 'proc-blink 1.5s 1.1s ease-in-out infinite' : 'none' }}/>
    </svg>
  )
}

const STEPS = [
  { SvgIcon: IconConsultation, n:'01', title:'On vous écoute',     desc:'Vous décrivez votre projet, vos objectifs et votre budget. Devis gratuit et personnalisé, sans engagement.' },
  { SvgIcon: IconStrategie,    n:'02', title:'On planifie',        desc:'On définit ensemble la meilleure solution pour votre activité : technologies, design, délais et fonctionnalités.' },
  { SvgIcon: IconDeveloppement,n:'03', title:'On développe',       desc:'Votre solution prend vie avec un code propre et un design soigné. Vous suivez l\'avancement à chaque étape.' },
  { SvgIcon: IconLivraison,    n:'04', title:'On livre & on forme', desc:'Mise en ligne, tests, formation et support inclus. Vous repartez avec un outil prêt à attirer des clients.' },
]

function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(null)
  const T = useTheme()

  return (
    <section id="process" ref={ref} style={{ padding:'7rem 5%', background:T.bg, position:'relative' }}>
      <div className="grid-bg" style={{ position:'absolute', inset:0, opacity:.3 }}/>
      <div style={{ maxWidth:1200, margin:'0 auto', position:'relative', zIndex:1 }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} style={{ textAlign:'center', marginBottom:'4rem' }}>
          <SectionEye label="// Notre Processus" ghost="PROCESS" center/>
          <h2 style={{ fontSize:'clamp(1.9rem,3.5vw,2.8rem)', fontWeight:800, fontFamily:"'Syne',sans-serif", color:T.textMain, letterSpacing:'-.03em' }}>
            De l'idée au lancement,{' '}<span style={{ color:T.green }}>on s'occupe de tout.</span>
          </h2>
        </motion.div>

        <ScrollHint label="Swipe pour voir les étapes"/>
        <div className="proc-scroll" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(230px,1fr))', gap:'1.2rem', position:'relative' }}>
          {/* Connecteur animé */}
          <div className="hidden lg:block proc-connector" style={{ position:'absolute', top:44, left:'12.5%', right:'12.5%', height:1, background:'linear-gradient(90deg,transparent,rgba(34,200,100,.25) 20%,rgba(34,200,100,.25) 80%,transparent)', zIndex:0, pointerEvents:'none' }}/>

          {STEPS.map(({ SvgIcon, n, title, desc }, i) => (
            <motion.div key={n}
              initial={{ opacity:0, y:28 }} animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ delay: i * .13, ease:[.22,1,.36,1] }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', position:'relative', zIndex:1 }}
            >
              {/* Cercle icône SVG animé */}
              <motion.div
                whileHover={{ scale:1.12, boxShadow:'10px 10px 28px #010402,-4px -4px 18px rgba(34,200,100,.15),0 0 40px rgba(34,200,100,.35)' }}
                transition={{ type:'spring', stiffness:280, damping:18 }}
                className="proc-icon sku-card"
                style={{
                  width:88, height:88, borderRadius:'50%',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  marginBottom:'1.4rem', position:'relative', cursor:'pointer',
                  background:'linear-gradient(145deg,#0e2416,#081208)',
                  boxShadow:'8px 8px 20px #010402,-4px -4px 14px rgba(34,200,100,.08)',
                  border: hovered === i ? '1px solid rgba(34,200,100,.4)' : '1px solid rgba(34,200,100,.14)',
                  transition:'border-color .3s',
                }}
              >
                {/* Halo de fond animé au hover */}
                {hovered === i && (
                  <motion.div
                    initial={{ opacity:0, scale:.6 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
                    style={{ position:'absolute', inset:0, borderRadius:'50%', background:'radial-gradient(circle,rgba(34,200,100,.15),transparent 70%)', pointerEvents:'none' }}
                  />
                )}
                <SvgIcon active={hovered === i || inView} />
                {/* Badge numéro */}
                <div style={{ position:'absolute', bottom:-4, right:-4, width:26, height:26, borderRadius:'50%', background:'linear-gradient(145deg,#27d570,#1aa355)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'2px 2px 8px rgba(0,0,0,.6)', zIndex:2 }}>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.52rem', fontWeight:700, color:'#fff' }}>{n}</span>
                </div>
              </motion.div>

              <motion.h3
                animate={{ color: hovered === i ? T.green : T.textMain }}
                transition={{ duration:.2 }}
                style={{ fontSize:'1rem', fontWeight:700, fontFamily:"'Syne',sans-serif", marginBottom:'.5rem' }}
              >{title}</motion.h3>
              <p style={{ fontSize:'.8rem', color:T.textSub, lineHeight:1.65 }}>{desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity:0, y:14 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:.5 }} style={{ display:'flex', justifyContent:'center', marginTop:'3.5rem' }}>
          <a href="https://wa.me/2250142507750" target="_blank" rel="noreferrer" className="btn-raised">Démarrer mon projet — C'est gratuit</a>
        </motion.div>
      </div>
    </section>
  )
}

// ── PROJECTS CAROUSEL ────────────────────────────────────────
const PROJS=[
  {id:1,title:'ShopCI',sub:'Marketplace E-commerce',cat:'live',desc:'Marketplace multi-vendeurs ivoirien. Panier temps réel, paiement sécurisé.',tech:['React','Django','Bootstrap 5'],url:'https://shop-ci.vercel.app/',img:'/images/projects/shopci.jpg',premium:true},
  {id:2,title:'TechFlow',sub:'Site Vitrine Pro',cat:'live',desc:'Site vitrine moderne pour activité tech. Interface propre et responsive.',tech:['HTML','Tailwind CSS','JS'],url:'https://techflow-ten.vercel.app/',img:'/images/projects/techflow.jpg',premium:true},
  {id:3,title:'TerraSafe',sub:'Marketplace Foncière',cat:'live',desc:"Plateforme anti-arnaques foncières. Auth sécurisée et backend Python.",tech:['Python/Flask','MySQL','Bootstrap 5'],url:'https://wthomassss06.pythonanywhere.com',img:'/images/projects/terrasafe.jpg',premium:true},
  {id:4,title:'Tati',sub:'Portfolio & Vitrine',cat:'live',desc:"Portfolio double-fonction, thème sombre/clair, animations Framer Motion.",tech:['React','Tailwind','Framer Motion'],url:'https://tatii.vercel.app/',img:'/images/projects/tati.jpg',premium:true},
  {id:5,title:'MK',sub:'Portfolio Graphiste',cat:'live',desc:"Portfolio sur-mesure pour graphiste. Galerie immersive et design élégant.",tech:['React','Tailwind','Framer Motion'],url:'https://mory01ff.vercel.app/',img:'/images/projects/mk.jpg',premium:true},
  {id:6,title:'Chap-chapMAP',sub:'Navigation GPS',cat:'demo',desc:"Cartographie GPS temps réel et calcul d'itinéraires optimisés.",tech:['Leaflet.js','OSRM','Geolocation'],url:'',img:'/images/projects/chapchap.jpg'},
  {id:7,title:'ElvisMarket',sub:'Interface E-commerce',cat:'demo',desc:"Panier dynamique, filtres avancés et UX soignée en JS vanilla.",tech:['HTML','JS vanilla','Tailwind'],url:'',img:'/images/projects/elvismarket.jpg'},
]

function ProjectsCarousel() {
  const ref=useRef(null); const inView=useInView(ref,{once:true,margin:'-60px'})
  const T=useTheme()
  const [idx,setIdx]=useState(0)
  const [paused,setPaused]=useState(false)
  const [dragStart,setDragStart]=useState(null)
  const [isMobile,setIsMobile]=useState(false)
  useEffect(()=>{
    const check=()=>setIsMobile(window.innerWidth<768)
    check(); window.addEventListener('resize',check,{passive:true})
    return()=>window.removeEventListener('resize',check)
  },[])
  const BADGE={live:{label:'EN LIGNE',color:'#22c864',bg:'rgba(34,200,100,.15)'},demo:{label:'DÉMO',color:'#f59e0b',bg:'rgba(245,158,11,.12)'},wip:{label:'EN COURS',color:'#f97316',bg:'rgba(249,115,22,.12)'}}

  // Auto-play
  useEffect(()=>{
    if(paused) return
    const iv=setInterval(()=>setIdx(i=>(i+1)%PROJS.length),3200)
    return ()=>clearInterval(iv)
  },[paused])

  const onDragStart=(clientX)=>setDragStart(clientX)
  const onDragEnd=(clientX)=>{
    if(dragStart===null) return
    const diff=dragStart-clientX
    if(diff>50) setIdx(i=>(i+1)%PROJS.length)
    else if(diff<-50) setIdx(i=>(i-1+PROJS.length)%PROJS.length)
    setDragStart(null)
  }

  // Positions relatives par rapport à la carte centrale
  const getCardStyle=(i)=>{
    const rel=i-idx
    const total=PROJS.length
    // Wrap around: find shortest distance
    let d=((rel%total)+total)%total
    if(d>total/2) d=d-total

    if(isMobile) {
      // Mobile : standard carousel
      return {
        position:'absolute', top:0, left:'50%',
        transform:`translateX(calc(-50% + ${d*105}%))`,
        width:'88vw', maxWidth:360,
        opacity: Math.abs(d)<=1?1:0,
        zIndex: Math.abs(d)===0?10:5,
        transition:'all .5s cubic-bezier(.22,1,.36,1)',
        pointerEvents: Math.abs(d)<=1?'auto':'none',
      }
    }

    // Desktop : style NFT 3D
    const absD=Math.abs(d)
    if(absD===0) return {
      position:'absolute', top:0, left:'50%',
      transform:'translateX(-50%) translateZ(0) rotateY(0deg) scale(1)',
      width:320, zIndex:10, opacity:1,
      filter:'none',
      transition:'all .5s cubic-bezier(.22,1,.36,1)',
    }
    if(absD===1) return {
      position:'absolute', top:'4%', left:'50%',
      transform:`translateX(calc(-50% + ${d*260}px)) rotateY(${d<0?18:-18}deg) scale(.82)`,
      width:260, zIndex:8, opacity:.85,
      filter:'brightness(.75)',
      transition:'all .5s cubic-bezier(.22,1,.36,1)',
    }
    if(absD===2) return {
      position:'absolute', top:'9%', left:'50%',
      transform:`translateX(calc(-50% + ${d*260}px)) rotateY(${d<0?28:-28}deg) scale(.67)`,
      width:220, zIndex:6, opacity:.6,
      filter:'brightness(.5)',
      transition:'all .5s cubic-bezier(.22,1,.36,1)',
    }
    return {
      position:'absolute', top:'12%', left:'50%',
      transform:`translateX(calc(-50% + ${d*270}px)) rotateY(${d<0?35:-35}deg) scale(.56)`,
      width:200, zIndex:4, opacity:.3,
      filter:'brightness(.35)',
      transition:'all .5s cubic-bezier(.22,1,.36,1)',
      pointerEvents:'none',
    }
  }

  // Hauteur du conteneur selon le mode
  const containerH = isMobile ? 420 : 480

  return (
    <section id="projets" ref={ref} style={{padding:'7rem 5%',background:T.bg,position:'relative',overflow:'hidden'}}>
      {/* Ambient glow derrière les cartes */}
      {!isMobile && (
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:600,height:300,borderRadius:'50%',background:'radial-gradient(ellipse,rgba(34,200,100,.12),transparent 70%)',pointerEvents:'none',zIndex:0}}/>
      )}

      <div style={{maxWidth:1300,margin:'0 auto',position:'relative',zIndex:1}}>

        {/* Header */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom: isMobile?'2rem':'3.5rem',flexWrap:'wrap',gap:'1rem'}}>
          <motion.div initial={{opacity:0,x:-20}} animate={inView?{opacity:1,x:0}:{}}>
            <SectionEye label="// Réalisations" ghost="WORK"/>
            <h2 style={{fontSize:'clamp(1.9rem,3.5vw,2.8rem)',fontWeight:800,fontFamily:"'Syne',sans-serif",color:T.textMain,letterSpacing:'-.03em'}}>
              Ce qu'on a déjà <span style={{color:T.green}}>construit pour nos clients</span>
            </h2>
          </motion.div>
          <div style={{display:'flex',gap:'.7rem',alignItems:'center'}}>
            <motion.button onClick={()=>setIdx(i=>(i-1+PROJS.length)%PROJS.length)} whileTap={{scale:.95}}
              style={{width:44,height:44,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',background:T.bgCard,border:`1px solid ${T.border}`,cursor:'pointer'}}>
              <ChevronLeft size={18} style={{color:T.green}}/>
            </motion.button>
            <motion.button onClick={()=>setIdx(i=>(i+1)%PROJS.length)} whileTap={{scale:.95}}
              style={{width:44,height:44,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(145deg,#27d570,#1aa355)',border:'none',cursor:'pointer'}}>
              <ChevronRight size={18} style={{color:'#fff'}}/>
            </motion.button>
            <a href="https://akafolio160502.vercel.app/" target="_blank" rel="noreferrer" className="btn-ghost" style={{padding:'.55rem 1.2rem',fontSize:'.8rem'}}>Portfolio →</a>
          </div>
        </div>

        {/* Scène 3D cartes */}
        <ScrollHint label="Swipe pour voir les projets"/>
        <div
          style={{position:'relative',height:containerH,perspective:isMobile?'none':'1200px',perspectiveOrigin:'50% 40%',userSelect:'none',cursor:'grab'}}
          onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}
          onMouseDown={e=>onDragStart(e.clientX)} onMouseUp={e=>onDragEnd(e.clientX)}
          onTouchStart={e=>onDragStart(e.touches[0].clientX)} onTouchEnd={e=>onDragEnd(e.changedTouches[0].clientX)}
        >
          {PROJS.map((p,i)=>{
            const b=BADGE[p.cat]
            const s=getCardStyle(i)
            const isCurrent=((i-idx+PROJS.length)%PROJS.length===0)
            return (
              <div key={p.id} onClick={()=>!isMobile&&setIdx(i)}
                style={{...s,borderRadius:20,overflow:'hidden',cursor:isCurrent?'default':'pointer',
                  background: isCurrent
                    ? (T.light?'#ffffff':'linear-gradient(145deg,#0e2416,#0b1a10)')
                    : (T.light?'#f0f0f0':'#060e09'),
                  border: isCurrent
                    ? `1px solid ${T.light?'rgba(22,163,74,.35)':'rgba(34,200,100,.35)'}`
                    : `1px solid ${T.border}`,
                  boxShadow: isCurrent
                    ? (T.light
                        ? '0 24px 60px rgba(0,0,0,.18), 0 8px 24px rgba(22,163,74,.12)'
                        : '0 24px 80px rgba(0,0,0,.7), 0 0 40px rgba(34,200,100,.2), inset 0 1px 0 rgba(34,200,100,.1)')
                    : '0 8px 24px rgba(0,0,0,.3)',
                }}
              >
                {/* Image */}
                <div style={{height: isCurrent?220:160,overflow:'hidden',position:'relative',flexShrink:0}}>
                  <LazyImg src={p.img} alt={p.title} className="proj-img"
                    style={{width:'100%',height:'100%',objectFit:'cover'}}
                    placeholder={<div className="img-ph" style={{height:'100%',position:'absolute',inset:0}}><Globe size={24} style={{opacity:.3}}/><span>{p.title}</span></div>}
                  />
                  {/* Gradient overlay */}
                  <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,.75) 0%,transparent 55%)'}}/>
                  {/* Badge statut */}
                  <div style={{position:'absolute',top:'.65rem',left:'.65rem',padding:'.18rem .6rem',borderRadius:4,background:b.bg,backdropFilter:'blur(8px)',border:`1px solid ${b.color}30`,color:b.color,fontFamily:"'JetBrains Mono',monospace",fontSize:'.55rem',fontWeight:700,letterSpacing:'.06em'}}>{b.label}</div>
                  {/* Badge premium */}
                  {p.premium&&<div style={{position:'absolute',top:'.65rem',right:'.65rem',width:22,height:22,borderRadius:'50%',background:'linear-gradient(135deg,#f59e0b,#f97316)',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 2px 8px rgba(249,115,22,.5)'}}><Star size={10} fill="white" color="white"/></div>}
                  {/* Titre flottant sur l'image */}
                  {isCurrent && (
                    <div style={{position:'absolute',bottom:'.8rem',left:'.9rem',right:'.9rem'}}>
                      <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:'.56rem',color:'rgba(255,255,255,.6)',letterSpacing:'.1em',textTransform:'uppercase',marginBottom:'.2rem'}}>{p.sub}</div>
                      <div style={{fontSize:'1rem',fontWeight:800,color:'#fff',fontFamily:"'Syne',sans-serif",lineHeight:1.2}}>{p.title}</div>
                    </div>
                  )}
                </div>

                {/* Infos (carte centrale seulement en desktop) */}
                {(isCurrent || isMobile) && (
                  <div style={{padding:'1rem 1.1rem'}}>
                    {isMobile && <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:'.56rem',color:T.greenSub,letterSpacing:'.1em',textTransform:'uppercase',marginBottom:'.25rem'}}>{p.sub}</div>}
                    {isMobile && <div style={{fontSize:'.92rem',fontWeight:700,color:T.textMain,fontFamily:"'Syne',sans-serif",marginBottom:'.4rem'}}>{p.title}</div>}
                    <p style={{fontSize:'.76rem',color:T.textSub,lineHeight:1.6,marginBottom:'.7rem'}}>{p.desc}</p>
                    <div style={{display:'flex',flexWrap:'wrap',gap:'.25rem',marginBottom:'.8rem'}}>
                      {p.tech.map(t=>(
                        <span key={t} style={{padding:'.14rem .5rem',background:'rgba(34,200,100,.07)',border:`1px solid ${T.border}`,borderRadius:4,fontFamily:"'JetBrains Mono',monospace",fontSize:'.54rem',color:T.green}}>{t}</span>
                      ))}
                    </div>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'.7rem',borderTop:`1px solid ${T.border}`}}>
                      {p.url
                        ? <a href={p.url} target="_blank" rel="noreferrer"
                            style={{display:'inline-flex',alignItems:'center',gap:'.4rem',fontSize:'.76rem',fontWeight:700,color:'#fff',background:`linear-gradient(135deg,${T.green},${T.light?'#22c864':'#17a354'})`,padding:'.38rem .9rem',borderRadius:8,textDecoration:'none',transition:'transform .2s'}}
                            onMouseEnter={e=>e.currentTarget.style.transform='translateY(-1px)'}
                            onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                            <ExternalLink size={11}/>Voir le projet
                          </a>
                        : <span style={{display:'inline-flex',alignItems:'center',gap:'.4rem',fontSize:'.74rem',color:T.textMuted}}><Lock size={11}/>Démo locale</span>
                      }
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Dots */}
        <div style={{display:'flex',justifyContent:'center',gap:'.45rem',marginTop:'2rem'}}>
          {PROJS.map((_,i)=>(
            <button key={i} onClick={()=>setIdx(i)} style={{width:i===idx?24:7,height:7,borderRadius:4,background:i===idx?T.green:T.border,border:'none',cursor:'pointer',transition:'all .3s',padding:0}}/>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── PRICING ──────────────────────────────────────────────────
const PRICING={
  vitrine:{label:'Site Vitrine',plans:[
    {badge:'STARTER',price:'60 000 FCFA',del:'5–7 jours',features:['Design moderne responsive','Jusqu\'à 3 pages','Formulaire de contact','Intégration WhatsApp','SEO de base','Mise en ligne incluse']},
    {badge:'STANDARD',price:'120 000 FCFA',del:'7–10 jours',popular:true,features:['Design professionnel','Jusqu\'à 5 pages','Google Maps intégré','SEO optimisé','Optimisation vitesse','Intégration WhatsApp']},
    {badge:'PREMIUM',price:'200 000 FCFA',del:'10–14 jours',features:['Jusqu\'à 8 pages','Blog intégré','SEO avancé','Newsletter intégrée','Formation incluse','Support post-livraison']},
  ]},
  ecommerce:{label:'E-commerce',plans:[
    {badge:'STARTER',price:'200 000 FCFA',del:'10–14 jours',features:['Catalogue produits','Jusqu\'à 20 produits','Panier d\'achat','Interface admin','Gestion commandes']},
    {badge:'STANDARD',price:'350 000 FCFA',del:'15–20 jours',popular:true,features:['Jusqu\'à 50 produits','Paiement en ligne','Gestion des stocks','SEO e-commerce','Formation incluse']},
    {badge:'PREMIUM',price:'500 000 FCFA',del:'3–4 semaines',features:['Jusqu\'à 150 produits','Paiement sécurisé','Avis clients','Statistiques de vente','Optimisation performance']},
  ]},
  saas:{label:'App SaaS',plans:[
    {badge:'STARTER',price:'500 000 FCFA',del:'3–4 sem',features:['Backend Node.js/Django','Base MySQL','Interface utilisateur','Dashboard admin','API REST']},
    {badge:'STANDARD',price:'800 000 FCFA',del:'4–6 sem',popular:true,features:['Auth utilisateurs','Dashboard avancé','API REST sécurisée','Optimisation performance','Tests inclus']},
    {badge:'PREMIUM',price:'1 200 000 FCFA',del:'6–8 sem',features:['Architecture complète','Gestion abonnements','Dashboard complet','Documentation tech','Support 3 mois inclus']},
  ]},
  portfolio:{label:'Portfolio',plans:[
    {badge:'STARTER',price:'50 000 FCFA',del:'3–5 jours',features:['Design responsive','3 pages','Section projets','Formulaire contact']},
    {badge:'STANDARD',price:'100 000 FCFA',del:'5–7 jours',popular:true,features:['5 pages','Animations modernes','Section projets détaillés','SEO de base']},
    {badge:'PREMIUM',price:'150 000 FCFA',del:'7–10 jours',features:['Design personnalisé','Animations avancées','Blog intégré','Optimisation performance']},
  ]},
}

function Pricing() {
  const [tab,setTab]=useState('vitrine')
  const ref=useRef(null); const inView=useInView(ref,{once:true,margin:'-60px'})
  const T=useTheme()
  const d=PRICING[tab]
  return (
    <section id="tarifs" ref={ref} style={{padding:'7rem 5%',background:T.bgAlt,position:'relative'}}>
      <div className="grid-bg" style={{position:'absolute',inset:0,opacity:.3}}/>
      <div style={{maxWidth:1200,margin:'0 auto',position:'relative',zIndex:1}}>
        <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} style={{textAlign:'center',marginBottom:'3rem'}}>
          <SectionEye label="// Tarifs" ghost="PRICING" center/>
          <h2 style={{fontSize:'clamp(1.9rem,3.5vw,2.8rem)',fontWeight:800,fontFamily:"'Syne',sans-serif",color:T.textMain,letterSpacing:'-.03em'}}>
            Des offres claires,{' '}<span style={{color:T.green}}>pour chaque étape de votre projet</span>
          </h2>
          <p style={{marginTop:'.8rem',fontSize:'.9rem',color:T.textMuted}}>Pas de frais cachés. Devis gratuit et sans engagement.</p>
        </motion.div>
        <div className="pricing-tabs" style={{display:'flex',justifyContent:'center',gap:'.4rem',marginBottom:'3rem'}}>
          {Object.entries(PRICING).map(([k,v])=>(
            <button key={k} onClick={()=>setTab(k)} style={{padding:'.5rem 1.4rem',borderRadius:100,border:'1px solid',flexShrink:0,borderColor:tab===k?T.green:T.border,background:tab===k?'linear-gradient(145deg,#27d570,#1aa355)':'transparent',color:tab===k?'#fff':T.textSub,fontFamily:"'Syne',sans-serif",fontSize:'.82rem',fontWeight:700,cursor:'pointer',transition:'all .22s'}}>
              {v.label}
            </button>
          ))}
        </div>
        <ScrollHint label="Swipe pour comparer les offres"/>
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.3}}
            className="pricing-mobile-scroll"
            style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'1.2rem'}}
          >
            {d.plans.map((p,i)=>{
              const wa=encodeURIComponent(`Bonjour AKATech, intéressé par l'offre ${p.badge} à ${p.price}`)
              return (
                <div key={p.badge} className="sku-card" style={{padding:'2rem',position:'relative',overflow:'hidden',border:p.popular?`1px solid ${T.green}`:`1px solid ${T.border}`}}>
                  {p.popular&&<div style={{position:'absolute',top:0,left:0,right:0,padding:'.35rem',background:'linear-gradient(90deg,#17a354,#22c864)',textAlign:'center',fontFamily:"'JetBrains Mono',monospace",fontSize:'.58rem',fontWeight:700,color:'#fff',letterSpacing:'.1em',display:'flex',alignItems:'center',justifyContent:'center',gap:'.4rem',borderRadius:'17px 17px 0 0'}}><Zap size={10}/>LE PLUS POPULAIRE</div>}
                  <div style={{marginTop:p.popular?'1.2rem':0}}>
                    <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:'.6rem',letterSpacing:'.12em',color:T.greenSub,textTransform:'uppercase',marginBottom:'.6rem'}}>{p.badge}</div>
                    <div style={{fontFamily:"'Orbitron',sans-serif",fontSize:p.price.length>10?'1.05rem':'1.35rem',fontWeight:900,color:T.textMain,marginBottom:'.25rem'}}>{p.price}</div>
                    <div className="pricing-del" style={{fontFamily:"'JetBrains Mono',monospace",fontSize:'.62rem',marginBottom:'1.4rem',display:'flex',alignItems:'center',gap:3}}><Timer size={11} style={{color:T.green}}/>{p.del}</div>
                    <div style={{display:'flex',flexDirection:'column',gap:'.55rem',marginBottom:'1.6rem'}}>
                      {p.features.map(f=>(
                        <div key={f} className="feat-row" style={{display:'flex',alignItems:'flex-start',gap:'.6rem',fontSize:'.8rem',lineHeight:1.5}}>
                          <Check size={13} style={{color:T.green,marginTop:2,flexShrink:0}}/>{f}
                        </div>
                      ))}
                    </div>
                    {p.popular
                      ?<a href={`https://wa.me/2250142507750?text=${wa}`} target="_blank" rel="noreferrer" className="btn-raised" style={{width:'100%',justifyContent:'center'}}>Commander →</a>
                      :<a href={`https://wa.me/2250142507750?text=${wa}`} target="_blank" rel="noreferrer" className="btn-ghost" style={{width:'100%',justifyContent:'center'}}>Commander →</a>
                    }
                  </div>
                </div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

// ── TESTIMONIALS CAROUSEL ─────────────────────────────────────
const TEMOS=[
  {name:'Tanoh Calvin',role:'Gérant · MEUBLE CI',project:'Site Vitrine',rating:5,text:"AKATech a créé notre site en moins d'une semaine. Résultat professionnel, rapide et exactement ce qu'on voulait. On recommande sans hésiter !",img:'/images/clients/client-1.jpg',result:'↑ Visibilité x3'},
  {name:'Gnihan Tatiana',role:'Cuisinière & Artisane du fil',project:'Portfolio',rating:5,text:"Mon portfolio en ligne tourne depuis 3 mois. Les clients me contactent directement depuis le site. Exactement ce dont j'avais besoin.",img:'/images/clients/client-2.jpg',result:'↑ 3 nouveaux clients'},
  {name:'Yao Darwell',role:'Graphiste · Designer',project:'Portfolio',rating:5,text:"Mon portfolio m'a permis d'obtenir 3 nouveaux clients en un mois. Design superbe, animations fluides. AKATech comprend vraiment les créatifs.",img:'/images/clients/client-3.jpg',result:'↑ CA en 30 jours'},
]

function AvatarFallback({name,size=52}){
  const initials=name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()
  return(
    <div style={{width:size,height:size,borderRadius:'50%',background:'linear-gradient(135deg,rgba(34,200,100,.3),rgba(34,200,100,.08))',border:'2px solid rgba(34,200,100,.35)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:Math.round(size*.3),color:'#22c864'}}>
      {initials}
    </div>
  )
}

function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })
  const T = useTheme()
  const [idx, setIdx] = useState(0)
  const [imgErr, setImgErr] = useState({})
  const [paused, setPaused] = useState(false)
  const [dragStart, setDragStart] = useState(null)
  const next = () => setIdx(i => (i+1) % TEMOS.length)
  const prev = () => setIdx(i => (i-1+TEMOS.length) % TEMOS.length)
  useEffect(() => { if (paused) return; const iv = setInterval(next, 5000); return () => clearInterval(iv) }, [paused])
  const onDragStart = (x) => setDragStart(x)
  const onDragEnd   = (x) => { if (dragStart === null) return; const diff = dragStart - x; if (diff > 45) next(); else if (diff < -45) prev(); setDragStart(null) }
  const t = TEMOS[idx]
  return (
    <section id="temoignages" ref={ref} style={{ padding:'7rem 5%', background:T.bg, position:'relative', overflow:'hidden' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:1 }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} style={{ textAlign:'center', marginBottom:'3.5rem' }}>
          <SectionEye label="// Témoignages" ghost="REVIEWS" center/>
          <h2 style={{ fontSize:'clamp(1.9rem,3.5vw,2.8rem)', fontWeight:800, fontFamily:"'Syne',sans-serif", color:T.textMain, letterSpacing:'-.03em' }}>
            Des vrais clients. <span style={{ color:T.green }}>De vrais résultats.</span>
          </h2>
          <p style={{ marginTop:'.8rem', fontSize:'.9rem', color:T.textMuted }}>Ils nous ont fait confiance — voyez ce que ça a changé pour leur activité.</p>
        </motion.div>
        <div style={{ position:'relative', cursor:'grab', userSelect:'none' }}
          onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
          onMouseDown={e => onDragStart(e.clientX)} onMouseUp={e => onDragEnd(e.clientX)}
          onTouchStart={e => onDragStart(e.touches[0].clientX)} onTouchEnd={e => onDragEnd(e.changedTouches[0].clientX)}>
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity:0, x:50, scale:.98 }} animate={{ opacity:1, x:0, scale:1 }} exit={{ opacity:0, x:-50, scale:.98 }} transition={{ duration:.38 }}>
              <div className="sku-card temo-card" style={{ padding:'2.5rem', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'relative', zIndex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'.5rem', marginBottom:'1.4rem' }}>
                    <div style={{ display:'flex', gap:'.2rem' }}>
                      {[...Array(t.rating)].map((_,j) => <span key={j} className="star-i"><Star size={15} fill="#f5b500" color="#f5b500"/></span>)}
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:'.3rem', padding:'.2rem .7rem', background:`rgba(34,200,100,.08)`, border:`1px solid ${T.border}`, borderRadius:100 }}>
                      <BadgeCheck size={11} style={{ color:T.green }}/>
                      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.55rem', color:T.green, letterSpacing:'.06em' }}>Avis vérifié</span>
                    </div>
                    <div style={{ marginLeft:'auto', padding:'.2rem .8rem', background:`rgba(34,200,100,.12)`, border:`1px solid ${T.border2}`, borderRadius:100, fontFamily:"'JetBrains Mono',monospace", fontSize:'.58rem', color:T.green, letterSpacing:'.05em', fontWeight:700, whiteSpace:'nowrap' }}>{t.result}</div>
                  </div>
                  <p style={{ fontSize:'clamp(.95rem,2.2vw,1.08rem)', color:T.textSub, lineHeight:1.85, fontStyle:'italic', marginBottom:'2rem', fontFamily:"'Syne',sans-serif" }}>"{t.text}"</p>
                  <div style={{ display:'flex', alignItems:'center', gap:'1rem', flexWrap:'wrap' }}>
                    <div style={{ position:'relative', flexShrink:0 }}>
                      {imgErr[idx] ? <AvatarFallback name={t.name} size={56}/> : (
                        <LazyImg src={t.img} alt={t.name} style={{ width:56, height:56, borderRadius:'50%', objectFit:'cover', border:`2px solid ${T.border2}`, display:'block' }} placeholder={<AvatarFallback name={t.name} size={56}/>}/>
                      )}
                      <div style={{ position:'absolute', bottom:1, right:1, width:12, height:12, borderRadius:'50%', background:T.green, border:`2px solid ${T.bg}` }}/>
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:'.95rem', fontWeight:700, color:T.textMain, fontFamily:"'Syne',sans-serif", lineHeight:1.2 }}>{t.name}</div>
                      <div style={{ fontSize:'.72rem', color:T.textMuted, marginTop:'.2rem', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{t.role}</div>
                    </div>
                    <div style={{ padding:'.35rem 1rem', background:`rgba(34,200,100,.08)`, border:`1px solid ${T.border}`, borderRadius:100, fontFamily:"'JetBrains Mono',monospace", fontSize:'.6rem', color:T.greenSub, display:'flex', alignItems:'center', gap:'.35rem', flexShrink:0 }}>
                      <Code size={10}/>{t.project}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'1rem', marginTop:'2rem' }}>
            <motion.button onClick={prev} whileTap={{ scale:.92 }}
              style={{ width:40, height:40, borderRadius:'50%', background:T.bgCard, border:`1px solid ${T.border}`, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:T.green }}>
              <ChevronLeft size={18}/>
            </motion.button>
            <div style={{ display:'flex', gap:'.4rem' }}>
              {TEMOS.map((_,i)=>(
                <button key={i} onClick={()=>setIdx(i)} style={{ width:i===idx?20:7, height:7, borderRadius:4, background:i===idx?T.green:T.border, border:'none', cursor:'pointer', transition:'all .3s', padding:0 }}/>
              ))}
            </div>
            <motion.button onClick={next} whileTap={{ scale:.92 }}
              style={{ width:40, height:40, borderRadius:'50%', background:T.bgCard, border:`1px solid ${T.border}`, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:T.green }}>
              <ChevronRight size={18}/>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}


// ── FAQ ───────────────────────────────────────────────────────
const FAQ_D=[
  {q:"Combien coûte un site web ?",a:"À partir de 50 000 FCFA pour un portfolio et 60 000 FCFA pour un site vitrine. Le prix final dépend de vos besoins. Le devis est gratuit et sans engagement — contactez-nous et on en discute."},
  {q:"Combien de temps prend la création ?",a:"Un site vitrine est livré en 3 à 14 jours. Un e-commerce prend 10 jours à 4 semaines. Une app SaaS nécessite 3 à 8 semaines. Vous êtes informé à chaque étape de l'avancement."},
  {q:"Puis-je modifier mon site moi-même ?",a:"Oui ! Une formation rapide est incluse dans la plupart des offres. Vous repartez autonome — capable de modifier les textes, images et contenus sans dépendre de personne."},
  {q:"Proposez-vous un support après livraison ?",a:"Oui. Un support technique est disponible après livraison pour corriger les bugs ou répondre à vos questions. Le SaaS Premium inclut 3 mois de support complet."},
  {q:"Les prix sont-ils négociables ?",a:"Chaque projet étant unique, les tarifs s'adaptent à votre réalité. Si votre budget est limité, dites-le franchement — on trouvera une solution. Le devis est toujours gratuit."},
  {q:"Où voir des exemples de réalisations ?",a:"Consultez notre portfolio sur akafolio160502.vercel.app ou directement dans la section Réalisations : ShopCI (e-commerce), TechFlow (vitrine), TerraSafe (SaaS) et d'autres encore."},
]

function FAQ() {
  const [open,setOpen]=useState(null)
  const ref=useRef(null); const inView=useInView(ref,{once:true,margin:'-60px'})
  const T=useTheme()
  return (
    <section id="faq" ref={ref} style={{padding:'7rem 5%',background:T.bg,position:'relative'}}>
      <div className="grid-bg" style={{position:'absolute',inset:0,opacity:.3}}/>
      <div style={{maxWidth:800,margin:'0 auto',position:'relative',zIndex:1}}>
        <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} style={{textAlign:'center',marginBottom:'3.5rem'}}>
          <SectionEye label="// FAQ" ghost="FAQ" center/>
          <h2 style={{fontSize:'clamp(1.9rem,3.5vw,2.8rem)',fontWeight:800,fontFamily:"'Syne',sans-serif",color:T.textMain,letterSpacing:'-.03em'}}>
            Vos questions, <span style={{color:T.green}}>nos réponses.</span>
          </h2>
          <p style={{marginTop:'.8rem',fontSize:'.9rem',color:T.textMuted}}>Encore des doutes ? On répond à tout. Et si votre question n'est pas là, écrivez-nous sur WhatsApp.</p>
        </motion.div>
        <div style={{display:'flex',flexDirection:'column',gap:'.8rem'}}>
          {FAQ_D.map((item,i)=>(
            <motion.div key={i} className="sku-card" initial={{opacity:0,y:14}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:i*.06}}
              style={{overflow:'hidden',border:open===i?`1px solid ${T.border2}`:`1px solid ${T.border}`,transition:'all .22s'}}
            >
              <button onClick={()=>setOpen(open===i?null:i)} className="faq-btn" style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'1rem',padding:'1.2rem 1.5rem',background:'none',border:'none',cursor:'pointer',textAlign:'left'}}>
                <span className="faq-question" style={{fontSize:'.92rem',fontWeight:700,fontFamily:"'Syne',sans-serif"}}>{item.q}</span>
                <motion.span animate={{rotate:open===i?45:0}} transition={{duration:.22}} style={{flexShrink:0,width:24,height:24,borderRadius:'50%',border:`1px solid ${T.border2}`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <ChevronRight size={14} style={{color:T.green}}/>
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open===i&&(
                  <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.25}}>
                    <div className="faq-answer" style={{padding:'0 1.5rem 1.2rem',borderTop:`1px solid ${T.border}`,paddingTop:'.9rem',fontSize:'.84rem',lineHeight:1.7}}>{item.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CONTACT ───────────────────────────────────────────────────

const SOCIAL_LINKS=[
  {icon:MessageCircle,href:'https://wa.me/2250142507750',label:'WhatsApp',sub:'+225 01 42 50 77 50',color:'#25D366'},
  {icon:Facebook,     href:'https://web.facebook.com/profile.php?id=61577494705852',label:'Facebook',sub:'AKATech',color:'#1877F2'},
]

const CONTACT_STATS=[
  {icon:Zap,   val:'< 24h', label:'Réponse'},
  {icon:Check, val:'10+',   label:'Projets'},
  {icon:Star,  val:'5 ★',   label:'Note moy.'},
]

function Contact() {
  const ref=useRef(null); const inView=useInView(ref,{once:true,margin:'-60px'})
  const T=useTheme()
  const [form,setForm]=useState({name:'',email:'',type:'',message:''})
  const [sent,setSent]=useState(false)
  const onChange=e=>setForm(f=>({...f,[e.target.id]:e.target.value}))
  const onSubmit=e=>{
    e.preventDefault(); const{name,email,type,message}=form; if(!name||!email||!type||!message)return
    const txt=encodeURIComponent(`Bonjour AKATech !\n\nNom: ${name}\nEmail: ${email}\nProjet: ${type}\n\nMessage:\n${message}`)
    window.open(`https://wa.me/2250142507750?text=${txt}`,'_blank'); setSent(true)
  }
  const field={
    width:'100%', maxWidth:'100%', boxSizing:'border-box', display:'block',
    background: T.light ? '#f5f5f5' : 'rgba(11,26,16,.9)',
    border:`1px solid ${T.border}`, borderRadius:10,
    padding:'.8rem 1rem', color:T.inputColor,
    fontFamily:"'Syne',sans-serif", fontSize:'.88rem',
    outline:'none', transition:'border-color .2s',
  }
  return (
    <section id="contact" ref={ref} style={{padding:'5rem 4%',background:T.bgAlt,position:'relative',overflow:'hidden',boxSizing:'border-box',width:'100%'}}>
      <div style={{maxWidth:1100,margin:'0 auto',width:'100%',boxSizing:'border-box',position:'relative',zIndex:1}}>
        <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} style={{textAlign:'center',marginBottom:'3rem'}}>
          <SectionEye label="// Contact" ghost="CONTACT" center/>
          <h2 style={{fontSize:'clamp(1.6rem,4vw,2.8rem)',fontWeight:800,fontFamily:"'Syne',sans-serif",color:T.textMain,letterSpacing:'-.03em'}}>
            Parlons de votre projet. <span style={{color:T.green}}>C'est gratuit.</span>
          </h2>
          <p style={{marginTop:'.7rem',fontSize:'.9rem',color:T.textMuted}}>Décrivez votre idée en quelques lignes — je vous réponds personnellement sous 24h avec un devis clair.</p>
        </motion.div>
        <div className="ctt-grid">
          {/* Formulaire */}
          <motion.div className="ctt-form-col" initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.5}}>
            <div style={{background:T.bgCard,border:`1px solid ${T.border}`,borderRadius:18,padding:'1.8rem',boxSizing:'border-box',width:'100%',overflow:'hidden',boxShadow:T.light?'0 2px 16px rgba(0,0,0,.07)':'var(--skeu-shadow)'}}>
              <div style={{display:'flex',alignItems:'center',gap:'.7rem',marginBottom:'1.4rem'}}>
                <div style={{width:36,height:36,borderRadius:9,background:`rgba(34,200,100,.1)`,border:`1px solid ${T.border}`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <Send size={16} style={{color:T.green}}/>
                </div>
                <h3 style={{fontSize:'1rem',fontWeight:800,fontFamily:"'Syne',sans-serif",lineHeight:1.2,color:T.textMain}}>Envoyez-moi un message</h3>
              </div>
              {sent ? (
                <motion.div initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}}
                  style={{textAlign:'center',padding:'2rem',background:`rgba(34,200,100,.05)`,border:`1px solid ${T.border}`,borderRadius:14,color:T.green,fontWeight:700}}>
                  <div style={{width:52,height:52,borderRadius:'50%',background:`rgba(34,200,100,.1)`,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto .9rem'}}>
                    <Check size={24} style={{color:T.green}}/>
                  </div>
                  <div style={{fontSize:'.95rem',marginBottom:'.35rem',color:T.green}}>Message envoyé !</div>
                  <div style={{fontSize:'.78rem',fontWeight:400,color:T.textMuted}}>Réponse dans moins de 24h.</div>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} style={{display:'flex',flexDirection:'column',gap:'.9rem',width:'100%',boxSizing:'border-box'}}>
                  <div className="ctt-row">
                    <div className="ctt-field">
                      <label className="ctt-label">Nom *</label>
                      <input id="name" type="text" placeholder="Kouassi Jean" value={form.name} onChange={onChange} required style={field} onFocus={e=>e.target.style.borderColor=T.green} onBlur={e=>e.target.style.borderColor=T.border}/>
                    </div>
                    <div className="ctt-field">
                      <label className="ctt-label">Email *</label>
                      <input id="email" type="email" placeholder="jean@email.com" value={form.email} onChange={onChange} required style={field} onFocus={e=>e.target.style.borderColor=T.green} onBlur={e=>e.target.style.borderColor=T.border}/>
                    </div>
                  </div>
                  <div className="ctt-field">
                    <label className="ctt-label">Type de projet *</label>
                    <select id="type" value={form.type} onChange={onChange} required
                      style={{...field,backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2322c864' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\")",backgroundRepeat:'no-repeat',backgroundPosition:'right 1rem center',appearance:'none',colorScheme:T.light?'light':'dark'}}
                      onFocus={e=>e.target.style.borderColor=T.green} onBlur={e=>e.target.style.borderColor=T.border}>
                      <option value="">Sélectionnez…</option>
                      {['Site Vitrine','E-commerce','Application SaaS','Portfolio','API / Backend','Maintenance','Autre'].map(o=>(
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div className="ctt-field">
                    <label className="ctt-label">Message *</label>
                    <textarea id="message" rows={4} placeholder="Décrivez votre projet…" value={form.message} onChange={onChange} required style={{...field,resize:'vertical',minHeight:100}} onFocus={e=>e.target.style.borderColor=T.green} onBlur={e=>e.target.style.borderColor=T.border}/>
                  </div>
                  <button type="submit" className="btn-raised" style={{justifyContent:'center',width:'100%',padding:'1rem',borderRadius:12,fontSize:'.9rem',boxSizing:'border-box'}}>
                    <Send size={15}/>Envoyer le message
                  </button>
                  <p style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'.35rem',fontSize:'.62rem',color:T.textMuted,textAlign:'center'}}>
                    <ShieldCheck size={10} style={{color:T.green,flexShrink:0}}/>Données sécurisées, jamais partagées.
                  </p>
                </form>
              )}
            </div>
          </motion.div>

          {/* Infos */}
          <motion.div className="ctt-info-col" initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.5,delay:.1}}>
            <div className="sku-card" style={{padding:'1rem 1.2rem',display:'flex',alignItems:'center',gap:'.8rem',marginBottom:'.9rem'}}>
              <div style={{position:'relative',flexShrink:0}}>
                <div style={{width:9,height:9,borderRadius:'50%',background:T.green}}/>
                <div style={{position:'absolute',inset:-3,borderRadius:'50%',border:`1.5px solid ${T.green}`,animation:'pulse-ring 1.8s ease-out infinite'}}/>
              </div>
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:'.68rem',color:T.greenSub,letterSpacing:'.05em'}}>Disponible pour de nouveaux projets</span>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'.6rem',marginBottom:'.9rem'}}>
              {CONTACT_STATS.map(({icon:Icon,val,label})=>(
                <div key={label} className="sku-card" style={{padding:'.9rem .6rem',textAlign:'center'}}>
                  <Icon size={15} style={{color:T.green,margin:'0 auto .3rem'}}/>
                  <div style={{fontFamily:"'Orbitron',sans-serif",fontSize:'.95rem',fontWeight:900,lineHeight:1,color:T.textMain}}>{val}</div>
                  <div style={{fontSize:'.52rem',textTransform:'uppercase',letterSpacing:'.06em',marginTop:'.2rem',fontFamily:"'JetBrains Mono',monospace",color:T.textMuted}}>{label}</div>
                </div>
              ))}
            </div>
            <div className="sku-card" style={{padding:'1.2rem',marginBottom:'.9rem'}}>
              <div style={{fontSize:'.58rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'.12em',fontFamily:"'JetBrains Mono',monospace",marginBottom:'.7rem',color:T.textMuted}}>Me retrouver sur</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.5rem'}}>
                {SOCIAL_LINKS.map(({icon:Icon,href,label,sub,color})=>(
                  <a key={label} href={href} target="_blank" rel="noreferrer"
                    style={{display:'flex',alignItems:'center',gap:'.5rem',padding:'.6rem .8rem',borderRadius:10,background:T.light?'rgba(0,0,0,.03)':'rgba(255,255,255,.03)',border:`1px solid ${T.border}`,textDecoration:'none',transition:'all .2s',minWidth:0}}
                    onMouseEnter={e=>{e.currentTarget.style.background=`${color}15`;e.currentTarget.style.borderColor=`${color}40`}}
                    onMouseLeave={e=>{e.currentTarget.style.background=T.light?'rgba(0,0,0,.03)':'rgba(255,255,255,.03)';e.currentTarget.style.borderColor=T.border}}>
                    <div style={{width:28,height:28,borderRadius:7,background:`${color}18`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <Icon size={13} style={{color}}/>
                    </div>
                    <div style={{minWidth:0,overflow:'hidden'}}>
                      <div style={{fontSize:'.68rem',fontWeight:700,fontFamily:"'Syne',sans-serif",lineHeight:1.2,color:T.textMain}}>{label}</div>
                      <div style={{fontSize:'.55rem',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',color:T.textMuted}}>{sub}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <a href="https://wa.me/2250142507750?text=Bonjour+AKATech+!" target="_blank" rel="noreferrer"
              className="btn-raised" style={{justifyContent:'center',padding:'.9rem',width:'100%',borderRadius:12,fontSize:'.85rem',marginBottom:'.9rem',display:'flex',boxSizing:'border-box'}}>
              <MessageCircle size={16}/>Démarrer sur WhatsApp
            </a>
            <div style={{display:'flex',alignItems:'center',gap:'.5rem',padding:'.65rem .9rem',borderRadius:10,background:`rgba(34,200,100,.04)`,border:`1px solid ${T.border}`}}>
              <MapPin size={13} style={{color:'#ea4335',flexShrink:0}}/>
              <span style={{fontSize:'.72rem',fontFamily:"'JetBrains Mono',monospace",color:T.textMuted}}>Abidjan, Côte d'Ivoire</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ── FOOTER ────────────────────────────────────────────────────
const FOOTER_SERVICES=[
  {label:'Site Vitrine',   href:'#services'},
  {label:'E-commerce',     href:'#services'},
  {label:'App SaaS',       href:'#services'},
  {label:'Portfolio',      href:'#services'},
  {label:'API RESTful',    href:'#services'},
  {label:'Maintenance',    href:'#services'},
]
const FOOTER_NAV=[
  {label:'Accueil',        href:'#accueil'},
  {label:'À propos',       href:'#apropos'},
  {label:'Réalisations',   href:'#projets'},
  {label:'Tarifs',         href:'#tarifs'},
  {label:'Témoignages',    href:'#temoignages'},
  {label:'FAQ',            href:'#faq'},
  {label:'Contact',        href:'#contact'},
]
const FOOTER_CONTACT=[
  {icon:MessageCircle, label:'+225 01 42 50 77 50',    href:'https://wa.me/2250142507750'},
  {icon:Phone,         label:'+225 01 70 92 76 39',    href:'tel:+2250170927639'},
  {icon:MapPin,        label:"Abidjan, Côte d'Ivoire", href:null},
]

function Footer() {
  const year=new Date().getFullYear()
  const T=useTheme()
  const lk={fontSize:'.78rem',color:T.textMuted,transition:'color .22s',lineHeight:1.75,display:'flex',alignItems:'center',gap:'.45rem',textDecoration:'none'}
  const onH=(e,in_)=>{ e.currentTarget.style.color=in_?T.green:T.textMuted }
  return (
    <footer style={{background:T.light?'#f3f3f3':'#020504',paddingTop:'4rem',borderTop:`1px solid ${T.border}`}}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 5%'}}>
        <div className="footer-grid" style={{paddingBottom:'3rem',borderBottom:`1px solid ${T.border}`}}>
          <div>
            <div style={{marginBottom:'1.2rem'}}><Logo size={28} animate={false} showTag={false}/></div>
            <p style={{fontSize:'.82rem',lineHeight:1.7,color:T.textMuted,maxWidth:260,marginBottom:'1.5rem'}}>
              Agence de solutions web basée à Abidjan. Sites vitrines, e-commerce, SaaS et portfolios modernes, rapides et rentables.
            </p>
            <div style={{display:'flex',gap:'.5rem',flexWrap:'wrap'}}>
              {[
                {icon:Facebook,    href:'https://web.facebook.com/profile.php?id=61577494705852', title:'Facebook'},
                {icon:MessageCircle,href:'https://wa.me/2250142507750',                           title:'WhatsApp'},
                {icon:Mail,        href:'mailto:wthomasss06@gmail.com',                           title:'Email'},
              ].map(({icon:Icon,href,title})=>(
                <a key={title} href={href} target={href.startsWith('http')?'_blank':undefined} rel="noreferrer" title={title}
                  style={{width:34,height:34,borderRadius:8,background:T.light?'rgba(0,0,0,.05)':'rgba(34,200,100,.05)',border:`1px solid ${T.border}`,display:'flex',alignItems:'center',justifyContent:'center',color:T.textMuted,transition:'all .2s'}}
                  onMouseEnter={e=>{e.currentTarget.style.background=T.green;e.currentTarget.style.borderColor=T.green;e.currentTarget.style.color='#fff'}}
                  onMouseLeave={e=>{e.currentTarget.style.background=T.light?'rgba(0,0,0,.05)':'rgba(34,200,100,.05)';e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.textMuted}}
                ><Icon size={14}/></a>
              ))}
            </div>
          </div>
          <div>
            <div style={{fontSize:'.68rem',fontWeight:700,color:T.textSub,textTransform:'uppercase',letterSpacing:'.12em',marginBottom:'1.1rem',fontFamily:"'JetBrains Mono',monospace"}}>Services</div>
            <div style={{display:'flex',flexDirection:'column',gap:'.15rem'}}>
              {FOOTER_SERVICES.map(({label,href})=>(
                <a key={label} href={href} className="footer-link" style={lk} onMouseEnter={e=>onH(e,true)} onMouseLeave={e=>onH(e,false)}>
                  <ChevronRight size={10} style={{color:T.greenSub,flexShrink:0}}/>{label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div style={{fontSize:'.68rem',fontWeight:700,color:T.textSub,textTransform:'uppercase',letterSpacing:'.12em',marginBottom:'1.1rem',fontFamily:"'JetBrains Mono',monospace"}}>Navigation</div>
            <div style={{display:'flex',flexDirection:'column',gap:'.15rem'}}>
              {FOOTER_NAV.map(({label,href})=>(
                <a key={label} href={href} className="footer-link" style={lk} onMouseEnter={e=>onH(e,true)} onMouseLeave={e=>onH(e,false)}>
                  <ChevronRight size={10} style={{color:T.greenSub,flexShrink:0}}/>{label}
                </a>
              ))}
              <a href="https://akafolio160502.vercel.app/" target="_blank" rel="noreferrer"
                style={{...lk,color:T.greenSub,marginTop:'.4rem'}}
                onMouseEnter={e=>{e.currentTarget.style.color=T.green}} onMouseLeave={e=>{e.currentTarget.style.color=T.greenSub}}>
                <ExternalLink size={10} style={{flexShrink:0}}/>Portfolio complet
              </a>
            </div>
          </div>
          <div>
            <div style={{fontSize:'.68rem',fontWeight:700,color:T.textSub,textTransform:'uppercase',letterSpacing:'.12em',marginBottom:'1.1rem',fontFamily:"'JetBrains Mono',monospace"}}>Contact</div>
            <div style={{display:'flex',flexDirection:'column',gap:'.25rem'}}>
              {FOOTER_CONTACT.map(({icon:Icon,label,href})=>
                href?(
                  <a key={label} href={href} target={href.startsWith('http')?'_blank':undefined} rel="noreferrer"
                    style={lk} onMouseEnter={e=>onH(e,true)} onMouseLeave={e=>onH(e,false)}>
                    <Icon size={12} style={{color:T.green,flexShrink:0}}/>{label}
                  </a>
                ):(
                  <span key={label} style={{...lk,cursor:'default'}}>
                    <Icon size={12} style={{color:T.green,flexShrink:0}}/>{label}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'1.4rem 0',fontSize:'.7rem',color:T.textMuted,flexWrap:'wrap',gap:'.5rem'}}>
          <p style={{textAlign:'center',width:'100%'}}>
            © {year}{' '}
            <a href="#accueil" style={{color:T.greenSub,transition:'color .2s'}}
               onMouseEnter={e=>e.currentTarget.style.color=T.green}
               onMouseLeave={e=>e.currentTarget.style.color=T.greenSub}>AKATech</a>
            {' '}
          </p>
        </div>
      </div>
    </footer>
  )
}

// ── BACK TO TOP ───────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          id="btn-top"
          title="Retour en haut"
          style={{
            position: 'fixed', bottom: '6.5rem', right: '2rem', zIndex: 8999,
            width: 46, height: 46, borderRadius: '50%',
            background: 'linear-gradient(145deg,#0e2416,#081208)',
            border: '1px solid rgba(34,200,100,.35)',
            boxShadow: '4px 4px 14px rgba(0,0,0,.7), -2px -2px 8px rgba(34,200,100,.08), 0 0 20px rgba(34,200,100,.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 13V3M3 8l5-5 5 5" stroke="#22c864" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// ── FLOATING WHATSAPP ─────────────────────────────────────────
function FloatingWA() {
  const [hov,setHov]=useState(false)
  return (
    <motion.a
      href="https://wa.me/2250142507750?text=Bonjour+AKATech+!"
      target="_blank" rel="noreferrer"
      title="Démarrer sur WhatsApp"
      initial={{scale:0,opacity:0}}
      animate={{scale:1,opacity:1}}
      transition={{delay:1.5,type:'spring',stiffness:300,damping:20}}
      onHoverStart={()=>setHov(true)}
      onHoverEnd={()=>setHov(false)}
      style={{
        position:'fixed',bottom:'2rem',right:'2rem',zIndex:9000,
        display:'flex',alignItems:'center',gap:'.65rem',
        padding:hov?'.85rem 1.4rem':'.95rem',
        background:'linear-gradient(145deg,#25d366,#1cb954)',
        borderRadius:hov?50:'50%',
        boxShadow:'0 6px 28px rgba(37,211,102,.5),0 2px 8px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.2)',
        transition:'all .3s cubic-bezier(.22,1,.36,1)',
        overflow:'hidden',whiteSpace:'nowrap',textDecoration:'none',
        cursor:'pointer',
      }}
    >
      <div style={{position:'absolute',inset:0,borderRadius:'inherit',border:'2px solid rgba(37,211,102,.4)',animation:'pulse-ring 2s ease-out infinite',pointerEvents:'none'}}/>
      <MessageCircle size={22} style={{color:'#fff',flexShrink:0,position:'relative',zIndex:1}}/>
      <AnimatePresence>
        {hov&&(
          <motion.span
            initial={{opacity:0,width:0}} animate={{opacity:1,width:'auto'}} exit={{opacity:0,width:0}}
            transition={{duration:.25}}
            style={{fontSize:'.82rem',fontWeight:700,color:'#fff',fontFamily:"'Syne',sans-serif",overflow:'hidden',display:'block',position:'relative',zIndex:1}}
          >
            Démarrer sur WhatsApp
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  )
}

// ── APP ───────────────────────────────────────────────────────
export default function App() {
  const [loaded,setLoaded]=useState(false)
  return (
    <ThemeProvider>
      <GlobalStyles/>
      <MicroCursor/>
      <Loader onDone={()=>setLoaded(true)}/>
      {loaded&&(
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.6}}>
          <Navbar/>
          <main>
            <Hero/>
            <MarqueeStrip/>
            <About/>
            <Services/>
            <TrustBar/>
            <Process/>
            <MarqueeStrip/>
            <ProjectsCarousel/>
            <Pricing/>
            <Testimonials/>
            <FAQ/>
            <Contact/>
          </main>
          <Footer/>
          <FloatingWA/>
          <BackToTop/>
        </motion.div>
      )}
    </ThemeProvider>
  )
}