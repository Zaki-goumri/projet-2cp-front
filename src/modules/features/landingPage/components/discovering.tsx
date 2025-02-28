"use client"

import { motion } from "framer-motion"
import {Link} from "react-router"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const Discovering = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      <motion.div
        className="grid lg:grid-cols-2 gap-12 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        <motion.div className="flex flex-col space-y-8" variants={fadeIn}>
          <h1 className="text-3xl font-extrabold leading-normal sm:text-4xl md:text-5xl">
            That one <span className="text-primary">opportunity</span> feeling.
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
            Discover internships that match your passion, skills, and future goals. Your next big opportunity is just a
            click away.
          </p>

          <div>
            <Button asChild size="lg" className="rounded-full text-base hover:!bg-primary hover:!text-white transition-colors duration-00 ease-in-out  px-8 group">
              <Link to="/home">
                Get started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="flex justify-center lg:justify-end">
          <img
            src="/assets/discoveringHero.svg"
            alt="Discovering opportunities"
            className="w-full max-w-md lg:max-w-lg xl:max-w-xl"
          />
        </motion.div>
      </motion.div>

      <div className="mt-24">
        <hr className="w-full max-w-3xl mx-auto opacity-20" />
      </div>
    </section>
  )
}

export default Discovering

