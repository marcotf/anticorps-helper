"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  type FilterFn,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  type Table,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import type Fuse from "fuse.js";
import { once } from "lodash";
import React, { createContext, useContext, useState } from "react";

interface DataTableContext<TData = unknown> {
  table: Table<TData>;
}

const createDataTableContext = once(<T,>() =>
  createContext({} as DataTableContext<T>),
);

export const useDataTableContext = <T,>() => {
  const context = useContext(createDataTableContext<T>());

  if (!context) {
    throw new Error("useDataTable must be used within a DataTableProvider");
  }

  return context;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  children: React.ReactNode;
  fuse: Fuse<TData>;
}

export function DataTableWrapper<TData, TValue>({
  columns,
  data,
  children,
  fuse,
}: Readonly<DataTableProps<TData, TValue>>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const fuzzyFilter: FilterFn<TData> = (row, _, value: string) => {
    if (!value || value === "") {
      return true;
    }
    const items = fuse.search(value).map((result) => result.item);
    return !!items.find((item) => item === row.original);
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    globalFilterFn: fuzzyFilter,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const DataTableContext = createDataTableContext<TData>();

  return (
    <DataTableContext.Provider value={{ table }}>
      <div className="space-y-4">{children}</div>
    </DataTableContext.Provider>
  );
}
