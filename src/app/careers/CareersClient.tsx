"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import {
  ChevronLeft,
  ChevronRight,
  BriefcaseBusiness,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import type { Job } from "@/lib/jobs";
import { getJobs } from "@/lib/jobClient";

function formatExperience(experience: string) {
  return experience.trim() || "Not required";
}

const lifeGallery = [
  {
    title: "Team Learning",
    image: "/learn2.webp",
  },
  {
    title: "Strategy Sessions",
    image: "/stratagy.webp",
  },
  {
    title: "Office Events",
    image: "/culture.webp",
  },
  {
    title: "Office Moments",
    image: "/learning.webp",
  },
  {
    title: "Campaign Planning",
    image: "/campaign.webp",
  },
  {
    title: "Team Celebration",
    image:  "/celebration.webp",
  },
];

const teamVoices = [
  {
    quote:
      "You get real ownership here. The team trusts you with meaningful work, while still making sure you have the guidance to keep improving.",
    name: "Team Member",
    role: "Digital Marketing",
  },
  {
    quote:
      "Every project brings something new to learn. Ideas move quickly, feedback is direct, and you can see the impact of what you build.",
    name: "Team Member",
    role: "Technology & Development",
  },
  {
    quote:
      "The best part is how collaborative the work feels. Strategy, design, and execution come together without unnecessary layers.",
    name: "Team Member",
    role: "Creative & Design",
  },
  {
    quote:
      "You are encouraged to ask questions, take initiative, and grow beyond your job title. That makes every week feel genuinely useful.",
    name: "Team Member",
    role: "Client Success & Growth",
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
  const [activeVoiceSlide, setActiveVoiceSlide] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(1);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setJobs(await getJobs());
      } catch {
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    void fetchJobs();
  }, []);

  const maxSlide = Math.max(lifeGallery.length - visibleSlides, 0);
  const clampedActiveSlide = Math.min(activeSlide, maxSlide);
  const slidePositions = Array.from({ length: maxSlide + 1 }, (_, index) => index);
  const visibleVoiceSlides = visibleSlides === 1 ? 1 : 2;
  const maxVoiceSlide = Math.max(teamVoices.length - visibleVoiceSlides, 0);
  const clampedVoiceSlide = Math.min(activeVoiceSlide, maxVoiceSlide);
  const voiceSlidePositions = Array.from(
    { length: maxVoiceSlide + 1 },
    (_, index) => index
  );

  const goToPreviousSlide = useCallback(() => {
    setActiveSlide((current) => (current === 0 ? maxSlide : current - 1));
  }, [maxSlide]);

  const goToNextSlide = useCallback(() => {
    setActiveSlide((current) => (current >= maxSlide ? 0 : current + 1));
  }, [maxSlide]);

  const goToPreviousVoice = useCallback(() => {
    setActiveVoiceSlide((current) =>
      current === 0 ? maxVoiceSlide : current - 1
    );
  }, [maxVoiceSlide]);

  const goToNextVoice = useCallback(() => {
    setActiveVoiceSlide((current) =>
      current >= maxVoiceSlide ? 0 : current + 1
    );
  }, [maxVoiceSlide]);

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
    const timer = window.setInterval(goToNextSlide, 4200);

    return () => window.clearInterval(timer);
  }, [goToNextSlide]);

  useEffect(() => {
    const timer = window.setInterval(goToNextVoice, 5600);

    return () => window.clearInterval(timer);
  }, [goToNextVoice]);

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
              We could not have openings right now. Please check again later.
            </p>
          )}

          {loading ? (
            <p className="careers-status">Loading job openings...</p>
          ) : (
            <div className="career-job-grid">
              {jobs.length ? jobs.map((job) => (
                <article className="career-job-card" key={job.id}>
                  <div className="career-job-card-topline">
                    <span className="career-job-type">{job.employmentType}</span>
                    <span className="career-job-team">{job.team}</span>
                  </div>
                  <h3>{job.title}</h3>
                  <div className="career-job-meta">
                    <span><BriefcaseBusiness size={15} /> {job.candidateType}</span>
                    <span>{formatExperience(job.experienceRequired)}</span>
                    <span><MapPin size={15} /> {job.location}</span>
                  </div>
                  <div className="career-job-actions">
                  <Link className="career-job-link" href={`/careers/${job.id}`}>
                    View details <span aria-hidden="true">&rarr;</span>
                  </Link>
                    <Link className="career-job-apply" href={`/careers/${job.id}#apply`}>
                      Apply now
                    </Link>
                  </div>
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
                    "--carousel-index": clampedActiveSlide,
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
                  className={index === clampedActiveSlide ? "active" : ""}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Show Life at Diginfo image group ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="careers-voices" aria-labelledby="team-voices-heading">
        <div className="wrap">
          <div className="careers-voices-head">
            <span>Team Voices</span>
            <h2 id="team-voices-heading">In their words.</h2>
          </div>

          <div className="careers-voices-slider" aria-roledescription="carousel">
            <div className="careers-voices-window">
              <div
                className="careers-voices-track"
                style={
                  {
                    "--voice-index": clampedVoiceSlide,
                    "--visible-voices": visibleVoiceSlides,
                  } as CSSProperties
                }
              >
                {teamVoices.map((voice, index) => (
                  <article
                    className="careers-voice-card"
                    key={`${voice.role}-${index}`}
                    aria-label={`Team voice ${index + 1} of ${teamVoices.length}`}
                  >
                    <span className="careers-voice-quote" aria-hidden="true">&ldquo;</span>
                    <blockquote>{voice.quote}</blockquote>
                    <p>
                      <strong>{voice.name}</strong>
                      <span>{voice.role}</span>
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="careers-voices-controls">
              <div className="careers-voices-dots" aria-label="Team voice slide controls">
                {voiceSlidePositions.map((index) => (
                  <button
                    key={index}
                    className={index === clampedVoiceSlide ? "active" : ""}
                    type="button"
                    onClick={() => setActiveVoiceSlide(index)}
                    aria-label={`Show team voice group ${index + 1}`}
                  />
                ))}
              </div>

              <div className="careers-voices-arrows">
                <button type="button" onClick={goToPreviousVoice} aria-label="Show previous team voices">
                  <ChevronLeft size={22} />
                </button>
                <button type="button" onClick={goToNextVoice} aria-label="Show next team voices">
                  <ChevronRight size={22} />
                </button>
              </div>
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
              Send your resume <span aria-hidden="true">→</span> career@diginfo.ai
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
