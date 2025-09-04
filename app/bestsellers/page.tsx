import ProductFilters from '@/app/components/ProductFilters';
import { Suspense } from 'react';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import ProductsContainer from '@/app/components/ProductsContainer';

export default async function BestsellersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Await searchParams first
  const resolvedSearchParams = await searchParams;
  
  const bestsellersSearchParams = { 
    ...resolvedSearchParams, 
    section: 'bestsellers', 
    limit: '8' 
  };
  
  // Create a serializable version for client components
  const serializableSearchParams = JSON.parse(JSON.stringify(bestsellersSearchParams));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Bestsellers</h1>
      
      <Suspense fallback={<LoadingSpinner />}>
        <ProductFilters />
      </Suspense>
      
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductsContainer searchParams={serializableSearchParams} />
      </Suspense>
    </div>
  );
}

function ProductListSkeleton() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
              <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse">
                {/* Brand placeholder */}
                <div className="absolute top-3 left-3">
                  <div className="h-6 w-16 bg-white/60 rounded-full animate-pulse"></div>
                </div>
                {/* Price placeholder */}
                <div className="absolute top-3 right-3">
                  <div className="h-6 w-20 bg-blue-200 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="p-5">
                {/* Title placeholder */}
                <div className="space-y-2 mb-2">
                  <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </div>
                {/* Description placeholder */}
                <div className="space-y-2 mb-3">
                  <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                </div>
                {/* Price section placeholder */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-baseline gap-1">
                    <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Load more button skeleton */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 h-12 w-40 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
