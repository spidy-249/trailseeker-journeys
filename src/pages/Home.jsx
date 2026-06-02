import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldCheck, Users, Leaf, MapPin, Camera, PlayCircle, Mail, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- NAVIGATION MENU COMPONENT ---
const NavigationOverlay = ({ isOpen, setIsOpen, settings }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-[#1A3626] z-50 flex flex-col p-6 text-white animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-16">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8"><path d="M8 3l4 8 5-5 5 15H2L8 3z" /></svg>
          <span className="font-bold text-xl tracking-wide">TrailSeeker</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:text-[#D35D47] transition-colors">
          <X className="w-10 h-10" />
        </button>
      </div>
      
      <div className="flex flex-col gap-6 text-3xl font-black tracking-wide pl-4">
        <Link to="/treks" className="hover:text-[#D35D47] transition-colors w-fit" onClick={() => setIsOpen(false)}>Treks</Link>
        <a href="#why-us" className="hover:text-[#D35D47] transition-colors w-fit" onClick={() => setIsOpen(false)}>Why Us</a>
        <a href="#voices" className="hover:text-[#D35D47] transition-colors w-fit" onClick={() => setIsOpen(false)}>Voices</a>
        <a href="#plan" className="hover:text-[#D35D47] transition-colors w-fit" onClick={() => setIsOpen(false)}>Plan a Trip</a>
        <a href="#contact" className="hover:text-[#D35D47] transition-colors w-fit" onClick={() => setIsOpen(false)}>Contact</a>
        <div className="h-px bg-white/20 w-1/2 my-4"></div>
        {/* Payment / Booking Link */}
        <a href={settings?.paymentLink || "#"} target="_blank" rel="noreferrer" className="text-[#D35D47] hover:text-white transition-colors w-fit">
          Book a Trek ↗
        </a>
      </div>
    </div>
  );
};

// --- PAGE COMPONENTS (Now accepting dynamic settings) ---
const HeroSection = ({ setIsMenuOpen }) => (
  <div className="relative min-h-screen flex flex-col justify-between">
    <div className="absolute inset-0 z-0">
      <img src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&q=80&w=2000" alt="Mountain Landscape" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40"></div>
    </div>
    
    <nav className="relative z-10 flex justify-between items-center p-6 text-white">
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8"><path d="M8 3l4 8 5-5 5 15H2L8 3z" /></svg>
        <span className="font-bold text-xl tracking-wide">TrailSeeker <span className="font-light italic">Journeys</span></span>
      </div>
      <button onClick={() => setIsMenuOpen(true)} className="hover:text-[#D35D47] transition-colors">
        <Menu className="w-10 h-10" />
      </button>
    </nav>

    <div className="relative z-10 px-6 py-12 max-w-3xl">
      <p className="text-white text-2xl md:text-3xl font-medium leading-relaxed mb-10 drop-shadow-md">
        Small-group treks across the Himalayas — handcrafted itineraries, local guides who grew up on these passes, and stories you'll tell for the rest of your life.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        <Link to="/treks" className="bg-[#D35D47] text-white py-4 px-8 font-bold tracking-wider rounded-sm hover:bg-[#b84c38] transition-colors flex items-center justify-center gap-2">
          EXPLORE TRAILS <span className="text-xl">→</span>
        </Link>
        <a href="#plan" className="border-2 border-white text-center text-white py-4 px-8 font-bold tracking-wider rounded-sm hover:bg-white/10 transition-colors">
          PLAN A CUSTOM TREK
        </a>
      </div>
    </div>
    
    <div className="relative z-10 w-full px-6 pb-8 pt-12 bg-gradient-to-t from-black/80 to-transparent">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
        <div><div className="text-3xl font-black">12+</div><div className="text-xs tracking-widest uppercase opacity-80 mt-1">Years on the trail</div></div>
        <div><div className="text-3xl font-black">38</div><div className="text-xs tracking-widest uppercase opacity-80 mt-1">Curated Routes</div></div>
        <div><div className="text-3xl font-black">4,200+</div><div className="text-xs tracking-widest uppercase opacity-80 mt-1">Trekkers led safely</div></div>
        <div><div className="text-3xl font-black">4.9★</div><div className="text-xs tracking-widest uppercase opacity-80 mt-1">Avg. Trek Rating</div></div>
      </div>
    </div>
  </div>
);

const StorySection = ({ settings }) => (
  <div id="why-us" className="bg-[#f9f8f6] py-20 px-6">
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
      <div>
        <div className="uppercase tracking-widest text-sm font-bold border-b-2 border-black inline-block mb-8">Why Trailseeker</div>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">We don't sell trips.<br/>We share the mountains we love.</h2>
        {/* Loaded dynamically from Backend */}
        <p className="text-lg text-gray-600 leading-relaxed mb-8">{settings?.aboutText}</p>
        <img src="https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=800" alt="Trekkers" className="w-full h-64 object-cover rounded-sm shadow-md"/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="bg-white p-6 border border-gray-100"><ShieldCheck className="w-8 h-8 text-[#D35D47] mb-4" /><h3 className="font-bold text-xl mb-2">Safety first</h3></div>
        <div className="bg-white p-6 border border-gray-100"><Users className="w-8 h-8 text-[#D35D47] mb-4" /><h3 className="font-bold text-xl mb-2">Small groups</h3></div>
        <div className="bg-white p-6 border border-gray-100"><Leaf className="w-8 h-8 text-[#D35D47] mb-4" /><h3 className="font-bold text-xl mb-2">Leave-no-trace</h3></div>
        <div className="bg-white p-6 border border-gray-100"><MapPin className="w-8 h-8 text-[#D35D47] mb-4" /><h3 className="font-bold text-xl mb-2">Local-first</h3></div>
      </div>
    </div>
  </div>
);

const TestimonialBanner = () => (
  <div id="voices" className="bg-[#1A3626] text-white py-24 px-6 text-center">
    <div className="uppercase tracking-widest text-sm font-bold border-b-2 border-white/30 inline-block mb-8 text-white/70">Voices from the trail</div>
    <h2 className="text-4xl md:text-6xl font-black leading-tight">The summit is shared.<br/><span className="italic font-light">So is the story.</span></h2>
  </div>
);

const ContactSection = ({ settings }) => {
  const [activeTab, setActiveTab] = useState('book'); // 'book' or 'inquire'
  const [step, setStep] = useState('form'); // 'form', 'tnc', 'processing', 'success'
  const [agreedToTnc, setAgreedToTnc] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);

  const [formData, setFormData] = useState({
    trek: 'Goecha La Trek',
    travelers: '2',
    date: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handles moving from the form to the Terms & Conditions
  const handleProceedToTnc = (e) => {
    e.preventDefault();
    setStep('tnc');
  };

  // Handles the final submission to the backend to get the Booking ID
  const handleFinalBooking = async () => {
    if (!agreedToTnc) return;
    setStep('processing');

    try {
      const response = await fetch('https://trailseeker-api.onrender.com/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      
      if (data.success) {
        setBookingResult(data);
        setStep('success');
      }
    } catch (error) {
      console.error("Booking failed:", error);
      alert("There was an error processing your booking. Please try again.");
      setStep('form');
    }
  };

  // Handle simple inquiries
  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    await fetch('https://trailseeker-api.onrender.com/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    alert("Inquiry sent! We will email you back within 24 hours.");
    setFormData({ ...formData, message: '' }); // clear message
  };

  return (
    <div id="plan" className="py-20 px-6 max-w-5xl mx-auto">
      <div className="uppercase tracking-widest text-sm font-bold border-b-2 border-black inline-block mb-8">Start Your Journey</div>
      <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">The mountains<br/>are waiting.</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
        {/* Contact Info Sidebar */}
        <div className="col-span-1 space-y-8">
          <div><h4 className="font-bold text-sm tracking-wider uppercase text-gray-400 mb-2">Call Us</h4><p className="font-medium text-lg">{settings?.phone || "+91 98765 43210"}</p></div>
          <div><h4 className="font-bold text-sm tracking-wider uppercase text-gray-400 mb-2">Write to us</h4><p className="font-medium text-lg text-[#D35D47]">{settings?.email || "hello@trailseeker.in"}</p></div>
        </div>

        {/* The Interactive Widget Area */}
        <div className="col-span-2 bg-[#f9f8f6] p-2 sm:p-8 rounded-sm relative shadow-inner">
          
          {/* Tabs Navigation (Only show if we are on the first step) */}
          {step === 'form' && (
            <div className="flex border-b border-gray-200 mb-8">
              <button onClick={() => setActiveTab('book')} className={`pb-4 px-4 font-bold tracking-wider uppercase text-sm ${activeTab === 'book' ? 'text-[#1A3626] border-b-2 border-[#1A3626]' : 'text-gray-400 hover:text-gray-600'}`}>Secure a Booking</button>
              <button onClick={() => setActiveTab('inquire')} className={`pb-4 px-4 font-bold tracking-wider uppercase text-sm ${activeTab === 'inquire' ? 'text-[#1A3626] border-b-2 border-[#1A3626]' : 'text-gray-400 hover:text-gray-600'}`}>Ask a Question</button>
            </div>
          )}

          {/* --- TAB 1: FORMAL BOOKING WIZARD --- */}
          {activeTab === 'book' && (
            <>
              {/* STEP 1: The Form */}
              {step === 'form' && (
                <form onSubmit={handleProceedToTnc} className="space-y-6 animate-in fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Select Expedition</label>
                      <select name="trek" value={formData.trek} onChange={handleChange} className="w-full p-4 border border-gray-300 rounded-sm bg-white focus:border-[#1A3626] outline-none font-medium">
                        <option value="Goecha La Trek">Goecha La Trek (11 Days)</option>
                        <option value="Phalut & Phoktey Dara">Phalut & Phoktey Dara (7 Days)</option>
                        <option value="Dayara Bugyal">Dayara Bugyal Winter (6 Days)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Travelers</label>
                      <select name="travelers" value={formData.travelers} onChange={handleChange} className="w-full p-4 border border-gray-300 rounded-sm bg-white focus:border-[#1A3626] outline-none font-medium">
                        <option value="1">1 Trekker (Solo)</option>
                        <option value="2">2 Trekkers</option>
                        <option value="3">3 Trekkers</option>
                        <option value="4+">4+ (Group Booking)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Start Date</label>
                    <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-4 border border-gray-300 rounded-sm bg-white focus:border-[#1A3626] outline-none" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Lead Traveler Name</label>
                      <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full p-4 border border-gray-300 rounded-sm outline-none focus:border-[#1A3626]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Phone Number</label>
                      <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 ..." className="w-full p-4 border border-gray-300 rounded-sm outline-none focus:border-[#1A3626]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email Address (For Booking ID)</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" className="w-full p-4 border border-gray-300 rounded-sm outline-none focus:border-[#1A3626]" />
                  </div>
                  <button type="submit" className="w-full bg-[#1A3626] text-white py-4 font-bold tracking-wider rounded-sm hover:bg-[#2C553C] transition-colors uppercase mt-8">
                    Review Details & Proceed →
                  </button>
                </form>
              )}

              {/* STEP 2: Terms & Conditions */}
              {step === 'tnc' && (
                <div className="animate-in fade-in slide-in-from-right-4">
                  <h3 className="text-2xl font-black mb-4 text-[#1A3626]">Booking Terms & Conditions</h3>
                  <div className="bg-white p-6 border border-gray-200 rounded-sm h-64 overflow-y-auto text-sm text-gray-600 mb-6 space-y-4">
                    <p><strong>1. Physical Fitness:</strong> By booking, you confirm you are physically fit for high-altitude trekking.</p>
                    <p><strong>2. Cancellations:</strong> 50% refund if cancelled 30 days prior. No refund within 15 days of departure.</p>
                    <p><strong>3. Weather Delays:</strong> TrailSeeker is not responsible for delays caused by extreme alpine weather conditions. Alternate routes may be chosen by the guide for safety.</p>
                    <p><strong>4. Local Guidelines:</strong> You agree to follow our strict leave-no-trace policies and respect local customs.</p>
                  </div>
                  <label className="flex items-center gap-3 mb-8 cursor-pointer">
                    <input type="checkbox" checked={agreedToTnc} onChange={(e) => setAgreedToTnc(e.target.checked)} className="w-5 h-5 accent-[#1A3626]" />
                    <span className="font-medium text-gray-800">I have read and agree to the terms and conditions.</span>
                  </label>
                  <div className="flex gap-4">
                    <button onClick={() => setStep('form')} className="px-6 py-4 border border-gray-300 font-bold text-gray-600 hover:bg-gray-50 rounded-sm transition-colors">Back</button>
                    <button onClick={handleFinalBooking} disabled={!agreedToTnc} className="flex-grow bg-[#D35D47] text-white py-4 font-bold tracking-wider rounded-sm hover:bg-[#b84c38] transition-colors uppercase disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2">
                      Generate Booking ID & Pay
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Success & Payment Redirect */}
              {step === 'success' && (
                <div className="bg-[#1A3626] text-white p-8 rounded-sm text-center animate-in zoom-in-95">
                  <ShieldCheck className="w-16 h-16 text-[#D35D47] mx-auto mb-4" />
                  <h3 className="text-3xl font-black mb-2">Booking Reserved!</h3>
                  <p className="opacity-80 mb-6">Your details have been saved successfully.</p>
                  
                  <div className="bg-white/10 p-4 rounded mb-8 inline-block mx-auto border border-white/20">
                    <p className="text-xs uppercase tracking-widest text-white/70 mb-1">Your Booking Reference</p>
                    <p className="text-2xl font-mono font-bold tracking-widest">{bookingResult?.bookingId}</p>
                  </div>

                  <p className="text-sm opacity-80 mb-6 max-w-md mx-auto">Please complete your payment to confirm this slot. If payment is not received within 24 hours, the reservation will be released.</p>
                  
                  {/* Stripe Payment Button */}
                  <a href={bookingResult?.paymentUrl || "#"} target="_blank" rel="noreferrer" className="block w-full bg-[#D35D47] text-white py-4 font-bold tracking-wider rounded-sm hover:bg-[#b84c38] transition-colors uppercase mb-4">
                    Proceed to Payment Gateway ↗
                  </a>
                  <button onClick={() => {setStep('form'); setActiveTab('book');}} className="text-sm underline opacity-70 hover:opacity-100">Make another booking</button>
                </div>
              )}
            </>
          )}

          {/* --- TAB 2: GENERAL INQUIRY --- */}
          {activeTab === 'inquire' && (
            <form onSubmit={handleInquirySubmit} className="space-y-6 animate-in fade-in">
              <p className="text-sm text-gray-600 mb-6">Just have a quick question? Drop us a line and our guides will get back to you.</p>
              <div>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className="w-full p-4 border border-gray-300 rounded-sm outline-none focus:border-[#1A3626]" />
              </div>
              <div>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full p-4 border border-gray-300 rounded-sm outline-none focus:border-[#1A3626]" />
              </div>
              <div>
                <textarea required name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="How can we help?" className="w-full p-4 border border-gray-300 rounded-sm outline-none focus:border-[#1A3626]"></textarea>
              </div>
              <button type="submit" className="w-full bg-[#1A3626] text-white py-4 font-bold tracking-wider rounded-sm hover:bg-[#2C553C] transition-colors uppercase">
                Send Message
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

const Footer = ({ settings }) => (
  <footer className="bg-[#111] text-white py-16 px-6">
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12 mb-8">
      
      {/* Left Side: Logo, About, Socials */}
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-2 mb-6">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
            <path d="M8 3l4 8 5-5 5 15H2L8 3z" />
          </svg>
          <span className="font-bold text-xl tracking-wide">TrailSeeker <span className="font-light italic">Journeys</span></span>
        </div>
        <p className="text-gray-400 text-sm max-w-sm mb-8 leading-relaxed">
           {/* Fallback to original text if backend hasn't loaded */}
          {settings?.aboutText || "Small-group Himalayan treks since 2013. Guided by people who grew up walking these mountains."}
        </p>
        <div className="flex gap-4">
          <a href={settings?.socialLinks?.instagram || "#"} target="_blank" rel="noreferrer" className="w-10 h-10 border border-white/20 rounded flex items-center justify-center hover:bg-[#D35D47] transition-colors"><Camera className="w-5 h-5" /></a>
          <a href={settings?.socialLinks?.youtube || "#"} target="_blank" rel="noreferrer" className="w-10 h-10 border border-white/20 rounded flex items-center justify-center hover:bg-[#D35D47] transition-colors"><PlayCircle className="w-5 h-5" /></a>
          <a href={settings?.socialLinks?.mail || "#"} className="w-10 h-10 border border-white/20 rounded flex items-center justify-center hover:bg-[#D35D47] transition-colors"><Mail className="w-5 h-5" /></a>
        </div>
      </div>
      
      {/* Right Side: Explore Links */}
      <div>
        <h4 className="font-bold tracking-widest text-sm mb-6 uppercase text-white/50">Explore</h4>
        <ul className="space-y-4 text-gray-300">
          <li><Link to="/treks" className="hover:text-white transition-colors">All Treks</Link></li>
          <li><a href="#why-us" className="hover:text-white transition-colors">Why us</a></li>
          <li><a href="#voices" className="hover:text-white transition-colors">Stories</a></li>
          <li><a href="#plan" className="hover:text-white transition-colors">Plan a trek</a></li>
        </ul>
      </div>

      {/* Right Side: Reach Us Info */}
      <div>
        <h4 className="font-bold tracking-widest text-sm mb-6 uppercase text-white/50">Reach Us</h4>
        <ul className="space-y-4 text-gray-300">
          <li>{settings?.phone || "+91 98765 43210"}</li>
          <li className="text-[#D35D47]">{settings?.email || "hello@trailseeker.in"}</li>
          <li className="leading-relaxed whitespace-pre-line">
            {settings?.address || "Office no. 4, Sankri Bazaar,\nUttarakhand 249171"}
          </li>
        </ul>
      </div>
    </div>
    
    <div className="max-w-5xl mx-auto text-xs text-gray-500">
      © 2026 TrailSeeker Journeys. Walked, written, photographed by us.
    </div>
  </footer>
);

// --- MAIN EXPORT ---
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [settings, setSettings] = useState(null);

  // Fetch company settings from backend on load
  useEffect(() => {
    fetch('https://trailseeker-api.onrender.com/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error("Error fetching settings:", err));
  }, []);

  return (
    <div className="font-sans antialiased text-gray-900 bg-white">
      <NavigationOverlay isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} settings={settings} />
      <HeroSection setIsMenuOpen={setIsMenuOpen} />
      {/* Skipping CollectionSection for brevity, you can paste it back if needed! */}
      <StorySection settings={settings} />
      <TestimonialBanner />
      <ContactSection settings={settings} />
      <Footer settings={settings} />
    </div>
  );
}