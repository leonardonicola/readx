"use client";
import debounce from "lodash.debounce";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export type Options = Array<{ label: string; value: string }>;

interface ComboboxProps {
  options: Options;
  onSelect: (_val: string) => void;
  onSearch: (_search: string) => Promise<void>;
  disabled?: boolean;
  selectedOption: string | null;
}

function Combobox({
  options = [],
  onSelect,
  onSearch,
  selectedOption,
  disabled = false
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [pending, startTransition] = React.useTransition();

  const searchBooks = debounce((search: string) => {
    startTransition(async () => {
      if (!search.length) {
        return;
      }
      await onSearch(search);
    });
  }, 500);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="noShadow"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedOption
            ? options.find((option) => option.value === selectedOption)?.label
            : "Pesquise..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="popover-w-100 p-0" side="bottom" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            disabled={disabled}
            placeholder="Pesquise..."
            onValueChange={(search) => searchBooks(search.trim())}
          />
          <CommandList>
            {pending && <div className="p-4 text-sm">Procurando...</div>}
            {!pending && <CommandEmpty>Nenhuma opção encontrada</CommandEmpty>}

            <CommandGroup>
              {!pending &&
                options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    className="cursor-pointer"
                    onSelect={(currentValue) => {
                      onSelect(
                        currentValue === selectedOption ? "" : currentValue
                      );
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedOption === option.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { Combobox };
