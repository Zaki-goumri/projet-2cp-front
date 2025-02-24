import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function SearchSection() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 mt-8">
      <div className="container px-4 md:px-6 place-self-center mx-auto ">
        <div className="flex flex-col lg:flex-row gap-6 justify-evenly lg:gap-12 items-center ">
          <div className="flex flex-col justify-center space-y-4 text-center lg:text-left ">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Forge <span className="text-[#98E9AB]">Your Path</span>
            </h1>
            <p className="max-w-[600px] mx-auto lg:mx-0 text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover internships and opportunities that align with your skills and career goals—effortlessly and
              efficiently!
            </p>
            <div className="w-full max-w-sm mx-auto lg:mx-0 space-y-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  className="w-full bg-white pl-9 placeholder:text-gray-500"
                  placeholder="Search active opportunities"
                  type="search"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center animate-float">
            <div className="relative w-full max-w-[500px]">
              <img
                alt="Dashboard illustration"
                className="relative z-10 transition-transform duration-300 hover:scale-105"
                src="/assets/searchSection.svg"
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
      <hr className="w-3/4 opacity-30 place-self-center mt-32 mx-auto"/>
    </section>
  )
}

