import React from "react";
import { motion, useInView } from "framer-motion";

const Map = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref) as boolean;

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { type: "spring" } },
  };
  return (
    <div className="overflow-hidden py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto flex flex-col-reverse  lg:grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <img
            src="/Main/map.svg"
            alt="Product screenshot"
            className="w-[57rem]"
            width={500}
            height={500}
          />
          <div className="lg:pr-8 lg:ml-20 flex items-center">
            <div className="lg:max-w-lg">
              <motion.div
                initial="hidden"
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
                <motion.h1
                  className="md:text-4xl text-3xl select-none sm:leading-[3.5rem] font-semibold"
                  variants={FADE_DOWN_ANIMATION_VARIANTS}
                >
                  Quickly Navigate to Nearby Clinics
                  <span className="text-primary">.</span>
                </motion.h1>
                {/* Create a cool Profile in minutes{" "} */}
                <motion.p
                  className="sm:mt-6 mt-3 md:text-lg leading-8"
                  variants={FADE_DOWN_ANIMATION_VARIANTS}
                >
                  Find the fastest route to nearby clinics for prompt medical
                  attention.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
