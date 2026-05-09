"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import EnquiryModal from "@/components/EnquiryModal";

export default function Navbar() {

  const [scrolled, setScrolled] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);

  }, []);

  return (
    <>

      {/* NAVBAR */}
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

          {/* NAV LINKS */}
          <ul className="nav-links">

            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Contact</Link></li>

          </ul>

          {/* BUTTON */}
          <div className="nav-right">

            <button
              className="btn btn-grad"
              onClick={() => setOpenModal(true)}
            >
              Get Started
            </button>

            <EnquiryModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

          </div>

        </div>

      </nav>

    </>
  );
}