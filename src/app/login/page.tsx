"use client";

import { FormEvent, useState } from "react";
import {
  browserSessionPersistence,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
} from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const router = useRouter();

  // 🔐 LOGIN
  const handleLogin = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);

      toast.success("Welcome back!");
      router.replace("/admin");
    } catch {
      toast.error("Invalid email or password");
    }

    setLoading(false);
  };

  // RESET PASSWORD
  const handleReset = async () => {
    if (!resetEmail) {
      toast.error("Enter email first");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success("Reset link sent!");
      setShowReset(false);
    } catch {
      toast.error("Failed to send email");
    }
  };

  return (
    <section className="login-page">

      <div className="login-grid"></div>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >

        <h1 className="login-title">
          Welcome Back <span className="gt">Admin</span>
        </h1>

        <p className="login-sub">
          Login to access your dashboard
        </p>

        <form className="login-form" onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD FIELD */}
          <div className="password-wrap">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <span onClick={() => setShowPass(!showPass)}>
              {showPass ? "🙈" : "👁️"}
            </span>
          </div>

          {/* FORGOT */}
          <div className="forgot-wrap">
            <button type="button" onClick={() => setShowReset(true)}>
              Forgot Password?
            </button>
          </div>

          {/* LOGIN BUTTON */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className={`login-btn ${loading ? "loading" : ""}`}
          >
            {loading ? "Logging in..." : "Login →"}
          </motion.button>

        </form>
      </motion.div>

      {/* RESET MODAL */}
      {showReset && (
        <div className="reset-modal">
          <motion.div
            className="reset-card"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >

            <h3>Reset Password</h3>

            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setResetEmail(e.target.value)}
            />

            <div className="reset-actions">
              <button onClick={handleReset} className="login-btn">
                Send Link
              </button>

              <button onClick={() => setShowReset(false)}>
                Cancel
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </section>
  );
}
