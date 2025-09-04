import Image from 'next/image';
import nikeLogo from '@/public/logo/nike-4-logo-svgrepo-com.svg';
import converseLogo from '@/public/logo/Converse_(shoe_company)-Icon-Logo.wine.svg';
import adidasLogo from '@/public/logo/adidas-svgrepo-com.svg';
import reebokLogo from '@/public/logo/reebok-5-logo-svgrepo-com.svg';

const brands = [
  { src: nikeLogo, alt: 'Nike' },
  { src: converseLogo, alt: 'Converse' },
  { src: adidasLogo, alt: 'Adidas' },
  { src: reebokLogo, alt: 'Reebok' },
];

export default function BrandsSection() {
  return (
    <div className="py-16 bg-gradient-to-r from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-br from-blue-50/40 to-indigo-50/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-gray-50/60 to-slate-50/60 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3l14 9-14 9V3z" />
            </svg>
            <div className="w-8 h-1 bg-gradient-to-l from-blue-500 to-indigo-500 rounded-full"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Манай Брэндүүд
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Дэлхийн шилдэг брэндүүдтэй хамтран ажиллаж, хүүхдүүдэд чанартай, найдвартай гутал санал болгож байна
          </p>
        </div>

        {/* Brands carousel */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-50 via-white/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-50 via-white/80 to-transparent z-10 pointer-events-none"></div>
          
          <div className="relative h-32 overflow-hidden">
            <div className="absolute inset-0 flex items-center animate-marquee">
              {brands.concat(brands, brands).map((brand, index) => (
                <div key={index} className="flex-shrink-0 w-56 h-20 mx-12 group">
                  <div className="relative w-full h-full bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 group-hover:border-blue-200">
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative w-full h-full">
                      <Image
                        src={brand.src}
                        alt={brand.alt}
                        fill
                        className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust indicator */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200 shadow-sm">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-gray-700">
              Баталгаатай чанар, итгэлтэй түнш
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}