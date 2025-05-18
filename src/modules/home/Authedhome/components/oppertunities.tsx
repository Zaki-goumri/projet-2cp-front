'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { Sparkles } from 'lucide-react';

const OpportunitiesSection = React.lazy(
  () => import('@/modules/home/Authedhome/components/slider')
);

const Opportunities = () => {
  return (
    <main className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="relative flex flex-col items-center justify-center">
          <motion.div
            className="absolute -bottom-12 -left-8 w-12 md:top-12 md:left-8 md:w-16 lg:top-16 lg:left-12 lg:w-20"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.img
              src="assets/opportunitiesBG2.svg"
              alt=""
              className="w-16 md:w-20 lg:w-24"
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
            />
          </motion.div>

          <motion.div
            className="absolute -top-10 right-1 md:-top-8 md:right-8 md:block lg:-top-12 lg:right-12"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.img
              src="assets/opportunitiesBG1.svg"
              alt=""
              className="w-12 md:w-20 lg:w-24"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                ease: 'easeInOut',
                delay: 0.5,
                repeat: Infinity,
              }}
            />
          </motion.div>

          <motion.div
            className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="mb-6 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Discover <span className="bg-gradient-to-r from-[#98E9AB] to-[#4CAF50] bg-clip-text text-transparent">Opportunities</span>
            </h1>
            <p className="mx-auto max-w-[800px] text-base text-gray-600 sm:text-lg md:text-xl lg:text-2xl">
              Find the perfect opportunities that match your skills and career goals.
              From internships to real-world challenges, we've got you covered.
            </p>
          </motion.div>
        </div>
      </div>
      <OpportunitiesSection />
    </main>
  );
};

export default Opportunities;
