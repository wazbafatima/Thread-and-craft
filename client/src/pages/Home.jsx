import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard from "../components/ProductCard";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [products, setProducts] = useState([]);
  const productGridRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const cards = productGridRef.current.children;
      gsap.fromTo(
        cards,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: productGridRef.current, start: "top 85%" },
        },
      );
    }
  }, [products]);

  return (
    <div className="bg-white min-h-screen">
      {/* 🔥 1. FULL SCREEN HERO SECTION (Like Snitch) */}
      <div className="relative h-screen w-full flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=2000&auto=format&fit=crop"
            alt="Mens Fashion"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>{" "}
          {/* Halka sa dark overlay text ke liye */}
        </div>

        <div className="relative z-10 text-center px-6 mt-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white bg-black/80 px-4 py-2 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-6 inline-block backdrop-blur-sm"
          >
            Summer Collection 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold text-white tracking-tighter uppercase mb-8"
          >
            Redefine <br /> Your Style
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <Link
              to="/shop"
              className="bg-white text-black px-10 py-4 text-sm font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-all"
            >
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </div>

      {/* 🔥 2. CATEGORY SECTION (Split Layout) */}
      <div className="max-w-[1400px] mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Shirts Card */}
          <Link to="/shop" className="group relative h-[600px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?q=80&w=1000&auto=format&fit=crop"
              alt="Shirts"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-10 left-10">
              <h2 className="text-4xl font-bold text-white uppercase mb-4">
                Premium Shirts
              </h2>
              <span className="bg-white text-black px-6 py-2 text-sm font-bold uppercase tracking-wider">
                Shop Now
              </span>
            </div>
          </Link>

          {/* T-Shirts Card */}
          <Link to="/shop" className="group relative h-[600px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop"
              alt="T-Shirts"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-10 left-10">
              <h2 className="text-4xl font-bold text-white uppercase mb-4">
                Oversized Tees
              </h2>
              <span className="bg-white text-black px-6 py-2 text-sm font-bold uppercase tracking-wider">
                Shop Now
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* 🔥 3. FEATURED PRODUCTS */}
      <div className="max-w-[1400px] mx-auto px-4 py-20 border-t border-gray-200">
        <h2 className="text-3xl font-bold tracking-tight mb-10 text-center uppercase">
          Trending Now
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-500 text-center">
            Add products via Admin to see them here.
          </p>
        ) : (
          <div
            ref={productGridRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 gap-y-10"
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
