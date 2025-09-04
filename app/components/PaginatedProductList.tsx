'use client';

import { useState, useEffect } from 'react';
import { getProducts } from '@/lib/actions/products';
import Link from 'next/link';
import Image from 'next/image';
import LoadingSpinner from './LoadingSpinner';
import { InferSelectModel } from 'drizzle-orm';
import { products, brands, sizes } from '@/db/schema';

type Product = InferSelectModel<typeof products> & {
  brand: InferSelectModel<typeof brands> | null;
  sizes: { size: InferSelectModel<typeof sizes> }[];
};

interface PaginatedProductListProps {
  initialProducts: Product[];
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function PaginatedProductList({ initialProducts, searchParams }: PaginatedProductListProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [offset, setOffset] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialProducts.length === 8);

  const loadMoreProducts = async () => {
    setIsLoading(true);
    const newProducts = await getProducts({ ...searchParams, offset: String(offset), limit: '8' });
    setProducts(prevProducts => [...prevProducts, ...newProducts]);
    setOffset(prevOffset => prevOffset + 8);
    setHasMore(newProducts.length === 8);
    setIsLoading(false);
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id} className="group block">
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-blue-200">
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  {product.brand?.name && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700 shadow-sm">
                        {product.brand.name}
                      </span>
                    </div>
                  )}
                  {product.price && Number(product.price) > 0 && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-lg">
                        {Number(product.price).toLocaleString()}₮
                      </span>
                    </div>
                  )}
                  <Image
                    src={product.mainImageUrl ?? '/placeholder.png'}
                    alt={product.title ?? 'Product image'}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                      <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Үзэх
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                    {product.title}
                  </h3>
                  {product.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  {product.price && Number(product.price) > 0 && (
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-gray-900">
                          {Number(product.price).toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-600 font-medium">₮</span>
                      </div>
                    </div>
                  )}
                  {(!product.price || Number(product.price) === 0) && (
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                          Дэлгэрэнгүй үзэх
                        </span>
                        <div className="w-8 h-8 bg-gray-50 group-hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors duration-300">
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        {hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={loadMoreProducts}
              disabled={isLoading}
              className="inline-flex items-center gap-2 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-md disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  <span>Ачааллаж байна...</span>
                </>
              ) : (
                <>
                  <span>Илүү ихийг үзэх</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
