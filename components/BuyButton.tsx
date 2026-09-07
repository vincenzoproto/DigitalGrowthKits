"use client";

import { useState } from "react";

export default function BuyButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function buy() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await response.json();
      if (!response.ok || !data.url) throw new Error(data.error || "Checkout unavailable");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout unavailable");
      setLoading(false);
    }
  }

  return (
    <div className="buy-wrap">
      <button className="buy-button" onClick={buy} disabled={loading}>
        {loading ? "Opening secure checkout…" : "Get the kit"}
      </button>
      {error ? <p className="error">{error}</p> : null}
    </div>
  );
}
