"use client";
import React, { useState, useEffect, useRef } from "react";

export default function PodcastLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  useEffect(() => {
    const handleAnchorClick = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const navbarHeight = 80; // Approximate navbar height
          const targetPosition = targetElement.offsetTop - navbarHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    // Add event listeners to all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleAnchorClick);
    });

    // Cleanup event listeners on unmount
    return () => {
      anchorLinks.forEach(link => {
        link.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f2f2f2] text-[#333333] font-poppins">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-50 shadow-md transition-transform duration-300 ${scrolled ? '-translate-y-4 bg-white' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-2 py-2 flex items-center">
          {/* Logo shifted slightly left */}
          <img
            src="/logo.png"
            alt="The Legacy Blueprint"
            className={`h-20 w-auto mr-18 -ml-26 transition-filter duration-300 ${scrolled ? 'filter brightness-0 invert-0' : 'filter brightness-0 invert'}`}
          />
          {/* Desktop Links */}
          <div className={`hidden md:flex gap-12 ml-auto transition-colors duration-300 ${scrolled ? 'text-black' : 'text-[#FFFFFF]'}`}>
            <a href="#home" className="hover:text-black transition">Home</a>
            <a href="#about" className="hover:text-black transition">About</a>
            <a href="#episodes" className="hover:text-black transition">Episodes</a>
            <a href="#contact" className="hover:text-black transition">Contact</a>
            <a href="#collaborate" className="hover:text-black transition">Collaborate</a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none ml-auto"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-transparent px-6 py-4 flex flex-col gap-4 text-white">
            <a href="#home" className="hover:text-white" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#about" className="hover:text-white" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#episodes" className="hover:text-white" onClick={() => setMenuOpen(false)}>Episodes</a>
            <a href="#contact" className="hover:text-white" onClick={() => setMenuOpen(false)}>Contact</a>
            <a href="#collaborate" className="hover:text-white" onClick={() => setMenuOpen(false)}>Collaborate</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-6 text-center relative"
        style={{
          backgroundImage: "url('/bg1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        {/* Content */}
        <div className="max-w-4xl mx-auto mt-20 md:mt-28 lg:mt-40">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-24 leading-tight whitespace-nowrap inline-block -ml-10 md:-ml-58 font-poppins text-[#FFFFFF] text-center">
            Build People. Grow Businesses. Leave a Mark.
          </h1>
        </div>
      </section>

      {/* About Section */}
<section
  id="about"
  className="py-16 px-8 text-center max-w-5xl mx-auto rounded-xl backdrop-blur-sm mt-12"
>
  <h2 className="text-4xl md:text-5xl font-bold text-[#1E2E42] mb-6 font-poppins">About us</h2>
  <p className="text-lg md:text-xl text-black leading-relaxed mb-8">
    Welcome to <span className="text-[#B69951] font-semibold">The Legacy Blueprint</span> — a values-driven podcast about significance, not just success. Hosted by Dr. Chandrashekhar, each episode is a quiet invitation to pause, reflect, and design the legacy you're living every single day.
  </p>

  {/* Video Container */}
  <div className="relative w-full max-w-4xl mx-auto mb-8">
    <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
      <video
        ref={videoRef}
        className="w-full h-full object-cover cursor-pointer"
        poster="/intro.jpg"
        preload="auto"
        onError={(e) => console.error('Video error:', e)}
        onClick={() => {
          if (videoRef.current) {
            if (videoRef.current.paused) {
              videoRef.current.play().then(() => {
                setIsPlaying(true);
              }).catch(error => {
                console.error('Error playing video:', error);
              });
            } else {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        }}
      >
        <source src="/intro-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={() => {
            if (videoRef.current) {
              if (videoRef.current.paused) {
                videoRef.current.play().then(() => {
                  setIsPlaying(true);
                }).catch(error => {
                  console.error('Error playing video:', error);
                });
              } else {
                videoRef.current.pause();
                setIsPlaying(false);
              }
            }
          }}
        >
          <div className="bg-black bg-opacity-50 rounded-full p-4">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}
    </div>
  </div>

  <p className="text-lg md:text-xl text-black leading-relaxed">
    We explore values-based leadership, personal development, mentorship, and how to build a lasting legacy that goes beyond traditional success.
    It's time to lead with intention, grow with purpose, and leave your mark on people, not just paper.
  </p>
</section>

{/* Episodes Section */}
<section
  id="episodes"
  className="relative py-28 px-6 bg-gradient-to-b from-[#1E3A8A]/10 to-[#F9F9F9] overflow-hidden"
>
  {/* Subtle abstract shapes */}
  <div className="absolute -top-20 -left-32 w-96 h-96 bg-[#D4AF37]/10 rounded-full filter blur-3xl"></div>
  <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-[#1E3A8A]/10 rounded-full filter blur-3xl"></div>

  <h2 className="relative text-5xl md:text-6xl font-bold text-center text-[#1E2E42] mb-20 font-poppins z-10">
    Latest Episodes
  </h2>

  <div className="relative flex flex-col gap-24 max-w-7xl mx-auto z-10">
    {/* Episode 3 - Image Left */}
    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
      <div className="md:w-1/2">
        <img
          src="/ep03.jpg"
          alt="EP03 | Design Your Destiny"
          className="w-full max-h-[28rem] md:max-h-[32rem] object-contain rounded-2xl shadow-2xl"
        />
      </div>
      <div className="md:w-1/2 flex flex-col gap-6">
        <h3 className="text-3xl md:text-4xl font-bold text-[#1E2E42]">
          EP03 | Design Your Destiny: Reverse-Engineering Your Legacy Vision
        </h3>
        <a href="https://youtu.be/A4BkuRFrDY0?si=oHemWId1OA4FhD_4" target="_blank" className="text-[#1E2E42] hover:underline font-semibold">
          Watch Trailer
        </a>
        <p className="text-lg md:text-xl text-[#000000] leading-relaxed">
          This episode offers a structured personal development tool to envision your future impact. Learn how to align your choices today with the legacy you want to be remembered for tomorrow.
        </p>
        <div className="flex gap-2 flex-wrap mt-2">
          <a href="https://open.spotify.com/episode/6YAd9bi9tjOshxmGDslTVh?si=fa279ded9fa94fb0" className="bg-[#B69951] text-[#000000] px-3 py-2 rounded-md font-semibold hover:scale-105 transition transform text-sm">Listen in Spotify</a>
          <a href="https://podcasts.apple.com/in/podcast/the-legacy-blueprint-with-csk/id1833255700?i=1000727064950" className="bg-[#1E2E42] text-[#FFFFFF] px-3 py-2 rounded-md font-semibold hover:scale-105 transition transform text-sm">Watch on Apple Podcast</a>
          <a href="https://youtu.be/A4BkuRFrDY0?si=oHemWId1OA4FhD_4" className="bg-[#FFFFFF] border border-[#1E3A8A] text-[#1E3A8A] px-3 py-2 rounded-md font-semibold hover:scale-105 transition transform text-sm">Watch on YouTube</a>
        </div>
      </div>
    </div>

    {/* Episode 2 - Image Right */}
    <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-16">
      <div className="md:w-1/2">
        <img
          src="/ep02.jpg"
          alt="EP02 | Unpacking the 3 Pillars"
          className="w-full max-h-[28rem] md:max-h-[32rem] object-contain rounded-2xl shadow-2xl"
        />
      </div>
      <div className="md:w-1/2 flex flex-col gap-6">
        <h3 className="text-3xl md:text-4xl font-bold text-[#1E2E42]">
          EP02 | Unpacking the 3 Pillars of a Powerful Legacy
        </h3>
        <a href="https://youtu.be/DxPu76zLzbM?si=9ZfXkpQNMN5e3NFp" target="_blank" className="text-[#1E2E42] hover:underline font-semibold">
          Watch Trailer
        </a>
        <p className="text-lg md:text-xl text-[#000000] leading-relaxed">
          Explore the foundational principles of legacy building: Build People. Grow Businesses. Leave a Mark. Featuring insights from the life of Ratan Tata and how these pillars empower leadership and lasting change.
        </p>
        <div className="flex gap-2 flex-wrap mt-2">
          <a href="https://open.spotify.com/episode/0YpGbT7gRxNUvkJecDakPg?si=e7efc653133c40ad" className="bg-[#B69951] text-[#000000] px-3 py-2 rounded-md font-semibold hover:scale-105 transition transform text-sm">Listen in Spotify</a>
          <a href="https://podcasts.apple.com/in/podcast/the-legacy-blueprint-with-csk/id1833255700?i=1000724132239" className="bg-[#1E2E42] text-[#FFFFFF] px-3 py-2 rounded-md font-semibold hover:scale-105 transition transform text-sm">Watch on Apple Podcast</a>
          <a href="https://youtu.be/DxPu76zLzbM?si=9ZfXkpQNMN5e3NFp" className="bg-[#FFFFFF] border border-[#1E3A8A] text-[#1E3A8A] px-3 py-2 rounded-md font-semibold hover:scale-105 transition transform text-sm">Watch on YouTube</a>
        </div>
      </div>
    </div>

    {/* Episode 1 - Image Left */}
    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
      <div className="md:w-1/2">
        <img
          src="/ep01.jpg"
          alt="EP01 | Beyond Money & Monuments"
          className="w-full max-h-[28rem] md:max-h-[32rem] object-contain rounded-2xl shadow-2xl"
        />
      </div>
      <div className="md:w-1/2 flex flex-col gap-6">
        <h3 className="text-3xl md:text-4xl font-bold text-[#1E2E42]">
          EP01 | Beyond Money & Monuments: What's Your True Mark?
        </h3>
        <a href="https://youtu.be/jTqLnlQO9Ro?si=1SG80K-BQVbKfBj-" target="_blank" className="text-[#1E2E42] hover:underline font-semibold">
          Watch Trailer
        </a>
        <p className="text-lg md:text-xl text-[#000000] leading-relaxed">
          In the very first episode of The Legacy Blueprint, we ask a timeless question: beyond wealth and recognition, what truly defines your legacy? This podcast sets the tone for all future episodes on significance, purpose, and intentional impact.
        </p>
        <div className="flex gap-2 flex-wrap mt-2">
          <a href="https://open.spotify.com/episode/65uL5CyzsWzUOafWxlyBhE?si=c8d56d1d10414b70" className="bg-[#B69951] text-[#000000] px-3 py-2 rounded-md font-semibold hover:scale-105 transition transform text-sm">Listen in Spotify</a>
          <a href="https://podcasts.apple.com/in/podcast/the-legacy-blueprint-with-csk/id1833255700?i=1000721960129" className="bg-[#1E2E42] text-[#FFFFFF] px-3 py-2 rounded-md font-semibold hover:scale-105 transition transform text-sm">Watch on Apple Podcast</a>
          <a href="https://youtu.be/jTqLnlQO9Ro?si=1SG80K-BQVbKfBj-" className="bg-[#FFFFFF] border border-[#1E3A8A] text-[#1E3A8A] px-3 py-2 rounded-md font-semibold hover:scale-105 transition transform text-sm">Watch on YouTube</a>
        </div>
      </div>
    </div>
  </div>
</section>

    {/* Contact Section */}
{/* Contact Section */}
<section
  id="contact"
  className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-[#1E3A8A]/10 to-[#F9F9F9]"
>
  <div className="relative max-w-7xl mx-auto z-10 text-center">
    <h2 className="text-5xl md:text-6xl font-bold text-[#1E2E42] mb-4 font-poppins">
      Contact & Connect
    </h2>
    <p className="text-lg md:text-xl text-[#000000] leading-relaxed mb-8">
      Have questions or want to collaborate? Reach out to us
      <span className="text-[#B69951] font-semibold"></span>
    </p>
    <div className="flex gap-4 w-full">
      <button
        onClick={() => {
          setModalType('contact');
          setShowModal(true);
        }}
        className="flex-1 bg-[#B69951] text-[#000000] px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition text-lg"
      >
        Contact Us
      </button>
      <button
        onClick={() => {
          setModalType('collaborate');
          setShowModal(true);
        }}
        className="flex-1 bg-[#1E2E42] text-[#FFFFFF] px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition text-lg"
      >
        Collaborate
      </button>
    </div>
  </div>
</section>


{/* Footer */}
<footer id="collaborate" className="relative py-32 px-6 bg-gradient-to-b from-[#1E3A8A]/10 to-[#F9F9F9] overflow-hidden">
  {/* Background Minimal Creative Shapes */}
  <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#D4AF37]/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
  <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#1E3A8A]/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
  <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#D4AF37]/5 rounded-full filter blur-2xl -translate-x-1/2 -translate-y-1/2"></div>

  {/* Content Container */}
  <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-16">

    {/* Left Side: Logo & Channel Links */}
    <div className="flex-1 flex flex-col items-center gap-2 relative lg:translate-y-[40px]">
      {/* Podcast Logo */}
      <img
        src="/logo1.png"
        alt="The Legacy Blueprint"
        className="h-100 w-auto"
      />

      {/* Channel Links */}
      <h3 className="text-2xl font-bold text-[#1E2E42] mb-4 self-center">Follow Us</h3>
      <div className="flex gap-8 mt-2 justify-center">
        <a href="https://youtube.com/@thelegacyblueprintwithcsk?si=xCVmd4C23WFBL06W" target="_blank">
          <img src="/icons/youtube.png" alt="YouTube" className="h-14 w-14 hover:scale-110 transition-transform" />
        </a>
        <a href="https://open.spotify.com/show/7BXnKMsNxJXgtq3SyKxSFj?si=90172b1285e34a17" target="_blank">
          <img src="/icons/spotify.png" alt="Spotify" className="h-14 w-14 hover:scale-110 transition-transform" />
        </a>
        <a href="https://podcasts.apple.com/in/podcast/the-legacy-blueprint-with-csk/id1833255700" target="_blank">
          <img src="/icons/apple-podcast.png" alt="Apple Podcast" className="h-14 w-14 hover:scale-110 transition-transform" />
        </a>
        <a href="https://www.instagram.com/the.legacy.blueprint.with.csk?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank">
          <img src="/icons/instagram.png" alt="Instagram" className="h-14 w-14 hover:scale-110 transition-transform" />
        </a>
      </div>
    </div>

    {/* Right Side: Collaboration Form */}
    <section className="flex-1 bg-white/20 backdrop-blur-md rounded-2xl p-10 shadow-lg w-full max-w-lg">
      <h3 className="text-2xl font-bold text-[#B69951] mb-6 text-center lg:text-left">Collaborate With Us</h3>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your Name"
          required
          className="px-4 py-3 rounded-md text-[#1E2E42] focus:outline-none"
        />
        <input
          type="email"
          placeholder="Your Email"
          required
          className="px-4 py-3 rounded-md text-[#1E2E42] focus:outline-none"
        />
        <textarea
          placeholder="Message / Collaboration Idea"
          required
          className="px-4 py-3 rounded-md text-[#1E2E42] focus:outline-none"
          rows={5}
        />
        <button
          type="submit"
          className="bg-[#B69951] text-[#000000] px-6 py-3 rounded-md font-semibold hover:opacity-90 transition mt-2"
        >
          Send
        </button>
      </form>
    </section>
  </div>
</footer>

  {/* Modal */}
  {showModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setShowModal(false)}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>

        <h3 className="text-2xl font-bold text-[#1E2E42] mb-6 text-center">
          {modalType === 'contact' ? 'Contact Us' : 'Collaborate With Us'}
        </h3>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B69951]"
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B69951]"
          />
          <textarea
            placeholder={modalType === 'contact' ? 'Your Message' : 'Collaboration Idea'}
            required
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B69951]"
          />
          <button
            type="submit"
            className="w-full bg-[#B69951] text-[#000000] px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {modalType === 'contact' ? 'Send Message' : 'Submit Collaboration'}
          </button>
        </form>
      </div>
    </div>
  )}
    </div>

  );
}
