import React from 'react'
import Stripe from 'stripe';
import ProductCard from './productcard';

interface ProductProps {
    products: Stripe.Product[];
}

const ProductList = ({products }: ProductProps ) => {
  return (
    <div>
        {/* <div>
            <input type="text" placeholder='Search Product' />
        </div> */}

        <ul>
            {products.map((product, key)=>{
                return(
                    <li key={key} className=''>
                        <ProductCard product={product}/>
                    </li>
                )
            })}
        </ul>
    </div>
  )
}

export default ProductList