import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function LuxeWebsite() {
  const [time, setTime] = useState(86400);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;
    return `${hrs.toString().padStart(2, "0")} : ${mins
      .toString()
      .padStart(2, "0")} : ${secs.toString().padStart(2, "0")}`;
  };

  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold tracking-[0.3em]">LUXE</h1>
        <div className="text-sm">Cart ({cart.length})</div>
      </header>

      {/* Hero */}
      <section className="text-center mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold mb-4"
        >
          DROP 001
        </motion.h2>
        <p className="text-neutral-400 mb-6 uppercase tracking-widest">
          Limited Release — No Restocks
        </p>
        <Button className="rounded-2xl px-8 py-3 bg-pink-500 hover:bg-pink-600">
          Shop Now
        </Button>
      </section>

      {/* Countdown */}
      <section className="text-center mb-16">
        <p className="text-neutral-500 text-sm mb-2 uppercase">Next Drop In</p>
        <div className="text-3xl tracking-widest">{formatTime()}</div>
      </section>

      {/* Products */}
      <section className="grid md:grid-cols-3 gap-6 mb-20">
        {["Hoodie", "Sweats", "Bundle"].map((item, i) => (
          <Card
            key={i}
            className="rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-pink-500 transition"
          >
            <CardContent className="p-4">
              <img
                src="/mnt/data/a_clean_high_end_product_mockup_fashion_catalog.png"
                alt="product"
                className="rounded-xl mb-4"
              />
              <h3 className="text-lg uppercase">Luxe {item}</h3>
              <p className="text-neutral-400">$180</p>
              <Button
                onClick={() => addToCart(item)}
                className="mt-4 w-full bg-white text-black hover:bg-pink-500 hover:text-white"
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Cart Preview */}
      {cart.length > 0 && (
        <section className="mb-20">
          <h2 className="text-2xl mb-4 uppercase">Your Cart</h2>
          <div className="space-y-2">
            {cart.map((item, i) => (
              <div key={i} className="flex justify-between border-b border-neutral-800 pb-2">
                <span>Luxe {item}</span>
                <span>$180</span>
              </div>
            ))}
          </div>
          <Button className="mt-6 w-full bg-pink-500 hover:bg-pink-600">
            Checkout
          </Button>
        </section>
      )}

      {/* Footer */}
      <footer className="text-center text-neutral-600 text-sm">
        © 2026 LUXE — Hype Streetwear
      </footer>
    </div>
  );
}
