import CtaSection from "@/components/CtaSection";
import ServicesClient from "./ServicesClient";

export const metadata = {
  title: "Digital Marketing & IT Services | Diginfo",
  description: "SEO, AI Search Optimisation (AEO/GEO), paid media, social, web development and ERP/CRM — one accountable team for marketing and the technology behind it.",
};

export default function ServicesPage() {

  return (
    <>
    <ServicesClient />
    <CtaSection />
    </>
  );

}

// export default function ServicesPage() {

//   const [openModal, setOpenModal] = useState(false);

//   return (
//     <section className="services-sec">

//       <div className="wrap center">

//         {/* <div className="pill-label light">WHAT WE DO</div> */}

//         <h1 className="services-title">
//           Services. One Team. <br />
//           <span className="gt">Zero Excuses.</span>
//         </h1>

//         <p className="services-desc">
//           Most businesses need 3–4 agencies. We give everything under one roof.
//         </p>

//       </div>

//       {/* ALL CARDS (NO FILTER) */}
//       <div className="wrap services-grid">

//         {/* 1 */}
//         <div className="service-card">
//           <h4>Search Engine Optimization (SEO)</h4>
//           <ul>
//             <li>Full technical SEO audit</li>
//             <li>Keyword research</li>
//             <li>On-page optimization</li>
//             <li>Monthly reporting</li>
//           </ul>

//           <div className="tags">
//             <span>Technical</span>
//             <span>Local SEO</span>
//             <span>Link Building</span>
//           </div>

//           {/* <a className="card-link">Get an SEO Audit →</a> */}
//         </div>

//         {/* 2 */}
//         <div className="service-card">
//           <h4>Social Media Marketing (SMM)</h4>
//           <ul>
//             <li>Content strategy</li>
//             <li>Reels & creatives</li>
//             <li>Community management</li>
//           </ul>

//           <div className="tags">
//             <span>Instagram</span>
//             <span>Facebook</span>
//             <span>LinkedIn</span>
//           </div>

//           {/* <a className="card-link">Grow Your Social →</a> */}
//         </div>

//         {/* 3 */}
//         <div className="service-card">
//           <h4>PPC & Performance Ads</h4>
//           <ul>
//             <li>Google Ads</li>
//             <li>Meta Ads</li>
//             <li>Retargeting</li>
//           </ul>

//           <div className="tags">
//             <span>Google Ads</span>
//             <span>Meta Ads</span>
//           </div>

//           {/* <a className="card-link">Audit My Ad Spend →</a> */}
//         </div>

//         {/* 4 */}
//         <div className="service-card">
//           <h4>Website Design & Development</h4>
//           <ul>
//             <li>UI/UX design</li>
//             <li>React / WordPress</li>
//             <li>SEO-ready build</li>
//           </ul>

//           <div className="tags">
//             <span>React</span>
//             <span>WordPress</span>
//           </div>

//           {/* <a className="card-link">Get Website Quote →</a> */}
//         </div>

//         {/* 5 */}
//         <div className="service-card">
//           <h4>ERP & CRM Solutions</h4>
//           <ul>
//             <li>Custom ERP</li>
//             <li>CRM automation</li>
//             <li>Workflow systems</li>
//           </ul>

//           <div className="tags">
//             <span>ERP</span>
//             <span>CRM</span>
//           </div>

//           {/* <a className="card-link">Explore ERP Solutions →</a> */}
//         </div>

//         {/* 6 */}
//         <div className="service-card">
//           <h4>Creative Design & Branding</h4>
//           <ul>
//             <li>Logo & identity</li>
//             <li>Social creatives</li>
//             <li>Packaging design</li>
//           </ul>

//           <div className="tags">
//             <span>Branding</span>
//             <span>Video</span>
//           </div>

//           {/* <a className="card-link">See Creative Work →</a> */}
//         </div>

//       </div>

//       <div className="wrap center">
//         <button className="btn btn-grad" onClick={() => setOpenModal(true)}>
//           Discover All Services →
//         </button>
//         <EnquiryModal
//   open={openModal}
//   onClose={() => setOpenModal(false)}
// />
//       </div>

//     </section>
//   );
// }