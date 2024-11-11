"use client";

import * as React from "react";
import { Search } from "lucide-react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Title } from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { product } from "@/product";
import { Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

type CommandItem = {
  icon: React.ElementType;
  name: string;
  shortcut: string;
  action: () => void;
};

type CommandCategory = {
  category: string;
  items: CommandItem[];
};

// const commands: CommandCategory[] = [
//   {
//     category: "Products",
//     items: [
//       {
//         icon: Calendar,
//         name: "Calendar",
//         shortcut: "⌘C",
//         action: () => console.log("Calendar opened"),
//       },
//       {
//         icon: Smile,
//         name: "Search Emoji",
//         shortcut: "⌘E",
//         action: () => console.log("Emoji search opened"),
//       },
//       {
//         icon: Calculator,
//         name: "Calculator",
//         shortcut: "⌘K",
//         action: () => console.log("Calculator opened"),
//       },
//     ],
//   },
// ];

export default function CommandSearch() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [searchData, setSearchData] = React.useState<CommandCategory[]>([]);
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
      const newCommands: CommandCategory[] = [
        {
          category: "Products",
          items: data.map((item) => ({
            icon: Calendar,
            name: item.title,
            shortcut: "⌘C",
            action: () => router.push(`/product/${item._id}`),
          })),
        },
      ];
      setSearchData(newCommands);
      console.log(newCommands);
    } catch (error) {
      console.log(error);
      toast.error("Error searching products");
    }
  }
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

      <CommandDialog open={open} onOpenChange={setOpen}>
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
      </CommandDialog>
    </div>
  );
}
