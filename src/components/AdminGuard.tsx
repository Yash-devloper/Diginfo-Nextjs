"use client";

import { useEffect, useState, ReactNode } from "react";
import { auth } from "@/lib/firebaseClient";
import { browserSessionPersistence, onAuthStateChanged, setPersistence } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function AdminGuard({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let unsub: (() => void) | undefined;
    let mounted = true;

    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        if (!mounted) return;

        unsub = onAuthStateChanged(auth, async (user) => {
          if (!user) {
            router.replace("/login");
            return;
          }

          setLoading(false);
        });
      })
      .catch(() => {
        router.replace("/login");
      });

    return () => {
      mounted = false;
      unsub?.();
    };
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return children;
}
