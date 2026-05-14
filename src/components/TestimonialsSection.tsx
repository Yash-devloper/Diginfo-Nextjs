"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { getAllTestimonials, type Testimonial } from "@/lib/testimonials";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const data = await getAllTestimonials();
      setTestimonials(data);
    };

    void fetchTestimonials();
  }, []);

  const nextSlide = () => {
    setActive((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setActive((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  if (!testimonials.length) return null;

  const item = testimonials[active];

  return (
    <section className="testimonial-sec">
      <div className="wrap">

        <div className="testimonial-head">
          <span className="pill-label">Testimonials</span>

          <h2 className="testimonial-title">
            What Our Clients <span>Say</span>
          </h2>
        </div>

        <div className="testimonial-card">

          <div className="quote-icon">
            <Quote size={42} />
          </div>

          <p className="testimonial-text">
            {item.review}
          </p>

          <div className="testimonial-user">

            <div className="testimonial-avatar">
              <Image
                src="/avatar.png"
                alt={item.name}
                fill
                sizes="80px"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div>
              <h4>{item.name}</h4>
              <span>{item.company || "Client"}</span>
            </div>

          </div>

          <div className="testimonial-controls">

            <button onClick={prevSlide}>
              <ChevronLeft size={20} />
            </button>

            <button onClick={nextSlide}>
              <ChevronRight size={20} />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}