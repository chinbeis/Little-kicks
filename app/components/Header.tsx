'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white shadow-xl relative">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxZTI5M2IiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJtMzYgMzQgNi00IDQgNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-white/15 backdrop-blur-md rounded-full p-2 border border-white/20 group-hover:border-white/40 transition-all duration-300">
                <Image
                  src="/images/logoSVG.png"
                  alt="Little Kicks Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              Little Kicks
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/products" 
              className="text-blue-100 hover:text-white transition-colors duration-300 font-medium relative group"
            >
              Бүтээгдэхүүн
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/new-collection" 
              className="text-blue-100 hover:text-white transition-colors duration-300 font-medium relative group"
            >
              Шинэ цуглуулга
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/bestsellers" 
              className="text-blue-100 hover:text-white transition-colors duration-300 font-medium relative group"
            >
              Шилдэг борлуулалттай
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/products" 
                className="text-blue-100 hover:text-white transition-colors duration-300 font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Бүтээгдэхүүн
              </Link>
              <Link 
                href="/new-collection" 
                className="text-blue-100 hover:text-white transition-colors duration-300 font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Шинэ цуглуулга
              </Link>
              <Link 
                href="/bestsellers" 
                className="text-blue-100 hover:text-white transition-colors duration-300 font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Шилдэг борлуулалттай
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
