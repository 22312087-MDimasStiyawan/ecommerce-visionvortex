"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createdAt: string ;
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "product",
    header: "product",
  },
  {
    accessorKey: "phone",
    header: "phone",
  },
  {
    accessorKey: "address",
    header: "address",
  },
  {
    accessorKey: "totalPrice",
    header: "totalPrice",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
]
