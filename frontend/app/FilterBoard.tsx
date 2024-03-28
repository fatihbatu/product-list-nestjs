import { Button } from './ui/button';
import { Switch } from './ui/switch';

export function FilterBoard({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  isStockFilter,
  setIsStockFilter,
  isSorting,
  setIsSorting,
  handleFilterChange,
}: {
  minPrice: number;
  setMinPrice: (value: number) => void;
  maxPrice: number | undefined;
  setMaxPrice: (value: number) => void;
  isStockFilter: boolean;
  setIsStockFilter: (value: boolean) => void;
  isSorting: boolean;
  setIsSorting: (value: boolean) => void;
  handleFilterChange: () => void;
}) {
  return (
    <div className="flex justify-end items-center gap-4 mb-8">
      <p className="text-lg font-bold">Filter&Sort Options</p>
      <div className="flex sm:flex-row flex-col sm:justify-start gap-4 border border-gray-500 rounded-md p-4 w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-sm">Sort by price:</p>
          <div className="flex gap-4">
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <p className="text-sm">Min:</p>
              </div>
              <input
                className="w-16 h-8 pl-2 border border-gray-500 ring-1 ring-gray-500 rounded-md"
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <p className="text-sm">Max:</p>
              </div>
              <input
                className="w-16 h-8 pl-2 border border-gray-500 ring-1 ring-gray-500 rounded-md"
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
        <div className="border border-gray-500 h-4"></div>
        <div className="flex items-center gap-4">
          <p className="text-sm">
            Filter by stock availability
            <span className="text-xs">(in stock)</span>:
          </p>
          <Switch
            checked={isStockFilter}
            onClick={() => setIsStockFilter((prev) => !prev)}
          />
        </div>
        <div className="border border-gray-500 h-4"></div>
        <div className="flex items-center gap-4">
          <p className="text-sm">Sort by price :</p>
          <Switch
            checked={isSorting}
            onClick={() => setIsSorting((prev) => !prev)}
          />
        </div>
      </div>
      <Button onClick={handleFilterChange}>Filter</Button>
    </div>
  );
}
