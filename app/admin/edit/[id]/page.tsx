import { getProductById } from '@/lib/actions/products';
import EditForm from '@/app/components/EditForm';
import { products, brands, sizes } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';

type Product = InferSelectModel<typeof products> & {
  brand: InferSelectModel<typeof brands> | null;
  sizes: { size: { id: number; size: string } }[];
  body: string | null;
};

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(Number(params.id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Edit Product {product.title}</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <EditForm product={product as Product} />
      </div>
    </div>
  );
}
