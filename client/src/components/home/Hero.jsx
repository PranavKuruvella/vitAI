import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Hero = () => {

  const { user } = useSelector(state => state.auth)

  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <>
      <style>
        {`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}
      </style>

      {/* Navbar */}
      <nav className="fixed top-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 bg-white text-slate-900 text-sm border-b border-slate-200/60">
        <a href="https://prebuiltui.com">
          <img src="/vitai.svg" alt="logo" className='h-18 w-auto' />
        </a>

        <div className="hidden md:flex items-center gap-8 transition duration-500 font-medium">
          <a href="#" className="hover:text-indigo-600 transition-colors">Home</a>
          <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
          <a href="#testimonials" className="hover:text-indigo-600 transition-colors">Testimonials</a>
          <a href="#contact" className="hover:text-indigo-600 transition-colors">Contact</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Link to={'/app?state=login'} className="px-6 py-2.5 bg-transparent border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-full font-medium transition-all active:scale-95">
                Login
              </Link>
              <Link to={'/app?state=register'} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-all active:scale-95 shadow-lg shadow-indigo-500/30">
                Get Started
              </Link>
            </>
          ) : (
            <Link to={'/app'} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-all active:scale-95 shadow-lg shadow-indigo-500/30">
              Dashboard
            </Link>
          )}
        </div>

        <button onClick={() => setMenuOpen(true)} className="md:hidden active:scale-90 transition text-slate-900">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><path d="M4 5h16" /><path d="M4 12h16" /><path d="M4 19h16" /></svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-100 bg-white/90 backdrop-blur-xl text-slate-900 flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <a href="#" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
        <a href="#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>

        <div className="flex flex-col gap-4 mt-4">
          {!user ? (
            <>
              <Link to={'/app?state=login'} onClick={() => setMenuOpen(false)} className="px-8 py-3 bg-transparent border border-slate-300 rounded-full text-center">Login</Link>
              <Link to={'/app?state=register'} onClick={() => setMenuOpen(false)} className="px-8 py-3 bg-indigo-600 text-white rounded-full text-center">Get Started</Link>
            </>
          ) : (
            <Link to={'/app'} onClick={() => setMenuOpen(false)} className="px-8 py-3 bg-indigo-600 text-white rounded-full text-center">Dashboard</Link>
          )}
        </div>

        <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-32 bg-white text-slate-900 pt-32 pb-20 overflow-hidden min-h-screen">
        <div className="absolute top-20 -z-1 left-1/4 size-96 bg-indigo-300/30 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute top-40 -z-1 right-1/4 size-72 bg-indigo-400/20 blur-[120px] rounded-full"></div>

        <div className="flex items-center mt-10 md:mt-16 mb-6">
          <div className="flex -space-x-3 pr-4">
            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="user1" className="size-9 rounded-full border-2 border-white hover:-translate-y-0.5 transition z-10" />
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="user2" className="size-9 rounded-full border-2 border-white hover:-translate-y-0.5 transition z-20" />
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user3" className="size-9 rounded-full border-2 border-white hover:-translate-y-0.5 transition z-30" />
            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="user4" className="size-9 rounded-full border-2 border-white hover:-translate-y-0.5 transition z-40" />
          </div>
          <div>
            <div className="flex mb-1">
              {Array(5).fill(0).map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#6366f1" stroke="none" className="lucide lucide-star" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
              ))}
            </div>
            <p className="text-xs text-slate-500">Used by <span className="font-semibold text-slate-900">100,000+</span> users</p>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-semibold max-w-4xl text-center leading-[1.1] md:leading-[1.1] tracking-tight text-slate-900">
          Land your dream job with <span className="text-indigo-600">AI-powered</span> Resume!
        </h1>

        <p className="text-base md:text-lg text-center text-slate-600 max-w-xl mt-6 leading-relaxed">
          Create, edit and download professional resumes with AI-powered assistance in minutes. No complexity. Just results.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full justify-center px-4">
          <Link to={'/app'} className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-all hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95 text-center flex items-center justify-center gap-2">
            Get started
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </Link>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 border border-slate-300 hover:bg-slate-50 transition rounded-full px-8 py-3.5 font-medium text-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" /><rect x="2" y="6" width="14" height="12" rx="2" /></svg>
            <span>Watch demo</span>
          </button>
        </div>

        <div className="relative mt-16 md:mt-24 p-2 bg-white rounded-[20px] max-w-5xl w-full border border-slate-200/60 shadow-xl shadow-slate-200/50">
          <div className="absolute inset-x-0 -top-20 h-40 bg-indigo-500/10 blur-[80px] rounded-full mx-auto w-3/4"></div>
          <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/hero-section-showcase-2.png"
            className="w-full rounded-2xl border border-slate-100 relative z-10"
            alt="Resume Builder Dashboard"
          />
        </div>

      </div>
    </>
  );
}
export default Hero;