"use client";
import React from "react";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import EncryptButton from "@/components/Scan";

interface Square {
  id: number;
  src: string;
}
import Link from "next/link";
import Login from "../Login";
import Navbar from "../Navbar";

const ShuffleHero: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref) as boolean;

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: +10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  return (
    <section className="w-full min-h-screen px-5 py-12 grid lg:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <motion.div
        initial="hidden"
        className="max-w-2xl"
        ref={ref}
        animate={isInView ? "show" : "hidden"}
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <Navbar />
        {/* <motion.h1
          className="block mb-4 text-lg font-bold text-primary"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          Quick-y
        </motion.h1> */}
        <motion.h1
          className="text-4xl md:text-5xl font-semibold"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          Time-Efficient Healthcare
        </motion.h1>
        <motion.h1
          className="text-base md:text-lg text-slate-700 my-4 md:my-6"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          Revolutionizing healthcare with real-time mapping, streamlined
          prescriptions, and skin/normal disease detection, minimizing wait
          times for patients and doctors.
        </motion.h1>

        <motion.h1
          className="flex flex-wrap"
          variants={FADE_UP_ANIMATION_VARIANTS}
        >
          <div className="mr-3 mb-3">
            <EncryptButton />
          </div>
          <Link
            href="/login"
            className="tracking-wider hover:scale-105 transition-all duration-300 h-fit rounded-lg border-[1px] hover:border-black bg-primary px-4 py-2 font-mono font-medium uppercase text-white hover:bg-black hover:text-gray-300"
          >
            Book an Appointment
          </Link>
        </motion.h1>
      </motion.div>
      <div className="lg:grid hidden">
        <ShuffleGrid />
      </div>
    </section>
  );
};

const shuffle = (array: Square[]): Square[] => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "/hero/1.jpg",
  },
  {
    id: 2,
    src: "/hero/2.jpg",
  },
  {
    id: 3,
    src: "/hero/3.jpg",
  },
  {
    id: 4,
    src: "/hero/4.jpg",
  },
  {
    id: 5,
    src: "/hero/5.jpg",
  },
  {
    id: 6,
    src: "/hero/6.jpg",
  },
  {
    id: 7,
    src: "/hero/7.jpg",
  },
  {
    id: 8,
    src: "/hero/8.jpg",
  },
  {
    id: 9,
    src: "/hero/9.jpg",
  },
  {
    id: 10,
    src: "/hero/10.jpg",
  },
  {
    id: 11,
    src: "/hero/11.jpg",
  },
  {
    id: 12,
    src: "/hero/12.jpg",
  },
  {
    id: 13,
    src: "/hero/13.jpg",
  },
  {
    id: 14,
    src: "/hero/14.jpg",
  },
  {
    id: 15,
    src: "/hero/15.jpg",
  },
  {
    id: 16,
    src: "/hero/16.jpg",
  },
];
const generateSquares = (): JSX.Element[] => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid: React.FC = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [squares, setSquares] = useState<JSX.Element[]>(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default ShuffleHero;
