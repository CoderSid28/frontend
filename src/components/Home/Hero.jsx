import React, { useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-[75vh] relative">
      {/* Text Content */}
      <div className="w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center px-6 pt-8 pb-4 text-center lg:text-left z-10 order-1">
        <h1 className="text-4xl lg:text-6xl font-semibold text-amber-100">
          Welcome to BookNest
        </h1>
        <p className="mt-4 text-xl text-zinc-100">
          Explore Worlds, One Page at a Time.
        </p>
        <div className="mt-8">
          <Link
            to="/all-books"
            className="text-amber-100 text-xl font-semibold border border-amber-100 px-10 py-3 hover:bg-zinc-700 duration-300 rounded-full focus:ring-2 focus:ring-amber-300 focus:outline-none"
            aria-label="Discover our book collection"
          >
            Discover Books
          </Link>
        </div>
      </div>

      {/* Mobile Image with Spinner Loader */}
      <div className="w-full flex items-center justify-center mt-8 mb-6 px-4 order-2 lg:hidden relative min-h-[200px]">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-amber-100 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {imageError ? (
          <div className="w-[80%] bg-zinc-800 rounded-lg flex items-center justify-center h-[200px]">
            <span className="text-amber-100">Image not available</span>
          </div>
        ) : (
          <img
            src="./library.png"
            alt="Cozy library with bookshelves"
            className={`w-[80%] h-auto transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        )}
      </div>

      {/* Desktop Image with Spinner Loader */}
      <div className="w-full lg:w-3/6 hidden lg:flex items-center justify-center absolute top-0 right-0 translate-y-[-30px] min-h-[400px]">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-amber-100 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {imageError ? (
          <div className="w-[90%] bg-zinc-800 rounded-lg flex items-center justify-center h-full">
            <span className="text-amber-100 text-lg">Library image not available</span>
          </div>
        ) : (
          <img
            src="./library.png"
            alt="Cozy library with bookshelves"
            className={`w-[90%] h-auto transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="eager"
          />
        )}
      </div>
    </div>
  );
};

export default Hero;