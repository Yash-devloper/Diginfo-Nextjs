"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

export default function PricingClient() {
  const [activeTab, setActiveTab] = useState("seo");
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDocs(collection(db, "services"));

      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setServices(data);
    };

    fetch();
  }, []);

  const filtered = services.filter(
    (s: any) => s.category === activeTab && s.active
  );

  return (
    <>
      {/* YOUR EXISTING UI HERE */}
      {/* (no change needed in UI code) */}
    </>
  );
}