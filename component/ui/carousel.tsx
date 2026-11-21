"use client";

import React, { useCallback } from "react";
import Stripe from "stripe";
import Image from "next/image";
import {Button} from '@/component/ui/button'
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  products: Stripe.Product[];
}

const Carousel = ({ products }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!products?.length) return null;

  return (
    <div className="relative mx-auto max-w-6xl px-4">
      {/* Section Header & Arrows */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-800">
          Featured Collection
        </h3>
        <div className="flex gap-2">
          <button
            onClick={scrollPrev}
            aria-label="Previous product"
            className="group rounded-full border border-neutral-300 p-2 hover:bg-neutral-100 active:scale-95 transition"
          >
            <ChevronLeft className="h-5 w-5 text-black group-hover:text-black group-active:text-red-950 transition-colors" />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Next product"
            className="group rounded-full border border-neutral-300 p-2 hover:bg-neutral-100 active:scale-95 transition"
          >
            <ChevronRight className="h-5 w-5 text-black group-hover:text-black group-active:text-red-950 transition-colors" />
          </button>
        </div>
      </div>

      {/* Embla Viewport */}
      <div className="overflow-hidden py-4" ref={emblaRef}>
        <div className="flex -ml-4">
          {products.map((product) => {
            const price = product.default_price as Stripe.Price | null;
            const formattedPrice =
              price?.unit_amount != null
                ? new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: price.currency.toUpperCase(),
                  }).format(price.unit_amount / 100)
                : "Price unavailable";

            return (
              <div
                key={product.id}
                className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4"
              >
                <Tilt
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                  glareEnable={true}
                  glareMaxOpacity={0.15}
                  scale={1.02}
                  transitionSpeed={400}
                  className="h-full"
                >
                  <div className="flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
                    <div className="relative h-64 w-full bg-neutral-100">
                      {product.images?.[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-neutral-400">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="flex flex-grow flex-col justify-between p-5">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">
                          {product.name}
                        </h4>
                        {product.description && (
                          <p className="mt-1 line-clamp-2 text-sm text-neutral-600">
                            {product.description}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t pt-4">
                        <span className="font-bold text-gray-900">
                          {formattedPrice}
                        </span>
                        
                        <Button className="bg-black">
                            <Link href='/Products'
                             className="text-white"
                            >
                                view items
                            </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
