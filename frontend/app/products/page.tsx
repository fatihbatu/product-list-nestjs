'use client';
import { FilterBoard } from '../FilterBoard';
import { PinCard } from '../components/PinCard';
import { useMemo, useState } from 'react';
import { Button } from '@/app/ui/button';
import { getProductsColumns } from './columns';
import { DataTable } from './data-table';
import { Product, Modal } from '@/app/types';
import {
  useGetProductsQuery,
  usePinProductMutation,
  useUnPinProductMutation,
} from '../features/product/api/apiSlice';
import { Switch } from '../ui/switch';

const Home = () => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [isStockFilter, setIsStockFilter] = useState<boolean>(false);
  const [query, setQuery] = useState<{
    sort?: string;
    stock?: boolean;
    minPrice?: number;
    maxPrice?: number;
  }>({
    sort: '',
    stock: false,
    minPrice: 0,
    maxPrice: undefined,
  });
  const {
    isError: error,
    isLoading: loading,
    isSuccess: success,
    data: products,
    refetch,
  } = useGetProductsQuery({ ...query }, { refetchOnMountOrArgChange: true });

  const [pinProduct] = usePinProductMutation();
  const [unPinProduct] = useUnPinProductMutation();

  const [modal, setModal] = useState<Modal>({
    isVisible: false,
    product: null,
    position: '',
  });

  const getUnoccupiedPositions = () => {
    if (!products) return [];
    const pinnedPositions = products.map(
      (product: Product) => product.pinPosition,
    );

    const allPositions = Array.from(
      { length: products.length },
      (_, i) => i + 1,
    );

    const filteredPositions = allPositions.filter(
      (position) => !pinnedPositions.includes(position),
    );

    return filteredPositions.map((position) => String(position));
  };

  const toggleSorting = () => {
    // refetch({ sort: !isSorting, minPrice, maxPrice });
    setIsSorting((prevSorting) => !prevSorting);
  };

  const onPin = (product: Product) => {
    setModal({ isVisible: true, product, position: '' });
  };

  const onUnpin = (product: Product) => {
    unPinProduct(product.id);
  };

  const handleFieldValue = (value: string) => {
    const parsedValue = JSON.parse(value);
    setModal((prevModal) => ({
      ...prevModal,
      position: parsedValue,
    }));
  };

  const handlePinProduct = (productId: number, position: number) => {
    pinProduct({ productId: productId, position: position });
    setModal({ isVisible: false, product: null, position: '' });
  };

  const handleFilterChange = () => {
    setQuery({
      sort: isSorting ? 'price' : '',
      stock: isStockFilter,
      minPrice,
      maxPrice,
    });
  };

  const columns = useMemo(() => getProductsColumns({ onUnpin, onPin }), []);
  const unoccupiedPositions = useMemo(getUnoccupiedPositions, [products]);

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-4">Products</h1>
      <section className="container mx-auto my-12 p-8 border border-gray-500 rounded-lg shadow-lg">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error || 'Unknown error'}</p>
        ) : (
          <>
            <PinCard
              modal={modal}
              setModal={setModal}
              handleFieldValue={handleFieldValue}
              pinMutation={handlePinProduct}
              unoccupiedPositions={unoccupiedPositions}
            />
            <FilterBoard
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              isStockFilter={isStockFilter}
              setIsStockFilter={setIsStockFilter}
              isSorting={isSorting}
              setIsSorting={setIsSorting}
              handleFilterChange={handleFilterChange}
            />
            <div className=" h-2 rounded-full mb-4 bg-gray-500"></div>
            <DataTable columns={columns} data={products || []} />
          </>
        )}
      </section>
    </>
  );
};

export default Home;
