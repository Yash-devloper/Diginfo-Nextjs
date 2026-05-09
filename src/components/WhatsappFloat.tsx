"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappFloat() {

  return (

    <Link
      href="https://wa.me/8889123454"
      target="_blank"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp />
    </Link>

  );

}