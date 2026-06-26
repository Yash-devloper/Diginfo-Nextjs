import type { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";

const inboxItems = [
  {
    title: "See the shift first.",
    body: "What is changing in AI search before your competitors notice.",
  },
  {
    title: "Playbooks, not theory.",
    body: "Specific, do-it-this-week tactics for SEO, performance, and AEO/GEO.",
  },
  {
    title: "Real examples.",
    body: "Frameworks and case patterns from live client work, not recycled advice.",
  },
  {
    title: "Three minutes, once a week.",
    body: "Sharp and respectful of your time. No daily noise.",
  },
];

export const metadata: Metadata = {
  title: "AI BizBytes Newsletter | Diginfo",
  description:
    "A weekly Diginfo newsletter on getting your brand found and cited in AI search.",
  alternates: {
    canonical: "/newsletter",
  },
};

export default function NewsletterPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroNav}>
          <p>AI BizBytes</p>
          <span>-- diginfo.ai</span>
        </div>

        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>AI BizBytes - A Diginfo Newsletter</p>
          <h1>Your customers stopped Googling. They&apos;re asking AI.</h1>
          <p className={styles.heroText}>
            A weekly newsletter on getting your brand found and cited in the age
            of AI search. Practical SEO, performance, and AEO/GEO playbooks.
            Three-minute reads, no fluff.
          </p>

          <form className={styles.signup} action="mailto:contact@diginfo.ai">
            <label className={styles.srOnly} htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
            <button type="submit">Subscribe free -&gt;</button>
          </form>

          {/* <p className={styles.note}>
            One field only (email) - every extra field cuts conversion
          </p> */}
          <p className={styles.socialProof}>
            Join <strong>2,500+</strong> founders and marketers staying ahead of
            the AI-search shift.
          </p>
        </div>

        {/* <div className={`${styles.annotation} ${styles.annotationTop}`}>
          Strip / simplify nav - the only action on this page is subscribing
        </div> */}
      </section>

      <section className={styles.assessment}>
        <div className={styles.assessmentCopy}>
          <p className={styles.eyebrow}>Free when you subscribe</p>
          <h2>Subscribe and get the free AI-Search Readiness Assessment</h2>
          <p>
            A 20-point assessment to see whether AI will find and cite your
            brand, the same framework we use with clients. Yours the moment you
            subscribe.
          </p>
        </div>

        <div className={styles.bookWrap} aria-hidden="true">
          <div className={styles.book}>
            <span>Free Assessment</span>
            <h3>Is Your Brand AI-Search Ready?</h3>
            <p>The AEO/GEO Readiness Checklist - 20 checks</p>
            <small>DIGINFO</small>
          </div>
        </div>
      </section>

      <section className={styles.inbox}>
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>In your inbox</p>
          <h2>What lands in your inbox</h2>
          <div className={styles.inboxGrid}>
            {inboxItems.map((item) => (
              <article className={styles.inboxItem} key={item.title}>
                <span aria-hidden="true" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.forWhom}>
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>Who it&apos;s for</p>
          <h2>Built for founders and marketers who refuse to go invisible</h2>
          <p>
            If your growth depends on being found and AI is rewriting what
            &quot;being found&quot; means, this is for you. Brand owners,
            marketing leads, and founders who&apos;d rather shape the shift than
            be caught by it.
          </p>
        </div>
      </section>

      <section className={styles.author}>
        <div className={styles.authorCard}>
          <div className={styles.authorPhoto}>
            <Image src="/logo.png" width={72} height={72} alt="Diginfo" />
          </div>
          <div>
            <p className={styles.eyebrow}>Who writes it</p>
            <p>
              Written by <strong>Jaya Panjwani</strong>, Founder &amp; Chief
              Growth Officer of Diginfo, an AEO/GEO-certified digital growth
              agency helping brands across India and abroad get found, get
              chosen, and get measured.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <h2>Be the brand AI recommends.</h2>
        <p>One sharp playbook a week. Free.</p>
        <form className={styles.signup} action="mailto:contact@diginfo.ai">
          <label className={styles.srOnly} htmlFor="newsletter-email-bottom">
            Email address
          </label>
          <input
            id="newsletter-email-bottom"
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          <button type="submit">Subscribe free -&gt;</button>
        </form>
        <small>No spam. Unsubscribe anytime.</small>
      </section>

      <footer className={styles.footer}>
        <p>
          <strong>AI BizBytes</strong> - a Diginfo newsletter - Past editions
          live on the blog - (c) 2026 Diginfo
        </p>
      </footer>
    </main>
  );
}
