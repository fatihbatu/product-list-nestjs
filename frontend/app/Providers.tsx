'use client';
import { ReactNode } from 'react';
import { apiSlice } from './features/product/api/apiSlice';
import { ApiProvider } from '@reduxjs/toolkit/query/react';

export default function Providers({ children }: { children: ReactNode }) {
  return <ApiProvider api={apiSlice}>{children}</ApiProvider>;
}
