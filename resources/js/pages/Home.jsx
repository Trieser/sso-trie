import React from "react";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <div>
      <Hero />
      <h1 className="text-2xl font-bold">Dashboard Utama</h1>
      <p className="mt-2 text-gray-700">Klik Login untuk masuk.</p>
    </div>
  );
};

export default Home;
