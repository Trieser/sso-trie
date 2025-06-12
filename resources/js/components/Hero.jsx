// js/components/Hero.jsx
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const particlesCount = 80;

const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = Array.from({ length: particlesCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.5,
      dy: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.5 + 0.3,
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.y > canvas.height || p.x < 0 || p.x > canvas.width) {
          p.x = Math.random() * canvas.width;
          p.y = 0;
        }
      }

      requestAnimationFrame(draw);
    }

    draw();
  }, []);

  return (
    <div className="relative w-full h-[80vh] bg-gradient-to-br from-gray-900 via-indigo-900 to-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-xl"
        >
          Portofolio
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg md:text-xl font-light mb-6 opacity-90"
        >
            Dev 
        </motion.p>

        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          className="px-6 py-3 bg-indigo-600 text-white rounded-full text-base shadow-md hover:bg-indigo-700 transition"
        >
          Explore Portfolio
        </motion.a>
      </div>
    </div>
  );
};

export default Hero;