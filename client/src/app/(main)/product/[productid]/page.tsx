"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ShoppingCart, Heart } from "lucide-react";
import { ContentLayout } from "@/components/admin-panel/content-layout";

// Mock data for similar and latest products
const mockProducts = [
  {
    id: 1,
    title: "Similar Product 1",
    price: 79.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    title: "Similar Product 2",
    price: 89.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    title: "Similar Product 3",
    price: 99.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    title: "Latest Product 1",
    price: 109.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    title: "Latest Product 2",
    price: 119.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    title: "Latest Product 3",
    price: 129.99,
    image: "/placeholder.svg?height=200&width=200",
  },
];

export default function ProductDetail() {
  const product = {
    image:
      "http://res.cloudinary.com/dx1kkvs4z/image/upload/v1729747569/u0rtaiwgf…",
    title: "Popcorn Stripes: Blue Horizon",
    description:
      "Style your wardrobe with this classic relaxed-fit shirt. Wear it to a …",
    price: 909090,
    brand: "fgfgdsdfg",
    category: "shoes,cloths",
    salePrice: 9898,
    totalStock: 9384294,
  };

  return (
    <ContentLayout title="Products">
      <div className="mx-auto px-4 py-8 border">
        <div className="grid md:grid-cols-2 gap-8 border">
          <div>
            <Image
              src={product.image}
              alt={product.title}
              width={500}
              height={500}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-gray-600">{product.description}</p>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">
                ${(product.salePrice / 100).toFixed(2)}
              </span>
              <span className="text-lg text-gray-500 line-through">
                ${(product.price / 100).toFixed(2)}
              </span>
            </div>
            <div>
              <Badge>{product.brand}</Badge>
              {product.category.split(",").map((cat, index) => (
                <Badge key={index} variant="secondary" className="ml-2">
                  {cat.trim()}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              In stock: {product.totalStock}
            </p>
            <div className="flex space-x-4">
              <Button className="flex-1">
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
              <Button variant="outline">
                <Heart className="mr-2 h-4 w-4" /> Wishlist
              </Button>
            </div>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Similar Products</h2>
          <Carousel className="w-full mx-auto">
            <CarouselContent>
              {mockProducts.slice(0, 3).map((product) => (
                <CarouselItem
                  key={product.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Latest Products</h2>
          <Carousel className="w-full mx-auto">
            <CarouselContent>
              {mockProducts.slice(3).map((product) => (
                <CarouselItem
                  key={product.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
      </div>
    </ContentLayout>
  );
}

function ProductCard({ product }: { product: (typeof mockProducts)[0] }) {
  return (
    <Card>
      <CardContent className="p-4">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="rounded-lg object-cover w-full h-48 mb-4"
        />
        <h3 className="font-semibold mb-2">{product.title}</h3>
        <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
      </CardContent>
    </Card>
  );
}
