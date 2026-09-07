import BuyButton from "@/components/BuyButton";
import { formatPrice, type Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
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
      <BuyButton productId={product.id} />
    </article>
  );
}
