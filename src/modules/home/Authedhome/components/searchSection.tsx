import { Search, Sparkles } from 'lucide-react';
import { lazy, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
const SearchPop = lazy(
  () => import('@/modules/home/Authedhome/components/search-popup')
);
import { keyboardEvent } from '../types/event-keyboard.type';

export default function SearchSection() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: keyboardEvent) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        setIsPopupOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <section className="relative mt-8 w-full py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-evenly gap-6 lg:flex-row lg:gap-12">
          <motion.div 
            className="flex flex-col justify-center space-y-6 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-4">
              <motion.h1 
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Forge <span className="bg-gradient-to-r from-[#98E9AB] to-[#4CAF50] bg-clip-text text-transparent">Your Path</span>
              </motion.h1>
              <motion.p 
                className="mx-auto max-w-[600px] text-lg text-gray-600 md:text-xl/relaxed lg:mx-0 lg:text-base/relaxed xl:text-xl/relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Discover internships and opportunities that align with your skills
                and career goals—effortlessly and efficiently!
              </motion.p>
            </div>

            <motion.div 
              className="mx-auto w-full max-w-sm space-y-4 lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button
                onClick={() => setIsPopupOpen(true)}
                className="group relative flex w-full items-center gap-3 rounded-xl border bg-white px-4 py-3 text-left text-gray-600 shadow-sm transition-all hover:border-[#98E9AB] hover:shadow-md"
              >
                <Search className="h-5 w-5 text-gray-400 group-hover:text-[#98E9AB]" />
                <span className="flex-1">Search active opportunities</span>
                <kbd className="hidden rounded border bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500 sm:inline-block">
                  Ctrl + K
                </kbd>
              </button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="animate-float flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative w-full max-w-[500px]">
              <img
                alt="Dashboard illustration"
                className="relative z-10 transition-transform duration-300 hover:scale-105"
                src="/assets/searchSection.svg"
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
              <div className="absolute inset-0 -z-10 scale-150 transform rounded-full bg-[#E8F9EB] blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
      <hr className="mx-auto mt-32 w-3/4 place-self-center opacity-30" />
      <SearchPop isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </section>
  );
}
