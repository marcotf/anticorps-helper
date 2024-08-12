"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import {
  DataTableFilters,
  type FacetedFilter,
} from "@/components/data-table/data-table-filters";
import { DataTableSearch } from "@/components/data-table/data-table-search";
import { DataTableWrapper } from "@/components/data-table/data-table-wrapper";
import { Badge } from "@/components/ui/badge";
import { type Antibody } from "@/server/db/schema";
import { type ColumnDef } from "@tanstack/react-table";
import Fuse from "fuse.js";

export function AntibodiesTable({ data }: Readonly<{ data: Antibody[] }>) {
  const facetedFilters: FacetedFilter[] = [
    {
      column: "stock",
      title: "Stock",
      options: [
        {
          label: "Moyen",
          value: "2",
        },
        {
          label: "Critique",
          value: "1",
        },
      ],
    },
  ];

  const antibodiesColumns: ColumnDef<Antibody>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nom" />
      ),
      enableHiding: false,
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="μL/tube" />
      ),
      enableHiding: false,
    },
    {
      accessorKey: "stock",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Stock" />
      ),
      filterFn: (row, _, value: string[]) => {
        const stock = row.original.stock.toString();
        return value.includes(stock);
      },
      enableHiding: false,
    },
    {
      id: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.original.stock;

        if (status === 1) return <Badge variant="destructive">Critique</Badge>;
        if (status === 2) return <Badge variant="warning">Moyen</Badge>;
        return <Badge variant="secondary">Ok</Badge>;
      },
      enableHiding: false,
    },
  ];

  const fuse = new Fuse(data, {
    threshold: 0.3,
    keys: ["name", "quantity", "stock"],
  });

  return (
    <DataTableWrapper columns={antibodiesColumns} data={data} fuse={fuse}>
      <div className="flex gap-2">
        <div className="flex w-full flex-wrap gap-2">
          <DataTableSearch placeholder="Filtrer les anticorps" />
          <DataTableFilters facetedFilters={facetedFilters} />
        </div>
      </div>
      <DataTable />
    </DataTableWrapper>
  );
}
