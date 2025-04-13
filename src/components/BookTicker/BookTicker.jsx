// components/BookTicker.js
import React, { useState } from 'react';

const BookTicker = () => {
  // Sample data - can be replaced with props or API data
  const tickerItems = [
    {
      type: 'book',
      title: 'The Midnight Library',
      author: 'Matt Haig',
      releaseDate: 'Coming October 15, 2025'
    },
    {
      type: 'genre',
      name: 'Science Fiction',
      description: 'Explore futuristic worlds and technologies'
    },
    {
      type: 'book',
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      releaseDate: 'Coming November 5, 2025'
    },
    {
      type: 'genre',
      name: 'Mystery',
      description: 'Solve puzzling crimes and uncover secrets'
    },
    {
      type: 'book',
      title: 'Klara and the Sun',
      author: 'Kazuo Ishiguro',
      releaseDate: 'Coming December 1, 2025'
    }
  ];

  const [isPaused, setIsPaused] = useState(false);

  // Styles
  const styles = {
    container: {
      backgroundColor: '#f8f3e6',
      borderTop: '1px solid #ddd',
      borderBottom: '1px solid #ddd',
      padding: '10px 0',
      margin: '20px 0',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center'
    },
    label: {
      backgroundColor: '#8b4513',
      color: 'white',
      padding: '8px 15px',
      fontWeight: 'bold',
      borderRadius: '4px',
      marginRight: '15px',
      whiteSpace: 'nowrap',
      fontSize: '0.9rem'
    },
    wrap: {
      width: '100%',
      overflow: 'hidden'
    },
    ticker: {
      display: 'inline-block',
      whiteSpace: 'nowrap',
      paddingRight: '100%',
      animation: 'ticker 30s linear infinite',
      animationPlayState: isPaused ? 'paused' : 'running'
    },
    item: {
      display: 'inline-block',
      padding: '0 2rem',
      fontSize: '1rem',
      color: '#333'
    },
    bookTitle: {
      fontWeight: 'bold',
      color: '#8b4513'
    },
    releaseDate: {
      fontStyle: 'italic',
      color: '#666',
      fontSize: '0.9rem'
    },
    genreName: {
      fontWeight: 'bold',
      color: '#5a3921'
    },
    // Keyframes as a style tag (will be added to head)
    keyframes: `
      @keyframes ticker {
        0% { transform: translateX(0); }
        100% { transform: translateX(-100%); }
      }
    `,
    // Media queries
    mediaQueries: `
      @media (max-width: 768px) {
        .ticker-container {
          flex-direction: column;
          align-items: flex-start;
        }
        .ticker-label {
          margin-right: 0;
          margin-bottom: 10px;
          width: 100%;
          text-align: center;
        }
        .ticker__item {
          padding: 0 1rem;
          font-size: 0.9rem;
        }
      }
    `
  };

  // Add keyframes and media queries to head
  const styleTag = document.createElement('style');
  styleTag.innerHTML = styles.keyframes + styles.mediaQueries;
  document.head.appendChild(styleTag);

  return (
    <div className="ticker-container" style={styles.container}>
      <div className="ticker-label" style={styles.label}>
        New Releases & Upcoming:
      </div>
      <div className="ticker-wrap" style={styles.wrap}>
        <div 
          className="ticker"
          style={styles.ticker}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <div key={index} className="ticker__item" style={styles.item}>
              {item.type === 'book' ? (
                <span className="book-item">
                  <span style={styles.bookTitle}>{item.title}</span> by {item.author} 
                  <span style={styles.releaseDate}> ({item.releaseDate})</span>
                </span>
              ) : (
                <span className="genre-item">
                  Explore our <span style={styles.genreName}>{item.name}</span> collection - {item.description}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookTicker;