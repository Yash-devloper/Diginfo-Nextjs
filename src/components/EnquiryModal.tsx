"use client";

import { useState } from "react";
import { saveLead } from "@/lib/leads";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function EnquiryModal({
  open,
  onClose,
}: Props) {

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    setSubmitted(false);

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      await saveLead(formData);

      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });

      setSubmitted(true);

    } catch (error) {

      console.error(error);

      alert("Failed to submit enquiry");

    } finally {

      setLoading(false);

    }
};

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

 return (

    <div
      className="enquiry-modal"
      onClick={handleClose}
    >

      <div
        className="enquiry-box"
        onClick={(e) => e.stopPropagation()}
      >

        {/* CLOSE */}
        <button
          className="modal-close"
          onClick={handleClose}
        >
          ✕
        </button>

        {/* TITLE */}
        <h2>
          Let’s Grow Your
          <span> Business</span>
        </h2>

        <p>
          Fill out the form and our experts
          will connect with you shortly.
        </p>

         {/* FORM */}
        <form
          className="enquiry-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

           <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Service
            </option>

            <option value="SEO">
              SEO
            </option>
            <option value="AEO/GEO">
              AEO/GEO
            </option>
            <option value="Website Development">
              Website Development
            </option>
            <option value="App Development">
              App Development
            </option>

            <option value="Social Media Marketing">
              Social Media Marketing
            </option>

            <option value="Google Ads">
              Google Ads
            </option>
          </select>

          <textarea
            rows={4}
            name="message"
            placeholder="Tell us about your project"
            value={formData.message}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="btn btn-grad submit-btn"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Submit Enquiry →"}
          </button>

          {submitted ? (
            <p className="note" role="status">
              Thank you for your enquiry. We have received your details and
              our team will contact you shortly.
            </p>
          ) : null}

        </form>

      </div>

    </div>
      );
}
