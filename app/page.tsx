"use client";

import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("Free Trial");

  // Insecure by design: client-controlled identity
  const user = {
    username: "guest",
    plan: "free",
    credits: 0,
  };


  async function applyReferral() {
    await fetch("/api/referral", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ referrer: "campaign-2025" }),
    });

    setStatus("Referral applied");
  }

  async function upgrade() {
    const res = await fetch("/api/billing", {
      method: "POST",
      headers: {
        "x-user": JSON.stringify(user),
      },
    });

    if (!res.ok) {
      setStatus("Upgrade failed");
    } else {
      setStatus("Upgrade processed");
    }
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-black via-slate-900 to-indigo-950 text-white px-12 py-16 font-sans">
      <header className="mb-16">
        <h1 className="text-5xl font-bold tracking-tight">
          Acme Analytics
        </h1>
        <p className="text-slate-400 mt-4 max-w-xl">
          AI-powered insights for next-generation businesses.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-900/70 rounded-xl p-6 border border-slate-800">
          <h3 className="text-xl font-semibold mb-2">Plan</h3>
          <p className="text-indigo-400 text-lg">{status}</p>
          <p className="text-slate-400 mt-2">
            Free trial access with limited features.
          </p>
        </div>

        <div className="bg-slate-900/70 rounded-xl p-6 border border-slate-800">
          <h3 className="text-xl font-semibold mb-2">Referral Program</h3>
          <p className="text-slate-400">
            Earn credits by referring partners.
          </p>
          <button
            onClick={applyReferral}
            className="mt-4 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition"
          >
            Apply Referral
          </button>
        </div>

        <div className="bg-slate-900/70 rounded-xl p-6 border border-slate-800">
          <h3 className="text-xl font-semibold mb-2">Upgrade</h3>
          <p className="text-slate-400">
            Unlock Pro analytics with credits.
          </p>
          <button
            onClick={upgrade}
            className="mt-4 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition"
          >
            Upgrade to Pro
          </button>
        </div>
      </section>

      <footer className="mt-20 text-slate-500 text-sm">
        © 2025 Acme Analytics. All rights reserved.
      </footer>
    </main>
  );
}