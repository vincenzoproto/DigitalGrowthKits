import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Done-for-you hospitality systems</span>
          <h1>Software that solves an operating problem.</h1>
          <p>Configured systems for hotels and B&Bs: guest messaging, digital concierge, repeat-guest automation and direct booking infrastructure. We start from proven open-source foundations and deliver the hospitality implementation.</p>
          <div className="hero-actions"><a className="primary" href="#products">Explore the systems</a><span>Setup · configuration · handover · managed support</span></div>
        </div>
        <div className="hero-panel">
          <span>Built for</span>
          <strong>Independent hotels</strong><strong>B&Bs</strong><strong>Guest houses</strong><strong>Hospitality teams</strong>
        </div>
      </section>

      <section className="trust-row"><span>Operational</span><span>Configured for you</span><span>Self-hostable foundations</span><span>Human handover</span></section>

      <section className="products-section" id="products">
        <div className="section-heading"><span className="eyebrow">Systems</span><h2>Buy implementation, not another template.</h2><p>Each offer starts from a mature software foundation and is configured around a real hospitality workflow.</p></div>
        <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>

      <section className="how-it-works">
        <div className="section-heading"><span className="eyebrow">Simple delivery</span><h2>Review. Configure. Launch.</h2></div>
        <div className="steps"><div><b>01</b><h3>Choose</h3><p>Select the operating problem you want to solve.</p></div><div><b>02</b><h3>Configure</h3><p>We map your property, staff, channels and workflows onto the system.</p></div><div><b>03</b><h3>Launch</h3><p>We hand over a working setup with clear ownership and support options.</p></div></div>
      </section>
    </main>
  );
}
