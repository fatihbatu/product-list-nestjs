export type Product = {
  id: number;
  name: string;
  price: number;
  sku: string;
  stock: number;
  isPinned: boolean;
  pinPosition: number | null;
};

export type Modal = {
  isVisible: boolean;
  product: Product | null;
  position: string;
};
