import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const productPages: Record<string, string> = {
    "guest-inbox-pro": "/guest-inbox-pro",
    "repeat-guest-engine": "/repeat-guest-engine",
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
      <div style={{display:"grid",gap:10}}>
        {productPage ? (
          <Link className="buy-button" href={productPage} style={{textAlign:"center",textDecoration:"none"}}>View product & demo</Link>
        ) : null}
        <Link className="buy-button" href={setupHref} style={{textAlign:"center",textDecoration:"none",background:productPage?"#334136":undefined}}>Request setup</Link>
      </div>
    </article>
  );
}
