'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

export default function ImagePreviewModal({
  imageUrl,
  onClose,
}: {
  imageUrl: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative max-w-screen-lg max-h-screen-lg w-auto h-auto p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={imageUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
}
