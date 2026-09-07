import rawProducts from "@/configs/products.json";

export type Product = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  priceCents: number;
  currency: string;
  badge: string;
  bullets: string[];
  downloadEnvKey: string;
};

export const products = rawProducts as Product[];

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}

export function formatPrice(product: Product) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: product.currency,
    maximumFractionDigits: 0,
  }).format(product.priceCents / 100);
}
