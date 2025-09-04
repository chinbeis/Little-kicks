'use server';

import { db } from '@/lib/db';
import { products, brands, productImages, sizes, productSizes } from '@/db/schema';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { eq, and, ilike, inArray, desc } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export type ProductData = {
  title: string;
  description: string;
  price?: number;
  mainImage: File | null;
  brandName: string;
  images: File[];
  sizes: string[];
  body: string;
  section: string;
};

export async function createProduct(data: ProductData) {
  const supabase = await createClient();
  const { mainImage, images, ...rest } = data;

  if (!mainImage) {
    throw new Error('Main image is required.');
  }

  const allImages = [mainImage, ...images];
  const uploadPromises = allImages.map(image => {
    const imagePath = `public/${Date.now()}-${Math.random()}-${image.name}`;
    return supabase.storage.from('product-images').upload(imagePath, image).then(result => {
      if (result.error) {
        throw new Error(`Failed to upload image: ${result.error.message}`);
      }
      return supabase.storage.from('product-images').getPublicUrl(imagePath).data.publicUrl;
    });
  });

  const [mainImageUrl, ...imageUrls] = await Promise.all(uploadPromises);

  const productData = {
    ...rest,
    mainImageUrl,
    imageUrls,
  };

  // Save product to the database
  const newBrand = await db.insert(brands).values({ name: productData.brandName }).returning();
  const newProduct = await db.insert(products).values({
    title: productData.title,
    description: productData.description,
    price: productData.price ? String(productData.price) : null,
    mainImageUrl: productData.mainImageUrl,
    brandId: newBrand[0].id,
    body: productData.body,
    section: productData.section,
  }).returning();

  await db.insert(productImages).values(productData.imageUrls.map(url => ({
    productId: newProduct[0].id,
    imageUrl: url,
  })));

  for (const size of data.sizes) {
    const existingSize = await db.query.sizes.findFirst({ where: eq(sizes.size, size) });
    if (existingSize) {
      await db.insert(productSizes).values({
        productId: newProduct[0].id,
        sizeId: existingSize.id,
      });
    } else {
      const newSize = await db.insert(sizes).values({ size }).returning();
      await db.insert(productSizes).values({
        productId: newProduct[0].id,
        sizeId: newSize[0].id,
      });
    }
  }

  revalidatePath('/');
  revalidatePath('/admin');

  return { success: true };
}

export async function getProducts(
  searchParams: { [key: string]: string | string[] | undefined } = {}
) {
  const limit = Number(searchParams.limit) || 8;
  const offset = Number(searchParams.offset) || 0;

  const conditions = [];
  
  // Search by title
  if (searchParams.search) {
    conditions.push(ilike(products.title, `%${searchParams.search}%`));
  }
  
  // Filter by brand
  if (searchParams.brand) {
    conditions.push(eq(brands.name, searchParams.brand as string));
  }
  
  // Filter by section
  if (searchParams.section && searchParams.section !== 'all') {
    conditions.push(eq(products.section, searchParams.section as string));
  }

  // First, get the products with their brands (without sizes to avoid duplication)
  let productsQuery = db
    .select({
      id: products.id,
      title: products.title,
      description: products.description,
      price: products.price,
      mainImageUrl: products.mainImageUrl,
      section: products.section,
      createdAt: products.createdAt,
      brand: brands,
    })
    .from(products)
    .leftJoin(brands, eq(products.brandId, brands.id))
    .orderBy(desc(products.createdAt));

  // Apply conditions
  if (conditions.length > 0) {
    productsQuery.where(and(...conditions));
  }

  // Handle size filtering separately if needed
  if (searchParams.size) {
    const productsWithSize = await db
      .select({
        productId: productSizes.productId,
      })
      .from(productSizes)
      .leftJoin(sizes, eq(productSizes.sizeId, sizes.id))
      .where(eq(sizes.size, searchParams.size as string));
    
    const productIds = productsWithSize.map(p => p.productId);
    if (productIds.length > 0) {
      conditions.push(inArray(products.id, productIds as number[]));
      productsQuery.where(and(...conditions));
    } else {
      // No products with this size, return empty array
      return [];
    }
  }

  // Apply limit and offset
  const productsResult = await productsQuery.limit(limit).offset(offset);

  // If no products found, return empty array
  if (productsResult.length === 0) {
    return [];
  }

  // Get all product IDs
  const productIds = productsResult.map(p => p.id);

  // Get sizes for these products
  const sizesResult = await db
    .select({
      productId: productSizes.productId,
      size: sizes,
    })
    .from(productSizes)
    .leftJoin(sizes, eq(productSizes.sizeId, sizes.id))
    .where(inArray(productSizes.productId, productIds as number[]));

  // Group sizes by product ID
  const sizesByProduct = new Map();
  sizesResult.forEach((row) => {
    if (!sizesByProduct.has(row.productId)) {
      sizesByProduct.set(row.productId, []);
    }
    if (row.size) {
      sizesByProduct.get(row.productId).push({ size: row.size });
    }
  });

  // Combine products with their sizes
  const finalResult = productsResult.map(product => ({
    ...product,
    sizes: sizesByProduct.get(product.id) || [],
  }));

  console.log(`Fetched ${finalResult.length} products with offset ${offset}`);
  return finalResult;
}

export async function getProductById(id: number) {
  const product = await db.query.products.findFirst({
    where: eq(products.id, id),
    with: {
      brand: true,
      sizes: {
        with: {
          size: true,
        },
      },
      images: true,
    },
  });
  return product;
}

export async function deleteProduct(id: number) {
  await db.delete(productImages).where(eq(productImages.productId, id));
  await db.delete(productSizes).where(eq(productSizes.productId, id));
  await db.delete(products).where(eq(products.id, id));

  revalidatePath('/');
  revalidatePath('/admin');

  return { success: true };
}

export async function updateProduct(id: number, data: ProductData) {
  const supabase = await createClient();
  const { mainImage, images, ...rest } = data;

  let mainImageUrl: string | undefined = undefined;
  let imageUrls: string[] = [];

  const allImages = [...images];
  if (mainImage) {
    allImages.unshift(mainImage);
  }

  if (allImages.length > 0) {
    const uploadPromises = allImages.map(image => {
      const imagePath = `public/${Date.now()}-${Math.random()}-${image.name}`;
      return supabase.storage.from('product-images').upload(imagePath, image).then(result => {
        if (result.error) {
          throw new Error(`Failed to upload image: ${result.error.message}`);
        }
        return supabase.storage.from('product-images').getPublicUrl(imagePath).data.publicUrl;
      });
    });

    const uploadedUrls = await Promise.all(uploadPromises);
    
    if (mainImage) {
      mainImageUrl = uploadedUrls[0];
      imageUrls = uploadedUrls.slice(1);
    } else {
      imageUrls = uploadedUrls;
    }
  }

  const productData = {
    ...rest,
    mainImageUrl,
    imageUrls,
  };

  // Save product to the database
  const updatedBrand = await db.insert(brands).values({ name: productData.brandName }).returning();
  await db.update(products).set({
    title: productData.title,
    description: productData.description,
    price: productData.price ? String(productData.price) : null,
    mainImageUrl: productData.mainImageUrl,
    brandId: updatedBrand[0].id,
    body: productData.body,
    section: productData.section,
  }).where(eq(products.id, id));

  if (productData.imageUrls.length > 0) {
    await db.delete(productImages).where(eq(productImages.productId, id));
    await db.insert(productImages).values(productData.imageUrls.map(url => ({
      productId: id,
      imageUrl: url,
    })));
  }

  await db.delete(productSizes).where(eq(productSizes.productId, id));
  for (const size of data.sizes) {
    const existingSize = await db.query.sizes.findFirst({ where: eq(sizes.size, size) });
    if (existingSize) {
      await db.insert(productSizes).values({
        productId: id,
        sizeId: existingSize.id,
      });
    } else {
      const newSize = await db.insert(sizes).values({ size }).returning();
      await db.insert(productSizes).values({
        productId: id,
        sizeId: newSize[0].id,
      });
    }
  }

  revalidatePath('/');
  revalidatePath(`/products/${id}`);
  revalidatePath('/admin');

  return { success: true };
}
