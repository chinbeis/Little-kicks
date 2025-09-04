import ProductList from '@/app/components/ProductList';
import ProductFilters from '@/app/components/ProductFilters';
import { Suspense } from 'react';
import LoadingSpinner from '@/app/components/LoadingSpinner';

export default function BestsellersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const bestsellersSearchParams = { ...searchParams, section: 'bestseller' };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Bestsellers</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <ProductFilters />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <ProductList searchParams={bestsellersSearchParams} />
      </Suspense>
    </div>
  );
}
