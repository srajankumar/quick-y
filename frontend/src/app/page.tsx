"use client";
import Image from "next/image";
import ShuffleHero from "@/components/Main/Hero";
import Book from "@/components/Main/Book";
import Map from "@/components/Main/Map";
import Prescribe from "@/components/Main/Prescribe";
import Scan from "@/components/Main/Scan";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <main>
      <ShuffleHero />
      <Scan />
      <Book />
      <Map />
      <Prescribe />
      <Footer />
    </main>
  );
}
