import ProductDetail from '@/component/ui/product-datails';
import { stripe } from '@/lib/stripe';
import { connection } from "next/server";
import React from 'react';

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  await connection();

  const { id } = await params;

  const product = await stripe.products.retrieve(id, {
    expand: ['default_price'],
  });

  const plainProduct = JSON.parse(JSON.stringify(product));

  return <ProductDetail product={plainProduct} />;
};

export default ProductPage;