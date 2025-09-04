import { getProducts } from '@/lib/actions/products';
import PaginatedProductList from '@/app/components/PaginatedProductList';

type Product = Awaited<ReturnType<typeof getProducts>>[0];

interface ProductsContainerProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ProductsContainer({ searchParams }: ProductsContainerProps) {
  const initialProducts = await getProducts(searchParams);

  if (initialProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-2">Бүтээгдэхүүн олдсонгүй</h2>
        <p className="text-gray-600">Таны хайлтад тохирох бүтээгдэхүүн олдсонгүй.</p>
      </div>
    );
  }
  
  return (
    <PaginatedProductList 
      initialProducts={initialProducts as Product[]} 
      searchParams={searchParams} 
    />
  );
}
