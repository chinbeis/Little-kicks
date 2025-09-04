'use client';

import { useState } from 'react';
import Link from 'next/link';
import { deleteProduct } from '@/lib/actions/deleteProduct';

// This is an inferred type based on usage in the admin page.
// It should be compatible with the data returned from getProducts().
interface Product {
  id: number;
  title: string | null;
  brand: {
    name: string | null;
  } | null;
}

interface AdminProductListProps {
  products: Product[];
}

export default function AdminProductList({ products }: AdminProductListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((product) =>
    product.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="block w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="space-y-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg grid grid-cols-[1fr_auto] items-center gap-4">
            <div className="min-w-0">
              <h3 className="text-lg font-semibold truncate">{product.title}</h3>
              <p className="text-gray-600 truncate">{product.brand?.name}</p>
            </div>
            <div className="flex space-x-2 flex-shrink-0">
              <Link href={`/admin/edit/${product.id}`}>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Edit
                </button>
              </Link>
              <form action={deleteProduct.bind(null, product.id)}>
                <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
