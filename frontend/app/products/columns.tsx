'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/app/ui/button';
import DataTableRowActions from './DataTableRowActions';
import { Product } from '@/app/types';

interface ProductsColumnsProps {
  onUnpin: (product: Product) => void;
  onPin: (product: Product) => void;
}

export const getProductsColumns = ({
  onUnpin,
  onPin,
}: ProductsColumnsProps): ColumnDef<Product>[] => [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DataTableRowActions row={row} onUnpin={onUnpin} onPin={onPin} />
    ),
  },
];
