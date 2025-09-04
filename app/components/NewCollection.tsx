import Link from 'next/link';

export default function NewCollection() {
  return (
    <div className="bg-gradient-to-bl from-white to-gray-50 py-16 px-8 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-100/40 to-transparent rounded-full -translate-y-16 -translate-x-16"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-indigo-100/30 to-transparent rounded-full translate-y-12 translate-x-12"></div>
      
      <div className="relative z-10 text-center max-w-md mx-auto">
        {/* Icon */}
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg relative">
            {/* Shoe icon */}
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.5 16c0-1.5 1-3 2.5-3.5L8.5 11l4 1 6-1.5 2.5 0.5c1.5 0.3 2.5 1.5 2.5 3v2c0 1.5-1.5 3-3 3H5.5c-1.5 0-3-1.5-3-3v-1z"/>
              <path d="M8.5 11c0-1 0.5-2 1.5-2.5L12.5 7.5l2.5 0.5c1 0.2 1.5 1 1.5 2L16.5 11l-4-1-4 1z"/>
              <circle cx="18" cy="17" r="1.5"/>
              <circle cx="9" cy="17" r="1.5"/>
            </svg>
            
            {/* "NEW" badge */}
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow-md">
              NEW
            </div>
            
            {/* Sparkle effect */}
            <div className="absolute -top-2 -left-2">
              <svg className="w-3 h-3 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-3.01L12 0z"/>
              </svg>
            </div>
            
            <div className="absolute -bottom-1 -right-2">
              <svg className="w-2 h-2 text-yellow-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-3.01L12 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
          Шинэ цуглуулга
        </h2>
        <p className="text-gray-600 mb-8 text-sm md:text-base leading-relaxed">
          Хамгийн сүүлийн үеийн загваруудтай танилцана уу.
        </p>
        
        <Link 
          href="/new-collection" 
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <span>Шинэ цуглуулга үзэх</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}