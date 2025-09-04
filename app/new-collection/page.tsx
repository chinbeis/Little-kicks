import ProductList from '@/app/components/ProductList';
import ProductFilters from '@/app/components/ProductFilters';
import { Suspense } from 'react';
import LoadingSpinner from '@/app/components/LoadingSpinner';

export default async function NewCollectionPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const newCollectionSearchParams = { ...searchParams, section: 'new' };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">New Collection</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <ProductFilters />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <ProductList searchParams={newCollectionSearchParams} />
      </Suspense>
    </div>
  );
}
