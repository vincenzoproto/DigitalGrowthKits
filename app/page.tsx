import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Ready-to-use hospitality growth tools</span>
          <h1>Less theory.<br />More things you can use today.</h1>
          <p>Digital kits for hotels, B&Bs and independent hosts: sales templates, AI workflows, content systems and low-season campaign tools.</p>
          <div className="hero-actions"><a className="primary" href="#products">Explore the kits</a><span>One-time payment · Instant digital delivery</span></div>
        </div>
        <div className="hero-panel">
          <span>Built for</span>
          <strong>Hotels</strong><strong>B&Bs</strong><strong>Airbnb hosts</strong><strong>Hospitality teams</strong>
        </div>
      </section>

      <section className="trust-row"><span>Practical</span><span>Editable</span><span>Instant access</span><span>No subscription</span></section>

      <section className="products-section" id="products">
        <div className="section-heading"><span className="eyebrow">The library</span><h2>Pick one problem. Get the toolkit.</h2><p>Start with a focused kit or choose the complete bundle.</p></div>
        <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>

      <section className="how-it-works">
        <div className="section-heading"><span className="eyebrow">Simple by design</span><h2>Buy. Download. Apply.</h2></div>
        <div className="steps"><div><b>01</b><h3>Choose</h3><p>Select the kit that matches the problem you want to solve.</p></div><div><b>02</b><h3>Pay securely</h3><p>Checkout is handled through Stripe.</p></div><div><b>03</b><h3>Download</h3><p>After payment verification, your protected download becomes available.</p></div></div>
      </section>
    </main>
  );
}
