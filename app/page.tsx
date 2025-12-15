"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [credits, setCredits] = useState<number>(0);
  const [status, setStatus] = useState<string>("");

  /* -----------------------------
     Apply referral (intended abuse)
  ------------------------------ */
  async function applyReferral() {
    const res = await fetch("/api/referral", { method: "POST" });
    const data = await res.json();
    setCredits(data.credits);
    setStatus("Referral applied (+10 credits)");
  }

  /* -----------------------------
     
  ------------------------------ */
  async function checkPro() {
    const res = await fetch("/api/account", {
      headers: {
        "x-user": JSON.stringify({
          username: "guest",
          plan: "pro",
        }),
      },
    });

    const data = await res.json();
    setStatus(JSON.stringify(data, null, 2));
  }

  /* -----------------------------

  ------------------------------ */
  async function attemptBilling() {
    const res = await fetch("/api/billing", { method: "POST" });
    const data = await res.json();
    setStatus(JSON.stringify(data, null, 2));
  }

  /* -----------------------------
     Initial load
  ------------------------------ */
  useEffect(() => {
  async function loadCredits() {
    try {
      const res = await fetch("/api/credits");
      const data = await res.json();
      setCredits(data.credits);
    } catch (err) {
      console.error(err);
    }
  }

  loadCredits();
}, []);


  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-black text-slate-100 px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-indigo-400 to-cyan-400">
            NovaCloud Platform
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Enterprise-grade cloud services with flexible billing and referral
            incentives.
          </p>
        </header>

        {/* Dashboard */}
        <section className="grid md:grid-cols-2 gap-6">

          {/* Credits Card */}
          <div className="bg-slate-900/70 rounded-2xl p-6 border border-slate-800 shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Referral Credits</h2>
            <p className="text-4xl font-bold text-indigo-400">{credits}</p>
            <p className="text-slate-400 mt-2">
              Earn credits by referring new users.
            </p>

            <button
              onClick={applyReferral}
              className="mt-6 w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 transition px-4 py-2 font-semibold"
            >
              Apply Referral
            </button>
          </div>

          {/* Actions Card */}
          <div className="bg-slate-900/70 rounded-2xl p-6 border border-slate-800 shadow-lg space-y-4">
            <h2 className="text-xl font-semibold">Account Actions</h2>

            <button
              onClick={checkPro}
              className="w-full rounded-xl bg-cyan-600 hover:bg-cyan-500 transition px-4 py-2 font-semibold"
            >
              Upgrade to Pro
            </button>

            <button
              onClick={attemptBilling}
              className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 transition px-4 py-2 font-semibold"
            >
              Attempt Billing
            </button>
          </div>
        </section>

        {/* Status Output */}
        <section className="bg-black/60 rounded-2xl p-6 border border-slate-800 shadow-inner">
          <h3 className="text-lg font-semibold mb-2">System Response</h3>
          <pre className="text-sm text-slate-300 whitespace-pre-wrap wrap-break-word">
            {status || "No actions performed yet."}
          </pre>
        </section>

        {/* Footer */}
        <footer className="text-center text-slate-500 text-sm">
          © 2025 NovaCloud Inc. All rights reserved.
        </footer>

      </div>
    </main>
  );
}