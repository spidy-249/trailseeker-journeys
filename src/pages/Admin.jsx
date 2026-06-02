import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Tent, Mail, Settings, LogOut, Trash2, Plus, MessageSquareQuote, Lock } from 'lucide-react';

export default function Admin() {
  // --- STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  
  const [activeTab, setActiveTab] = useState('treks');
  const [data, setData] = useState({ bookings: [], inquiries: [], settings: {}, treks: [], stories: [] });
  const [isLoading, setIsLoading] = useState(false);
  
  const [newTrek, setNewTrek] = useState({ title: '', duration: '', difficulty: 'Moderate', price: '', image: '', description: '' });
  const [newStory, setNewStory] = useState({ author: '', date: '', text: '' });
  const [settingsForm, setSettingsForm] = useState({});

  // ⚠️ UPDATE THIS TO YOUR LIVE RENDER URL BEFORE PUSHING TO GITHUB! ⚠️
  const API_BASE_URL = 'https://trailseeker-api.onrender.com/api'; 

  // --- LOGIN HANDLER ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'Ritoshree') {
      setIsAuthenticated(true);
      fetchData(); // Only fetch the data AFTER successfully logging in
    } else {
      alert("Incorrect Access Code");
      setPasscode('');
    }
  };

  const fetchData = async () => {
    try {
      const [bookingsRes, inquiriesRes, settingsRes, treksRes, storiesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/bookings`),
        fetch(`${API_BASE_URL}/inquiries`),
        fetch(`${API_BASE_URL}/settings`),
        fetch(`${API_BASE_URL}/treks`),
        fetch(`${API_BASE_URL}/stories`)
      ]);
      const bookings = await bookingsRes.json();
      const inquiries = await inquiriesRes.json();
      const settings = await settingsRes.json();
      const treks = await treksRes.json();
      const stories = await storiesRes.json();

      setData({ bookings, inquiries, settings, treks, stories });
      setSettingsForm(settings);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  // --- CRUD HANDLERS ---
  const handleAddTrek = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await fetch(`${API_BASE_URL}/treks`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newTrek) });
    setNewTrek({ title: '', duration: '', difficulty: 'Moderate', price: '', image: '', description: '' });
    await fetchData();
    setIsLoading(false);
  };

  const handleDeleteTrek = async (id) => {
    if (!window.confirm("Delete this expedition?")) return;
    setIsLoading(true);
    await fetch(`${API_BASE_URL}/treks/${id}`, { method: 'DELETE' });
    await fetchData();
    setIsLoading(false);
  };

  const handleAddStory = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await fetch(`${API_BASE_URL}/stories`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newStory) });
    setNewStory({ author: '', date: '', text: '' });
    await fetchData();
    setIsLoading(false);
  };

  const handleDeleteStory = async (id) => {
    if (!window.confirm("Delete this story?")) return;
    setIsLoading(true);
    await fetch(`${API_BASE_URL}/stories/${id}`, { method: 'DELETE' });
    await fetchData();
    setIsLoading(false);
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await fetch(`${API_BASE_URL}/settings`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settingsForm) });
    alert("Settings saved to live database!");
    await fetchData();
    setIsLoading(false);
  };

  // --- LOGIN SCREEN RENDER ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f9f8f6] flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-sm shadow-xl border border-gray-200 max-w-sm w-full text-center space-y-6">
          <div className="bg-[#1A3626] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-gray-900">Admin Access</h2>
          <p className="text-sm text-gray-500">Enter your secure passcode to manage The Mountain Ally platform.</p>
          <input 
            type="password" 
            value={passcode} 
            onChange={(e) => setPasscode(e.target.value)} 
            placeholder="Enter Passcode" 
            className="w-full p-4 border border-gray-300 rounded focus:border-[#1A3626] outline-none text-center tracking-widest"
          />
          <button type="submit" className="w-full bg-[#D35D47] text-white py-4 font-bold tracking-wider rounded uppercase hover:bg-[#b84c38] transition-colors">
            Unlock Dashboard
          </button>
          <Link to="/" className="block text-sm text-gray-400 hover:text-gray-600 underline mt-4">Return to Website</Link>
        </form>
      </div>
    );
  }

  // --- MAIN DASHBOARD RENDER ---
  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1A3626] text-white flex flex-col shadow-xl z-10">
        <div className="p-6 border-b border-white/10 mb-6">
          <h2 className="font-bold text-xl tracking-wide flex items-center gap-2">Admin Portal</h2>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <button onClick={() => setActiveTab('treks')} className={`w-full flex items-center gap-3 px-4 py-3 rounded text-left transition-colors ${activeTab === 'treks' ? 'bg-[#D35D47] text-white font-bold' : 'text-gray-300 hover:bg-white/10'}`}>
            <Tent className="w-5 h-5" /> Expeditions
          </button>
          <button onClick={() => setActiveTab('stories')} className={`w-full flex items-center gap-3 px-4 py-3 rounded text-left transition-colors ${activeTab === 'stories' ? 'bg-[#D35D47] text-white font-bold' : 'text-gray-300 hover:bg-white/10'}`}>
            <MessageSquareQuote className="w-5 h-5" /> Voices / Stories
          </button>
          <button onClick={() => setActiveTab('bookings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded text-left transition-colors ${activeTab === 'bookings' ? 'bg-[#D35D47] text-white font-bold' : 'text-gray-300 hover:bg-white/10'}`}>
            <LayoutDashboard className="w-5 h-5" /> Bookings
          </button>
          <button onClick={() => setActiveTab('inquiries')} className={`w-full flex items-center gap-3 px-4 py-3 rounded text-left transition-colors ${activeTab === 'inquiries' ? 'bg-[#D35D47] text-white font-bold' : 'text-gray-300 hover:bg-white/10'}`}>
            <Mail className="w-5 h-5" /> Inquiries
          </button>
          <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded text-left transition-colors ${activeTab === 'settings' ? 'bg-[#D35D47] text-white font-bold' : 'text-gray-300 hover:bg-white/10'}`}>
            <Settings className="w-5 h-5" /> Global Settings
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 rounded text-left text-gray-300 hover:bg-white/10 transition-colors">
            <LogOut className="w-5 h-5" /> Live Site
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black capitalize">{activeTab}</h1>
            <p className="text-gray-500 mt-2">Manage your platform content and data.</p>
          </div>
          {isLoading && <span className="text-sm font-bold text-[#D35D47] animate-pulse">Syncing with Server...</span>}
        </header>

        {/* --- TREKS TAB --- */}
        {activeTab === 'treks' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold mb-4">Live Expeditions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.treks.map(trek => (
                  <div key={trek.id} className="border border-gray-200 p-4 rounded flex justify-between items-center bg-gray-50">
                    <div>
                      <h4 className="font-bold">{trek.title}</h4>
                      <p className="text-xs text-gray-500">{trek.duration} • {trek.price}</p>
                    </div>
                    <button onClick={() => handleDeleteTrek(trek.id)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 className="w-5 h-5" /></button>
                  </div>
                ))}
              </div>
            </div>
            <form onSubmit={handleAddTrek} className="bg-white p-6 rounded-sm shadow-sm border border-gray-200 space-y-4">
              <h3 className="text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2"><Plus className="w-5 h-5"/> Add Expedition</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-xs font-bold text-gray-500 mb-1">Title</label><input required type="text" value={newTrek.title} onChange={e => setNewTrek({...newTrek, title: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-xs font-bold text-gray-500 mb-1">Image URL</label><input required type="text" value={newTrek.image} onChange={e => setNewTrek({...newTrek, image: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-xs font-bold text-gray-500 mb-1">Duration</label><input required type="text" value={newTrek.duration} onChange={e => setNewTrek({...newTrek, duration: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-xs font-bold text-gray-500 mb-1">Price</label><input required type="text" value={newTrek.price} onChange={e => setNewTrek({...newTrek, price: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Difficulty</label>
                  <select value={newTrek.difficulty} onChange={e => setNewTrek({...newTrek, difficulty: e.target.value})} className="w-full p-2 border rounded">
                    <option>Easy</option><option>Moderate</option><option>Difficult</option><option>Expert</option>
                  </select>
                </div>
              </div>
              <div><label className="block text-xs font-bold text-gray-500 mb-1">Description</label><textarea required value={newTrek.description} onChange={e => setNewTrek({...newTrek, description: e.target.value})} className="w-full p-2 border rounded" rows="2"></textarea></div>
              <button type="submit" disabled={isLoading} className="bg-[#1A3626] text-white px-6 py-2 rounded font-bold hover:bg-[#2c553c]">Publish Expedition</button>
            </form>
          </div>
        )}

        {/* --- STORIES TAB --- */}
        {activeTab === 'stories' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold mb-4">Live Testimonials</h3>
              <div className="grid grid-cols-1 gap-4">
                {data.stories.map(story => (
                  <div key={story.id} className="border border-gray-200 p-4 rounded flex justify-between items-center bg-gray-50">
                    <div>
                      <h4 className="font-bold">{story.author} <span className="text-xs text-gray-400 font-normal ml-2">{story.date}</span></h4>
                      <p className="text-sm text-gray-600 mt-1 italic">"{story.text}"</p>
                    </div>
                    <button onClick={() => handleDeleteStory(story.id)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 className="w-5 h-5" /></button>
                  </div>
                ))}
              </div>
            </div>
            <form onSubmit={handleAddStory} className="bg-white p-6 rounded-sm shadow-sm border border-gray-200 space-y-4">
              <h3 className="text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2"><Plus className="w-5 h-5"/> Add Story</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-xs font-bold text-gray-500 mb-1">Author Name</label><input required type="text" value={newStory.author} onChange={e => setNewStory({...newStory, author: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-xs font-bold text-gray-500 mb-1">Date / Trip</label><input required type="text" value={newStory.date} onChange={e => setNewStory({...newStory, date: e.target.value})} className="w-full p-2 border rounded" placeholder="e.g., May 2026" /></div>
              </div>
              <div><label className="block text-xs font-bold text-gray-500 mb-1">Testimonial Text</label><textarea required value={newStory.text} onChange={e => setNewStory({...newStory, text: e.target.value})} className="w-full p-2 border rounded" rows="3"></textarea></div>
              <button type="submit" disabled={isLoading} className="bg-[#1A3626] text-white px-6 py-2 rounded font-bold hover:bg-[#2c553c]">Publish Story</button>
            </form>
          </div>
        )}

        {/* --- BOOKINGS TAB --- */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-sm shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 border-b border-gray-200">
                  <th className="p-4 font-bold">Booking ID</th>
                  <th className="p-4 font-bold">Trek & Date</th>
                  <th className="p-4 font-bold">Lead Traveler</th>
                  <th className="p-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.bookings.length === 0 ? (
                  <tr><td colSpan="4" className="p-8 text-center text-gray-400">No bookings yet.</td></tr>
                ) : (
                  data.bookings.map(booking => (
                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-mono font-bold text-[#1A3626]">{booking.bookingId}</td>
                      <td className="p-4">
                        <div className="font-bold">{booking.trek}</div>
                        <div className="text-sm text-gray-500">{booking.date} • {booking.travelers} Travelers</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{booking.name}</div>
                        <div className="text-sm text-gray-500">{booking.email} • {booking.phone}</div>
                      </td>
                      <td className="p-4">
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* --- INQUIRIES TAB --- */}
        {activeTab === 'inquiries' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.inquiries.length === 0 ? (
              <div className="col-span-full p-8 text-center text-gray-400 bg-white border border-gray-200">No general inquiries yet.</div>
            ) : (
              data.inquiries.map(inquiry => (
                <div key={inquiry.id} className="bg-white p-6 rounded-sm shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{inquiry.name}</h3>
                      <a href={`mailto:${inquiry.email}`} className="text-sm text-[#D35D47] hover:underline">{inquiry.email}</a>
                    </div>
                    <span className="text-xs text-gray-400">{inquiry.submittedAt}</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded text-sm text-gray-700 italic border-l-2 border-gray-300">
                    "{inquiry.message || inquiry.notes}"
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* --- SETTINGS TAB --- */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="bg-white p-8 rounded-sm shadow-sm border border-gray-200 max-w-2xl">
            <h3 className="text-xl font-bold mb-6 border-b pb-4">Global Configuration</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Support Email</label>
                <input type="email" value={settingsForm.email || ''} onChange={e => setSettingsForm({...settingsForm, email: e.target.value})} className="w-full p-3 border border-gray-300 rounded focus:border-[#1A3626] outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Company Phone</label>
                <input type="text" value={settingsForm.phone || ''} onChange={e => setSettingsForm({...settingsForm, phone: e.target.value})} className="w-full p-3 border border-gray-300 rounded focus:border-[#1A3626] outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">About Us Text</label>
                <textarea rows="4" value={settingsForm.aboutText || ''} onChange={e => setSettingsForm({...settingsForm, aboutText: e.target.value})} className="w-full p-3 border border-gray-300 rounded focus:border-[#1A3626] outline-none"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Stripe Payment Link</label>
                <input type="url" value={settingsForm.paymentLink || ''} onChange={e => setSettingsForm({...settingsForm, paymentLink: e.target.value})} className="w-full p-3 border border-gray-300 rounded focus:border-[#1A3626] outline-none" />
              </div>
              <button type="submit" disabled={isLoading} className="bg-[#D35D47] text-white py-3 px-6 font-bold tracking-wider rounded uppercase hover:bg-[#b84c38] transition-colors disabled:opacity-50">
                {isLoading ? 'Saving...' : 'Save All Changes'}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}