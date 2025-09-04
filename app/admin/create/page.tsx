import AdminForm from '@/app/components/AdminForm';

export default function CreateProductPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Create Product</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <AdminForm />
      </div>
    </div>
  );
}
