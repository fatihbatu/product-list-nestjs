'use client';
import { PinCard } from './../components/PinCard';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/app/ui/button';
import { getProductsColumns } from './columns';
import { DataTable } from './data-table';
import { Product, Modal } from '@/app/types';
import { useProducts, useSortedProducts } from '../services/queries';
import { usePinProduct, useUnpinProduct } from '../services/mutations';
import toast from 'react-hot-toast';

const Products = () => {
  const { data, isValidating, isLoading: isLoadingProducts } = useProducts();
  const {
    data: sortedData,
    isValidating: isSortedValidating,
    isLoading: isSortedLoading,
  } = useSortedProducts();

  const { trigger: pinTrigger, isMutating: isPinMutating } = usePinProduct();
  const { trigger: unpinTrigger, isMutating: isUnpinMutating } =
    useUnpinProduct();

  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [modal, setModal] = useState<Modal>({
    isVisible: false,
    product: null,
    position: '',
  });

  const pinMutation = async (product: Product, position: string) => {
    pinTrigger(
      { position: Number(position), productId: product.id },
      {
        optimisticData: data && [...data, product],
        rollbackOnError: true,
      },
    );
    setModal({ isVisible: false, product: null, position: '' });
    toast.success(`${product.sku} pinned successfully`);
  };

  const unPinMutation = async (unPinnedProduct: Product) => {
    unpinTrigger(
      {
        productId: unPinnedProduct.id,
      },
      {
        optimisticData:
          data && data.filter((product) => product.id !== unPinnedProduct.id),
        rollbackOnError: true,
      },
    );
    setModal({ isVisible: false, product: null, position: '' });
  };

  const getUnoccupiedPositions = () => {
    if (!data) return [];
    const pinnedPositions = data.map((product: Product) => product.pinPosition);

    const allPositions = Array.from({ length: data.length }, (_, i) => i + 1);

    const filteredPositions = allPositions.filter(
      (position) => !pinnedPositions.includes(position),
    );

    return filteredPositions.map((position) => String(position));
  };

  const toggleSorting = () => {
    setIsSorting((prevSorting) => !prevSorting);
  };

  const onUnpin = (product: Product) => {
    unPinMutation(product);
    toast.success(`${product.sku} unpinned successfully`);
  };

  const onPin = (product: Product) => {
    setModal({ isVisible: true, product, position: '' });
  };

  const handleFieldValue = (value: string) => {
    const parsedValue = JSON.parse(value);
    setModal((prevModal) => ({
      ...prevModal,
      position: parsedValue,
    }));
  };

  const columns = useMemo(() => getProductsColumns({ onUnpin, onPin }), []);
  const unoccupiedPositions = useMemo(getUnoccupiedPositions, [data]);

  return (
    <>
      <div className="flex justify-start px-16 py-8">
        <a href="/">
          <Button className="font-bold">Back</Button>
        </a>
      </div>
      <h1 className="text-2xl font-bold text-center mb-4">Products</h1>
      <section className="container mx-auto my-12 p-8 border border-gray-500 rounded-lg shadow-lg">
        {isValidating ||
        isLoadingProducts ||
        isSortedValidating ||
        isSortedLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <PinCard
              modal={modal}
              setModal={setModal}
              handleFieldValue={handleFieldValue}
              pinMutation={pinMutation}
              unoccupiedPositions={unoccupiedPositions}
            />
            <div className="flex flex-col items-end justify-center w-full flex-1 py-2 text-center">
              <Button onClick={toggleSorting}>
                {isSorting ? 'Unsort' : 'Sort by price'}
              </Button>
            </div>
            <DataTable
              columns={columns}
              data={(isSorting ? sortedData : data) || []}
            />
          </>
        )}
      </section>
    </>
  );
};

export default Products;
