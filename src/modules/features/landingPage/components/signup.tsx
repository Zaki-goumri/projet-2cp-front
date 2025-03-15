'use client';

import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Signup = () => {
  const services = [
    {
      path: '/assets/servicesOfsignup/pc.svg',
      text: 'Search for your domain',
    },
    {
      path: '/assets/servicesOfsignup/company.svg',
      text: 'Find the Perfect internship for you',
    },
    {
      path: '/assets/servicesOfsignup/apply.svg',
      text: 'Apply and find new opportunities',
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-8 md:py-24">
      <motion.div
        className="grid items-center gap-12 lg:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerChildren}
      >
        <motion.div
          className="order-2 flex justify-center lg:order-1"
          variants={fadeIn}
        >
          <img
            src="/assets/signupHero.svg"
            alt="Sign up illustration"
            className="w-full max-w-md lg:max-w-lg xl:max-w-xl"
          />
        </motion.div>

        <motion.div
          className="order-1 flex flex-col space-y-8 lg:order-2"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
            Sign up to find new <br />
            <span className="text-primary">Opportunity</span> and{' '}
            <span className="text-primary">internship</span>
          </h2>

          <p className="text-muted-foreground max-w-xl text-lg md:text-xl">
            Our powerful matching technology will send the right internship
            right to your inbox.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerChildren}
      >
        <div className="grid gap-10 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center space-y-6 text-center"
              variants={fadeIn}
            >
              <div className="bg-primary/10 rounded-full p-6">
                <img
                  src={service.path || '/placeholder.svg'}
                  alt={service.text}
                  className="h-16 w-16 md:h-20 md:w-20"
                />
              </div>
              <p className="max-w-xs text-lg font-medium">{service.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="mt-24">
        <hr className="mx-auto w-full max-w-3xl opacity-20" />
      </div>
    </section>
  );
};

export default Signup;
