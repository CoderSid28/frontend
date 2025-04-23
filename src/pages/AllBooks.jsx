import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import BookCard from "../components/BookCard/BookCard";

// Enhanced Loader Component
const Loader = ({ size = "medium", text = "" }) => {
  const sizes = {
    small: "h-8 w-8 border-4",
    medium: "h-12 w-12 border-6",
    large: "h-16 w-16 border-8"
  };

  return (
    <div className={`flex flex-col items-center justify-center ${size === "large" ? "min-h-[300px]" : "min-h-[150px]"}`}>
      <div
        className={`animate-spin rounded-full border-solid border-t-amber-100 border-r-amber-100 border-b-transparent border-l-transparent ${
          sizes[size]
        }`}
      ></div>
      {text && <p className="mt-4 text-amber-100">{text}</p>}
    </div>
  );
};

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const AllBooks = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [genreFilter, setGenreFilter] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const isListeningRef = useRef(isListening);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Genre categories with exact titles
  const genres = {
    "History": [
      "hitler and nazi germany",
      "india after gandhi"
    ],
    "Holy Scriptures": [
      "mahabharata",
      "the ramayana",
      "Bhagavad Gita",
      "vishnu purana",
      "garuda purana"
    ],
    "Novels": [
      "the shawshank redemption",
      "fight club",
      "never lie",
      "the shining",
      "it"
    ],
    "Manga Novels": [
      "berserk : vol-1",
      "monster : vol-1",
      "vagabond: volume 1"
    ],
    "Gate Papers": [
      "gate-2025: psp",
      "oswaal gate papers"
    ],
    "Learning Books": [
      "mern projects",
      "fundamentals of ai & ml",
      "full stack web dev with mern",
      "from ml algorithms to genai & llms"
    ],
    "Mindsets and Lifestyle": [
      "atomic habits",
      "rich dad poor dad",
      "the alchemist",
      "dopamine detox",
      "attitude is everything...",
      "the mountain is you",
      "stop overthinking"
    ]
  };

  // Sync ref with state
  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  // Initialize voice recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setSearchTerm(transcript);
          setIsListening(false);
          inputRef.current?.focus();
        };

        recognitionRef.current.onerror = (event) => {
          console.error("Voice recognition error:", event.error);
          setIsListening(false);
          inputRef.current?.focus();
        };

        recognitionRef.current.onend = () => {
          if (isListeningRef.current) {
            setIsListening(false);
          }
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Fetch books data
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("https://booknest-eku3.onrender.com/api/v1/get-all-books");
        setData(response.data.data);
        setFilteredData(response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Sort books function
  const sortBooks = (books, option) => {
    const sortedBooks = [...books];
    
    switch(option) {
      case "price-low-high":
        return sortedBooks.sort((a, b) => a.price - b.price);
      case "price-high-low":
        return sortedBooks.sort((a, b) => b.price - a.price);
      case "title-a-z":
        return sortedBooks.sort((a, b) => 
          a.title.trim().toLowerCase().localeCompare(b.title.trim().toLowerCase())
        );
      case "title-z-a":
        return sortedBooks.sort((a, b) => 
          b.title.trim().toLowerCase().localeCompare(a.title.trim().toLowerCase())
        );
      case "author-a-z":
        return sortedBooks.sort((a, b) => 
          a.author.trim().toLowerCase().localeCompare(b.author.trim().toLowerCase())
        );
      case "author-z-a":
        return sortedBooks.sort((a, b) => 
          b.author.trim().toLowerCase().localeCompare(a.author.trim().toLowerCase())
        );
      default:
        return sortedBooks;
    }
  };

  // Filter and sort books
  useEffect(() => {
    setIsSearching(true);
    
    let results = [...data];
    
    // Apply search term filter
    if (debouncedSearchTerm !== "") {
      const searchLower = debouncedSearchTerm.trim().toLowerCase();
      results = results.filter(book => {
        const titleMatch = book.title?.toLowerCase().includes(searchLower) ?? false;
        const authorMatch = book.author?.toLowerCase().includes(searchLower) ?? false;
        const descMatch = book.description?.toLowerCase().includes(searchLower) ?? false;
        return titleMatch || authorMatch || descMatch;
      });
    }

    // Apply genre filter with exact case-insensitive matching
    if (genreFilter !== "") {
      const genreBooks = genres[genreFilter] || [];
      results = results.filter(book => {
        const bookTitle = book.title?.toLowerCase().trim() || '';
        return genreBooks.some(genreTitle => 
          bookTitle === genreTitle.toLowerCase()
        );
      });
    }

    results = sortBooks(results, sortOption);
    setFilteredData(results);
    setIsSearching(false);
  }, [debouncedSearchTerm, data, sortOption, genreFilter]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSortOption("default");
    setGenreFilter("");
    inputRef.current?.focus();
  };

  const toggleVoiceSearch = () => {
    if (!recognitionRef.current) {
      alert("Voice search is not supported in your browser. Please try Chrome or Edge.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error("Voice recognition error:", err);
        alert("Please allow microphone access to use voice search.");
        setIsListening(false);
      }
    }
  };

  return (
    <div className="bg-zinc-900 min-h-screen flex flex-col">
      <div className="flex-grow px-4 sm:px-12 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h4 className="text-3xl text-yellow-100">All Books</h4>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-48">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full bg-zinc-800 text-amber-100 px-4 py-2 pr-8 rounded-lg border border-amber-100/30 focus:outline-none focus:ring-2 focus:ring-amber-100 appearance-none"
                aria-label="Sort books"
              >
                <option value="default">Sort by</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="title-a-z">Title: A-Z</option>
                <option value="title-z-a">Title: Z-A</option>
                <option value="author-a-z">Author: A-Z</option>
                <option value="author-z-a">Author: Z-A</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-100 pointer-events-none">
                ▼
              </div>
            </div>

            <div className="relative w-full sm:w-48">
              <select
                value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}
                className="w-full bg-zinc-800 text-amber-100 px-4 py-2 pr-8 rounded-lg border border-amber-100/30 focus:outline-none focus:ring-2 focus:ring-amber-100 appearance-none"
                aria-label="Filter by genre"
              >
                <option value="">All Genres</option>
                {Object.keys(genres).map((genre) => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-100 pointer-events-none">
                ▼
              </div>
            </div>

            <div className="relative w-full sm:w-96">
              <div className="flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search books by title, author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-zinc-800 text-amber-100 px-4 py-2 pl-4 pr-12 rounded-lg border border-amber-100/30 focus:outline-none focus:ring-2 focus:ring-amber-100"
                  aria-label="Search books"
                  role="searchbox"
                />
                <div className="absolute right-3 flex gap-2">
                  <button
                    onClick={toggleVoiceSearch}
                    className={`p-1 rounded-full ${isListening ? 'animate-pulse bg-red-500' : 'text-amber-100 hover:text-amber-200'}`}
                    aria-label={isListening ? "Stop listening" : "Start voice search"}
                  >
                    {isListening ? (
                      <span className="w-4 h-4 block bg-white rounded-full"></span>
                    ) : (
                      <span>🎤</span>
                    )}
                  </button>
                  <span className="text-amber-100">🔍</span>
                </div>
              </div>
              {isListening && (
                <div className="absolute top-full left-0 mt-1 text-xs text-amber-100">
                  Listening... Speak now
                </div>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <Loader size="large" text="Loading books..." />
        ) : (
          <>
            {isSearching ? (
              <Loader size="medium" text="Searching..." />
            ) : filteredData.length === 0 ? (
              <div className="text-center py-12 flex-grow">
                <p className="text-amber-100 text-xl mb-4">
                  {searchTerm || genreFilter ? `No books found matching your criteria` : "No books available"}
                </p>
                {(searchTerm || genreFilter || sortOption !== "default") && (
                  <button
                    onClick={handleClearFilters}
                    className="px-4 py-2 bg-amber-100 text-zinc-900 rounded-lg hover:bg-amber-200 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                {(searchTerm || sortOption !== "default" || genreFilter) && (
                  <div className="mb-4 text-amber-100">
                    Found {filteredData.length} book{filteredData.length !== 1 ? "s" : ""}
                    {searchTerm && ` matching "${searchTerm}"`}
                    {genreFilter && ` in ${genreFilter} genre`}
                    {sortOption !== "default" && ` • Sorted by ${sortOption.replace(/-/g, " ")}`}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredData.map((item) => (
                    <BookCard key={item._id} data={item} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllBooks;