"use client"

import { motion } from "framer-motion"

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

const Signup = () => {
  const services = [
    {
      path: "/assets/servicesOfsignup/pc.svg",
      text: "Search for your domain",
    },
    {
      path: "/assets/servicesOfsignup/company.svg",
      text: "Find the Perfect internship for you",
    },
    {
      path: "/assets/servicesOfsignup/apply.svg",
      text: "Apply and find new opportunities",
    },
  ]

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      <motion.div
        className="grid lg:grid-cols-2 gap-12 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        <motion.div className="flex justify-center order-2 lg:order-1" variants={fadeIn}>
          <img
            src="/assets/signupHero.svg"
            alt="Sign up illustration"
            className="w-full max-w-md lg:max-w-lg xl:max-w-xl"
          />
        </motion.div>

        <motion.div className="flex flex-col space-y-8 order-1 lg:order-2" variants={fadeIn}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Sign up to find new <br />
            <span className="text-primary">Opportunity</span> and <span className="text-primary">internship</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
            Our powerful matching technology will send the right internship right to your inbox.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div key={index} className="flex flex-col items-center text-center space-y-6" variants={fadeIn}>
              <div className="bg-primary/10 p-6 rounded-full">
                <img
                  src={service.path || "/placeholder.svg"}
                  alt={service.text}
                  className="w-16 h-16 md:w-20 md:h-20"
                />
              </div>
              <p className="text-lg font-medium max-w-xs">{service.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="mt-24">
        <hr className="w-full max-w-3xl mx-auto opacity-20" />
      </div>
    </section>
  )
}

export default Signup

