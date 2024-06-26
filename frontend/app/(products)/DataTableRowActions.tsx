import { Button } from '@/app/ui/button';
import { Row } from '@tanstack/react-table';
import React from 'react';
import { Product } from '../types';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onUnpin: (value: TData) => void;
  onPin: (value: TData) => void;
}

const DataTableRowActions = <TData,>({
  row,
  onUnpin,
  onPin,
}: DataTableRowActionsProps<TData>) => {
  const product = row.original as Product;
  return (
    <>
      {product.isPinned ? (
        <Button
          className="flex h-8 w-16 p-0 data-[state=open]:bg-muted"
          onClick={() => onUnpin(row.original)}
        >
          Unpin
        </Button>
      ) : (
        <Button
          className="flex h-8 w-16 p-0 data-[state=open]:bg-muted"
          onClick={() => onPin(row.original)}
        >
          Pin
        </Button>
      )}
    </>
  );
};

export default DataTableRowActions;
