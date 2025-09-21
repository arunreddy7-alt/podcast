"use client";
import React, { useState } from "react";

export default function PodcastLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-image-container bg-texture text-[#FFFFFF]">
      {/* Navbar */}
      <nav className="bg-transparent fixed top-0 left-0 w-full z-50 shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-2 flex items-center">
          {/* Logo */}
          <img
            src="/logo.png"
            alt="The Legacy Blueprint"
            className="h-20 w-auto text-[#D4AF37] filter brightness-0 invert mr-5"
           />

          {/* Desktop Links */}
          <div className="hidden md:flex gap-6 text-[#FFFFFF] ml-auto">
            <a href="#home" className="hover:text-[#D4AF37] transition">Home</a>
            <a href="#about" className="hover:text-[#D4AF37] transition">About</a>
            <a href="#episodes" className="hover:text-[#D4AF37] transition">Episodes</a>
            <a href="#contact" className="hover:text-[#D4AF37] transition">Contact</a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#FFFFFF] focus:outline-none ml-auto"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-transparent px-6 py-4 flex flex-col gap-4 text-[#FFFFFF]">
            <a href="#home" className="hover:text-[#D4AF37]" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#about" className="hover:text-[#D4AF37]" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#episodes" className="hover:text-[#D4AF37]" onClick={() => setMenuOpen(false)}>Episodes</a>
            <a href="#contact" className="hover:text-[#D4AF37]" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">Build People. Grow Businesses. Leave a Mark.</h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-[#F9F9F9] leading-relaxed">
            Welcome to <span className="text-[#D4AF37] font-semibold">The Legacy Blueprint</span> — a values-driven podcast about significance, not just success. Hosted by Dr. Chandrashekhar, each episode is a quiet invitation to pause, reflect, and design the legacy you're living every single day.
          </p>
          <a
            href="#episodes"
            className="bg-[#D4AF37] text-[#000000] px-8 py-4 rounded-full font-semibold hover:opacity-90 transition text-lg"
          >
            Listen Now
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 px-6 text-center max-w-3xl mx-auto bg-[#FFFFFF]/10 rounded-2xl backdrop-blur-md shadow-md mt-8">
        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">About the Podcast</h2>
        <p className="text-lg leading-relaxed text-[#F9F9F9]">
          We explore values-based leadership, personal development, mentorship, and how to build a lasting legacy that goes beyond traditional success.  
          <br /><br />
          It’s time to lead with intention, grow with purpose, and leave your mark on people, not just paper.
        </p>
      </section>

      {/* Episodes Section */}
      <section id="episodes" className="py-12 px-6 mt-12">
        <h2 className="text-2xl font-bold text-center text-[#D4AF37] mb-8">Latest Episodes</h2>
        <div className="grid gap-6 max-w-4xl mx-auto sm:grid-cols-2">
          {[
            { title: "Episode 1: Starting Your Legacy", date: "Sep 15, 2025" },
            { title: "Episode 2: Innovators' Roundtable", date: "Sep 22, 2025" },
            { title: "Episode 3: The Future of Tech", date: "Sep 29, 2025" },
            { title: "Episode 4: Mindset for Success", date: "Oct 6, 2025" },
          ].map((ep, index) => (
            <div
              key={index}
              className="bg-[#FFFFFF] text-[#000000] shadow-lg rounded-2xl p-6 hover:shadow-xl transition"
            >
              <h3 className="text-lg font-semibold text-[#1E3A8A] mb-2">{ep.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{ep.date}</p>
              <a
                href="#"
                className="text-[#D4AF37] font-medium hover:underline"
              >
                Listen →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 px-6 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">Contact Us</h2>
        <p className="text-lg text-[#F9F9F9]">
          Have questions or want to collaborate? Reach out to us at <span className="text-[#D4AF37]">legacy@podcast.com</span>.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-[#000000] text-[#FFFFFF] py-6 text-center mt-auto">
        <p className="text-sm">&copy; {new Date().getFullYear()} The Legacy Podcast. All rights reserved.</p>
      </footer>
    </div>
  );
}
