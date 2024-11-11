"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { product } from "@/product";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CommandSearch() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [searchData, setSearchData] = React.useState<product[]>([]);
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  async function searchProducts(value: string) {
    try {
      const response = await fetch(
        `http://localhost:7000/products/shop/search?q=${value}`
      );
      const data: product[] = await response.json();
      // const newCommands: CommandCategory[] = [
      //   {
      //     category: "Products",
      //     items: data.map((item) => ({
      //       icon: Calendar,
      //       name: item.title,
      //       shortcut: "⌘C",
      //       action: () => router.push(`/product/${item._id}`),
      //     })),
      //   },
      // ];
      setSearchData(data);
      // console.log(newCommands);
    } catch (error) {
      console.log(error);
      toast.error("Error searching products");
    }
  }
  React.useEffect(() => {
    searchProducts(query);
  }, [query]);
  React.useEffect(() => {
    searchProducts("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-full ml-auto">
      <Button
        onClick={() => setOpen(true)}
        className="relative max-w-[20rem] lg:min-w-[20rem] justify-start text-sm text-muted-foreground flex items-center text-white ml-auto dark:bg-gray-900 border-2 hover:bg-transparent hover:text-blue-400 border-blue-400 dark:border-gray-900 dark:hover:bg-gray-800 dark:focus:bg-gray-800 group"
      >
        Search
        <span className="w-full">
          <Search className="text-white ml-auto group-hover:text-blue-400" />
        </span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        {/* <DialogTrigger asChild>
          <Button variant="outline">Search Products</Button>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Search Products</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="max-h-[400px] overflow-y-auto">
              {searchData.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center space-x-4 py-2 border-b px-4"
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{product.title}</h3>
                    <p className="text-sm text-gray-500">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      // Implement redirect logic here
                      router.push(`/product/${product._id}`);
                      console.log(`Redirecting to product: ${product._id}`);
                      setOpen(false);
                    }}
                  >
                    View
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* <CommandDialog open={open} onOpenChange={setOpen}>
        <Title className="hidden">hello</Title>
        <Command className="rounded-lg border shadow-md md:min-w-[450px] duration-500">
          <CommandInput
            placeholder="Type a command or search..."
            onValueChange={(value) => searchProducts(value)}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {searchData.map((group, index) => (
              <React.Fragment key={index}>
                <CommandGroup heading={group.category}>
                  {group.items.map((item) => (
                    <CommandItem
                      key={item.name}
                      onSelect={() => {
                        setOpen(false);
                        item.action();
                      }}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.name}</span>
                      {item.shortcut && (
                        <CommandShortcut>{item.shortcut}</CommandShortcut>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
              </React.Fragment>
            ))}
          </CommandList>
        </Command>
      </CommandDialog> */}
    </div>
  );
}
