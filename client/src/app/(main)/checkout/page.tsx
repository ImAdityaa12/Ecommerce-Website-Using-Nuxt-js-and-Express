"use client";

import Image from "next/image";
import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCartStore from "@/store/cartStore";
export default function CheckoutPage() {
  const { cartItems: products } = useCartStore();
  const totalPrice = products.reduce(
    (total, product) =>
      total + (product.salePrice || product.price) * product.quantity,
    0
  );
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Items</h2>
          {products.map((product) => (
            <div
              key={product.productId}
              className="flex items-center space-x-4 mb-4 border-b pb-4"
            >
              <Image
                src={product.image}
                alt={product.title}
                width={80}
                height={80}
                className="rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{product.title}</h3>
                <p className="text-sm text-gray-600">
                  Quantity: {product.quantity}
                </p>
                <p className="text-sm font-semibold">
                  Price: $
                  {((product.salePrice || product.price) / 100).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
          <div className="text-xl font-bold mt-4">
            Total: ${(totalPrice / 100).toFixed(2)}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <QrCode className="h-6 w-6" />
              <span>Pay with QR Code</span>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Bank Transfer Details</h3>
              <div className="space-y-2">
                <div>
                  <Label htmlFor="accountName">Account Name</Label>
                  <Input id="accountName" placeholder="Enter account name" />
                </div>
                <div>
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    placeholder="Enter account number"
                  />
                </div>
                <div>
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input id="bankName" placeholder="Enter bank name" />
                </div>
              </div>
            </div>
          </div>
          <Button className="w-full mt-6">Complete Purchase</Button>
        </div>
      </div>
    </div>
  );
}
