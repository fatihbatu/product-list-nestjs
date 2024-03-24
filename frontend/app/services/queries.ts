import useSWR from 'swr';
import { Product } from '@/app/types';

export function useProducts() {
  return useSWR<Product[]>('/products');
}
export function useSortedProducts() {
  return useSWR<Product[]>('/products?sort=price');
}
