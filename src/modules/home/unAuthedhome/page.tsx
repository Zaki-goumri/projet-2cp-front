import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from 'react';
import { MoveRight, MoveLeft, Sparkles, Briefcase, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const OppCard = React.lazy(
  () => import('@/modules/home/unAuthedhome/components/card')
);
const Introduction = React.lazy(
  () => import('@/modules/home/unAuthedhome/components/introduction')
);
const SigninModel = React.lazy(
  () => import('@/modules/home/unAuthedhome/components/singin-popup')
);

const internships = [
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

const UnAuthedhome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sliderSettings = {
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
          centerPadding: '20px',
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
          centerPadding: '20px',
        },
      },
    ],
  };

  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Discover Opportunities",
      description: "Find the perfect match for your skills and career goals"
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Career Growth",
      description: "Take the next step in your professional journey"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Real Challenges",
      description: "Solve real-world problems and build your portfolio"
    }
  ];

  return (
    <main className="relative overflow-hidden space-y-6">
      <Introduction />
      
      {/* Featured Categories */}
      <section className="mx-3 sm:mx-6 md:mx-8 lg:mx-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-4 inline-flex rounded-xl bg-[#98E9AB]/10 p-3 text-[#98E9AB]">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#98E9AB]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Internships Section */}
      <section className="mx-3 sm:mx-6 md:mx-8 lg:mx-16">
        <div className="mb-8 flex flex-col items-start justify-between md:mb-10 md:flex-row md:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-[#98E9AB]" />
              <span className="text-sm font-medium text-[#98E9AB]">Career Growth</span>
            </div>
            <h2 className="text-2xl font-bold md:text-3xl">
              <span className="text-[#98E9AB]">Internships</span> for you
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Find the perfect internship to kickstart your career
            </p>
          </div>
        </div>
        <Slider {...sliderSettings}>
          {internships.map((internship, index) => (
            <div
              key={index}
              className="h-full px-2"
              onClick={() => setIsModalOpen(true)}
            >
              <OppCard {...internship} />
            </div>
          ))}
        </Slider>
       
      </section>

      {/* Problems Section */}
      <section className="mx-3 sm:mx-6 md:mx-8 lg:mx-16">
        <div className="mb-8 flex flex-col items-start justify-between md:mb-10 md:flex-row md:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Target className="h-5 w-5 text-[#98E9AB]" />
              <span className="text-sm font-medium text-[#98E9AB]">Skill Development</span>
            </div>
            <h2 className="text-2xl font-bold md:text-3xl">
              <span className="text-black">Real-world</span>
              <span className="text-[#98E9AB]"> Problems</span>
              <span className="text-black"> to solve</span>
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Challenge yourself with real-world problems and build your portfolio
            </p>
          </div>
        </div>
        <Slider {...sliderSettings}>
          {problems.map((problem, index) => (
            <div
              key={index}
              className="h-full px-2"
              onClick={() => setIsModalOpen(true)}
            >
              <OppCard {...problem} />
            </div>
          ))}
        </Slider>
        
      </section>

      {/* Call to Action */}
      <section className="mx-3 sm:mx-6 md:mx-8 lg:mx-16 mb-8">
        <motion.div 
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#98E9AB] to-[#4CAF50] p-8 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative z-10">
            <h3 className="mb-4 text-2xl font-bold md:text-3xl">Ready to get started?</h3>
            <p className="mb-6 max-w-2xl text-white/90">
              Join our community of learners and start your journey towards professional growth.
              Find opportunities that match your skills and aspirations.
            </p>
            <motion.button 
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-[#4CAF50] transition-colors hover:bg-white/90"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
            >
              Sign Up Now
            </motion.button>
          </div>
          <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10" />
        </motion.div>
      </section>

      <SigninModel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
};

export default UnAuthedhome;

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'transparent' }}
      onClick={onClick}
    >
      <MoveRight className="text-[#98E9AB] hover:text-[#98E9AB]/90" size={24} />
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'transparent' }}
      onClick={onClick}
    >
      <MoveLeft className="text-[#98E9AB] hover:text-[#98E9AB]/90" size={24} />
    </div>
  );
};
