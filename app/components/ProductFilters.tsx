'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';

export default function ProductFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [brands, setBrands] = useState<{ id: number; name: string }[]>([]);
  const [sizes, setSizes] = useState<{ id: number; size: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  useEffect(() => {
    async function fetchData() {
      try {
        const brandsRes = await fetch('/api/brands');
        if (brandsRes.ok) {
          const brandsData = await brandsRes.json();
          setBrands(brandsData);
        } else {
          console.error('Failed to fetch brands');
        }

        const sizesRes = await fetch('/api/sizes');
        if (sizesRes.ok) {
          const sizesData = await sizesRes.json();
          setSizes(sizesData);
        } else {
          console.error('Failed to fetch sizes');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const handleFilterChange = (filterName: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(filterName, value);
    } else {
      params.delete(filterName);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      handleFilterChange('search', value);
    }, 500),
    [searchParams.toString()]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    router.push(pathname);
  };

  const hasActiveFilters = searchParams.get('search') || searchParams.get('brand') || searchParams.get('size');

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-8 transition-all duration-200 hover:shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Хайх</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
          >
            Арилгах
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Search Input */}
        <div className="relative">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Бараа Хайх
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              id="search"
              name="search"
              className="block w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 focus:bg-white"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Бараа хайх..."
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  handleFilterChange('search', '');
                }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg className="h-4 w-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Brand Filter */}
        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
            Brand
          </label>
          <div className="relative">
            <select
              id="brand"
              name="brand"
              className="block w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 focus:bg-white appearance-none cursor-pointer"
              onChange={(e) => handleFilterChange('brand', e.target.value)}
              defaultValue={searchParams.get('brand') || ''}
            >
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.name}>
                  {brand.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Size Filter */}
        <div>
          <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
            Размер
          </label>
          <div className="relative">
            <select
              id="size"
              name="size"
              className="block w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 focus:bg-white appearance-none cursor-pointer"
              onChange={(e) => handleFilterChange('size', e.target.value)}
              defaultValue={searchParams.get('size') || ''}
            >
              <option value="">Бүх Размер</option>
              {sizes.map((size) => (
                <option key={size.id} value={size.size}>
                  {size.size}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {searchParams.get('search') && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                Хайлт: {searchParams.get('search')}
                <button
                  onClick={() => {
                    setSearchTerm('');
                    handleFilterChange('search', '');
                  }}
                  className="ml-1 hover:text-indigo-600"
                >
                  ×
                </button>
              </span>
            )}
            {searchParams.get('brand') && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                Брэнд: {searchParams.get('brand')}
                <button
                  onClick={() => handleFilterChange('brand', '')}
                  className="ml-1 hover:text-indigo-600"
                >
                  ×
                </button>
              </span>
            )}
            {searchParams.get('size') && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                Хэмжээ: {searchParams.get('size')}
                <button
                  onClick={() => handleFilterChange('size', '')}
                  className="ml-1 hover:text-indigo-600"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}