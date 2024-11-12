import { Label } from "@radix-ui/react-label";
import { Plus } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

const AddAddressModal = ({
  isNewAddressModalOpen,
  setIsNewAddressModalOpen,
  handleNewAddressSubmit,
}: {
  isNewAddressModalOpen: boolean;
  setIsNewAddressModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleNewAddressSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
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
  );
};

export default AddAddressModal;
