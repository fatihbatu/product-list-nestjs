'use client';

import { useSeedProduct } from './services/mutations';
import { useProducts } from './services/queries';
import { Button } from './ui/button';

export default function Home() {
  const { data, isValidating, isLoading: isLoadingProducts } = useProducts();
  const { trigger: seedTrigger } = useSeedProduct();
  return (
    <section className="flex flex-col items-center justify-start h-screen w-full shadow-sm bg-white p-16">
      <div
        style={{
          flex: 1,
        }}
        className="flex flex-col justify-center w-full h-full"
      >
        <h1 className="text-4xl font-bold text-center text-black">
          Welcome to the Product Demo App
        </h1>
      </div>
      <div
        style={{
          flex: 1,
        }}
        className="flex flex-col justify-center w-full h-full"
      >
        <div className="flex flex-row justify-center w-full h-full space-x-4">
          <Button
            className="bg-[#03045e] hover:bg-[#02098a] text-white font-bold p-16 rounded-md w-full h-full"
            onClick={() => seedTrigger()}
            disabled={data && data.length > 0}
          >
            {data && data.length > 0
              ? 'Database Seeded Successfully!'
              : 'Seed Database'}
          </Button>
          <a className="w-full h-full" href="/products">
            <Button className="bg-[#03045e] hover:bg-[#02098a] text-white font-bold p-16 rounded-md w-full h-full">
              Go to Products
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
