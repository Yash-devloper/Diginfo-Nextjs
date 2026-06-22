"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Menu, X } from "lucide-react";

// Load the Firebase-backed form only after it is opened.
const EnquiryModal = dynamic(() => import("@/components/EnquiryModal"), {
  ssr: false,
});

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-wrap">
          
          {/* LOGO */}
          <Link href="/" aria-label="Go to homepage">
            <Image
              src="/logo.png"
              width={140}
              height={40}
              className="logo-img"
              alt="Diginfo logo"
              draggable={false}
            />
          </Link>

          {/* DESKTOP MENU */}
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/careers">Careers</Link></li>
            {/* <li><Link href="/pricing">Pricing</Link></li> */}
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>

          {/* RIGHT SECTION */}
          <div className="nav-right">
            <button
              className="btn btn-grad desktop-btn"
              onClick={() => setOpenModal(true)}
            >
              Get Started
            </button>

            {/* MOBILE MENU BUTTON */}
            <button
              className="mobile-toggle"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`mobile-menu ${mobileMenu ? "active" : ""}`}>
          <Link href="/" onClick={() => setMobileMenu(false)}>Home</Link>
          <Link href="/about" onClick={() => setMobileMenu(false)}>About</Link>
          <Link href="/services" onClick={() => setMobileMenu(false)}>Services</Link>
          <Link href="/careers" onClick={() => setMobileMenu(false)}>Careers</Link>
          {/* <Link href="/pricing" onClick={() => setMobileMenu(false)}>Pricing</Link> */}
          <Link href="/blog" onClick={() => setMobileMenu(false)}>Blog</Link>
          <Link href="/contact" onClick={() => setMobileMenu(false)}>Contact</Link>

          <button
            className="btn btn-grad mobile-btn"
            onClick={() => {
              setOpenModal(true);
              setMobileMenu(false);
            }}
          >
            Get Started
          </button>
        </div>
      </nav>

      <EnquiryModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
}
