"use client";

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useEffect, useState } from "react";
import { CartProduct } from "@/cartProduct";
import { getCookie } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus, QrCode, Smartphone } from "lucide-react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
interface Address {
  id: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
  notes: string;
}
export default function CheckoutPage() {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [isNewAddressModalOpen, setIsNewAddressModalOpen] = useState(false);
  const handleAddressSelect = (addressId: string) => {
    setSelectedAddress(addressId);
  };

  const handleNewAddressSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically handle the form submission,
    // add the new address to the list, and close the modal
    setIsNewAddressModalOpen(false);
  };

  const addresses: Address[] = [
    {
      id: "1",
      address: "123 Main St",
      city: "Anytown",
      pincode: "12345",
      phone: "555-1234",
      notes: "Leave at the door",
    },
    {
      id: "2",
      address: "456 Elm St",
      city: "Othertown",
      pincode: "67890",
      phone: "555-5678",
      notes: "Ring the doorbell",
    },
  ];
  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:7000/user/cart/", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data.items);
    } catch (error) {
      console.log(error);
    }
  };
  const totalPrice = products.reduce(
    (total, product) =>
      total + (product.salePrice || product.price) * product.quantity,
    0
  );
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <ContentLayout title="Checkout">
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
          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedAddress || ""}
                onValueChange={handleAddressSelect}
              >
                <ScrollArea className="h-[200px] rounded-md p-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className="flex items-center space-x-2 mb-4"
                    >
                      <RadioGroupItem
                        value={address.id}
                        id={`address-${address.id}`}
                      />
                      <Label
                        htmlFor={`address-${address.id}`}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="w-full flex flex-col gap-1">
                          <p>{address.address}</p>
                          <p>
                            {address.city}, {address.pincode}
                          </p>
                          <p>{address.phone}</p>
                          <p className="text-sm text-gray-500">
                            {address.notes}
                          </p>
                        </div>
                      </Label>
                    </div>
                  ))}
                </ScrollArea>
              </RadioGroup>
              <Dialog
                open={isNewAddressModalOpen}
                onOpenChange={setIsNewAddressModalOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="outline" className="mt-4">
                    <Plus className="w-4 h-4 mr-2" /> Add New Address
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Address</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleNewAddressSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="Enter your address" />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="Enter your city" />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input id="pincode" placeholder="Enter your pincode" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="Enter your phone number" />
                    </div>
                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any additional notes for delivery"
                      />
                    </div>
                    <Button type="submit">Save Address</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
          <div>
            <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
            <Tabs defaultValue="qr" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger
                  value="qr"
                  className="flex items-center justify-center"
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  QR Code
                </TabsTrigger>
                <TabsTrigger
                  value="bank"
                  className="flex items-center justify-center"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Bank Transfer
                </TabsTrigger>
                <TabsTrigger
                  value="upi"
                  className="flex items-center justify-center"
                >
                  <Smartphone className="h-4 w-4 mr-2" />
                  UPI
                </TabsTrigger>
              </TabsList>
              <TabsContent value="qr" className="mt-4">
                <div className="bg-gray-100 p-4 rounded-md text-center">
                  <p className="mb-2">Scan the QR code to pay</p>
                  <div className="w-48 h-48 mx-auto bg-white flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-gray-400" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="bank" className="mt-4 space-y-4">
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
              </TabsContent>
              <TabsContent value="upi" className="mt-4">
                <div>
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input id="upiId" placeholder="Enter your UPI ID" />
                </div>
              </TabsContent>
            </Tabs>
            <Button className="w-full mt-6">Complete Purchase</Button>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
