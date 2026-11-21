import ProductDetail from "@/component/ui/product-datails";
import { stripe } from "@/lib/stripe";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { Suspense } from "react";

async function getProduct(id: string) {
  "use cache";
  cacheLife("hours");

  const product = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });

  return JSON.parse(JSON.stringify(product));
}

async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id).catch(() => null);

  if (!product) notFound();

  return <ProductDetail product={product} />;
}

const ProductPage = ({ params }: { params: Promise<{ id: string }> }) => (
  <Suspense fallback={<p className="py-20 text-center">Loading...</p>}>
    <ProductDetails params={params} />
  </Suspense>
);

export default ProductPage;