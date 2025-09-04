export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative">
        {/* Animated shoe bouncing */}
        <div className="flex space-x-2 items-end">
          <div className="animate-bounce">
            <svg 
              width="32" 
              height="24" 
              viewBox="0 0 32 24" 
              className="fill-gray-800"
              style={{ animationDelay: '0ms' }}
            >
              <path d="M2 16c0-1.5 1-3 2.5-3.5L8 11l4 1 8-2 6 1c2 0.5 4 2 4 4v3c0 1.5-1.5 3-3 3H5c-1.5 0-3-1.5-3-3v-2z"/>
              <path d="M8 11c0-1 0.5-2 1.5-2.5L12 7l3 0.5c1 0.2 2 1 2 2L17 11l-4-1-5 1z"/>
              <circle cx="24" cy="18" r="2" className="fill-gray-600"/>
              <circle cx="10" cy="18" r="2" className="fill-gray-600"/>
            </svg>
          </div>
          
          <div className="animate-bounce">
            <svg 
              width="32" 
              height="24" 
              viewBox="0 0 32 24" 
              className="fill-gray-700"
              style={{ animationDelay: '150ms' }}
            >
              <path d="M2 16c0-1.5 1-3 2.5-3.5L8 11l4 1 8-2 6 1c2 0.5 4 2 4 4v3c0 1.5-1.5 3-3 3H5c-1.5 0-3-1.5-3-3v-2z"/>
              <path d="M8 11c0-1 0.5-2 1.5-2.5L12 7l3 0.5c1 0.2 2 1 2 2L17 11l-4-1-5 1z"/>
              <circle cx="24" cy="18" r="2" className="fill-gray-500"/>
              <circle cx="10" cy="18" r="2" className="fill-gray-500"/>
            </svg>
          </div>
          
          <div className="animate-bounce">
            <svg 
              width="32" 
              height="24" 
              viewBox="0 0 32 24" 
              className="fill-gray-600"
              style={{ animationDelay: '300ms' }}
            >
              <path d="M2 16c0-1.5 1-3 2.5-3.5L8 11l4 1 8-2 6 1c2 0.5 4 2 4 4v3c0 1.5-1.5 3-3 3H5c-1.5 0-3-1.5-3-3v-2z"/>
              <path d="M8 11c0-1 0.5-2 1.5-2.5L12 7l3 0.5c1 0.2 2 1 2 2L17 11l-4-1-5 1z"/>
              <circle cx="24" cy="18" r="2" className="fill-gray-400"/>
              <circle cx="10" cy="18" r="2" className="fill-gray-400"/>
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}