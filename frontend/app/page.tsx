'use client';

import { useSeedProduct } from './services/mutations';
import { useProducts } from './services/queries';
import { Button } from './ui/button';

export default function Home() {
  const { data, isValidating, isLoading: isLoadingProducts } = useProducts();
  const { trigger: seedTrigger } = useSeedProduct();
  return (
    <section className="flex flex-col items-center justify-start h-screen w-full shadow-sm bg-white p-16">
      <div className="flex flex-col justify-center w-full h-full">
        <h1 className="text-4xl font-bold text-center text-black">
          Welcome to
        </h1>
        <h1 className="text-6xl font-bold text-center text-black">
          Product Demo App
        </h1>
      </div>
      <div className="flex flex-col justify-center w-full h-full">
        <div className="flex flex-row justify-center w-full h-full space-x-4">
          <Button
            onClick={() => seedTrigger()}
            disabled={data && data.length > 0}
          >
            {data && data.length > 0
              ? 'Database Seeded Successfully!'
              : 'Seed Database'}
          </Button>
          <a className="" href="/products">
            <Button>Go to Products</Button>
          </a>
        </div>
      </div>
    </section>
  );
}
