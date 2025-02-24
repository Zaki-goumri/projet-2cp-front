import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import { MoveRight, MoveLeft } from "lucide-react";

const NavBar = React.lazy(
  () => import("@/modules/features/landingPage/components/navBar"),
);
const OppCard = React.lazy(
  () => import("@/modules/features/home/unAuthedhome/components/card"),
);
const Introduction = React.lazy(
  () => import("@/modules/features/home/unAuthedhome/components/introduction"),
);
const ProductModel = React.lazy(
  () => import("@/modules/features/home/unAuthedhome/components/modelWindow"),
);

const internships = [
  {
    logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
    title: "Software Development Intern",
    description: "Join TechCorp as a software development intern and work on cutting-edge projects.",
    views: 245,
    daysLeft: 15,
  },
  {
    logo: "https://media.licdn.com/dms/image/v2/C4E0BAQE_hQWza3WDsw/company-logo_200_200/company-logo_200_200/0/1657089111162?e=1747872000&v=beta&t=kGfFj8WqGkAiszIlv4XwQ6b4JEUkVZIuqFsL5hFpJ4g",
    title: "Marketing Intern", 
    description: "BrandCo is looking for a creative marketing intern to help drive our strategy.",
    views: 189,
    daysLeft: 20,
  },
  {
    logo: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31",
    title: "Data Science Intern",
    description: "DataTech offers an exciting internship in data science and ML applications.",
    views: 312,
    daysLeft: 30,
  },
  {
    logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
    title: "Software Development Intern",
    description: "Join TechCorp as a software development intern and work on cutting-edge projects.",
    views: 245, 
    daysLeft: 15,
  },
  {
    logo: "https://media.licdn.com/dms/image/v2/C4E0BAQE_hQWza3WDsw/company-logo_200_200/company-logo_200_200/0/1657089111162?e=1747872000&v=beta&t=kGfFj8WqGkAiszIlv4XwQ6b4JEUkVZIuqFsL5hFpJ4g",
    title: "Marketing Intern",
    description: "BrandCo is looking for a creative marketing intern to help drive our strategy.",
    views: 189,
    daysLeft: 20,
  },
  {
    logo: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31",
    title: "Data Science Intern", 
    description: "DataTech offers an exciting internship in data science and ML applications.",
    views: 312,
    daysLeft: 30,
  },
];

const problems = [
  {
    logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
    title: "Software Development Intern",
    description: "Join TechCorp as a software development intern and work on cutting-edge projects.",
    views: 245,
    daysLeft: 15,
  },
  {
    logo: "https://media.licdn.com/dms/image/v2/C4E0BAQE_hQWza3WDsw/company-logo_200_200/company-logo_200_200/0/1657089111162?e=1747872000&v=beta&t=kGfFj8WqGkAiszIlv4XwQ6b4JEUkVZIuqFsL5hFpJ4g",
    title: "Marketing Intern",
    description: "BrandCo is looking for a creative marketing intern to help drive our strategy.",
    views: 189,
    daysLeft: 20,
  },
  {
    logo: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31",
    title: "Data Science Intern",
    description: "DataTech offers an exciting internship in data science and ML applications.",
    views: 312,
    daysLeft: 30,
  },
  {
    logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
    title: "Software Development Intern", 
    description: "Join TechCorp as a software development intern and work on cutting-edge projects.",
    views: 245,
    daysLeft: 15,
  },
  {
    logo: "https://media.licdn.com/dms/image/v2/C4E0BAQE_hQWza3WDsw/company-logo_200_200/company-logo_200_200/0/1657089111162?e=1747872000&v=beta&t=kGfFj8WqGkAiszIlv4XwQ6b4JEUkVZIuqFsL5hFpJ4g",
    title: "Marketing Intern",
    description: "BrandCo is looking for a creative marketing intern to help drive our strategy.",
    views: 189,
    daysLeft: 20,
  },
  {
    logo: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31",
    title: "Data Science Intern",
    description: "DataTech offers an exciting internship in data science and ML applications.",
    views: 312,
    daysLeft: 30,
  },
];

const SliderOfOpp = () => {
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
          centerPadding: "15px",
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
          centerPadding: "15px",
        },
      },
    ],
  };
  return (
    <main>
      <section className="mx-3 sm:mx-6 md:mx-8 lg:mx-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-0">
            <span className="text-primary">Internships</span> for you</h2>
        </div>
        <Slider {...sliderSettings}>
          {internships.map((internship, index) => (
            <div
              key={index}
              className="px-1.5 hover:scale-[105%] ease-linear duration-150"
            >
              <OppCard {...internship} />
            </div>
          ))}
        </Slider>
      </section>
      <span className="flex flex-col items-center space-y-2 mt-2">
        <button
          className="bg-primary text-white font-semibold py-2 px-4 rounded-full hover:bg-primary/90 transition-colors text-sm"
          type="button"
        >
          Load More
        </button>
        <hr className="w-2/3 mx-auto my-8 opacity-20" />
      </span>
      <section className="mx-3 sm:mx-6 md:mx-8 lg:mx-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-0">
            <span className="text-black">Other</span>
            <span className="text-primary">Problems</span>
            <span className="text-black">to solve</span>
          </h2>
        </div>
        <Slider {...sliderSettings}>
          {problems.map((problem, index) => (
            <div
              key={index}
              className="px-1.5 hover:scale-[105%] ease-linear duration-150"
            >
              <OppCard {...problem} />
            </div>
          ))}
        </Slider>
      </section>
      <span className="flex flex-col items-center space-y-2 mt-2 mb-16">
        <button
          className="bg-primary text-white font-semibold py-2 px-4 rounded-full hover:bg-primary/90 transition-colors text-sm"
          type="button"
        >
          Check more
        </button>
      </span>
    </main>
  );
};

export default SliderOfOpp;

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "transparent" }}
      onClick={onClick}
    >
      <MoveRight className="text-primary hover:text-primary/90" size={20} />
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "transparent" }}
      onClick={onClick}
    >
      <MoveLeft className="text-primary hover:text-primary/90" size={20} />
    </div>
  );
};
