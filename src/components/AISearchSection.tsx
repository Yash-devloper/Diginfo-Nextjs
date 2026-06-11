import Link from "next/link";
import { ArrowRight, BadgeCheck, Sparkles } from "lucide-react";

export default function AISearchSection() {
  return (
    <section className="ai-search-sec">
      <div className="wrap ai-search-inner">
        <div className="ai-search-copy">
          <div className="pill-label ai-search-pill">
            AI Search Optimisation - AEO / GEO
          </div>

          <h2 className="h2">
            Your customers stopped scrolling. They started asking - make sure AI
            recommends <span className="gt">you.</span>
          </h2>
        </div>

        <div className="ai-search-action">
          {/* <div className="ai-search-proof">
            <div className="ai-search-proof-icon">
              <Sparkles size={18} strokeWidth={2.4} />
            </div>

            <div>
              <p>Flagship AI Search Optimisation</p>
              <span>Built for answer engines, AI summaries, and discovery.</span>
            </div>
          </div> */}

          <div className="ai-certified">
            <BadgeCheck size={16} strokeWidth={2.5} />
            <strong>Certified</strong>
            <span>AEO/GEO - The Economic Times</span>
          </div>

          <Link href="/contact" className="btn btn-grad ai-search-btn">
            Get your free AI visibility audit
            <ArrowRight size={17} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
