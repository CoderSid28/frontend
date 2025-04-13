import React, { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaVolumeUp, FaVolumeMute, FaPaperPlane } from 'react-icons/fa';

const Help = () => {
  const [messages, setMessages] = useState([
    { 
      text: 'Hi my name is Mr. Bookmark! How can I help you today?', 
      sender: 'bot',
      options: [
        'Browse by Genre',
        'What is BookNest?',
        'How to purchase books?',
        'Payment methods',
        'Favorites feature',
        'Contact support',
        'Profile features'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const speechSynth = useRef(null);
  const recognition = useRef(null);

  // Book database by genre
  const genres = {
    'History': [
      'Hitler and Nazi Germany',
      'India After Gandhi'
    ],
    'Holy Scriptures': [
      'Mahabharata',
      'The Ramayana',
      'Bhagvad Gita',
      'Vishnu Purana',
      'Garuda Purana'
    ],
    'Novels': [
      'The Shawshank Redemption',
      'Fight Club',
      'Never Lie',
      'The Shining',
      'It'
    ],
    'Manga ': [
      'Berserk: Vol-1',
      'Monster: Vol-1',
      'Vagabond: Volume 1'
    ],
    'Gate Papers': [
      'GATE-2025: PSP',
      'Oswaal GATE Papers'
    ],
    'Learning Books': [
      'MERN Projects',
      'Fundamentals of AI & ML',
      'Full Stack Web Dev with MERN',
      'From ML Algorithms to GenAI & LLMs'
    ],
    'Mindsets and Lifestyle': [
      'Atomic Habits',
      'Rich Dad Poor Dad',
      'The Alchemist',
      'Dopamine Detox',
      'Attitude is Everything',
      'The Mountain Is You',
      'Stop Overthinking'
    ],
    'Upcoming ': [
      'Sci-Fi Books',
      'Thriller Books',
      'Mystery Books',
      'Romance Books',
      'Horror Books'
    ]
  };

  // Initialize speech synthesis and recognition
  useEffect(() => {
    speechSynth.current = window.speechSynthesis;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';
      
      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const normalizedTranscript = normalizeVoiceInput(transcript);
        setInputValue(normalizedTranscript);
        handleSendMessage({ preventDefault: () => {} }, normalizedTranscript);
      };
      
      recognition.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
      
      recognition.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (speechSynth.current) {
        speechSynth.current.cancel();
      }
      if (recognition.current) {
        recognition.current.stop();
      }
    };
  }, []);

  // Enhanced voice input normalization
  const normalizeVoiceInput = (text) => {
    const lowerText = text.toLowerCase().trim();
    
    // Handle BookNest variations
    if (/(book\s*nest|b\s*o\s*o\s*k\s*n\s*e\s*s\s*t|booknest|about book)/.test(lowerText)) {
      return 'What is BookNest?';
    }
    
    // Enhanced favorites detection
    if (/(favorite|favourite|save|wishlist|bookmark|like|heart|love this book)/.test(lowerText)) {
      return 'Favorites feature';
    }
    
    // Handle purchase questions
    if (/(how to|can i|want to|how do i)\s*(purchase|buy|get)\s*book/.test(lowerText)) {
      return 'How to purchase books?';
    }
    
    // Handle payment questions
    if (/(payment|pay|credit|debit|cash|online payment)/.test(lowerText)) {
      return 'Payment methods';
    }
    
    // Handle genres
    if (/(genre|category|type|kind|books about)/.test(lowerText)) {
      return 'Browse by Genre';
    }
    
    // Handle contact
    if (/(contact|support|help|email|problem)/.test(lowerText)) {
      return 'Contact support';
    }
    
    // Handle profile
    if (/(profile|account|setting|my books)/.test(lowerText)) {
      return 'Profile features';
    }
    
    // Fuzzy match genres
    for (const genre of Object.keys(genres)) {
      const genreLower = genre.toLowerCase();
      const cleanGenre = genreLower.replace(/[^a-z0-9]/g, '');
      const cleanInput = lowerText.replace(/[^a-z0-9]/g, '');
      
      if (cleanInput.includes(cleanGenre) || cleanGenre.includes(cleanInput)) {
        return genre;
      }
    }
    
    // Fuzzy match book titles
    for (const genre of Object.keys(genres)) {
      for (const book of genres[genre]) {
        const bookLower = book.toLowerCase();
        const cleanBook = bookLower.replace(/[^a-z0-9]/g, '');
        const cleanInput = lowerText.replace(/[^a-z0-9]/g, '');
        
        if (cleanInput.includes(cleanBook) || cleanBook.includes(cleanInput)) {
          return book;
        }
      }
    }
    
    return text;
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speak = (text) => {
    if (speechSynth.current) {
      speechSynth.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.onend = () => setIsSpeaking(false);
      speechSynth.current.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const stopSpeaking = () => {
    if (speechSynth.current) {
      speechSynth.current.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleVoiceInput = () => {
    if (!recognition.current) {
      alert('Speech recognition not supported in your browser');
      return;
    }
    
    if (isListening) {
      recognition.current.stop();
      setIsListening(false);
    } else {
      try {
        recognition.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Error starting recognition:', err);
        setIsListening(false);
      }
    }
  };

  const handleOptionSelect = (option) => {
    setInputValue(option);
    handleSendMessage({ preventDefault: () => {} }, option);
  };

  const handleSendMessage = (e, customMessage = null) => {
    e.preventDefault();
    let message = customMessage || inputValue;
    if (!message.trim()) return;

    message = normalizeVoiceInput(message);

    // Add user message
    setMessages(prev => [...prev, { text: message, sender: 'user' }]);
    setInputValue('');

    let botResponse = { 
      text: '', 
      sender: 'bot', 
      options: [], 
      books: null, 
      genres: null
    };
    
    const lowerMessage = message.toLowerCase();
    
    // Check for genre matches
    const matchedGenre = Object.keys(genres).find(
      genre => genre.toLowerCase() === lowerMessage
    );
    
    if (matchedGenre) {
      if (matchedGenre === 'Upcoming Genres') {
        botResponse.text = "We're working on adding these exciting new genres:";
        botResponse.books = genres['Upcoming Genres'];
      } else if (matchedGenre === 'Manga Novels') {
        botResponse.text = "Here are our current Manga Novels:";
        botResponse.books = genres['Manga Novels'];
      } else {
        botResponse.text = `Here are some ${matchedGenre} :`;
        botResponse.books = genres[matchedGenre];
      }
    } 
    else if (lowerMessage.includes('browse by genre') || lowerMessage.includes('genre')) {
      botResponse.text = "We have these wonderful genres available:";
      botResponse.genres = Object.keys(genres);
    }
    else {
      // Check for book title matches
      let matchedBook = null;
      for (const genre of Object.keys(genres)) {
        matchedBook = genres[genre].find(
          book => book.toLowerCase() === lowerMessage
        );
        if (matchedBook) break;
      }
      
      if (matchedBook) {
        botResponse.text = `You're interested in "${matchedBook}". This is one of our most popular titles in its category. Would you like to know more about purchasing options?`;
        botResponse.options = ['How to purchase books?', 'Browse by Genre', 'Back to recommendations'];
      }
      else if (/(favorite|favourite|save|wishlist)/.test(lowerMessage)) {
        botResponse.text = "You can save books to your favorites by clicking the heart icon (❤️). These books will appear in your 'Favorites' section for easy access. You need to be logged in to use this feature.";
        botResponse.options = ['How to purchase books?', 'Profile features', 'Browse by Genre'];
      }
      else if (/what is booknest|about booknest/.test(lowerMessage)) {
        botResponse.text = "BookNest is your cozy online bookstore where you can discover, purchase, and collect your favorite books. We offer a wide range of genres.";
        botResponse.options = ['Browse by Genre', 'How to purchase books?', 'Payment methods'];
      }
      else if (/how to purchase|buy book/.test(lowerMessage)) {
        botResponse.text = "Purchasing books is simple: 1) Browse our collection in 'All Books', 2) Add to your cart, and 3) Checkout with your preferred payment method. We offer both online payment and cash on delivery.";
        botResponse.options = ['Browse by Genre', 'Payment methods', 'Favorites feature'];
      }
      else if (/payment method|how to pay/.test(lowerMessage)) {
        botResponse.text = "We accept: 1) Secure online payments (credit/debit cards) - you'll receive a payment receipt, 2) Cash on Delivery - pay when your books arrive at your doorstep.";
        botResponse.options = ['Browse by Genre', 'How to purchase books?', 'Favorites feature'];
      }
      else if (/profile feature|my account/.test(lowerMessage)) {
        botResponse.text = "Your personal user profile includes: Your Favorites collection, Account settings, and User Order History of place order. You can manage all your bookish adventures from here!";
        botResponse.options = ['Browse by Genre', 'Favorites feature', 'How to purchase books?'];
      }
      else if (/contact support|help email/.test(lowerMessage)) {
        botResponse.text = "For any questions, you can email us at siddharthmishra457@gmail.com. We're always happy to help fellow book lovers!";
        botResponse.options = ['Browse by Genre', 'What is BookNest?', 'How to purchase books?'];
      }
      else if (/back to recommendation|go back/.test(lowerMessage)) {
        botResponse.text = "Let me know if you'd like to explore more books!";
        botResponse.options = ['Browse by Genre', 'What is BookNest?', 'How to purchase books?'];
      }
      else {
        botResponse.text = "I'm sorry, I didn't catch that. You can browse by genre or ask about our services!";
        botResponse.options = ['Browse by Genre', 'What is BookNest?', 'How to purchase books?'];
      }
    }

    setTimeout(() => {
      setMessages(prev => [...prev, botResponse]);
      speak(botResponse.text);
    }, 1000);
  };

  return (
    <div 
      className="min-h-screen p-4 md:p-8"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="max-w-4xl mx-auto bg-white bg-opacity-90 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-amber-800 to-amber-600 text-white p-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">BookNest Help Center</h2>
            <p className="text-amber-100 text-sm">Mr. Bookmark is ready to assist you</p>
          </div>
          <button 
            onClick={isSpeaking ? stopSpeaking : () => speak(messages[messages.length-1].text)}
            className="p-2 rounded-full hover:bg-amber-700 transition-colors"
          >
            {isSpeaking ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
        </div>
        
        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4 bg-white bg-opacity-80">
          {messages.map((message, index) => (
            <div key={index}>
              <div 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs md:max-w-md rounded-2xl px-4 py-2 ${
                    message.sender === 'user' 
                      ? 'bg-amber-600 text-white rounded-br-none' 
                      : 'bg-amber-50 text-amber-900 shadow-md rounded-bl-none border border-amber-100'
                  }`}
                >
                  {message.text}
                </div>
              </div>
              
              {/* Quick options */}
              {message.options && message.sender === 'bot' && (
                <div className="flex flex-wrap gap-2 mt-2 ml-2">
                  {message.options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleOptionSelect(option)}
                      className="text-xs bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-1 rounded-full transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {/* Genre options */}
              {message.genres && message.sender === 'bot' && (
                <div className="flex flex-wrap gap-2 mt-2 ml-2">
                  {message.genres.map((genre, i) => (
                    <button
                      key={i}
                      onClick={() => handleOptionSelect(genre)}
                      className="text-xs bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-1 rounded-full transition-colors"
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              )}

              {/* Book options (also used for upcoming genres) */}
              {message.books && message.sender === 'bot' && (
                <div className="mt-2 ml-2 space-y-2">
                  {message.books.map((book, i) => (
                    <div 
                      key={i}
                      className="text-sm p-2 rounded-lg bg-amber-100 text-amber-800"
                    >
                      {book}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Chat Input */}
        <div className="border-t border-amber-200 p-4 bg-amber-50 bg-opacity-90">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type or say your question..."
                className="w-full border border-amber-300 rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
              />
              <button
                type="button"
                onClick={toggleVoiceInput}
                className={`absolute left-3 top-3 ${isListening ? 'text-red-500 animate-pulse' : 'text-amber-400'}`}
              >
                <FaMicrophone />
              </button>
            </div>
            <button
              type="submit"
              className="bg-amber-600 text-white p-2 rounded-full hover:bg-amber-700 transition-colors"
            >
              <FaPaperPlane />
            </button>
          </form>
          {isListening && (
            <div className="text-center text-sm text-amber-600 mt-2">
              Listening... Speak now
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Help;