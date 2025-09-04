'use client';

import { useState } from 'react';
import ImagePreviewModal from './ImagePreviewModal';

export default function ProductImageCarousel({ images }: { images: (string | null)[] }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [thumbnailLoading, setThumbnailLoading] = useState<{ [key: number]: boolean }>({});

  const validImages = images.filter(Boolean);

  const openPreview = () => {
    if (selectedImage) {
      setIsPreviewOpen(true);
    }
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  const handleThumbnailLoad = (index: number) => {
    setThumbnailLoading(prev => ({ ...prev, [index]: false }));
  };

  const handleThumbnailError = (index: number) => {
    setThumbnailLoading(prev => ({ ...prev, [index]: false }));
  };

  if (!validImages.length) {
    return (
      <div className="w-full">
        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-inner">
          <div className="text-center text-gray-400">
            <svg className="w-20 h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm font-medium">Зураг байхгүй</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Main Image */}
      <div className="relative group">
        <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 relative">
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
          
          <img
            src={selectedImage || ''}
            alt="Сонгосон бүтээгдэхүүний зураг"
            className={`w-full h-full object-cover cursor-pointer transition-all duration-500 hover:scale-105 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onClick={openPreview}
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
          />
          
          {/* Zoom Icon */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer shadow-lg hover:bg-white hover:scale-110">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">
            {validImages.findIndex(img => img === selectedImage) + 1} / {validImages.length}
          </div>
        </div>
      </div>

      {/* Thumbnail Grid */}
      {validImages.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
          {validImages.map((image, index) => (
            <div
              key={index}
              className={`group relative aspect-square bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-300 shadow-sm hover:shadow-lg border-2 ${
                selectedImage === image 
                  ? 'border-blue-500 ring-2 ring-blue-500/20 scale-95' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => {
                setSelectedImage(image);
                setImageLoading(true);
              }}
            >
              {/* Loading state for thumbnail */}
              {thumbnailLoading[index] !== false && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                </div>
              )}
              
              <img 
                src={image || ''} 
                alt={`Бүтээгдэхүүний зураг ${index + 1}`} 
                className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${
                  selectedImage === image ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'
                }`}
                onLoad={() => handleThumbnailLoad(index)}
                onError={() => handleThumbnailError(index)}
              />

              {/* Selected indicator */}
              {selectedImage === image && (
                <div className="absolute top-1 right-1 bg-blue-500 rounded-full p-1">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      )}

      {/* Navigation Arrows for Mobile */}
      {validImages.length > 1 && (
        <div className="flex justify-center space-x-4 md:hidden">
          <button
            onClick={() => {
              const currentIndex = validImages.findIndex(img => img === selectedImage);
              const prevIndex = currentIndex > 0 ? currentIndex - 1 : validImages.length - 1;
              setSelectedImage(validImages[prevIndex]);
              setImageLoading(true);
            }}
            className="bg-white border-2 border-gray-200 hover:border-gray-300 rounded-full p-3 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => {
              const currentIndex = validImages.findIndex(img => img === selectedImage);
              const nextIndex = currentIndex < validImages.length - 1 ? currentIndex + 1 : 0;
              setSelectedImage(validImages[nextIndex]);
              setImageLoading(true);
            }}
            className="bg-white border-2 border-gray-200 hover:border-gray-300 rounded-full p-3 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Image Preview Modal */}
      {isPreviewOpen && selectedImage && (
        <ImagePreviewModal imageUrl={selectedImage} onClose={closePreview} />
      )}
    </div>
  );
}