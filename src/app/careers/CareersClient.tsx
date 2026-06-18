"use client";

import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import { collection, getDocs } from "firebase/firestore";
import {
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Mail,
  Sparkles,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { db, handleFirestoreError } from "@/lib/firebaseClient";

type CareerCategory = "Graduate" | "Experienced";

type CareerOpening = {
  id: string;
  designation: string;
  category: CareerCategory;
  active?: boolean;
};

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

const categories: Array<{
  name: CareerCategory;
  description: string;
  icon: typeof GraduationCap;
}> = [
  {
    name: "Graduate",
    description: "Starter roles for freshers ready to learn, execute, and grow.",
    icon: GraduationCap,
  },
  {
    name: "Experienced",
    description: "Specialist roles for professionals who can own outcomes.",
    icon: BriefcaseBusiness,
  },
];

function buildApplyLink(designation: string) {
  const subject = encodeURIComponent(`Application for ${designation}`);
  const body = encodeURIComponent(
    `Hello Diginfo Team,\n\nI would like to apply for the ${designation} role. Please find my resume attached.\n\nRegards,`
  );

  return `mailto:yash.sharma@diginfoexpert.com?subject=${subject}&body=${body}`;
}

function sortOpenings(openings: CareerOpening[]) {
  return [...openings].sort((a, b) => {
    const categorySort = a.category.localeCompare(b.category);
    return categorySort || a.designation.localeCompare(b.designation);
  });
}

export default function CareersClient() {
  const [openings, setOpenings] = useState<CareerOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(1);

  useEffect(() => {
    const fetchOpenings = async () => {
      try {
        const snap = await getDocs(collection(db, "careers"));
        const data = snap.docs
          .map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<CareerOpening, "id">),
          }))
          .filter((opening) => opening.active !== false && opening.designation)
          .filter(
            (opening) =>
              opening.category === "Graduate" || opening.category === "Experienced"
          );

        setOpenings(sortOpenings(data));
      } catch (error) {
        handleFirestoreError(error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    void fetchOpenings();
  }, []);

  const groupedOpenings = useMemo(
    () =>
      categories.map((category) => ({
        ...category,
        openings: openings.filter((opening) => opening.category === category.name),
      })),
    [openings]
  );

  const maxSlide = Math.max(lifeGallery.length - visibleSlides, 0);
  const slidePositions = Array.from({ length: maxSlide + 1 }, (_, index) => index);

  const goToPreviousSlide = useCallback(() => {
    setActiveSlide((current) => (current === 0 ? maxSlide : current - 1));
  }, [maxSlide]);

  const goToNextSlide = useCallback(() => {
    setActiveSlide((current) => (current >= maxSlide ? 0 : current + 1));
  }, [maxSlide]);

  const handleApplyClick = useCallback((designation: string) => {
    window.location.href = buildApplyLink(designation);
  }, []);

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
              Build your next chapter with a team that moves fast and learns faster.
            </h1>
            <p>
              Join Diginfo to work across digital marketing, technology, creative,
              and growth projects for ambitious businesses. Explore openings posted
              by our admin team and apply directly with your resume.
            </p>
          </div>
        </div>
      </section>

      <section className="careers-openings">
        <div className="wrap">
          <div className="careers-section-head">
            <span>Openings</span>
            <h2>Current opportunities</h2>
            <p>
              Choose your category, review the available designation, and email your
              resume to our hiring team in one click.
            </p>
          </div>

          {hasError && (
            <p className="careers-status">
              We could not load admin openings right now. Please check again later.
            </p>
          )}

          {loading ? (
            <p className="careers-status">Loading openings...</p>
          ) : (
            <div className="careers-category-grid">
              {groupedOpenings.map((category) => {
                const Icon = category.icon;

                return (
                  <article className="career-category-card" key={category.name}>
                    <div className="career-category-title">
                      <span>
                        <Icon size={20} />
                      </span>
                      <div>
                        <h3>{category.name}</h3>
                        <p>{category.description}</p>
                      </div>
                    </div>

                    <div className="career-opening-list">
                      {category.openings.length > 0 ? (
                        category.openings.map((opening) => (
                          <div className="career-opening-row" key={opening.id}>
                            <strong>{opening.designation}</strong>
                            <button
                              className="career-apply-btn"
                              type="button"
                              onClick={() => handleApplyClick(opening.designation)}
                              aria-label={`Apply for ${opening.designation} by email`}
                            >
                              <Mail size={16} />
                              Apply
                            </button>
                          </div>
                        ))
                      ) : (
                        <p className="career-empty">No openings posted yet.</p>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="careers-life">
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
                    <img src={item.image} alt={item.title} />
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
