import ProductList from '@/app/components/ProductList';
import { Suspense } from 'react';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { getProducts } from '@/lib/actions/products';

export default async function BestsellersSection() {
  const products = await getProducts({ section: 'bestsellers', limit: '4' });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Шилдэг борлуулалттай</h2>
      <Suspense fallback={<LoadingSpinner />}>
        <ProductList products={products} />
      </Suspense>
    </div>
  );
}
