"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Link from "next/link";

const items = [
  {
    id: 1,
    name: "Srajan Kumar",
    designation: "Fullstack Developer",
    username: "srajankumar",
  },
  {
    id: 2,
    name: "Tejas Nayak B",
    designation: "Fullstack Developer",
    username: "TejasNayak42",
  },
];

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    username: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );
  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
  };

  return (
    <div className="flex flex-col justify-center items-center my-10">
      <div className="md:text-4xl text-3xl select-none sm:leading-[3.5rem] font-semibold text-center">
        Team
        <span className="text-primary">.</span>
      </div>{" "}
      <div className="w-full flex justify-center -ml-4 mt-5">
        {items.map((item, idx) => (
          <div
            className="-mr-4 relative group"
            key={item.id}
            onMouseEnter={() => setHoveredIndex(item.id)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence mode="wait">
              {hoveredIndex === item.id && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.6 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 10,
                    },
                  }}
                  exit={{ opacity: 0, y: 20, scale: 0.6 }}
                  style={{
                    translateX: translateX,
                    rotate: rotate,
                    whiteSpace: "nowrap",
                  }}
                  className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
                >
                  <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
                  <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
                  <div className="font-bold text-white relative z-30 text-base">
                    {item.name}
                  </div>
                  <div className="text-white text-xs">{item.designation}</div>
                </motion.div>
              )}
            </AnimatePresence>
            <Link href={`https://github.com/${item.username}`} target="_blank">
              <Image
                onMouseMove={handleMouseMove}
                height={100}
                width={100}
                src={`https://avatars1.githubusercontent.com/${item.username}`}
                alt={item.name}
                className="object-cover !m-0 !p-0 object-top rounded-full h-20 w-20 border-2 group-hover:scale-105 group-hover:z-30 border-white  relative transition duration-500"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Team() {
  return (
    <div>
      <AnimatedTooltip items={items} />
    </div>
  );
}
