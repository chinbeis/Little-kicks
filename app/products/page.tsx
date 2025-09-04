import ProductList from '@/app/components/ProductList';
import ProductFilters from '@/app/components/ProductFilters';
import { Suspense } from 'react';
import LoadingSpinner from '@/app/components/LoadingSpinner';

export default async function AllProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Бүх бүтээгдэхүүн</h1>

      <Suspense fallback={<LoadingSpinner />}>
        <ProductFilters />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <ProductList searchParams={resolvedSearchParams} />
      </Suspense>
    </div>
  );
}
