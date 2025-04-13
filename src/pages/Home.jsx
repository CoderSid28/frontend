import React from "react";
import Hero from "../components/Home/Hero";
import RecentlyAdded from "../components/RecentlyAdded";
import DailyQuote from "../components/DailyQuote/DailyQuote";
import AboutUs from "../components/AboutUs/AboutUs"; // New import
import BookTicker from "../components/BookTicker/BookTicker";

const Home = () => {
  return (
    <div className="bg-zinc-900 text-white px-4 sm:px-10 py-8">
      <Hero/>
      <RecentlyAdded /> 
      <DailyQuote />
      <AboutUs />
      <BookTicker/>
    </div>
  );
};

export default Home;