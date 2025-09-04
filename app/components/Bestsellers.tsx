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
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg relative">
              {/* Shoe icon */}
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.5 16c0-1.5 1-3 2.5-3.5L8.5 11l4 1 6-1.5 2.5 0.5c1.5 0.3 2.5 1.5 2.5 3v2c0 1.5-1.5 3-3 3H5.5c-1.5 0-3-1.5-3-3v-1z"/>
                <path d="M8.5 11c0-1 0.5-2 1.5-2.5L12.5 7.5l2.5 0.5c1 0.2 1.5 1 1.5 2L16.5 11l-4-1-4 1z"/>
                <circle cx="18" cy="17" r="1.5"/>
                <circle cx="9" cy="17" r="1.5"/>
              </svg>
              
              {/* Trophy icon for bestseller */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7V9C15 11.8 12.8 14 10 14V16H8V14C5.2 14 3 11.8 3 9V7H9V9C9 10.1 9.9 11 11 11H13C14.1 11 15 10.1 15 9ZM7.5 7C7.5 8.2 8.3 9 9.5 9V7H7.5ZM16.5 7V9C17.7 9 18.5 8.2 18.5 7H16.5ZM10 18V16H14V18H17V20H7V18H10Z"/>
                </svg>
              </div>
              
              {/* Fire/trend icon */}
              <div className="absolute -top-1 -right-2">
                <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.28 2.16.28 2.16-.5 2.5-2.62 4.68-4.49 6.68z"/>
                </svg>
              </div>
              
              {/* Trending up arrow */}
              <div className="absolute -bottom-1 -left-2">
                <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
              </div>
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