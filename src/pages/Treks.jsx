import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Treks() {
  const [treks, setTreks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from our Node.js backend when the page loads
  useEffect(() => {
    fetch('http://localhost:5000/api/treks')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setTreks(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching treks:", err);
        setError("Failed to load treks. Is the backend server running?");
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#f9f8f6] font-sans text-gray-900 flex flex-col">
      <nav className="bg-[#1A3626] text-white p-6 flex justify-between items-center shadow-md">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M8 3l4 8 5-5 5 15H2L8 3z" /></svg>
          <span className="font-bold tracking-wide">TrailSeeker <span className="font-light italic">Journeys</span></span>
        </Link>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full">
        <Link to="/" className="text-[#D35D47] text-sm font-bold tracking-wider hover:underline mb-8 inline-block">
          ← BACK TO HOME
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-black mb-4">All Expeditions</h1>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl">
          Live data fetched directly from the Node.js Express server.
        </p>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#1A3626] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-medium">Fetching routes...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 text-red-600 p-6 rounded border border-red-200">
            {error}
          </div>
        )}

        {/* Grid of Treks from Backend */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treks.map(trek => (
              <div key={trek.id} className="bg-white rounded overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group">
                <div className="h-64 overflow-hidden relative">
                  <img src={trek.image} alt={trek.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-[#1A3626] text-white text-xs font-bold px-3 py-1 rounded shadow-md">
                    {trek.difficulty}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-1">{trek.title}</h3>
                  <div className="text-xs font-bold text-[#D35D47] mb-4 uppercase tracking-wider">{trek.duration}</div>
                  <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">{trek.description}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="font-black text-xl text-[#1A3626]">{trek.price}</span>
                    <button className="text-sm font-bold text-[#D35D47] hover:text-[#b84c38] transition-colors uppercase tracking-wider flex items-center gap-1">
                      View Details <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}