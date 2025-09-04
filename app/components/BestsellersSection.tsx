import ProductList from '@/app/components/ProductList';
import { Suspense } from 'react';
import LoadingSpinner from '@/app/components/LoadingSpinner';

export default function BestsellersSection() {
  const searchParams = { section: 'bestseller', limit: '4' };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Шилдэг борлуулалттай</h2>
      <Suspense fallback={<LoadingSpinner />}>
        <ProductList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
