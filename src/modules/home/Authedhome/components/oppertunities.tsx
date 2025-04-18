'use client';

import { motion } from 'framer-motion';
import React from 'react';

const Slider = React.lazy(
  () => import('@/modules/home/Authedhome/components/slider')
);
const problems = [
  {
    logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
    title: 'Software Development Intern',
    description:
      'Join TechCorp as a software development intern and work on cutting-edge projects using modern technologies.',
    views: 245,
    daysLeft: 15,
  },
  {
    logo: 'https://media.licdn.com/dms/image/v2/C4E0BAQE_hQWza3WDsw/company-logo_200_200/company-logo_200_200/0/1657089111162?e=1747872000&v=beta&t=kGfFj8WqGkAiszIlv4XwQ6b4JEUkVZIuqFsL5hFpJ4g',
    title: 'Marketing Intern',
    description:
      'BrandCo is looking for a creative marketing intern to help drive our social media and content strategy.',
    views: 189,
    daysLeft: 20,
  },
  {
    logo: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31',
    title: 'Data Science Intern',
    description:
      'DataTech offers an exciting internship opportunity in data science and machine learning applications.',
    views: 312,
    daysLeft: 30,
  },
  {
    logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
    title: 'Software Development Intern',
    description:
      'Join TechCorp as a software development intern and work on cutting-edge projects using modern technologies.',
    views: 245,
    daysLeft: 15,
  },
  {
    logo: 'https://media.licdn.com/dms/image/v2/C4E0BAQE_hQWza3WDsw/company-logo_200_200/company-logo_200_200/0/1657089111162?e=1747872000&v=beta&t=kGfFj8WqGkAiszIlv4XwQ6b4JEUkVZIuqFsL5hFpJ4g',
    title: 'Marketing Intern',
    description:
      'BrandCo is looking for a creative marketing intern to help drive our social media and content strategy.',
    views: 189,
    daysLeft: 20,
  },
  {
    logo: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31',
    title: 'Data Science Intern',
    description:
      'DataTech offers an exciting internship opportunity in data science and machine learning applications.',
    views: 312,
    daysLeft: 30,
  },
];

const Opportunities = () => {
  return (
    <main className="overflow-hidde relative">
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="relative flex flex-col items-center justify-center">
          <motion.div
            className="mrd:block absolute -bottom-12 -left-8 w-12 md:top-12 md:left-8 md:w-16 lg:top-16 lg:left-12 lg:w-20"
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
            <h1 className="mb-6 text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
              Recommended <span className="text-[#98E9AB]">Opportunities</span>
            </h1>
            <p className="mx-auto max-w-[800px] text-sm text-gray-600 sm:text-base md:text-lg lg:text-xl">
              Seeking outstanding opportunities? Check out the highest-rated
              ones, trusted by the learners' community.
            </p>
          </motion.div>
        </div>
      </div>
      <Slider />
    </main>
  );
};

export default Opportunities;
