"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumn = {
  id: string
  name: string
  billboardLabel: string
  createdAt: string 
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "billboard",
    header: "Banner",
    cell: ({ row }) => row.original.billboardLabel,
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal",
  },
  {
    id: "Actions",
    cell: ({row}) => <CellAction data={row.original}/>
  }
]
