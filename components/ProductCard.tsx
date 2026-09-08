import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const productPages: Record<string, string> = {
    "guest-inbox-pro": "/guest-inbox-pro",
    "digital-guest-concierge": "/digital-guest-concierge",
    "repeat-guest-engine": "/repeat-guest-engine",
    "direct-booking-engine": "/direct-booking-engine",
  };
  const productPage = productPages[product.id];
  const setupHref = `/request-setup?product=${encodeURIComponent(product.slug)}`;

  return (
    <article className="product-card">
      <div className="product-topline">
        <span className="badge">{product.badge}</span>
        <strong className="price">{formatPrice(product)}</strong>
      </div>
      <h3>{product.title}</h3>
      <p className="description">{product.shortDescription}</p>
      <ul>
        {product.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
      </ul>
      <div className="card-actions">
        <Link className="buy-button button-link" href={productPage}>See offer & scope</Link>
        <Link className="buy-button button-link secondary-button" href={setupHref}>Request setup</Link>
      </div>
    </article>
  );
}
