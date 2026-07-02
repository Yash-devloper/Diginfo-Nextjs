"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";

export default function LeadershipSection() {
  const [founderError, setFounderError] = useState(false);
  const [coFounderError, setCoFounderError] = useState(false);

  // Define image paths here. If empty or invalid, the initials will show.
  const founderPhoto = "/sj.webp";
  const coFounderPhoto = "/jaya-panjwani.webp";

  return (
    <section className="sec dark leadership-sec" id="leadership">
      <div className="wrap">
        <div className="center" style={{ marginBottom: "3.5rem" }}>
          <div className="pill-label" style={{ marginBottom: '1.25rem' }}>OUR LEADERSHIP</div>
          <h2 className="h2">
            The Minds Behind <span className="gt">The Growth Movement.</span>
          </h2>
          <p className="body-lg" style={{ maxWidth: '700px', margin: '1.5rem auto 0', opacity: 0.8 }}>
            Meet the founders who turned a simple question into a proven system for engineering visibility and scaling brands.
          </p>
        </div>

        <div className="leadership-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }}>

          {/* SWARNJEET SINGH */}
          <article className="leader-card">
            <div className="leader-card-inner-grid">
              <div className="leader-main-info">
                <div className="leader-photo" style={{ position: 'relative', height: '320px', borderRadius: '24px', overflow: 'hidden', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {(!founderError && founderPhoto) ? (
                    <Image 
                      src={founderPhoto} 
                      alt="Swarnjeet Singh" 
                      fill 
                      style={{ objectFit: 'cover' }}
                      onError={() => setFounderError(true)}
                    />
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)' }}>
                      <span style={{ fontSize: '5.5rem', fontWeight: 900, color: 'rgba(255,255,255,0.1)', letterSpacing: '-2px' }}>
                        SS
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="h3" style={{ marginBottom: '0.25rem' }}>Swarnjeet Singh</h3>
                <p style={{ fontWeight: 600, color: 'var(--gt-end, #f97316)', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px', marginBottom: '1.25rem' }}>Founder & Growth Strategist</p>
                <a href="https://www.linkedin.com/in/swarnjeet-singh-diginfo/" target="_blank" rel="noopener noreferrer" className="socbtn" aria-label="LinkedIn Profile">
                  <FaLinkedin />
                </a>
              </div>

              <div className="leader-details">
                <div className="leader-body" style={{ marginBottom: '2.5rem' }}> {/* Added margin-bottom to separate from footer */}
                  <p className="body-lg" style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
                    Swarnjeet started Diginfo to answer a question that had followed him through 15+ years in education and digital: <strong>why do good businesses stay invisible online?</strong> Time and again he watched capable companies lose — not on product, but because customers couldn't find them, trust them, or understand them.
                  </p>
                  <p className="body-lg" style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
                    Diginfo was his answer: an agency that treats visibility as a system to be engineered, and growth as a number to be proven. He builds from experience, not theory — having created and scaled digital and education products that reach more than a million learners across India.
                  </p>
                  <p className="body-lg" style={{ opacity: 0.9 }}> {/* Removed flexGrow: 1 */}
                    The lesson behind every Diginfo engagement: technology only matters when it changes outcomes, and clarity is a form of respect.
                  </p>
                </div>

                <div className="leader-footer" style={{ marginTop: '2.5rem' }}> {/* Keep existing footer styles */}
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.4, marginBottom: '1rem', letterSpacing: '1px' }}>Credentials & Executive Education</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span style={{ padding: '0.4rem 0.8rem', borderRadius: '50px', fontSize: '0.75rem', background: 'var(--grad)', color: '#000', fontWeight: 700 }}>✦ AEO/GEO Certified — The Economic Times</span>
                    <span style={{ padding: '0.4rem 0.8rem', borderRadius: '50px', fontSize: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>AGMP, IIM Ahmedabad</span>
                    <span style={{ padding: '0.4rem 0.8rem', borderRadius: '50px', fontSize: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>ISB Hyderabad</span>
                    <span style={{ padding: '0.4rem 0.8rem', borderRadius: '50px', fontSize: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>Harvard Business School Online</span>
                    <span style={{ padding: '0.4rem 0.8rem', borderRadius: '50px', fontSize: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>IIM Indore</span>
                    <span style={{ padding: '0.4rem 0.8rem', borderRadius: '50px', fontSize: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>IIM Kashipur</span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* JAYA PANJWANI */}
          <article className="leader-card">
            <div className="leader-card-inner-grid">
              <div className="leader-main-info">
                <div className="leader-photo" style={{ position: 'relative', height: '320px', borderRadius: '24px', overflow: 'hidden', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {(!coFounderError && coFounderPhoto) ? (
                    <Image 
                      src={coFounderPhoto} 
                      alt="Jaya Panjwani" 
                      fill 
                      style={{ objectFit: 'cover' }}
                      onError={() => setCoFounderError(true)}
                    />
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)' }}>
                      <span style={{ fontSize: '5.5rem', fontWeight: 900, color: 'rgba(255,255,255,0.1)', letterSpacing: '-2px' }}>
                        JP
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="h3" style={{ marginBottom: '0.25rem' }}>Jaya Panjwani</h3>
                <p style={{ fontWeight: 600, color: 'var(--gt-end, #f97316)', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px', marginBottom: '1.25rem' }}>Co-Founder & Chief Growth Officer</p>
                <a href="https://www.linkedin.com/in/jaya-panjwani-diginfo/" target="_blank" rel="noopener noreferrer" className="socbtn" aria-label="LinkedIn Profile">
                  <FaLinkedin />
                </a>
              </div>

              <div className="leader-details">
                <div className="leader-body" style={{ marginBottom: '2.5rem' }}>
                  <p className="body-lg" style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
                    Jaya co-founded Diginfo in 2019 and leads growth and client partnerships across the agency. Her conviction is simple: <strong>if an agency treats you as one account among hundreds, that's a vendor, not a partner.</strong> So she keeps Diginfo senior and hands-on, and takes on a deliberately limited number of clients each quarter to protect quality.
                  </p>
                  <p className="body-lg" style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
                    She partners with ambitious brands across India and abroad — work that spans eight countries — with the agency going deepest in Food & Beverage and Health & Wellness, and proven delivery across Real Estate, Lifestyle, and Education.
                  </p>
                  <p className="body-lg" style={{ opacity: 0.9 }}>
                    Her focus stays the same in every engagement: get clients found across both Google and AI search, turn that visibility into demand, and convert it — world-class execution, without the bloated overhead of a Western agency.
                  </p>
                </div>

                <div className="leader-footer" style={{ marginTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    <div>
                      <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>8+</h4>
                      <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.5, letterSpacing: '0.5px' }}>Countries served</p>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>AI Search</h4>
                      <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.5, letterSpacing: '0.5px' }}>AEO/GEO Focus</p>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Senior</h4>
                      <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.5, letterSpacing: '0.5px' }}>Partner Delivery</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}
