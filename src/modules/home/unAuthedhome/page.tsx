import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from 'react';
import { MoveRight, MoveLeft } from 'lucide-react';

const NavBar = React.lazy(() => import('@/modules/shared/components/navBar'));
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
  const handleSubmit = () => {};

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
  return (
    <main>
      <NavBar />
      <Introduction />
      <section className="mx-4 sm:mx-8 md:mx-12 lg:mx-20">
        <div className="mb-6 flex flex-col items-start justify-between md:mb-8 md:flex-row md:items-center">
          <h2 className="mb-4 text-3xl font-bold md:mb-0 md:text-4xl">
            <span className="text-primary">Internships</span>
            <span className="text-black"> for you</span>
          </h2>
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
      <span className="mt-3 flex flex-col items-center space-y-3">
        <button
          className="bg-primary hover:bg-primary/90 rounded-full px-6 py-3 font-semibold text-white transition-colors"
          type="button"
        >
          Load More
        </button>
        <hr className="mx-auto my-10 w-3/4 opacity-20" />
      </span>
      <section className="mx-4 sm:mx-8 md:mx-12 lg:mx-20">
        <div className="mb-6 flex flex-col items-start justify-between md:mb-8 md:flex-row md:items-center">
          <h2 className="mb-4 text-3xl font-bold md:mb-0 md:text-4xl">
            <span className="text-black"> Other </span>
            <span className="text-primary"> Problems </span>
            <span className="text-black"> to solve </span>
          </h2>
        </div>
        <Slider {...sliderSettings}>
          {problems.map((problem, index) => (
            <div
              key={index}
              className="px-2"
              onClick={() => setIsModalOpen(true)}
            >
              <OppCard {...problem} />
            </div>
          ))}
        </Slider>
      </section>
      <span className="mt-3 mb-20 flex flex-col items-center space-y-3">
        <button
          className="bg-primary hover:bg-primary/90 rounded-full px-6 py-3 font-semibold text-white transition-colors"
          type="button"
        >
          Check more
        </button>
      </span>
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
      <MoveRight className="text-primary hover:text-primary/90" size={24} />
    </div>
  );
};

// Custom Previous Arrow Component
const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'transparent' }}
      onClick={onClick}
    >
      <MoveLeft className="text-primary hover:text-primary/90" size={24} />
    </div>
  );
};
