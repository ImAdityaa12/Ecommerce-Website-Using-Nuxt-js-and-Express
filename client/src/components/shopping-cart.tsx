"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, Plus, Minus, X } from "lucide-react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCookie } from "@/lib/utils";
import { toast } from "sonner";

interface CartItem {
  productId: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const updateQuantity = async (productId: number, quantity: string) => {
    try {
      const response = await fetch(
        `http://localhost:7000/user/cart/updateCartItemQuantity`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
          body: JSON.stringify({ productId, quantity }),
        }
      );
      if (response.status === 200) {
        getCartItems();
        toast.success("Item quantity updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:7000/user/cart/deleteCartItem`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
          body: JSON.stringify({ productId: id }),
        }
      );
      if (response.status === 200) {
        getCartItems();
        toast.error("Item removed from cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const getCartItems = async () => {
    try {
      const response = await fetch("http://localhost:7000/user/cart/", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });
      const data = await response.json();
      setCartItems(data.items);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCartItems();
  }, []);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-10rem)] pr-4">
          {cartItems.map((item) => (
            <div
              key={item.productId}
              className="flex items-center space-x-4 py-4 border-b"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={64}
                height={64}
                className="rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.productId, "minus")}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.productId, "plus")}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.productId)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </ScrollArea>
        <div className="mt-4 space-y-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <Button className="w-full">Checkout</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
