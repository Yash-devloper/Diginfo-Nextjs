"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import EnquiryModal from "@/components/EnquiryModal";
import { Menu, X } from "lucide-react"; // Import Menu and X icons for hamburger

export default function Navbar() {

  const [scrolled, setScrolled] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    // Handle scroll for navbar styling

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);

  }, []);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Effect to close mobile menu if window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-wrap">
          {/* LOGO */}
          <Link href="/" aria-label="Go to homepage" onClick={closeMobileMenu}>

            <Image
              src="/logo.png"
              width={140}
              height={40}
              className="logo-img"
              alt="Diginfo logo"
              draggable={false}
            />

          </Link>

          {/* DESKTOP NAV LINKS */}
          <ul className="nav-links">

            <li><Link href="/" onClick={closeMobileMenu}>Home</Link></li>
            <li><Link href="/about" onClick={closeMobileMenu}>About</Link></li>
            <li><Link href="/services" onClick={closeMobileMenu}>Services</Link></li>
            <li><Link href="/pricing" onClick={closeMobileMenu}>Pricing</Link></li>
            <li><Link href="/blog" onClick={closeMobileMenu}>Blog</Link></li>
            <li><Link href="/contact" onClick={closeMobileMenu}>Contact</Link></li>

          </ul>

          {/* DESKTOP BUTTON */}
          <div className="nav-right">

            <button
              className="btn btn-grad"
              onClick={() => { setOpenModal(true); closeMobileMenu(); }}
            >
              Get Started
            </button>

          </div>

          {/* HAMBURGER ICON */}
          <button className="nav-burger" onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>

      </nav>

      {/* MOBILE MENU */}
      <div className={`mob-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <Link href="/" onClick={closeMobileMenu}>Home</Link>
        <Link href="/about" onClick={closeMobileMenu}>About</Link>
        <Link href="/services" onClick={closeMobileMenu}>Services</Link>
        <Link href="/pricing" onClick={closeMobileMenu}>Pricing</Link>
        <Link href="/blog" onClick={closeMobileMenu}>Blog</Link>
        <Link href="/contact" onClick={closeMobileMenu}>Contact</Link>
        <div className="mob-menu-button-wrapper">
          <button
            className="btn btn-grad"
            onClick={() => { setOpenModal(true); closeMobileMenu(); }}
          >
            Get Started
          </button>
        </div>

      </div>

      {/* ENQUIRY MODAL (Rendered outside hidden containers to ensure it works on mobile) */}
      <EnquiryModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

    </>
  );
}