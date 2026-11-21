"use client"
import React, { useState } from 'react'
import Stripe from 'stripe'
import Image from 'next/image';
import { Button } from './button';
import { useCartStore } from '@/store/cart-store';


interface ProductdetailProps {
    product: Stripe.Product;
}


const ProductDetail = ({product}: ProductdetailProps ) => {

    const {items, addItem, removeItem} = useCartStore()
    const cartItem = items.find((item)=> item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    // const [count, setCount] = useState(44);

    const onAddItem = ()=>{
        addItem({
            id: product.id,
            name: product.name,
            price: price.unit_amount as number,
            imageUrl: product.images ? product.images[0] : null,
            quantity: 1,
        })
    }
    // const onSubItem = ()=>{
    //     // addItem({
    //     //     id: product.id,
    //     //     name: product.name,
    //     //     price: price.unit_amount as number,
    //     //     imageUrl: product.images ? product.images[0] : null,
    //     //     quantity: -1,
    //     // })
    // }


    const price = product.default_price as Stripe.Price;
  return (
    <div className='container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center'>
        {product.images && product.images[0] && (
            <div className="group relative h-96 w-full md:w-1/2 overflow-hidden rounded-xl bg-neutral-100">
                <Image 
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                />
            </div>
        )}

        <div className='md:w-1/2 text-center'>
            <h1 className='font-bold mb-4 text-3xl'> {product.name} </h1>
            <p className='mb-4 text-gray-700'> {product.description} </p>

            {price && price.unit_amount && (
                <p className='text-lg font-semibold text-gray-900 text-center'>
                    &#x20A6;{(price.unit_amount / 100).toFixed(2)}
                </p>
            )}

            <div className='flex items-center space-x-4 text-center justify-center'>
                
                <Button onClick={()=> removeItem(product.id)} className='active:bg-red-700'>
                    -
                </Button>
                <span>{quantity}</span>
                <Button onClick={onAddItem}>
                    +
                </Button>
                
                
            </div>
        </div>
    </div>
  )
}

export default ProductDetail