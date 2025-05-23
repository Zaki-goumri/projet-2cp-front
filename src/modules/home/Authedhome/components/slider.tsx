import React from 'react';
import { AlertTriangle, TrendingUp, Clock, Star, Briefcase, Target } from 'lucide-react';
import { useOpportunities } from '../hooks/useOpportunities';
import { OpportunityCard } from './OpportunityCard';
import { OpportunitiesResponse, Opportunity } from '../types/opportunities.types';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const OpportunitiesSection = () => {
  const { 
    opportunities: internships, 
    isLoading: isLoadingInternships, 
    error: errorInternships 
  } = useOpportunities('internship');
  
  const { 
    opportunities: problems, 
    isLoading: isLoadingProblems, 
    error: errorProblems 
  } = useOpportunities('problem');

  const renderGridContent = (
    data: Opportunity[], 
    isLoading: boolean, 
    error: Error | null
  ) => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse rounded-3xl border border-gray-200 bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="h-6 w-3/4 rounded bg-gray-200"></div>
                <div className="h-12 w-12 rounded-xl bg-gray-200"></div>
              </div>
              <div className="space-y-3">
                <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                <div className="h-4 w-full rounded bg-gray-200"></div>
                <div className="h-4 w-2/3 rounded bg-gray-200"></div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
          <AlertTriangle size={20} className="mr-2" /> Failed to load data.
        </div>
      );
    }

    if (data.length === 0) {
      return (
        <div className="flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-6 text-gray-500">
          No opportunities found.
        </div>
      );
    }

    return (
      <motion.div 
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {data.map((item: Opportunity) => (
          <OpportunityCard key={item.id} opportunity={item} />
        ))}
      </motion.div>
    );
  };

  const features = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Trending Opportunities",
      description: "Discover what's hot in the job market right now"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Recently Posted",
      description: "Fresh opportunities added in the last 24 hours"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Top Rated",
      description: "Highest-rated opportunities by our community"
    }
  ];

  return (
    <main className="space-y-20">
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
        {renderGridContent(internships?.results || [], isLoadingInternships, errorInternships)}
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
        {renderGridContent(problems?.results || [], isLoadingProblems, errorProblems)}
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
            <h3 className="mb-4 text-2xl font-bold md:text-3xl">Ready to take the next step?</h3>
            <p className="mb-6 max-w-2xl text-white/90">
              Join our community of learners and start your journey towards professional growth.
              Find opportunities that match your skills and aspirations.
            </p>
            <Link to='/opportunities' className="rounded-full bg-white px-6 py-3 text-sm font-medium text-[#4CAF50] transition-colors hover:bg-white/90">
              Explore All Opportunities
            </Link>
          </div>
          <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10" />
        </motion.div>
      </section>
    </main>
  );
};

export default OpportunitiesSection;