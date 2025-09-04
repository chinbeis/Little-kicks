import { pgTable, serial, text, integer, timestamp, decimal } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const brands = pgTable('brands', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }),
  mainImageUrl: text('main_image_url'),
  brandId: integer('brand_id').references(() => brands.id),
  createdAt: timestamp('created_at').defaultNow(),
  body: text('body'),
  section: text('section'),
});

export const productImages = pgTable('product_images', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').references(() => products.id),
  imageUrl: text('image_url').notNull(),
});

export const sizes = pgTable('sizes', {
  id: serial('id').primaryKey(),
  size: text('size').notNull().unique(),
});

export const productSizes = pgTable('product_sizes', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').references(() => products.id),
  sizeId: integer('size_id').references(() => sizes.id),
});

export const brandRelations = relations(brands, ({ one }) => ({
  product: one(products, {
    fields: [brands.id],
    references: [products.brandId],
  }),
}));

export const productRelations = relations(products, ({ one, many }) => ({
  brand: one(brands, {
    fields: [products.brandId],
    references: [brands.id],
  }),
  images: many(productImages),
  sizes: many(productSizes),
}));

export const productImageRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));

export const sizeRelations = relations(sizes, ({ many }) => ({
  products: many(productSizes),
}));

export const productSizeRelations = relations(productSizes, ({ one }) => ({
  product: one(products, {
    fields: [productSizes.productId],
    references: [products.id],
  }),
  size: one(sizes, {
    fields: [productSizes.sizeId],
    references: [sizes.id],
  }),
}));
