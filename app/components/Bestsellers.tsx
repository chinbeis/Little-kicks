import Link from 'next/link';

export default function Bestsellers() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-8 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-200/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gray-200/20 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10 text-center max-w-md mx-auto">
        {/* Icon */}
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3l14 9-14 9V3z" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
          Шилдэг борлуулалттай
        </h2>
        <p className="text-gray-600 mb-8 text-sm md:text-base leading-relaxed">
          Хамгийн алдартай бүтээгдэхүүнүүдтэй танилцана уу.
        </p>
        
        <Link 
          href="/bestsellers" 
          className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <span>Шилдэг борлуулалттайг үзэх</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}