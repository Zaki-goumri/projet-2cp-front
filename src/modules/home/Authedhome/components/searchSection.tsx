import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function SearchSection() {
  return (
    <section className="mt-8 w-full py-12 md:py-16 lg:py-20">
      <div className="container mx-auto place-self-center px-4 md:px-6">
        <div className="flex flex-col items-center justify-evenly gap-6 lg:flex-row lg:gap-12">
          <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Forge <span className="text-[#98E9AB]">Your Path</span>
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:mx-0 lg:text-base/relaxed xl:text-xl/relaxed">
              Discover internships and opportunities that align with your skills
              and career goals—effortlessly and efficiently!
            </p>
            <div className="mx-auto w-full max-w-sm space-y-2 lg:mx-0">
              <div className="relative">
                <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
                <Input
                  className="w-full bg-white pl-9 placeholder:text-gray-500"
                  placeholder="Search active opportunities"
                  type="search"
                />
              </div>
            </div>
          </div>
          <div className="animate-float flex items-center justify-center">
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
          </div>
        </div>
      </div>
      <hr className="mx-auto mt-32 w-3/4 place-self-center opacity-30" />
    </section>
  );
}
