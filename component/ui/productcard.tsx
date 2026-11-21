import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Stripe from 'stripe';

interface ProductCardProps {
  product: Stripe.Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const price = product.default_price as Stripe.Price | null;
  const formattedPrice =
    price?.unit_amount != null
      ? new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: price.currency.toUpperCase(),
        }).format(price.unit_amount / 100)
      : 'Price unavailable';

  return (
    
    <div className='p-4 '>
        <Link
      href={`/Products/${product.id}`}
      className="group flex flex-col md:grid h-screen md:grid-cols-2 overflow-hidden gap-4 rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md"
      
    >
 
      {/* Product Image */}
      <div className="relative h-full w-full overflow-hidden bg-neutral-100">
        {product.images?.[0] ? (
            <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            />
        ) : (
            <div className="flex h-full items-center justify-center text-sm text-neutral-400">
            No image
            </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-grow flex-col justify-around p-5">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-black text-center ">
            {product.name}
          </h3>
          {product.description && (
            <p className="mt-1 line-clamp-2 text-sm text-neutral-600">
              {product.description}
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between border-t pt-4">
          <span className="font-bold text-gray-900">{formattedPrice}</span>
          <span className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition group-hover:bg-neutral-800">
            View Item
          </span>
        </div>
      </div>
      
    </Link>
    </div>
    
  );
};

export default ProductCard;