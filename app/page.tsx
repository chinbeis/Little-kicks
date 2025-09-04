import ProductList from '@/app/components/ProductList';
import { getProducts } from '@/lib/actions/products';
import Hero from '@/app/components/Hero';
import Bestsellers from '@/app/components/Bestsellers';
import NewCollection from '@/app/components/NewCollection';
import BrandsSection from '@/app/components/BrandsSection';
import { Suspense } from 'react';
import Link from 'next/link';
import LoadingSpinner from '@/app/components/LoadingSpinner';

export default async function HomePage() {
  const products = await getProducts({ limit: '4' });

  return (
    <div>
      <Hero />
      <div className="grid grid-cols-1 md:grid-cols-2">
        <Bestsellers />
        <NewCollection />
      </div>
      <div className="container mx-auto p-4">
        <Suspense fallback={<LoadingSpinner />}>
          <ProductList products={products} />
        </Suspense>
        <div className="text-center mt-8">
          <Link
            href="/products"
            className="inline-block bg-gray-900 text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-colors"
          >
            Бүх бүтээгдэхүүн
          </Link>
        </div>
      </div>
      <BrandsSection />
    </div>
  );
}
