"use client";

import { useState, useEffect, useRef } from "react";

/* ── Data ─────────────────────────────────────────────────────── */

const services = [
  { icon: "🩺", title: "Wellness Exams", desc: "Comprehensive annual and semi-annual check-ups tailored to your pet's life stage." },
  { icon: "💉", title: "Vaccinations", desc: "Core and lifestyle vaccines to keep your pet protected year-round." },
  { icon: "🦷", title: "Dental Care", desc: "Professional cleanings, extractions, and oral health assessments." },
  { icon: "🔬", title: "Diagnostics", desc: "In-house lab, digital X-ray, and ultrasound for fast, accurate results." },
  { icon: "✂️", title: "Surgery", desc: "Spay/neuter, soft tissue, and orthopedic procedures with modern anesthesia." },
  { icon: "🚨", title: "Urgent Care", desc: "Same-day sick visits and walk-in availability for unexpected health concerns." },
];

const team = [
  { name: "Dr. Sarah Chen", role: "Lead Veterinarian", bio: "15+ years in small animal medicine with a focus on internal medicine and geriatric care.", emoji: "👩‍⚕️" },
  { name: "Dr. James Okafor", role: "Veterinarian", bio: "Specialist in orthopedic surgery and rehabilitation therapy.", emoji: "👨‍⚕️" },
  { name: "Priya Sharma", role: "Registered Vet Tech", bio: "Certified fear-free professional dedicated to stress-free visits.", emoji: "👩‍🔬" },
];

const hours = [
  { day: "Monday – Friday", time: "8:00 AM – 7:00 PM" },
  { day: "Saturday", time: "9:00 AM – 4:00 PM" },
  { day: "Sunday", time: "10:00 AM – 2:00 PM" },
];

const testimonials = [
  { name: "Michelle T.", text: "The team at Lakeside genuinely cares. My anxious rescue dog actually enjoys going now.", rating: 5 },
  { name: "David & Raj K.", text: "Best vet experience in Toronto. Transparent pricing, clear communication, and always on time.", rating: 5 },
  { name: "Samantha L.", text: "Dr. Chen caught an issue during a routine exam that another clinic missed. Forever grateful.", rating: 5 },
];

const NAV_ITEMS = ["Services", "Team", "Testimonials", "Location", "Contact"];

/* ── Hooks ────────────────────────────────────────────────────── */

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style jsx global>{`
        .lv-serif { font-family: var(--font-serif), "Georgia", serif; }
        .lv-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px; border-radius: 100px; font-weight: 600; font-size: 15px;
          text-decoration: none; cursor: pointer; border: none; font-family: inherit;
          transition: all .3s cubic-bezier(.22,1,.36,1);
        }
        .lv-btn-primary { background: #2d6a4f; color: #fff; }
        .lv-btn-primary:hover { background: #1b4332; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(45,106,79,.25); }
        .lv-btn-outline { background: transparent; color: #2d6a4f; border: 2px solid #2d6a4f; }
        .lv-btn-outline:hover { background: #2d6a4f; color: #fff; }
        .lv-section { padding: 96px 24px; max-width: 1200px; margin: 0 auto; }
        .lv-grid { display: grid; gap: 24px; }
        .lv-card {
          background: #fff; border-radius: 20px; padding: 36px;
          border: 1px solid rgba(45,106,79,.08);
          transition: all .35s cubic-bezier(.22,1,.36,1);
        }
        .lv-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(26,46,26,.08); border-color: rgba(45,106,79,.15); }
        .lv-tag {
          display: inline-block; padding: 6px 16px; border-radius: 100px; font-size: 12px;
          font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
          background: rgba(45,106,79,.08); color: #2d6a4f;
        }
        .lv-nav-link {
          background: none; border: none; font-family: inherit; font-size: 15px; font-weight: 500;
          color: #1a2e1a; cursor: pointer; padding: 8px 16px; border-radius: 8px;
          transition: all .2s;
        }
        .lv-nav-link:hover { background: rgba(45,106,79,.06); color: #2d6a4f; }
        @media (max-width: 768px) {
          .lv-section { padding: 64px 20px; }
        }
      `}</style>

      {/* ── Grain Overlay ── */}
      <div
        style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.35,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Nav ── */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          padding: scrolled ? "12px 24px" : "20px 24px",
          background: scrolled ? "rgba(250,249,246,.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(45,106,79,.06)" : "none",
          transition: "all .4s cubic-bezier(.22,1,.36,1)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #2d6a4f, #52b788)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
              🐾
            </div>
            <span className="lv-serif" style={{ fontSize: 20, color: "#1a2e1a" }}>Lakeside</span>
          </div>

          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {NAV_ITEMS.map((n) => (
                <button key={n} className="lv-nav-link" onClick={() => scrollTo(n.toLowerCase())}>{n}</button>
              ))}
              <button className="lv-btn lv-btn-primary" style={{ padding: "10px 24px", marginLeft: 8 }} onClick={() => scrollTo("contact")}>
                Book a Visit
              </button>
            </div>
          )}

          {isMobile && (
            <button
              onClick={() => setMenuOpen(true)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5 }}
              aria-label="Open menu"
            >
              <span style={{ display: "block", width: 24, height: 2, background: "#1a2e1a", borderRadius: 2 }} />
              <span style={{ display: "block", width: 24, height: 2, background: "#1a2e1a", borderRadius: 2 }} />
              <span style={{ display: "block", width: 24, height: 2, background: "#1a2e1a", borderRadius: 2 }} />
            </button>
          )}
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 100, background: "rgba(250,249,246,.97)",
            backdropFilter: "blur(20px)", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 12,
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", fontSize: 28, cursor: "pointer" }}
            aria-label="Close menu"
          >
            ✕
          </button>
          {NAV_ITEMS.map((n) => (
            <button key={n} className="lv-nav-link" style={{ fontSize: 20, padding: "16px 32px" }} onClick={() => scrollTo(n.toLowerCase())}>{n}</button>
          ))}
          <button className="lv-btn lv-btn-primary" onClick={() => scrollTo("contact")}>Book a Visit</button>
        </div>
      )}

      {/* ── Hero ── */}
      <section style={{ padding: "160px 24px 96px", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gap: 48, gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", alignItems: "center", textAlign: isMobile ? "center" : undefined }}>
            <div>
              <FadeIn>
                <span className="lv-tag" style={{ marginBottom: 24 }}>Now Welcoming New Patients</span>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="lv-serif" style={{ fontSize: "clamp(40px, 5.5vw, 64px)", lineHeight: 1.1, margin: "24px 0", color: "#1a2e1a" }}>
                  Compassionate care,<br />
                  <span style={{ color: "#2d6a4f" }}>right by the lake.</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p style={{ fontSize: 18, lineHeight: 1.7, color: "#4a6350", maxWidth: 520, marginBottom: 36, marginInline: isMobile ? "auto" : undefined }}>
                  Toronto&apos;s neighbourhood vet clinic offering modern medicine with a gentle touch.
                  Located on The Esplanade — steps from the waterfront.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: isMobile ? "center" : undefined }}>
                  <button className="lv-btn lv-btn-primary" onClick={() => scrollTo("contact")}>Book an Appointment →</button>
                  <button className="lv-btn lv-btn-outline" onClick={() => scrollTo("services")}>Our Services</button>
                </div>
              </FadeIn>
              <FadeIn delay={0.4}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 48, flexWrap: "wrap", justifyContent: isMobile ? "center" : undefined }}>
                  <div style={{ display: "flex" }}>
                    {["🐕", "🐈", "🐰"].map((e, i) => (
                      <div key={i} style={{ width: 40, height: 40, borderRadius: "50%", background: "#e8f0e9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, marginLeft: i ? -8 : 0, border: "2px solid #faf9f6", zIndex: 3 - i }}>{e}</div>
                    ))}
                  </div>
                  <p style={{ fontSize: 14, color: "#6b8a72" }}>Dogs, cats, rabbits & more — <strong style={{ color: "#2d6a4f" }}>all companions welcome</strong></p>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.2}>
              <div style={{ position: "relative" }}>
                <div style={{ background: "linear-gradient(145deg, #d8f3dc, #b7e4c7, #95d5b2)", borderRadius: 28, aspectRatio: "4/3.5", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                  <div style={{ fontSize: 120, filter: "grayscale(0.1)" }}>🏥</div>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(transparent, rgba(45,106,79,.1))" }} />
                </div>
                <div style={{ position: "absolute", bottom: -16, right: -16, background: "#fff", borderRadius: 16, padding: "16px 20px", boxShadow: "0 8px 32px rgba(26,46,26,.1)", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#d8f3dc", display: "flex", alignItems: "center", justifyContent: "center" }}>⭐</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>4.9 Rating</div>
                    <div style={{ fontSize: 12, color: "#6b8a72" }}>200+ Google Reviews</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" style={{ background: "#f0f7f2" }}>
        <div className="lv-section">
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span className="lv-tag">What We Do</span>
              <h2 className="lv-serif" style={{ fontSize: "clamp(32px, 4vw, 48px)", marginTop: 16 }}>Full-spectrum veterinary care</h2>
              <p style={{ color: "#4a6350", marginTop: 12, maxWidth: 560, margin: "12px auto 0", fontSize: 17 }}>From routine wellness to urgent interventions — everything under one roof.</p>
            </div>
          </FadeIn>
          <div className="lv-grid" style={{ gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)" }}>
            {services.map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="lv-card" style={{ height: "100%" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg, #d8f3dc, #b7e4c7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 20 }}>{s.icon}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: "#4a6350" }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section id="team">
        <div className="lv-section">
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span className="lv-tag">Our Team</span>
              <h2 className="lv-serif" style={{ fontSize: "clamp(32px, 4vw, 48px)", marginTop: 16 }}>Meet the people behind the care</h2>
            </div>
          </FadeIn>
          <div className="lv-grid" style={{ gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)" }}>
            {team.map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="lv-card" style={{ textAlign: "center" }}>
                  <div style={{ width: 88, height: 88, borderRadius: "50%", background: "linear-gradient(135deg, #b7e4c7, #52b788)", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>{t.emoji}</div>
                  <h3 style={{ fontSize: 19, fontWeight: 700 }}>{t.name}</h3>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#2d6a4f", marginTop: 4, textTransform: "uppercase", letterSpacing: 1 }}>{t.role}</p>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: "#4a6350", marginTop: 12 }}>{t.bio}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" style={{ background: "#1a2e1a" }}>
        <div className="lv-section">
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span className="lv-tag" style={{ background: "rgba(82,183,136,.15)", color: "#95d5b2" }}>Testimonials</span>
              <h2 className="lv-serif" style={{ fontSize: "clamp(32px, 4vw, 48px)", marginTop: 16, color: "#f0f7f2" }}>What pet parents say</h2>
            </div>
          </FadeIn>
          <div className="lv-grid" style={{ gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)" }}>
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 20, padding: 32 }}>
                  <div style={{ color: "#e9b44c", fontSize: 16, marginBottom: 16 }}>{"★".repeat(t.rating)}</div>
                  <p style={{ fontSize: 16, lineHeight: 1.7, color: "#b7e4c7", fontStyle: "italic", marginBottom: 20 }}>&ldquo;{t.text}&rdquo;</p>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#95d5b2" }}>{t.name}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location + Hours ── */}
      <section id="location">
        <div className="lv-section">
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span className="lv-tag">Visit Us</span>
              <h2 className="lv-serif" style={{ fontSize: "clamp(32px, 4vw, 48px)", marginTop: 16 }}>Find us on The Esplanade</h2>
            </div>
          </FadeIn>
          <div className="lv-grid" style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 32 }}>
            <FadeIn>
              <div style={{ borderRadius: 20, overflow: "hidden", height: 360, background: "#e8f0e9" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.2684!2d-79.3745!3d43.6475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb34b0e1c1e1%3A0x0!2s8+The+Esplanade%2C+Toronto%2C+ON!5e0!3m2!1sen!2sca!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Lakeside Veterinary Clinic Location"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="lv-card" style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Lakeside Veterinary Clinic</h3>
                <p style={{ fontSize: 15, color: "#4a6350", lineHeight: 1.7, marginBottom: 24 }}>
                  8 The Esplanade<br />Toronto, ON M5E 0A6
                </p>
                <p style={{ fontSize: 15, color: "#4a6350", marginBottom: 24 }}>
                  📞{" "}
                  <a href="tel:+14165551234" style={{ color: "#2d6a4f", fontWeight: 600, textDecoration: "none" }}>
                    (416) 555-1234
                  </a>
                </p>
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "#2d6a4f", marginBottom: 12 }}>Clinic Hours</h4>
                  {hours.map((h, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < hours.length - 1 ? "1px solid #e8f0e9" : "none" }}>
                      <span style={{ fontSize: 15, fontWeight: 500 }}>{h.day}</span>
                      <span style={{ fontSize: 15, color: "#4a6350" }}>{h.time}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 13, color: "#6b8a72", marginTop: 16 }}>🅿️ Underground parking available • ♿ Fully accessible</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CTA / Contact ── */}
      <section id="contact" style={{ background: "linear-gradient(135deg, #2d6a4f, #1b4332)" }}>
        <div className="lv-section" style={{ textAlign: "center" }}>
          <FadeIn>
            <div style={{ maxWidth: 640, margin: "0 auto" }}>
              <h2 className="lv-serif" style={{ fontSize: "clamp(32px, 4.5vw, 52px)", color: "#f0f7f2", marginBottom: 16 }}>
                Ready to book a visit?
              </h2>
              <p style={{ fontSize: 18, color: "#b7e4c7", lineHeight: 1.7, marginBottom: 40 }}>
                Call us or send a message — we&apos;ll get your pet on the schedule. New patients always welcome.
              </p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="tel:+14165551234" className="lv-btn" style={{ background: "#fff", color: "#1b4332", fontWeight: 700 }}>
                  📞 Call (416) 555-1234
                </a>
                <a href="mailto:hello@lakesidevet.ca" className="lv-btn" style={{ background: "rgba(255,255,255,.12)", color: "#fff", border: "1px solid rgba(255,255,255,.2)" }}>
                  ✉️ Email Us
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: "#111f14", color: "#6b8a72", padding: "64px 24px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="lv-grid" style={{ gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr", gap: 40, marginBottom: 48, textAlign: isMobile ? "center" : undefined }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, justifyContent: isMobile ? "center" : undefined }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #2d6a4f, #52b788)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>🐾</div>
                <span className="lv-serif" style={{ fontSize: 18, color: "#b7e4c7" }}>Lakeside Veterinary Clinic</span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 320, marginInline: isMobile ? "auto" : undefined }}>
                Compassionate, modern veterinary care on Toronto&apos;s waterfront. Your pet deserves the best — and so do you.
              </p>
            </div>
            <div>
              <h4 style={{ color: "#95d5b2", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 16 }}>Quick Links</h4>
              {NAV_ITEMS.map((n) => (
                <button key={n} onClick={() => scrollTo(n.toLowerCase())} style={{ display: "block", background: "none", border: "none", color: "#6b8a72", fontSize: 14, padding: "6px 0", cursor: "pointer", fontFamily: "inherit", width: isMobile ? "100%" : undefined }}>
                  {n}
                </button>
              ))}
            </div>
            <div>
              <h4 style={{ color: "#95d5b2", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 16 }}>Contact</h4>
              <p style={{ fontSize: 14, lineHeight: 2 }}>
                8 The Esplanade, Toronto<br />
                (416) 555-1234<br />
                hello@lakesidevet.ca
              </p>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: 24, textAlign: "center", fontSize: 13 }}>
            © {new Date().getFullYear()} Lakeside Veterinary Clinic. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
