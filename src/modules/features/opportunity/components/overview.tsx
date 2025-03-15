'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Calendar, Heart, Share2, Users } from 'lucide-react';

const NavBar = React.lazy(
  () => import('@/modules/features/home/Authedhome/components/navBar')
);

interface InternshipListingProps {
  logoSrc?: string;
  logoAlt?: string;
  title?: string;
  location?: string;
  daysLeft?: number;
  userName?: string;
  userEmail?: string;
}

export default function InternshipListing({
  logoSrc = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
  logoAlt = 'Google Logo',
  title = 'Featured Internship Opportunity',
  location = 'Ben Aknoun Algiers, Algeria',
  daysLeft = 7,
  userName = 'ABDERRAHMEN BENTALEB',
  userEmail = 'Abderrohmenen@gmail.com',
}: InternshipListingProps) {
  return (
    <div className="mx-auto max-w-6xl space-y-6 p-3">
      <div className="relative flex flex-col gap-10 rounded-lg p-6 md:flex-row">
        <div className="flex flex-1 flex-col gap-5 md:flex-row">
          <div className="bg-primary h-full w-2 rounded-full" />

          <div className="flex flex-1 flex-col gap-10 md:flex-row">
            <div className="flex flex-col gap-10">
              <img
                src={logoSrc}
                alt={logoAlt}
                className="h-32 w-32 rounded-2xl bg-white object-contain p-3"
              />
              <div>
                <h1 className="text-xl font-semibold">{title}</h1>
                <div className="text-muted-foreground mt-1 flex items-center gap-2 text-sm opacity-60">
                  <MapPin className="h-4 w-4" />
                  <span>{location}</span>
                </div>
              </div>
            </div>

            {/* Days left counter */}
            <div className="mt-4 h-fit w-fit rounded-2xl bg-white p-4 text-center shadow-md md:mt-0">
              <div className="text-2xl font-bold">{daysLeft}</div>
              <div className="text-muted-foreground text-sm">Days left</div>
            </div>
          </div>
        </div>

        {/* Right section - User card */}
        <Card className="!max-w-sm space-y-4 !border-none !bg-white !p-4 !shadow-lg">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-black/40">{userName}</h3>
            </div>
            <p className="text-sm text-black/40">{userEmail}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button size="icon" className="!h-9 !w-9 hover:!bg-gray-200">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="icon" className="h-9 w-9 hover:!bg-gray-200">
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
            <Button
              size="sm"
              className="flex items-center gap-2 hover:!bg-gray-200"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
          <Button className="hover:!bg-primary w-full !bg-gray-400 !text-white hover:!text-white">
            <a
              href="#apply"
              onClick={(e) => {
                e.preventDefault();
                const applySection = document.querySelector('#apply');
                if (applySection) {
                  applySection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Quick Apply
            </a>
          </Button>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-2"></div>
            <div className="flex items-center gap-2">
              {/* Placeholder for future content */}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
