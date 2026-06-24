"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Mail,
  Sparkles,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import type { Job } from "@/lib/jobs";

function formatExperience(experience: string) {
  return experience.trim() || "Not required";
}

const lifeGallery = [
  {
    title: "Team Learning",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Strategy Sessions",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Creative Reviews",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Office Moments",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Campaign Planning",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80",
  },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/diginfoexpert/",
    icon: FaFacebookF,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/diginfo_official/",
    icon: FaInstagram,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/diginfo-ai/",
    icon: FaLinkedin,
  },
];

const careerTeams = [
  {
    icon: "📣",
    name: "Digital Marketing",
    description: "SEO, AI Search (AEO/GEO), paid media, and social.",
  },
  {
    icon: "💻",
    name: "Technology & Development",
    description: "Web, apps, ERP/CRM, and workflow automation.",
  },
  {
    icon: "🎨",
    name: "Creative & Design",
    description: "Brand identity, content, and video.",
  },
  {
    icon: "🤝",
    name: "Client Success & Growth",
    description: "Strategy, accounts, and operations.",
  },
];

export default function CareersClient() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(1);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs", { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to load jobs");
        const data = (await response.json()) as { jobs: Job[] };
        setJobs(data.jobs);
      } catch {
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    void fetchJobs();
  }, []);

  const maxSlide = Math.max(lifeGallery.length - visibleSlides, 0);
  const slidePositions = Array.from({ length: maxSlide + 1 }, (_, index) => index);

  const goToPreviousSlide = useCallback(() => {
    setActiveSlide((current) => (current === 0 ? maxSlide : current - 1));
  }, [maxSlide]);

  const goToNextSlide = useCallback(() => {
    setActiveSlide((current) => (current >= maxSlide ? 0 : current + 1));
  }, [maxSlide]);

  useEffect(() => {
    const updateVisibleSlides = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setVisibleSlides(4);
        return;
      }

      if (window.matchMedia("(min-width: 641px)").matches) {
        setVisibleSlides(2);
        return;
      }

      setVisibleSlides(1);
    };

    updateVisibleSlides();
    window.addEventListener("resize", updateVisibleSlides);

    return () => window.removeEventListener("resize", updateVisibleSlides);
  }, []);

  useEffect(() => {
    setActiveSlide((current) => Math.min(current, maxSlide));
  }, [maxSlide]);

  useEffect(() => {
    const timer = window.setInterval(goToNextSlide, 4200);

    return () => window.clearInterval(timer);
  }, [goToNextSlide]);

  return (
    <main className="careers-page">
      <section className="careers-hero">
        <div className="wrap careers-hero-inner">
          <div className="careers-hero-copy">
            <span className="careers-kicker">
              <Sparkles size={16} />
              Careers at Diginfo
            </span>
            <h1>
              Build your next chapter with a team that{" "}
              <span>moves fast and learns faster.</span>
            </h1>
            <p>
              Join Diginfo to work across digital marketing, technology, creative, and
              growth for ambitious businesses in India and abroad — with real ownership,
              senior mentorship, and work that actually ships.
            </p>
            <div className="careers-hero-actions">
              <a className="careers-hero-btn careers-hero-btn-primary" href="#openings">
                View open roles <span aria-hidden="true">↓</span>
              </a>
              <a className="careers-hero-btn careers-hero-btn-secondary" href="#life-at-diginfo">
                Life at Diginfo
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="careers-fit">
        <div className="wrap">
          <div className="careers-fit-head">
            <span>Where you fit</span>
            <h2>Four teams, one mission.</h2>
          </div>

          <div className="careers-fit-grid">
            {careerTeams.map((team) => (
              <article className="careers-fit-card" key={team.name}>
                <span className="careers-fit-icon" role="img" aria-label="">
                  {team.icon}
                </span>
                <h3>{team.name}</h3>
                <p>{team.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="careers-openings" id="openings">
        <div className="wrap">
          <div className="careers-section-head">
            <span>Openings</span>
            <h2>Current opportunities</h2>
            <p>
              Find a role that matches your strengths and see the full details before
              applying.
            </p>
          </div>

          {hasError && (
            <p className="careers-status">
              We could not load admin openings right now. Please check again later.
            </p>
          )}

          {loading ? (
            <p className="careers-status">Loading job openings...</p>
          ) : (
            <div className="career-job-grid">
              {jobs.length ? jobs.map((job) => (
                <article className="career-job-card" key={job.id}>
                  <span className="career-job-type">{job.employmentType}</span>
                  <h3>{job.title}</h3>
                  <dl>
                    {/* <div><dt>Experience</dt><dd>{formatExperience(job.experienceRequired)}</dd></div> */}
                    <div><dt>Experience</dt><dd>{formatExperience(job.candidateType)}</dd></div>
                    {/* <div><dt>For</dt><dd>{job.candidateType}</dd></div> */}
                  </dl>
                  <Link className="career-job-link" href={`/careers/${job.id}`}>
                    View More <span aria-hidden="true">→</span>
                  </Link>
                </article>
              )) : (
                <p className="career-empty">No openings posted yet. Please check back soon.</p>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="careers-life" id="life-at-diginfo">
        <div className="wrap">
          <div className="careers-section-head careers-life-head">
            <span>Life at Diginfo</span>
            <h2>See the culture behind the work</h2>
            <p>
              Step into our everyday rhythm: learning sessions, campaign rooms,
              creative reviews, and the team moments that keep good work moving.
            </p>
          </div>

          <div className="careers-gallery-slider" aria-label="Life at Diginfo gallery">
            <button
              className="careers-gallery-arrow is-left"
              type="button"
              onClick={goToPreviousSlide}
              aria-label="Show previous Life at Diginfo photo"
            >
              <ChevronLeft size={30} />
            </button>

            <div className="careers-gallery-window">
              <div
                className="careers-gallery-track"
                style={
                  {
                    "--carousel-index": activeSlide,
                    "--visible-slides": visibleSlides,
                  } as CSSProperties
                }
              >
                {lifeGallery.map((item) => (
                  <div className="careers-gallery-slide" key={item.title}>
                    <Image src={item.image} alt={item.title} width={900} height={600} />
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="careers-gallery-arrow is-right"
              type="button"
              onClick={goToNextSlide}
              aria-label="Show next Life at Diginfo photo"
            >
              <ChevronRight size={30} />
            </button>

            <div className="careers-gallery-dots" aria-label="Gallery slide controls">
              {slidePositions.map((index) => (
                <button
                  key={index}
                  className={index === activeSlide ? "active" : ""}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Show Life at Diginfo image group ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="careers-resume-cta" aria-labelledby="careers-resume-heading">
        <div className="wrap">
          <div className="careers-resume-card">
            <h2 id="careers-resume-heading">Don&apos;t see your role?</h2>
            <p>
              We&apos;re always glad to meet good people. Send your resume and we&apos;ll reach out
              when something fits.
            </p>
            <a className="careers-resume-button" href="mailto:yash.sharma@diginfoexpert.com">
              <Mail size={17} />
              Send your resume <span aria-hidden="true">→</span> careers@diginfo.ai
            </a>
            <small>
              Diginfo is an equal-opportunity employer. We hire on merit and welcome
              applicants of all backgrounds.
            </small>
          </div>
        </div>
      </section>

      <section className="careers-follow">
        <div className="wrap careers-follow-inner">
          <div>
            <span>Follow Us On</span>
            <h2>Stay connected with Diginfo</h2>
          </div>

          <div className="careers-follow-links" aria-label="Diginfo social media links">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow Diginfo on ${social.name}`}
                >
                  <Icon />
                  <span>{social.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
