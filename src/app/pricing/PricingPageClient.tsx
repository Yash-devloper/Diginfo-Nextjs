"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import EnquiryModal from "@/components/EnquiryModal";

type PricingService = {
  id: string;
  title: string;
  price: string;
  category: string;
  active?: boolean;
  featured?: boolean;
  recommended?: boolean;
  order?: number;
  features?: string[] | string;
};

export default function PricingPageClient() {
  const [activeTab, setActiveTab] = useState("seo");
  const [services, setServices] = useState<PricingService[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const snap = await getDocs(collection(db, "services"));

        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<PricingService, "id">),
        }));

        setServices(data);
      } catch (error) {
        console.error("Failed to load pricing services:", error);
      }
    };

    fetch();
  }, []);

  const filtered = services
    .filter((s) => s.category === activeTab && s.active !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <>
      <section className="sec">
        <div className="wrap tc">
          <h2 className="h2">Our Pricing</h2>

          <div className="pricing-tabs">
            {[
              { key: "seo", label: "SEO Plans" },
              { key: "social", label: "Social Media" },
              { key: "ads", label: "Ads / PPC" },
              { key: "website", label: "Website Build" },
            ].map((tab) => (
              <button
                key={tab.key}
                className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="pgrid">
            {filtered.map((plan) => (
              <div
                key={plan.id}
                className={`pricing-card ${plan.featured ? "featured" : ""}`}
              >
                {(plan.recommended || plan.featured) && (
                  <div className="badge">
                    {plan.recommended ? "RECOMMENDED" : "MOST POPULAR"}
                  </div>
                )}

                <div className="card-header">
                  <div className="plan-name">{plan.title}</div>
                  <div className="price">{plan.price}</div>
                  <div className="period">per month + GST</div>
                </div>

                <div className="card-body">
                  <ul className="features">
                    {(Array.isArray(plan.features)
                      ? plan.features
                      : plan.features?.split(",")
                    )?.map((f: string, i: number) => (
                      <li key={i}>
                        <span className="tick">✔</span>
                        {f.trim()}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card-footer">
                  <button
                    type="button"
                    className={`cta ${plan.recommended || plan.featured ? "cta-gradient" : "cta-dark"}`}
                    onClick={() => {
                      const el = document.getElementById("contact");
                      el?.scrollIntoView({ behavior: "smooth" });
                      setOpenModal(true);
                    }}
                  >
                    Get Started →
                  </button>
                  <EnquiryModal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
