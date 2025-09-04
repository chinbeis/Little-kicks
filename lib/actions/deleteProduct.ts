'use server';

import { deleteProduct as deleteProductFromDb } from '@/lib/actions/products';

export async function deleteProduct(id: number) {
  await deleteProductFromDb(id);
}
