'use server';

import { db } from '@/lib/db';
import { products, brands, productImages, sizes, productSizes } from '@/db/schema';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { eq, and, ilike, inArray } from 'drizzle-orm';

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

  // Upload main image
  const mainImagePath = `public/${mainImage.name}-${Date.now()}`;
  const { data: mainImageData, error: mainImageError } = await supabase.storage
    .from('product-images')
    .upload(mainImagePath, mainImage);

  if (mainImageError) {
    throw new Error(`Failed to upload main image: ${mainImageError.message}`);
  }

  // Upload additional images
  const imageUrls = await Promise.all(
    images.map(async (image) => {
      const imagePath = `public/${image.name}-${Date.now()}`;
      const { data: imageData, error: imageError } = await supabase.storage
        .from('product-images')
        .upload(imagePath, image);

      if (imageError) {
        throw new Error(`Failed to upload image: ${imageError.message}`);
      }
      return supabase.storage.from('product-images').getPublicUrl(imagePath).data.publicUrl;
    })
  );

  const productData = {
    ...rest,
    mainImageUrl: supabase.storage.from('product-images').getPublicUrl(mainImagePath).data.publicUrl,
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
  const query = db
    .select({
      id: products.id,
      title: products.title,
      description: products.description,
      price: products.price,
      mainImageUrl: products.mainImageUrl,
      brand: brands,
      sizes: sizes,
      section: products.section,
    })
    .from(products)
    .leftJoin(brands, eq(products.brandId, brands.id))
    .leftJoin(productSizes, eq(products.id, productSizes.productId))
    .leftJoin(sizes, eq(productSizes.sizeId, sizes.id));

  const conditions = [];

  if (searchParams.search) {
    conditions.push(ilike(products.title, `%${searchParams.search}%`));
  }
  if (searchParams.brand) {
    conditions.push(eq(brands.name, searchParams.brand as string));
  }
  if (searchParams.size) {
    conditions.push(eq(sizes.size, searchParams.size as string));
  }
  if (searchParams.section) {
    conditions.push(eq(products.section, searchParams.section as string));
  }

  if (conditions.length > 0) {
    query.where(and(...conditions));
  }

  const result = await query.execute();

  // Group sizes per product
  const productMap = new Map();
  result.forEach((row) => {
    if (!productMap.has(row.id)) {
      productMap.set(row.id, {
        ...row,
        sizes: [],
      });
    }
    if (row.sizes) {
      productMap.get(row.id).sizes.push(row.sizes);
    }
  });

  return Array.from(productMap.values());
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

  if (mainImage) {
    // Upload main image
    const mainImagePath = `public/${mainImage.name}-${Date.now()}`;
    const { data: mainImageData, error: mainImageError } = await supabase.storage
      .from('product-images')
      .upload(mainImagePath, mainImage);

    if (mainImageError) {
      throw new Error(`Failed to upload main image: ${mainImageError.message}`);
    }
    mainImageUrl = supabase.storage.from('product-images').getPublicUrl(mainImagePath).data.publicUrl;
  }

  // Upload additional images
  const imageUrls = await Promise.all(
    images.map(async (image) => {
      const imagePath = `public/${image.name}-${Date.now()}`;
      const { data: imageData, error: imageError } = await supabase.storage
        .from('product-images')
        .upload(imagePath, image);

      if (imageError) {
        throw new Error(`Failed to upload image: ${imageError.message}`);
      }
      return supabase.storage.from('product-images').getPublicUrl(imagePath).data.publicUrl;
    })
  );

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
