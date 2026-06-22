"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const BlogSection = dynamic(() => import("@/components/BlogSection"), {
  ssr: false,
});
const TestimonialsSection = dynamic(
  () => import("@/components/TestimonialsSection"),
  { ssr: false }
);

/**
 * Defers below-the-fold Firestore queries and their SDK until the visitor is
 * close to these sections. This keeps the first render focused on the page
 * content a visitor can actually see.
 */
export default function DeferredHomeSections() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );

    observer.observe(anchor);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={anchorRef}>
      {shouldLoad ? (
        <>
          <TestimonialsSection />
          <BlogSection />
        </>
      ) : (
        <div className="deferred-home-sections" aria-hidden="true" />
      )}
    </div>
  );
}
