CREATE TABLE "product_sizes" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer,
	"size_id" integer
);
--> statement-breakpoint
ALTER TABLE "sizes" DROP CONSTRAINT "sizes_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "product_sizes" ADD CONSTRAINT "product_sizes_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_sizes" ADD CONSTRAINT "product_sizes_size_id_sizes_id_fk" FOREIGN KEY ("size_id") REFERENCES "public"."sizes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sizes" DROP COLUMN "product_id";--> statement-breakpoint
ALTER TABLE "sizes" ADD CONSTRAINT "sizes_size_unique" UNIQUE("size");