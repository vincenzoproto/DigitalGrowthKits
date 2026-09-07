import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const productPages: Record<string, string> = {
    "guest-inbox-pro": "/guest-inbox-pro",
    "repeat-guest-engine": "/repeat-guest-engine",
  };
  const productPage = productPages[product.id];
  const mailSubject = encodeURIComponent(`${product.title} setup`);

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
      {productPage ? (
        <Link className="buy-button" href={productPage} style={{textAlign:"center",textDecoration:"none"}}>View product & demo</Link>
      ) : (
        <a className="buy-button" href={`mailto:info@vincenzoproto.com?subject=${mailSubject}`} style={{textAlign:"center",textDecoration:"none"}}>Request setup</a>
      )}
    </article>
  );
}
