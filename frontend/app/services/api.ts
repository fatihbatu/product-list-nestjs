import { axiosInstance } from '@/app/services/fetcher';

export const pinProduct = async (
  url: string,
  { arg }: { arg: { position: number; productId: number } },
) => {
  await axiosInstance.put(`${url}/${arg.productId}`, {
    position: arg.position,
  });
};

export const unpinProduct = async (
  url: string,
  { arg }: { arg: { productId: number } },
) => {
  await axiosInstance.put(`${url}/${arg.productId}`);
};

export const seedProduct = async (url: string) => {
  await axiosInstance.post(url);
};
