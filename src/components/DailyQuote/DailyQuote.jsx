import React, { useState } from "react";

const DailyQuote = () => {
  const bookQuotes = [
    // Classic Literature
    "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. — Jane Austen",
    "All happy families are alike; each unhappy family is unhappy in its own way. — Leo Tolstoy",
    "It was the best of times, it was the worst of times... — Charles Dickens",
    "Call me Ishmael. — Herman Melville",
    "Happy families are all alike; every unhappy family is unhappy in its own way. — Leo Tolstoy",

    // Wisdom & Inspiration
    "The more that you read, the more things you will know. The more that you learn, the more places you'll go. — Dr. Seuss",
    "A reader lives a thousand lives before he dies. — George R.R. Martin",
    "Books are the training weights of the mind. — Epictetus",
    "Today a reader, tomorrow a leader. — Margaret Fuller",
    "Reading is essential for those who seek to rise above the ordinary. — Jim Rohn",

    // Humorous & Lighthearted
    "I declare after all there is no enjoyment like reading! — Jane Austen",
    "Never trust anyone who has not brought a book with them. — Lemony Snicket",
    "Books are like mirrors: if a fool looks in, you can't expect a genius to look out. — J.K. Rowling",
    "I find television very educational. Every time someone turns it on, I go into the other room and read a book. — Groucho Marx",
    "Outside of a dog, a book is man's best friend. Inside of a dog, it's too dark to read. — Groucho Marx",

    // Academic/Textbook
    "The only true wisdom is in knowing you know nothing. — Socrates",
    "Education is the kindling of a flame, not the filling of a vessel. — Socrates",
    "The man who does not read good books has no advantage over the man who can't read them. — Mark Twain",
    "Knowledge is power. — Francis Bacon",
    "An investment in knowledge pays the best interest. — Benjamin Franklin",

    // Modern Authors
    "Words are our most inexhaustible source of magic. — J.K. Rowling",
    "We read to know we're not alone. — C.S. Lewis",
    "You can never get a cup of tea large enough or a book long enough to suit me. — C.S. Lewis",
    "The books that the world calls immoral are books that show the world its own shame. — Oscar Wilde",
    "If you don't like to read, you haven't found the right book. — J.K. Rowling",

    // Short & Powerful
    "So many books, so little time. — Frank Zappa",
    "Sleep is good, books are better. — George R.R. Martin",
    "Books are a uniquely portable magic. — Stephen King",
    "Think before you speak. Read before you think. — Fran Lebowitz",
    "One must always be careful of books and what is inside them, for words have the power to change us. — Cassandra Clare",

    // For Book Lovers
    "When I have a little money, I buy books; and if I have any left, I buy food and clothes. — Erasmus",
    "I cannot live without books. — Thomas Jefferson",
    "A house without books is like a room without windows. — Horace Mann",
    "I have always imagined that Paradise will be a kind of library. — Jorge Luis Borges",
    "A great book should leave you with many experiences, and slightly exhausted at the end. — William Styron",

    // Writing About Reading
    "Reading is to the mind what exercise is to the body. — Joseph Addison",
    "The reading of all good books is like conversation with the finest minds of past centuries. — René Descartes",
    "To learn to read is to light a fire; every syllable that is spelled out is a spark. — Victor Hugo",
    "There is no friend as loyal as a book. — Ernest Hemingway",
    "That's the thing about books. They let you travel without moving your feet. — Jhumpa Lahiri",

    // International Voices
    "A book must be the axe for the frozen sea within us. — Franz Kafka",
    "Let us read, and let us dance; these two amusements will never do any harm to the world. — Voltaire",
    "Fairy tales are more than true: not because they tell us that dragons exist, but because they tell us that dragons can be beaten. — G.K. Chesterton",
    "A room without books is like a body without a soul. — Cicero",
    "Books are the quietest and most constant of friends. — Charles W. Eliot",

    // Poetic Observations
    "Books are the bees which carry the quickening pollen from one to another mind. — James Russell Lowell",
    "A book is a garden, an orchard, a storehouse, a party, a company by the way, a counselor, a multitude of counselors. — Charles Baudelaire",
    "Literature is the most agreeable way of ignoring life. — Fernando Pessoa",
    "Books are mirrors: you only see in them what you already have inside you. — Carlos Ruiz Zafón",
    "No two persons ever read the same book. — Edmund Wilson"
  ];

  const [currentQuote, setCurrentQuote] = useState(() => {
    // Initialize with a random quote
    return bookQuotes[Math.floor(Math.random() * bookQuotes.length)];
  });

  const refreshQuote = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * bookQuotes.length);
    } while (bookQuotes[newIndex] === currentQuote); // Ensure new quote is different
    
    setCurrentQuote(bookQuotes[newIndex]);
  };

  return (
    <section className="my-12 max-w-4xl mx-auto px-4">
      <div className="bg-zinc-800/70 p-6 rounded-lg border border-amber-100/20 shadow-lg">
        <div className="flex items-start">
          <span className="text-amber-100 text-2xl mr-3">📚</span>
          <div>
            <h3 className="text-lg font-medium text-amber-100 mb-2">
              Quote of the Day
            </h3>
            <p className="text-xl italic text-zinc-100 leading-relaxed">
              "{currentQuote.split('—')[0].trim()}"
            </p>
            <p className="text-right mt-2 text-amber-100/90">
              —{currentQuote.split('—').slice(1).join('—')}
            </p>
          </div>
        </div>
        <button 
          onClick={refreshQuote}
          className="mt-4 flex items-center text-sm text-amber-100 hover:text-amber-200 transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
            />
          </svg>
          Discover Another Quote
        </button>
      </div>
    </section>
  );
};

export default DailyQuote;