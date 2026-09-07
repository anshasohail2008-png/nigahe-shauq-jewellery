import { useState } from 'react';
import { ZoomIn } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-x-visible scrollbar-hide">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`shrink-0 w-20 h-24 md:w-20 md:h-24 overflow-hidden border-2 transition-colors ${
              i === activeIndex ? 'border-champagne-400' : 'border-transparent hover:border-charcoal-200 dark:hover:border-charcoal-600'
            }`}
          >
            <img src={img} alt={`${name} thumbnail ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="flex-1 relative group overflow-hidden bg-beige-50 dark:bg-charcoal-700 aspect-[3/4]">
        <img
          src={images[activeIndex]}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-500 ${zoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`}
          onClick={() => setZoomed(!zoomed)}
        />
        <div className="absolute bottom-4 right-4 bg-ivory/80 dark:bg-charcoal-800/80 backdrop-blur-md p-2 text-charcoal-600 dark:text-charcoal-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <ZoomIn className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
