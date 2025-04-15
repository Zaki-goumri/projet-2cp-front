import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Introduction = () => {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container mx-auto place-self-center px-4 md:px-6">
        <div className="flex flex-col items-center justify-evenly gap-6 lg:flex-row lg:gap-12">
          <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Searching for a great{' '}
              <span className="text-[#98E9AB]">opportunity</span>?
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:mx-0 lg:text-base/relaxed xl:text-xl/relaxed">
              Explore tailored opportunities that match your skills and career
              goals—quickly and effortlessly!
            </p>
            <div className="flex justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="hover:!bg-primary duration-00 group rounded-full px-8 text-base transition-colors ease-in-out hover:!text-white"
              >
                <Link to="/home">
                  Browse Opportunities
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="animate-float flex items-center justify-center">
            <div className="relative w-full max-w-[500px]">
              <img
                src="/assets/search.svg"
                alt="Introduction"
                className="relative z-10 transition-transform duration-300 hover:scale-105"
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
      <hr className="mx-auto mt-16 w-3/4 place-self-center opacity-30" />
    </section>
  );
};
export default Introduction;
