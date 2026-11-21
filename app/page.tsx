import { stripe } from "@/lib/stripe";
import Image from "next/image";
import {Button} from '@/component/ui/button'
import Link from 'next/link'
import Carousel from '@/component/ui/carousel'

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });
  console.log(products);
  return (
    <div className="">
      <section className="rounded bg-neutral-200 py-8 sm:py-12">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-8 px-8 sm:px-16">
          <div className="max-w-md space-y-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-gray-700">
              Welcome to Shoppaholic
            </h2>
            <p className="text-neutral-600">Considered fashion for a life worth dressing for. Designed in studio, made to last.</p>
            <Button className="inline-flex items-center justify-center  px-6 py-3 bg-black text-white">
              <Link href='/Products'>Browse All Products</Link>
            </Button>
          </div>
          <Image 
          alt="banner image" 
          width={450} 
          height={400} 
          src={products.data[0].images[0]}
          className="rounded-2xl"
          />
        </div>
      </section>
      <section className="py-8">
        <Carousel products={products.data}/>
      </section>
    </div>
  );
}
