"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "../ui/input";
import { useDataTableContext } from "./data-table-wrapper";

export function DataTableSearch<TData>({
  placeholder,
  className,
}: {
  placeholder?: string;
  className?: string;
}) {
  const [search, setSearch] = useState("");
  const { table } = useDataTableContext<TData>();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    table.setGlobalFilter(event.target.value);
  };

  return (
    <Input
      placeholder={placeholder ?? "Filtrer..."}
      value={search}
      onChange={handleSearch}
      className={cn("h-8 w-full max-w-[200px] lg:max-w-[250px]", className)}
    />
  );
}
