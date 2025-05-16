import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MoveRight, MoveLeft, AlertTriangle } from 'lucide-react';
import { useOpportunities } from '../hooks/useOpportunities';
import { OpportunityCard } from './OpportunityCard';
import { OpportunitiesResponse, Opportunity } from '../types/opportunities.types';


const SliderOfOpp = () => {
  const { 
    opportunities: internships, 
    isLoading: isLoadingInternships, 
    error: errorInternships 
  } = useOpportunities('Internship');
  
  const { 
    opportunities: problems, 
    isLoading: isLoadingProblems, 
    error: errorProblems 
  } = useOpportunities('Problem');

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
          centerPadding: '15px',
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
          centerPadding: '15px',
        },
      },
    ],
  };

  const renderSliderContent = (
    data: Opportunity[], 
    isLoading: boolean, 
    error: Error | null
  ) => {
    if (isLoading) {
      return (
        <div className="flex space-x-4 px-1.5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex-1 animate-pulse rounded-lg border border-gray-200 bg-gray-100 p-4" style={{ height: '150px' }}>
              <div className="h-6 w-3/4 rounded bg-gray-300 mb-2"></div>
              <div className="h-4 w-1/2 rounded bg-gray-300"></div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center rounded border border-red-200 bg-red-50 p-4 text-red-600">
          <AlertTriangle size={18} className="mr-2" /> Failed to load data.
        </div>
      );
    }

    if (data.length === 0) {
      return <p className="text-center text-gray-500 px-1.5">No items found.</p>;
    }

    return (
      <Slider {...sliderSettings}>
        {data.map((item: Opportunity) => (
          <OpportunityCard key={item.id} opportunity={item} />
        ))}
      </Slider>
    );
  };

  return (
    <main>
      <section className="mx-3 sm:mx-6 md:mx-8 lg:mx-16">
        <div className="mb-4 flex flex-col items-start justify-between md:mb-6 md:flex-row md:items-center">
          <h2 className="mb-3 text-2xl font-bold md:mb-0 md:text-3xl">
            <span className="text-primary">Internships</span> for you
          </h2>
        </div>
        {renderSliderContent(internships?.results || [], isLoadingInternships, errorInternships)}
      </section>
      <hr className="mx-auto my-8 w-2/3 opacity-20" />
      <section className="mx-3 sm:mx-6 md:mx-8 lg:mx-16">
        <div className="mb-4 flex flex-col items-start justify-between md:mb-6 md:flex-row md:items-center">
          <h2 className="mb-3 text-2xl font-bold md:mb-0 md:text-3xl">
            <span className="text-black">Other</span>
            <span className="text-primary">Problems</span>
            <span className="text-black">to solve</span>
          </h2>
        </div>
        {renderSliderContent(problems?.results || [], isLoadingProblems, errorProblems)}
      </section>
      <div className="mb-16"></div>
    </main>
  );
};

export default SliderOfOpp;

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const NextArrow = (props: ArrowProps) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', right: '-10px' }}
      onClick={onClick}
    >
      <MoveRight className="text-primary hover:text-primary/90" size={24} />
    </div>
  );
};

const PrevArrow = (props: ArrowProps) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', left: '-10px', zIndex: 1 }}
      onClick={onClick}
    >
      <MoveLeft className="text-primary hover:text-primary/90" size={24} />
    </div>
  );
};