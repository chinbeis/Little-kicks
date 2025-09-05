'use client';

import { useState } from 'react';
import { deleteProduct } from '@/lib/actions/deleteProduct';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface DeleteProductFormProps {
  productId: number;
}

export default function DeleteProductForm({ productId }: DeleteProductFormProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProduct(productId);
      toast.success('Product deleted successfully');
      router.refresh();
    } catch (error) {
      toast.error('Failed to delete product');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleDelete();
      }}
    >
      <button
        type="submit"
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-400"
        disabled={isDeleting}
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    </form>
  );
}
