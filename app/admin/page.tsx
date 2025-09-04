import { getProducts } from '@/lib/actions/products';
import { deleteProduct } from '@/lib/actions/deleteProduct';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';

interface SessionData {
  isLoggedIn?: boolean;
}

export default async function AdminPage() {
  noStore();
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    redirect('/login');
  }

  const products = await getProducts();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link href="/admin/create">
          <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800">
            Create Product
          </button>
        </Link>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-gray-600">{product.brand?.name}</p>
              </div>
              <div className="flex space-x-2">
                <Link href={`/admin/edit/${product.id}`}>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Edit
                  </button>
                </Link>
                <form
                  action={deleteProduct.bind(null, product.id)}
                >
                  <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
