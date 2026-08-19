import Link from "next/link";
import Image from "next/image";
import { services } from "@/lib/services";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

import {
  MdEmail,
  MdPhone,
  MdLocationOn,
} from "react-icons/md";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="wrap footer-grid">

        {/* BRAND */}
        <div className="footer-brand">

          <Image
            src="/logo.png"
            alt="Diginfo"
            width={180}
            height={70}
            className="footer-logo"
          />

          <p>
           A digital marketing and IT services agency based in Indore. We get businesses found, chosen, and measured across Google, Social and AI Search — for clients across Indore, India, and abroad.
          </p>

          {/* SOCIAL */}
          <div className="footer-socials">

            <a
              href="https://www.facebook.com/diginfoexpert/"
              target="_blank"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.instagram.com/diginfo_official/"
              target="_blank"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.linkedin.com/company/diginfo-ai/"
              target="_blank"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://wa.me/+918889123454"
              target="_blank"
            >
              <FaWhatsapp />
            </a>

          </div>

        </div>

        {/* NAVIGATION */}
        <div className="footer-col">

          <h4>Navigation</h4>

          <ul className="footer-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/careers">Careers</Link></li>
            {/* <li><Link href="/pricing">Pricing</Link></li> */}
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>

        </div>

        {/* SERVICES */}
        <div className="footer-col">

          <h4>Services</h4>

          <ul className="footer-links">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`}>
                  {service.shortTitle}
                </Link>
              </li>
            ))}
          </ul>

        </div>

        {/* CONTACT */}
        <div className="footer-col">

          <h4>Contact Info</h4>

          <div className="footer-contact">

            <div className="contact-item">
              <MdEmail />
              <span>contact@diginfo.ai</span>
            </div>

            <div className="contact-item">
              <MdPhone />
              <span>918889123454</span>
            </div>

            <div className="contact-item">
              <MdLocationOn />
              <span>
                Vijay Nagar, Indore,
                Madhya Pradesh, India
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">

        <div className="wrap footer-bottom-inner">

          <p>
            © 2026 Diginfo. All rights reserved.
          </p>

          <div className="footer-policy">
            <Link href="/privacy-policy">
              Privacy Policy
            </Link>

            <Link href="/terms">
              Terms & Conditions
            </Link>
          </div>

        </div>

      </div>

    </footer>
  );
}
