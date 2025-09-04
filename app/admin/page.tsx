import { getProducts } from '@/lib/actions/products';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';
import AdminProductList from './AdminProductList';

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
      <AdminProductList products={products} />
    </div>
  );
}
