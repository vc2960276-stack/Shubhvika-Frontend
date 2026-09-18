import React from "react";
import { Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#1A1110] text-[#EFE6DD] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          {/* Logo Image + Brand Name */}
          <Link to="/" className="inline-flex items-center gap-3.5 group">
            <img
              src="/logo.png"
              alt="SHUBHVIKA Emblem"
              className="h-12 md:h-14 w-auto object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
            />
            <span className="font-serif text-2xl md:text-3xl tracking-[0.28em] text-[#EFE6DD] uppercase">
              SHUBHVIKA
            </span>
          </Link>

          <p className="mt-4 text-sm text-[#EFE6DD]/60 max-w-sm leading-relaxed">
            Fashion that speaks before you do. Editorial pieces crafted for the modern wardrobe — considered, tactile, timeless.
          </p>

          <div className="mt-6 flex items-center gap-4">
            <a href="#" aria-label="Instagram" className="hover:text-[#C89D66] transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="#" aria-label="Facebook" className="hover:text-[#C89D66] transition-colors"><Facebook className="w-4 h-4" /></a>
            <a href="#" className="hx-eyebrow hover:text-[#C89D66] transition-colors">Pinterest</a>
            <a href="#" className="hx-eyebrow hover:text-[#C89D66] transition-colors">WhatsApp</a>
          </div>
        </div>

        <div>
          <div className="hx-eyebrow text-[#C89D66] mb-4">Customer Care</div>
          <ul className="space-y-2 text-sm">
            <li><a href="/contact" className="hover:text-[#C89D66] transition-colors">Contact Us</a></li>
            <li><a href="/shipping" className="hover:text-[#C89D66] transition-colors">Shipping & Delivery</a></li>
            <li><a href="/returns" className="hover:text-[#C89D66] transition-colors">Return Policy</a></li>
            <li><a href="/refund-policy" className="hover:text-[#C89D66] transition-colors">Refund Policy</a></li>
            <li><a href="/privacy-policy" className="hover:text-[#C89D66] transition-colors">Privacy Policy</a></li>
            <li><a href="/terms-conditions" className="hover:text-[#C89D66] transition-colors">Terms & Conditions</a></li>
          </ul>
        </div>

        <div>
          <div className="hx-eyebrow text-[#C89D66] mb-4">Company</div>
          <ul className="space-y-2 text-sm">
            <li><a href="/about-us" className="hover:text-[#C89D66] transition-colors">About Us</a></li>
            <li><a href="/our-story" className="hover:text-[#C89D66] transition-colors">Our Story</a></li>
            <li><a href="/careers" className="hover:text-[#C89D66] transition-colors">Careers</a></li>
            <li><a href="/sustainability" className="hover:text-[#C89D66] transition-colors">Sustainability</a></li>
          </ul>
        </div>

        <div>
          <div className="hx-eyebrow text-[#C89D66] mb-4">Shop</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/women" className="hover:text-[#C89D66] transition-colors">Women</Link></li>
            <li><Link to="/men" className="hover:text-[#C89D66] transition-colors">Men</Link></li>
            <li><Link to="/kids" className="hover:text-[#C89D66] transition-colors">Kids</Link></li>
            <li><Link to="/new-arrivals" className="hover:text-[#C89D66] transition-colors">New Arrivals</Link></li>
            <li><Link to="/collections" className="hover:text-[#C89D66] transition-colors">Collections</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#EFE6DD]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#EFE6DD]/50">
          <div>© {new Date().getFullYear()} SHUBHVIKA. All rights reserved.</div>
          <div className="flex items-center gap-3 text-[#EFE6DD]/70">
            <span className="hx-eyebrow text-[10px]">Visa</span>
            <span className="hx-eyebrow text-[10px]">Mastercard</span>
            <span className="hx-eyebrow text-[10px]">AMEX</span>
            <span className="hx-eyebrow text-[10px]">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}