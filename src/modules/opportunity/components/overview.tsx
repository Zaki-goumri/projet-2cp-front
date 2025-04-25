'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Calendar, Heart, Share2, Clock } from 'lucide-react';
import {InternshipListingProps} from './opportunity.types'

export default function InternshipListing({
  logoSrc = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
  logoAlt = 'Company Logo',
  title = 'Featured Internship Opportunity',
  company = 'HUAWEI',
  location = 'Ben Aknoun Algiers, Algeria',
  daysLeft = 7,
  isLoading = false,
}: InternshipListingProps) {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-3">
      <div className="relative flex flex-col gap-4 rounded-lg bg-white p-4 shadow-sm sm:p-6 md:flex-row md:gap-10">
        <div className="flex flex-1 flex-col gap-5 md:flex-row">
          <div className="bg-primary hidden h-full w-2 rounded-full md:block" />

          <div className="flex flex-1 flex-col gap-6 md:flex-row">
            <div className="flex flex-col gap-4 md:gap-6">
              {/* Logo container */}
              <div className="flex justify-center md:justify-start">
                <div className="rounded-xl bg-white p-3 shadow-md">
                  <img
                    src={logoSrc}
                    alt={logoAlt}
                    className="h-20 w-20 object-contain sm:h-24 sm:w-24"
                  />
                </div>
              </div>
              
              {/* Title and location */}
              <div>
                <div className="text-primary text-sm font-medium">{company}</div>
                <h1 className="text-lg font-semibold sm:text-xl">{title}</h1>
                <div className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>{location}</span>
                </div>
              </div>
            </div>

            {/* Days left counter */}
            <div className="mx-auto mt-4 flex h-fit w-fit items-center rounded-2xl bg-white p-3 text-center shadow-md md:ml-auto md:mr-0 md:mt-0 md:p-4">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <div className="text-2xl font-bold text-orange-500">{daysLeft}</div>
                </div>
                <div className="text-muted-foreground text-sm">Days left</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
