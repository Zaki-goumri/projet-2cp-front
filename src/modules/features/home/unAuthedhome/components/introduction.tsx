
import { Link } from "react-router";
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button";


const Introduction = () => {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
         <div className="container px-4 md:px-6 place-self-center mx-auto">
           <div className="flex flex-col lg:flex-row gap-6 justify-evenly lg:gap-12 items-center">
             <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
               <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                 Searching for a great <span className="text-[#98E9AB]">opportunity</span>?
               </h1>
               <p className="max-w-[600px] mx-auto lg:mx-0 text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                 Explore tailored opportunities that match your skills and career goals—quickly and effortlessly!
               </p>
               <div className="flex justify-center lg:justify-start">
                 <Button asChild size="lg" className="rounded-full text-base hover:!bg-primary hover:!text-white transition-colors duration-00 ease-in-out  px-8 group">
                   <Link to="/home">
                     Browse Opportunities
                     <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                   </Link>
                 </Button>
               </div>
             </div>
             <div className="flex items-center justify-center animate-float">
               <div className="relative w-full max-w-[500px]">
                 <img
                   src="/assets/search.svg"
                   alt="Introduction"
                   className="relative z-10 transition-transform duration-300 hover:scale-105"
                   style={{
                     width: "100%",
                     height: "auto",
                   }}
                 />
                 <div className="absolute inset-0 bg-[#E8F9EB] rounded-full blur-3xl -z-10 transform scale-150" />
               </div>
             </div>
           </div>
         </div>
         <hr className="w-3/4 opacity-30 place-self-center mt-16 mx-auto" />
       </section>

  );
};
export default Introduction;