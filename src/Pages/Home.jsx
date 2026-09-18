import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Truck, ShieldCheck, RotateCcw, HeadphonesIcon, Sparkles } from "lucide-react";
import api from "@/lib/api";
import ProductImage from "@/components/ProductImage";
import ProductCard from "@/components/ProductCard";
import { toast } from "sonner";

const IMG = (id) => `https://images.unsplash.com/${id}?w=1200&q=80&auto=format&fit=crop`;

// Curated Indian Ethnic Photos
const CATS = [
  {
    key: "women",
    name: "Women",
    tagline: "Silk sarees, lehengas & modern fusion.",
    to: "/women",
    img: IMG("photo-1610030469983-98e550d6193c")
  },
  {
    key: "men",
    name: "Men",
    tagline: "Royal sherwanis & bandhgala suits.",
    to: "/men",
    img: IMG("photo-1617137984095-74e4e5e3613f")
  },
  {
    key: "kids",
    name: "Kids",
    tagline: "Festive wear for little royalty.",
    to: "/kids",
    img: IMG("photo-1622290291468-a28f7a7dc6a8")
  },
];

// GUARANTEED WORKING HERO IMAGES (Matching exact visual mock)
// [0] Top-left (large)   → Purple Saree on Red Backdrop
// [1] Top-right          → Clothes Rack with Neutral Hangers
// [2] Bottom-right       → Man in Blue Suit Outdoors
// [3] Bottom-left (wide) → Indian Saree & Gold Jewelry Close-up
const HERO_IMGS = [
  IMG("photo-1610030469983-98e550d6193c"), // LOOK 01 · Purple Saree on Red
  IMG("photo-1558769132-cb1aea458c5e"), // Clothes Rack / Hangers
  IMG("photo-1617137984095-74e4e5e3613f"), // Man in Blue Suit
  IMG("photo-1617627143750-d86bc21e42bb"), // EDITORIAL 24 · Indian Saree Detail
];

const IG_IMGS = [
  IMG("photo-1610030469983-98e550d6193c"),
  IMG("photo-1617137984095-74e4e5e3613f"),
  IMG("photo-1622290291468-a28f7a7dc6a8"),
  IMG("photo-1617627143750-d86bc21e42bb"),
  IMG("photo-1509631179647-0177331693ae"),
  IMG("photo-1610030469983-98e550d6193c"),
];

// Verified high-res Indian couture photo for promo section
const PROMO_IMG = IMG("photo-1544441893-675973e31985");

const FALLBACK_POPULAR = [
  {
    id: "fb-1",
    name: "Royal Blue Anarkali with Dupatta",
    category: "women",
    price: 1499,
    old_price: 4999,
    is_popular: true,
    is_new: false,
    images: [IMG("photo-1610030469983-98e550d6193c")],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue"],
  },
  {
    id: "fb-2",
    name: "Banarasi Silk Saree",
    category: "women",
    price: 3499,
    old_price: 6999,
    is_popular: true,
    is_new: false,
    images: [IMG("photo-1617627143750-d86bc21e42bb")],
    sizes: ["Free Size"],
    colors: ["Pink"],
  },
  {
    id: "fb-3",
    name: "Zari Embroidered Lehenga Set",
    category: "women",
    price: 5999,
    old_price: 9999,
    is_popular: true,
    is_new: false,
    images: [IMG("photo-1610030469983-98e550d6193c")],
    sizes: ["S", "M", "L"],
    colors: ["Red"],
  },
  {
    id: "fb-4",
    name: "Pastel Organza Saree",
    category: "women",
    price: 2799,
    old_price: 4499,
    is_popular: true,
    is_new: false,
    images: [IMG("photo-1617627143750-d86bc21e42bb")],
    sizes: ["Free Size"],
    colors: ["Peach"],
  },
];

const FALLBACK_NEW = [
  {
    id: "fn-1",
    name: "Emerald Green Sharara Set",
    category: "women",
    price: 3299,
    old_price: null,
    is_popular: false,
    is_new: true,
    images: [IMG("photo-1610030469983-98e550d6193c")],
    sizes: ["S", "M", "L"],
    colors: ["Green"],
  },
  {
    id: "fn-2",
    name: "Ivory Chikankari Kurta",
    category: "women",
    price: 1899,
    old_price: null,
    is_popular: false,
    is_new: true,
    images: [IMG("photo-1558769132-cb1aea458c5e")],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Ivory"],
  },
  {
    id: "fn-3",
    name: "Maroon Velvet Anarkali",
    category: "women",
    price: 4599,
    old_price: 7999,
    is_popular: false,
    is_new: true,
    images: [IMG("photo-1610030469983-98e550d6193c")],
    sizes: ["S", "M", "L"],
    colors: ["Maroon"],
  },
  {
    id: "fn-4",
    name: "Gold Tissue Saree",
    category: "women",
    price: 3999,
    old_price: null,
    is_popular: false,
    is_new: true,
    images: [IMG("photo-1617627143750-d86bc21e42bb")],
    sizes: ["Free Size"],
    colors: ["Gold"],
  },
  {
    id: "fn-5",
    name: "Navy Bandhani Dupatta Set",
    category: "women",
    price: 2199,
    old_price: 3499,
    is_popular: false,
    is_new: true,
    images: [IMG("photo-1610030469983-98e550d6193c")],
    sizes: ["S", "M", "L"],
    colors: ["Navy"],
  },
  {
    id: "fn-6",
    name: "Blush Pink Palazzo Suit",
    category: "women",
    price: 2499,
    old_price: null,
    is_popular: false,
    is_new: true,
    images: [IMG("photo-1617627143750-d86bc21e42bb")],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blush"],
  },
  {
    id: "fn-7",
    name: "Black Sequin Evening Saree",
    category: "women",
    price: 5299,
    old_price: 8999,
    is_popular: false,
    is_new: true,
    images: [IMG("photo-1610030469983-98e550d6193c")],
    sizes: ["Free Size"],
    colors: ["Black"],
  },
  {
    id: "fn-8",
    name: "Mustard Cotton Sharara",
    category: "women",
    price: 1799,
    old_price: null,
    is_popular: false,
    is_new: true,
    images: [IMG("photo-1558769132-cb1aea458c5e")],
    sizes: ["S", "M", "L"],
    colors: ["Mustard"],
  },
];

const TRUST = [
  { icon: Sparkles, title: "Heritage Quality", desc: "Handcrafted embroidery, premium silk & zari." },
  { icon: ShieldCheck, title: "Secure Payments", desc: "COD & 100% encrypted card options." },
  { icon: Truck, title: "Fast Delivery", desc: "Free shipping across India over ₹2,999." },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day hassle-free returns & exchanges." },
  { icon: HeadphonesIcon, title: "Stylist Care", desc: "Personal couture assistance 7 days a week." },
];

export default function Home() {
  const [popular, setPopular] = useState(FALLBACK_POPULAR);
  const [newArrivals, setNewArrivals] = useState(FALLBACK_NEW);
  const [email, setEmail] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [{ data: pop }, { data: na }] = await Promise.all([
          api.get("/products", { params: { category: "women", is_popular: true } }),
          api.get("/products", { params: { is_new: true } }),
        ]);

        const popList = pop?.products || [];
        const naList = na?.products || [];

        setPopular(
          popList.length >= 4
            ? popList.slice(0, 4)
            : [...popList, ...FALLBACK_POPULAR].slice(0, 4)
        );
        setNewArrivals(
          naList.length >= 4
            ? naList.slice(0, 8)
            : [...naList, ...FALLBACK_NEW].slice(0, 8)
        );
      } catch (e) {
        setPopular(FALLBACK_POPULAR);
        setNewArrivals(FALLBACK_NEW);
      }
    })();
  }, []);

  const subscribe = async (e) => {
    e.preventDefault();
    try {
      await api.post("/newsletter", { email });
      toast.success("You're on the list. Welcome to SHUBHVIKA.");
      setEmail("");
    } catch (err) {
      toast.error("Please enter a valid email.");
    }
  };

  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative bg-[#EFE6DD] overflow-hidden" data-testid="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

          <div className="md:col-span-6 md:pr-8 animate-fade-up">
            <div className="hx-eyebrow mb-6 text-[#5C524C] tracking-[0.2em] text-xs uppercase font-medium">
              Royal Heritage · Vol.04
            </div>
            <h1 className="font-serif font-light text-5xl sm:text-6xl lg:text-7xl uppercase leading-[1.05] tracking-tight text-[#1A1110]">
              Define<br />Your <span className="italic font-normal text-[#C89D66]">Style</span>
            </h1>
            <p className="mt-6 max-w-md text-[#5C524C] leading-relaxed">
              Fashion that speaks before you do. Handcrafted weaves, intricate embroidery, and timeless silhouettes tailored for your celebrations.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/women" className="group inline-flex items-center gap-3 bg-[#1A1110] text-[#FDFBF7] px-6 py-4 text-xs uppercase tracking-[0.28em] hover:bg-[#2B1B17]" data-testid="hero-cta-shop-women">
                Shop Women <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/men" className="group inline-flex items-center gap-3 border border-[#1A1110] text-[#1A1110] px-6 py-4 text-xs uppercase tracking-[0.28em] hover:bg-[#1A1110] hover:text-[#FDFBF7]" data-testid="hero-cta-shop-men">
                Shop Men <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-xs text-[#5C524C]">
              <div className="flex items-center gap-2">
                <span className="w-8 h-px bg-[#1A1110]" /> Est. 2024
              </div>
              <div>·</div>
              <div>Free shipping over ₹2,999</div>
            </div>
          </div>

          <div className="md:col-span-6 relative animate-fade-up" style={{ animationDelay: "150ms" }}>
            <div className="grid grid-cols-6 grid-rows-6 gap-3 h-[520px] md:h-[600px]">

              {/* Top Left - Large Purple Saree */}
              <div className="col-span-4 row-span-4 col-start-1 row-start-1">
                <ProductImage
                  src={HERO_IMGS[0]}
                  seed="hero-a"
                  alt="Indian Royal Silk"
                  ratio="h-full"
                  monogramSize="text-8xl"
                  label="LOOK 01 · ROYAL SILK"
                />
              </div>

              {/* Top Right - Clothes Rack */}
              <div className="col-span-2 row-span-3 col-start-5 row-start-1">
                <ProductImage
                  src={HERO_IMGS[1]}
                  seed="hero-b"
                  alt="Ethnic Fabrics"
                  ratio="h-full"
                  monogramSize="text-5xl"
                />
              </div>

              {/* Bottom Left - Indian Saree & Jewelry Detail */}
              <div className="col-span-4 row-span-2 col-start-1 row-start-5">
                <ProductImage
                  src={HERO_IMGS[3]}
                  seed="hero-d"
                  alt="Ethnic Detail"
                  ratio="h-full"
                  monogramSize="text-6xl"
                  label="EDITORIAL 24"
                />
              </div>

              {/* Bottom Right - Man in Navy Blue Suit */}
              <div className="col-span-2 row-span-3 col-start-5 row-start-4">
                <ProductImage
                  src={HERO_IMGS[2]}
                  seed="hero-c"
                  alt="Sherwani"
                  ratio="h-full"
                  monogramSize="text-5xl"
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="hx-eyebrow mb-3 tracking-[0.2em] text-xs uppercase font-medium">Shop the Collection</div>
            <h2 className="font-serif text-4xl md:text-5xl">Curated Indian Luxury.</h2>
          </div>
          <Link to="/products" className="hidden md:inline-flex items-center gap-2 hx-underline-link text-xs uppercase tracking-[0.28em]">
            View All Categories <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {CATS.map((c, i) => (
            <Link key={c.key} to={c.to} className="group relative block overflow-hidden bg-[#EFE6DD]" data-testid={`category-card-${c.key}`}>
              <div className="transition-transform duration-700 group-hover:scale-105">
                <ProductImage src={c.img} seed={`cat-${c.key}`} alt={c.name} ratio="aspect-[4/5]" monogramSize="text-8xl" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1110]/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 text-[#FDFBF7]">
                <div className="hx-eyebrow text-[#EFE6DD]/80 mb-2 tracking-[0.2em] text-xs uppercase font-medium">
                  Collection {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-serif text-4xl md:text-5xl">{c.name}</h3>
                <p className="text-sm text-[#EFE6DD]/80 mt-2 max-w-[80%]">{c.tagline}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] border-b border-[#FDFBF7] pb-1 group-hover:gap-3 transition-all">
                  Explore Collection <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* POPULAR IN WOMEN */}
      <section className="bg-[#F5F0EB] py-20 md:py-28" data-testid="popular-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="hx-eyebrow mb-3 tracking-[0.2em] text-xs uppercase font-medium">Best Sellers</div>
              <h2 className="font-serif text-4xl md:text-5xl">Popular in Women</h2>
            </div>
            <Link to="/women" className="hx-underline-link text-xs uppercase tracking-[0.28em]">View All</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {popular.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-[#1A1110] text-[#FDFBF7] p-10 md:p-20 flex flex-col justify-center order-2 md:order-1">
            <div className="hx-eyebrow text-[#C89D66] mb-5 tracking-[0.2em] text-xs uppercase font-medium">The Signature Edit</div>
            <h2 className="font-serif text-5xl md:text-6xl leading-[0.95]">
              Your style.<br /><span className="italic text-[#C89D66]">Your statement.</span>
            </h2>
            <p className="mt-6 max-w-md text-[#EFE6DD]/70">
              Explore pieces designed to elevate your everyday wardrobe — considered layering, refined proportions, and materials that only get better with time.
            </p>
            <Link to="/collections" className="mt-8 inline-flex items-center gap-3 border border-[#C89D66] text-[#C89D66] px-6 py-4 text-xs uppercase tracking-[0.28em] w-fit hover:bg-[#C89D66] hover:text-[#1A1110]" data-testid="promo-cta">
              Shop The Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="order-1 md:order-2">
            <ProductImage src={PROMO_IMG} seed="promo-editorial" alt="The Edit — Winter 24" ratio="aspect-[4/5] md:aspect-auto md:h-full" monogramSize="text-9xl" label="THE EDIT · WINTER 24" />
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="hx-eyebrow mb-3 tracking-[0.2em] text-xs uppercase font-medium">Fresh In</div>
            <h2 className="font-serif text-4xl md:text-5xl">New Arrivals</h2>
            <p className="mt-3 text-[#5C524C] max-w-xl">Discover our latest festive weaves & handcrafted couture.</p>
          </div>
          <Link to="/new-arrivals" className="hx-underline-link text-xs uppercase tracking-[0.28em]">
            Shop New In
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {newArrivals.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section className="bg-[#EFE6DD] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hx-eyebrow text-center mb-3 tracking-[0.2em] text-xs uppercase font-medium">Why SHUBHVIKA</div>
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-12">Crafted with heritage & care.</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
            {TRUST.map((t, i) => (
              <div key={i} className="text-center px-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#1A1110] text-[#C89D66] flex items-center justify-center mb-4">
                  <t.icon className="w-5 h-5" />
                </div>
                <div className="font-serif text-lg">{t.title}</div>
                <div className="text-xs text-[#5C524C] mt-1 leading-relaxed">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOLLOW THE STYLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center mb-10">
          <div className="hx-eyebrow mb-3 tracking-[0.2em] text-xs uppercase font-medium">@shubhvika</div>
          <h2 className="font-serif text-4xl md:text-5xl">Follow the Style</h2>
          <p className="mt-3 text-[#5C524C]">Step into the world of SHUBHVIKA.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {IG_IMGS.map((src, i) => (
            <div key={i} className="group relative overflow-hidden">
              <div className="transition-transform duration-500 group-hover:scale-110">
                <ProductImage src={src} seed={`ig-${i}`} alt={`@shubhvika ${i + 1}`} ratio="aspect-square" monogramSize="text-3xl" />
              </div>
              <div className="absolute inset-0 bg-[#1A1110]/0 group-hover:bg-[#1A1110]/40 transition-colors flex items-center justify-center">
                <ArrowUpRight className="w-6 h-6 text-[#FDFBF7] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-[#2B1B17] text-[#FDFBF7]" data-testid="newsletter-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <div className="hx-eyebrow text-[#C89D66] mb-4 tracking-[0.2em] text-xs uppercase font-medium">The List</div>
          <h2 className="font-serif text-4xl md:text-5xl">Stay in royal style.</h2>
          <p className="mt-4 text-[#EFE6DD]/70 max-w-xl mx-auto">
            Get updates on new festive collections, private sales, and couture inspiration — delivered thoughtfully.
          </p>
          <form onSubmit={subscribe} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-transparent border-b border-[#EFE6DD]/30 py-3 focus:outline-none focus:border-[#C89D66] text-center sm:text-left"
              data-testid="newsletter-email-input"
            />
            <button
              className="bg-[#C89D66] text-[#1A1110] px-6 py-3 text-xs uppercase tracking-[0.28em] hover:bg-[#FDFBF7] transition-colors"
              data-testid="newsletter-submit-button"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}