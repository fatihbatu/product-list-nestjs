import { pinProduct, unpinProduct } from '@/app/services/api';
import { useProducts, useSortedProducts } from '@/app/services/queries';
import useSWRMutation from 'swr/mutation';

export function usePinProduct() {
  const { mutate } = useProducts();
  const { mutate: sortMutate } = useSortedProducts();

  return useSWRMutation(`/products/pin`, pinProduct, {
    onError() {
      console.error('error');
    },
    onSuccess: () => {
      mutate();
      sortMutate();
    },
  });
}

export function useUnpinProduct() {
  const { mutate } = useProducts();
  const { mutate: sortMutate } = useSortedProducts();

  return useSWRMutation(`/products/unpin`, unpinProduct, {
    onError() {
      console.error('error');
    },
    onSuccess: () => {
      mutate();
      sortMutate();
    },
  });
}
