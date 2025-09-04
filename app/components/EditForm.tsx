'use client';

import { useState, useCallback, useRef } from 'react';
import { Upload, X, ImageIcon, Tag, DollarSign, Package, FileText } from 'lucide-react';
import { updateProduct } from '@/lib/actions/products';
import toast from 'react-hot-toast';
import { products, brands, sizes } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';

type Product = InferSelectModel<typeof products> & {
  brand: InferSelectModel<typeof brands> | null;
  sizes: { size: { id: number; size: string } }[];
  body: string | null;
};

export default function EditForm({ product }: { product: Product }) {
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(product.sizes.map(s => s.size.size));
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSizeChange = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleMainImageClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target && target.files && target.files.length > 0) {
        setMainImage(target.files[0]);
      }
    };
    input.click();
  };

  const handleImagesClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target && target.files) {
        const filesArray = Array.from(target.files);
        setImages(filesArray);
      }
    };
    input.click();
  };

  const removeMainImage = () => {
    setMainImage(null);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(event.currentTarget);
    const price = formData.get('price');
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      price: price ? Number(price) : undefined,
      mainImage: mainImage,
      brandName: formData.get('brandName') as string,
      images: images,
      sizes: selectedSizes,
      body: formData.get('body') as string,
      section: formData.get('section') as string,
    };

    try {
      await updateProduct(product.id, data);
      toast.success('Product updated successfully!');
    } catch (error) {
      toast.error('Failed to update product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Edit Product
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Update the details of your product
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-10">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Tag className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="lg:col-span-2">
                    <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                      Product Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      required
                      defaultValue={product.title}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 focus:bg-white"
                      placeholder="Enter product title"
                    />
                  </div>

                  <div>
                    <label htmlFor="brandName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Brand Name
                    </label>
                    <input
                      type="text"
                      name="brandName"
                      id="brandName"
                      defaultValue={product.brand?.name || ''}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 focus:bg-white"
                      placeholder="Brand name"
                    />
                  </div>

                  <div>
                    <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                      Price (MNT)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        MNT
                      </span>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        defaultValue={product.price || ''}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 focus:bg-white"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Sizes (Euro)
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {Array.from({ length: 23 }, (_, i) => i + 20).map((size) => (
                        <button
                          type="button"
                          key={size}
                          onClick={() => handleSizeChange(String(size))}
                          className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                            selectedSizes.includes(String(size))
                              ? 'bg-indigo-600 text-white border-indigo-600'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="section" className="block text-sm font-semibold text-gray-700 mb-2">
                      Section
                    </label>
                    <select
                      name="section"
                      id="section"
                      defaultValue={product.section || ''}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 focus:bg-white"
                    >
                      <option value="bestseller">Bestseller</option>
                      <option value="sale">Sale</option>
                      <option value="new">New</option>
                    </select>
                  </div>

                  <div className="lg:col-span-2">
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      rows={4}
                      defaultValue={product.description || ''}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 focus:bg-white resize-none"
                      placeholder="Brief product description"
                    />
                  </div>
                </div>
              </div>

              {/* Images Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <ImageIcon className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Product Images</h2>
                </div>

                {/* Main Image */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Main Image *
                  </label>
                  <div
                    onClick={handleMainImageClick}
                    className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 sm:p-8 text-center hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors cursor-pointer group"
                  >
                    {mainImage ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-center">
                          <div className="bg-green-100 rounded-full p-2">
                            <ImageIcon className="w-6 h-6 text-green-600" />
                          </div>
                        </div>
                        <p className="text-sm font-medium text-green-700">{mainImage.name}</p>
                        <p className="text-xs text-gray-500">
                          {(mainImage.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        <button
                          type="button"
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            removeMainImage();
                          }}
                          className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs hover:bg-red-200 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center justify-center">
                          <Upload className="w-8 h-8 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Click to upload main image</p>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Images */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Images
                  </label>
                  <div
                    onClick={handleImagesClick}
                    className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 sm:p-8 text-center hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors cursor-pointer group"
                  >
                    {images.length > 0 ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-center">
                          <div className="bg-green-100 rounded-full p-2">
                            <ImageIcon className="w-6 h-6 text-green-600" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-green-700 mb-2">
                            {images.length} files selected
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                            {images.map((file, index) => (
                              <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                                <span className="text-xs text-gray-600 truncate flex-1">{file.name}</span>
                                <button
                                  type="button"
                                  onClick={(e: React.MouseEvent) => {
                                    e.stopPropagation();
                                    removeImage(index);
                                  }}
                                  className="ml-2 p-1 text-red-500 hover:bg-red-100 rounded"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center justify-center">
                          <Upload className="w-8 h-8 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Click to upload additional images</p>
                          <p className="text-xs text-gray-500 mt-1">Multiple files supported • PNG, JPG, GIF up to 10MB each</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Detailed Content Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Detailed Content</h2>
                </div>

                <div>
                  <label htmlFor="body" className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Details
                  </label>
                  <textarea
                    name="body"
                    id="body"
                    rows={6}
                    defaultValue={product.body || ''}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 focus:bg-white resize-none"
                    placeholder="Detailed product information, features, specifications..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Updating Product...</span>
                    </div>
                  ) : (
                    'Update Product'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
