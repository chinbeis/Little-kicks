import ProductFilters from '@/app/components/ProductFilters';
import { Suspense } from 'react';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { getProducts } from '@/lib/actions/products';
import PaginatedProductList from '@/app/components/PaginatedProductList';

export default async function AllProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Await searchParams first
  const resolvedSearchParams = await searchParams;
  
  const searchParamsWithLimit = { ...resolvedSearchParams, limit: '8' };
  const initialProducts = await getProducts(searchParamsWithLimit);
  
  // Create a serializable version for client components
  const serializableSearchParams = JSON.parse(JSON.stringify(searchParamsWithLimit));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Бүх бүтээгдэхүүн</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <ProductFilters />
      </Suspense>
      <PaginatedProductList 
        initialProducts={initialProducts} 
        searchParams={serializableSearchParams} 
      />
    </div>
  );
}