
"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

export default function PodcastLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const aboutH2Ref = useRef(null);
  const episodesRef = useRef(null);
  const contactRef = useRef(null);
  const footerRef = useRef(null);
  const videoContainerRef = useRef(null);
  const ep01ImageRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

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

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === ep01ImageRef.current) {
            entry.target.classList.add('animate-fadeInFromLeft');
          } else if (entry.target === videoContainerRef.current) {
            entry.target.classList.add('animate-fadeInFromRight');
          } else {
            entry.target.classList.add('animate-slideUp');
          }
        }
      });
    }, observerOptions);

    if (heroRef.current) observer.observe(heroRef.current);
    if (aboutRef.current) observer.observe(aboutRef.current);
    if (episodesRef.current) observer.observe(episodesRef.current);
    const episodes = document.querySelectorAll('.episode');
    episodes.forEach(episode => observer.observe(episode));
    if (contactRef.current) observer.observe(contactRef.current);
    if (footerRef.current) observer.observe(footerRef.current);
    if (videoContainerRef.current) observer.observe(videoContainerRef.current);
    if (ep01ImageRef.current) observer.observe(ep01ImageRef.current);

    return () => observer.disconnect();
  }, []);

  const LoadingComponent = () => (
    <div className="fixed inset-0 bg-gradient-to-b from-[#ADD8E6] to-[#ffffff] flex flex-col items-center justify-center z-50 text-black">
      <div className="animate-slideDown mb-4">
        <Image
          src="/logo1.png"
          alt="The Legacy Blueprint"
          width={600}
          height={600}
          className="w-auto h-150"
        />
      </div>
      <h1 className="text-2xl font-bold animate-slideUp text-center">
      </h1>
    </div>
  );

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f2f2f2] text-[#333333] font-poppins">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-50 shadow-md transition-all duration-300 ${scrolled ? '-translate-y-4 bg-white shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4 md:px-2 py-2 flex items-center">
          {/* Logo shifted slightly left */}
          <Image
            src="/logo.png"
            alt="The Legacy Blueprint"
            width={200}
            height={80}
            className={`h-16 md:h-20 w-auto mr-4 md:mr-18 -ml-2 md:-ml-26 transition-filter duration-300 ${scrolled ? 'filter brightness-0 invert-0' : 'filter brightness-0 invert'}`}
            priority
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
            className={`md:hidden focus:outline-none ml-auto ${scrolled ? 'text-black' : 'text-white'}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className={`md:hidden px-6 py-4 flex flex-col gap-4 ${scrolled ? 'bg-white text-black' : 'bg-black/60 text-white'}`}>
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
        ref={heroRef}
        className="min-h-screen flex items-center justify-center px-6 text-center relative animate-fadeIn"
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
        <div className="max-w-4xl md:max-w-none mx-auto mt-24 md:mt-28 lg:mt-40 px-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-10 md:mb-24 leading-tight font-poppins text-[#FFFFFF] text-center md:inline-block md:whitespace-nowrap animate-slideUp animate-glow">
            Build People. Grow Businesses. Leave a Mark.
            </h1>
        </div>
      </section>

      {/* About Section */}
<section
  id="about"
  ref={aboutRef}
  className="py-16 px-8 text-center max-w-5xl mx-auto rounded-xl backdrop-blur-sm mt-12"
>
  <div className="flex items-center justify-center gap-4 mb-4 md:mb-6">
    <Image
      src="/9915506-removebg-preview.png"
      alt="About Us Image"
      width={120}
      height={120}
      className="rounded-full -ml-8 md:-ml-35 w-12 h-12 md:w-30 md:h-30"
    />
    <h2 className="text-3xl md:text-5xl font-bold text-[#1E2E42] font-poppins -ml-4 md:ml-0 animate-fadeIn">About us</h2>
  </div>
  <p className="text-base md:text-xl text-black leading-relaxed mb-6 md:mb-8">
    Welcome to <span className="text-[#B69951] font-semibold">The Legacy Blueprint</span> — a values-driven podcast about significance, not just success. Hosted by Dr. Chandrashekhar, each episode is a quiet invitation to pause, reflect, and design the legacy you&apos;re living every single day.
  </p>

  {/* Video Container */}
  <div ref={videoContainerRef} className="relative w-full max-w-4xl mx-auto mb-8">
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
                setOverlayVisible(false);
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
          className={`absolute inset-0 flex items-center justify-center cursor-pointer video-overlay-fade ${overlayVisible ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => {
            if (videoRef.current) {
              if (videoRef.current.paused) {
                videoRef.current.play().then(() => {
                  setIsPlaying(true);
                  setOverlayVisible(false);
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

  <p className="text-base md:text-xl text-black leading-relaxed">
    We explore values-based leadership, personal development, mentorship, and how to build a lasting legacy that goes beyond traditional success.
    It&apos;s time to lead with intention, grow with purpose, and leave your mark on people, not just paper.
  </p>
</section>

{/* Episodes Section */}
<section
  id="episodes"
  ref={episodesRef}
  className="relative py-28 px-6 bg-gradient-to-b from-[#1E3A8A]/10 to-[#F9F9F9] overflow-hidden"
>
  {/* Subtle abstract shapes */}
  <div className="absolute -top-20 -left-32 w-96 h-96 bg-[#D4AF37]/10 rounded-full filter blur-3xl"></div>
  <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-[#1E3A8A]/10 rounded-full filter blur-3xl"></div>

  <h2 className="relative text-4xl md:text-6xl font-bold text-center text-[#1E2E42] mb-10 md:mb-20 font-poppins z-10 animate-fadeIn">
    Latest Episodes
  </h2>

  <div className="relative max-w-7xl mx-auto z-10">
    <div className="flex flex-col gap-25">
      {/* Episode 3 - Image Left */}
      <div className="episode flex flex-col md:flex-row items-center gap-16 md:gap-20">
      <div className="md:w-1/2">
        <Image
          src="/ep03.jpg"
          alt="EP03 | Design Your Destiny"
          width={400}
          height={300}
          className="w-full max-h-[28rem] md:max-h-[32rem] object-contain rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        />
      </div>
      <div className="md:w-1/2 flex flex-col gap-6">
        <h3 className="text-3xl md:text-4xl font-bold text-[#1E2E42]">
          EP03 | Design Your Destiny: Reverse-Engineering Your Legacy Vision
        </h3>
        <a href="https://youtu.be/A4BkuRFrDY0?si=oHemWId1OA4FhD_4" target="_blank" className="text-[#B69951] hover:underline font-semibold">
          Watch Trailer
        </a>
        <p className="text-lg md:text-xl text-[#000000] leading-relaxed">
          This episode offers a structured personal development tool to envision your future impact. Learn how to align your choices today with the legacy you want to be remembered for tomorrow.
        </p>
        <div className="flex gap-2 flex-wrap mt-2">
          <a href="https://open.spotify.com/episode/6YAd9bi9tjOshxmGDslTVh?si=fa279ded9fa94fb0" className="bg-[#B69951] text-[#000000] px-3 py-2 rounded-md font-semibold hover:scale-105 transition transform text-sm">Listen on Spotify</a>
          <a href="https://podcasts.apple.com/in/podcast/the-legacy-blueprint-with-csk/id1833255700?i=1000727064950" className="bg-[#1E2E42] text-[#FFFFFF] px-3 py-2 rounded-md font-semibold hover:scale-105 transition transform text-sm">Listen on Apple Podcast</a>
          <a href="https://youtu.be/A4BkuRFrDY0?si=oHemWId1OA4FhD_4" className="bg-[#FFFFFF] border border-[#1E3A8A] text-[#1E3A8A] px-3 py-2 rounded-md font-semibold hover:scale-105 transition transform text-sm">Watch on YouTube</a>
        </div>
      </div>
    </div>

    {/* Episode 2 - Image Right */}
    <div className="episode flex flex-col md:flex-row-reverse items-center gap-24 md:gap-32">
      <div className="md:w-1/2">
        <Image
          src="/ep02.jpg"
          alt="EP02 | Unpacking the 3 Pillars"
          width={400}
          height={300}
          className="w-full max-h-[28rem] md:max-h-[32rem] object-contain rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        />
      </div>
      <div className="md:w-1/2 flex flex-col gap-6 -mt-5 md:mt-0">
        <h3 className="text-3xl md:text-4xl font-bold text-[#1E2E42]">
          EP02 | Unpacking the 3 Pillars of a Powerful Legacy
        </h3>
        <a href="https://youtu.be/DxPu76zLzbM?si=9ZfXkpQNMN5e3NFp" target="_blank" className="text-[#B69951] hover:underline font-semibold">
          Watch Trailer
        </a>
        <p className="text-lg md:text-xl text-[#000000] leading-relaxed">
          Explore the foundational principles of legacy building: Build People. Grow Businesses. Leave a Mark. Featuring insights from the life of Ratan Tata and how these pillars empower leadership and lasting change.
        </p>
        <div className="flex gap-2 flex-wrap mt-2">
          <a href="https://open.spotify.com/episode/0YpGbT7gRxNUvkJecDakPg?si=e7efc653133c40ad" className="bg-[#B69951] text-[#000000] px-3 py-2 rounded-md font-semibold hover:scale-105 transition transform text-sm">Listen on Spotify</a>
          <a href="https://podcasts.apple.com/in/podcast/the-legacy-blueprint-with-csk/id1833255700?i=1000724132239" className="bg-[#1E2E42] text-[#FFFFFF] px-3 py-2 rounded-md font-semibold hover:scale-105 transition transform text-sm">Listen on Apple Podcast</a>
          <a href="https://youtu.be/DxPu76zLzbM?si=9ZfXkpQNMN5e3NFp" className="bg-[#FFFFFF] border border-[#1E3A8A] text-[#1E3A8A] px-3 py-2 rounded-md font-semibold hover:scale-105 transition transform text-sm">Watch on YouTube</a>
        </div>
      </div>
    </div>

    {/* Episode 1 - Image Left */}
    <div className="episode flex flex-col md:flex-row items-center gap-12 md:gap-16">
      <div className="md:w-1/2" ref={ep01ImageRef}>
        <Image
          src="/ep01.jpg"
          alt="EP01 | Beyond Money & Monuments"
          width={400}
          height={300}
          className="w-full max-h-[28rem] md:max-h-[32rem] object-contain rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        />
      </div>
      <div className="md:w-1/2 flex flex-col gap-6">
        <h3 className="text-3xl md:text-4xl font-bold text-[#1E2E42]">
          EP01 | Beyond Money & Monuments: What&apos;s Your True Mark?
        </h3>
        <a href="https://youtu.be/jTqLnlQO9Ro?si=1SG80K-BQVbKfBj-" target="_blank" className="text-[#B69951] hover:underline font-semibold">
          Watch Trailer
        </a>
        <p className="text-lg md:text-xl text-[#000000] leading-relaxed">
          In the very first episode of The Legacy Blueprint, we ask a timeless question: beyond wealth and recognition, what truly defines your legacy? This podcast sets the tone for all future episodes on significance, purpose, and intentional impact.
        </p>
        <div className="flex gap-2 flex-wrap mt-2">
          <a href="https://open.spotify.com/episode/65uL5CyzsWzUOafWxlyBhE?si=c8d56d1d10414b70" className="bg-[#B69951] text-[#000000] px-3 py-2 rounded-md font-semibold hover:scale-105 transition transform text-sm">Listen on Spotify</a>
          <a href="https://podcasts.apple.com/in/podcast/the-legacy-blueprint-with-csk/id1833255700?i=1000721960129" className="bg-[#1E2E42] text-[#FFFFFF] px-3 py-2 rounded-md font-semibold hover:scale-105 transition transform text-sm">Listen on Apple Podcast</a>
          <a href="https://youtu.be/jTqLnlQO9Ro?si=1SG80K-BQVbKfBj-" className="bg-[#FFFFFF] border border-[#1E3A8A] text-[#1E3A8A] px-3 py-2 rounded-md font-semibold hover:scale-105 transition transform text-sm">Watch on YouTube</a>
        </div>
      </div>
    </div>
    </div>
  </div>
</section>

    {/* Contact Section */}
{/* Contact Section */}
<section
  id="contact"
  ref={contactRef}
  className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-[#1E3A8A]/10 to-[#F9F9F9]"
>
    <div className="relative max-w-7xl mx-auto z-10 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-12 px-4">
    <div className="flex-shrink-0">
  <Image
    src="/Avatar With BG.png"
    alt="Avatar"
    width={500}
    height={500}
    className="w-72 h-72 md:w-96 md:h-96 rounded-lg object-cover"
    priority={false}
  />
</div>
      <div className="text-center lg:text-left flex-1 max-w-2xl">
        <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
          <h2 className="text-4xl md:text-6xl font-bold text-[#1E2E42] font-poppins whitespace-nowrap animate-fadeIn">
          Let&apos;s Connect!
          </h2>
          <Image
            src="/19294-removebg-preview (1).png"
            alt="Connect Icon"
            width={140}
            height={140}
            className="w-20 h-20 md:w-35 md:h-35 rounded-full -translate-y-2"
          />
        </div>
        <p className="text-lg md:text-xl text-[#000000] leading-relaxed mb-8">
          Have questions or want to collaborate? Reach out to us!
          <span className="text-[#B69951] font-semibold"></span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start">
          <button
            onClick={() => {
              setModalType('contact');
              setShowModal(true);
            }}
            className="flex-1 bg-[#B69951] text-[#000000] px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition text-lg max-w-xs"
          >
            Subscribe to Newsletter
          </button>
          <button
            onClick={() => {
              setModalType('collaborate');
              setShowModal(true);
            }}
            className="flex-1 bg-[#1E2E42] text-[#FFFFFF] px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition text-lg max-w-xs"
          >
            Feature in the Podcast
          </button>
        </div>
      </div>
    </div>
</section>


{/* Footer */}
<footer id="collaborate" ref={footerRef} className="relative py-32 px-6 bg-gradient-to-b from-[#1E3A8A]/10 to-[#F9F9F9] overflow-hidden">
  {/* Background Minimal Creative Shapes */}
  <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#D4AF37]/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
  <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#1E3A8A]/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
  <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#D4AF37]/5 rounded-full filter blur-2xl -translate-x-1/2 -translate-y-1/2"></div>

  {/* Content Container */}
  <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-16">

    {/* Left Side: Logo & Channel Links */}
    <div className="order-2 lg:order-1 flex-1 flex flex-col items-center gap-2 relative lg:translate-y-[30px]">
      {/* Podcast Logo */}
      <Image
        src="/logo1.png"
        alt="The Legacy Blueprint"
        width={200}
        height={100}
        className="h-100 w-auto lg:-translate-y-[90px]"
      />

      {/* Channel Links */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 lg:translate-x-[-50px]">
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-bold text-[#1E2E42] mb-3">Listen on</h3>
          <div className="flex gap-8 mt-2 justify-center">
            <a href="https://youtube.com/@thelegacyblueprintwithcsk?si=xCVmd4C23WFBL06W" target="_blank">
              <Image src="/icons/youtube.png" alt="YouTube" width={56} height={56} className="h-12 w-12 hover:scale-110 transition-transform" />
            </a>
            <a href="https://open.spotify.com/show/7BXnKMsNxJXgtq3SyKxSFj?si=90172b1285e34a17" target="_blank">
              <Image src="/icons/spotify.png" alt="Spotify" width={56} height={56} className="h-12 w-12 hover:scale-110 transition-transform" />
            </a>
            <a href="https://podcasts.apple.com/in/podcast/the-legacy-blueprint-with-csk/id1833255700" target="_blank">
              <Image src="/icons/apple-podcast.png" alt="Apple Podcast" width={56} height={56} className="h-12 w-12 hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center lg:translate-x-[80px]">
          <h3 className="text-xl font-bold text-[#1E2E42] mb-3">Follow us</h3>
          <div className="flex gap-8 mt-2 justify-center flex-wrap">
            <a href="https://www.facebook.com/CSKspeaks/" target="_blank">
              <Image src="/icons/facebook.png" alt="Facebook" width={56} height={56} className="h-11 w-11 hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.linkedin.com/company/csk-speaks/" target="_blank">
              <Image src="/icons/linkedin.png" alt="LinkedIn" width={56} height={56} className="h-11 w-11 hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.instagram.com/the.legacy.blueprint.with.csk?igsh=MWMwN2c1MDcxZTE4Mg%3D%3D" target="_blank">
              <Image src="/icons/instagram.png" alt="Instagram" width={56} height={56} className="h-11 w-11 hover:scale-110 transition-transform" />
            </a>
            <a href="https://cskspeaks.com/" target="_blank">
              <Image src="/icons/website.png" alt="Website" width={56} height={56} className="h-11 w-11 hover:scale-110 transition-transform" />
            </a>

          </div>

        </div>

      </div>
    </div>

    {/* Right Side: Collaboration Form */}
    <section className="order-1 lg:order-2 flex-1 bg-white/20 backdrop-blur-md rounded-2xl p-6 md:p-10 shadow-lg w-full max-w-lg lg:-translate-y-[100px]">
      <h3 className="text-2xl font-bold text-[#B69951] mb-6 text-center lg:text-left animate-fadeIn">Feature in the Podcast</h3>
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
        <input
            type="tel"
            placeholder="Your Phone Number"
            required
            className="w-full px-4 py-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B69951]"
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
      <div className="mt-11 md:-mt-19 md:ml-195 text-center text-lg text-[#1E2E42]">
        <p className="mb-1 font-bold">Email: csk@cskspeaks.com</p>
        <p className="mb-1 font-bold">Phone: +91 9949488181</p>
      </div>
      <hr className="my-9 border-[#1E2E42] opacity-50 mt-20" />
      <p className="text-center text-sm text-[#1E2E42] mt-1">&copy; 2025 The Legacy Blueprint. All rights reserved.</p>
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
      <div className={`relative bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transition-all duration-300 transform ${showModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>

        <h3 className="text-2xl font-bold text-[#1E2E42] mb-6 text-center">
          {modalType === 'contact' ? 'Subscribe to Newsletter' : 'Feature in the Podcast'}
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
          <input
            type="tel"
            placeholder="Your Phone Number"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B69951]"
          />
          {modalType === 'collaborate' && (
            <>
              <input
                type="text"
                placeholder="Tentative Date & Location"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B69951]"
              />
            </>
          )}
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
