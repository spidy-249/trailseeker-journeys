import React from 'react';

// Sample Trek Data (To be replaced by your /api/treks endpoint later)
const featuredTreks = [
  {
    id: 1,
    slug: 'goecha-la',
    title: 'Goecha La Trek',
    duration: '11 Days',
    difficulty: 'Difficult',
    description: 'Experience the raw alpine beauty with sweeping views of Mount Pandim as viewed from the Lamuney campsite.',
    price: '₹16,500',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 2,
    slug: 'phalut-phoktey-dara',
    title: 'Phalut & Phoktey Dara',
    duration: '7 Days',
    difficulty: 'Moderate',
    description: 'Navigate deep forests and high ridges, culminating in panoramic sunrise views of the Kanchenjunga sleeping buddha profile.',
    price: '₹12,000',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 3,
    slug: 'dayara-bugyal-winter',
    title: 'Dayara Bugyal Winter Expedition',
    duration: '6 Days',
    difficulty: 'Easy-Moderate',
    description: 'A pristine winter wonderland trek across vast, snow-covered high-altitude meadows.',
    price: '₹9,500',
    image: 'https://images.unsplash.com/photo-1516858276662-790515152345?auto=format&fit=crop&q=80&w=1200'
  }
];

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-forest-green text-white py-4 px-8 flex justify-between items-center shadow-md">
        <div className="font-heading font-black text-2xl tracking-wider">
          TRAILSEEKER <span className="text-terracotta">JOURNEYS</span>
        </div>
        <div className="hidden md:flex space-x-6 font-medium">
          <a href="#" className="hover:text-terracotta transition-colors">Treks</a>
          <a href="#" className="hover:text-terracotta transition-colors">Testimonials</a>
          <a href="#" className="hover:text-terracotta transition-colors">Stories</a>
        </div>
        <button className="bg-terracotta hover:bg-terracotta-hover text-white px-5 py-2 rounded font-bold transition-colors">
          Login / Book
        </button>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-forest-light h-[80vh] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&q=80&w=2000" 
            alt="Rugged mountain landscape" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-heading font-black text-white mb-6 drop-shadow-lg">
            Embrace the Alpine Spirit
          </h1>
          <p className="text-xl md:text-2xl text-earth-sand mb-8 font-light drop-shadow-md">
            Expertly curated treks. Untamed wilderness. Unforgettable journeys.
          </p>
          <button className="bg-terracotta hover:bg-terracotta-hover text-white px-8 py-4 rounded text-lg font-bold shadow-lg transition-transform hover:scale-105">
            Explore Upcoming Treks
          </button>
        </div>
      </header>

      {/* Trek Catalog Section */}
      <main className="flex-grow max-w-7xl mx-auto px-4 py-16 w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold text-forest-green mb-4">Our Signature Trails</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From technical passes to serene high-altitude bugyals, find the perfect expedition for your next adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTreks.map((trek) => (
            <div key={trek.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col">
              <div className="h-56 overflow-hidden relative">
                <img src={trek.image} alt={trek.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-forest-green text-white text-xs font-bold px-3 py-1 rounded">
                  {trek.difficulty}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold font-heading">{trek.title}</h3>
                </div>
                <div className="text-sm font-semibold text-terracotta mb-4 uppercase tracking-wide">
                  {trek.duration}
                </div>
                <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
                  {trek.description}
                </p>
                <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-auto">
                  <span className="font-bold text-xl text-forest-green">{trek.price}</span>
                  <button className="text-forest-green font-bold hover:text-terracotta transition-colors flex items-center gap-1">
                    View Itinerary <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="bg-forest-green text-earth-sand py-8 text-center">
        <p className="font-heading font-bold text-xl mb-2">TRAILSEEKER JOURNEYS</p>
        <p className="text-sm opacity-70">© 2026 All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;