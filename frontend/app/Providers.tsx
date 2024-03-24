'use client';
import fetcher from '@/app/services/fetcher';
import { ReactNode } from 'react';
import { SWRConfig } from 'swr';

export default function Providers({ children }: { children: ReactNode }) {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
}
