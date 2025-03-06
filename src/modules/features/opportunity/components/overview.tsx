"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Calendar, Heart, Share2, Users } from "lucide-react"

const NavBar = React.lazy(() => import("@/modules/features/home/Authedhome/components/navBar"))

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
  logoSrc = "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
  logoAlt = "Google Logo",
  title = "Featured Internship Opportunity",
  location = "Ben Aknoun Algiers, Algeria",
  daysLeft = 7,
  userName = "ABDERRAHMEN BENTALEB",
  userEmail = "Abderrohmenen@gmail.com"
}: InternshipListingProps) {
  return (
    <div className="max-w-6xl mx-auto space-y-6 p-3 ">

      <div className="rounded-lg p-6 relative  flex flex-col md:flex-row gap-10">
        <div className="flex-1 flex flex-col   md:flex-row gap-5">
          <div className="w-2 h-full rounded-full bg-primary " />

          <div className="flex gap-10 flex-1 flex-col md:flex-row">
            <div className="flex flex-col gap-10">
              <img
                src={logoSrc}
                alt={logoAlt}
                className="object-contain rounded-2xl bg-white p-3 w-32 h-32"
              />
              <div>
                <h1 className="text-xl font-semibold">{title}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1 opacity-60">
                  <MapPin className="w-4 h-4" />
                  <span>{location}</span>
                </div>
              </div>
            </div>

            {/* Days left counter */}
            <div className="text-center bg-white p-4 rounded-2xl shadow-md h-fit w-fit mt-4 md:mt-0">
              <div className="text-2xl font-bold">{daysLeft}</div>
              <div className="text-sm text-muted-foreground">Days left</div>
            </div>
          </div>
        </div>

        {/* Right section - User card */}
        <Card className="!max-w-sm !p-4 space-y-4 !bg-white !border-none !shadow-lg">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-black/40">{userName}</h3>
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
            <Button size="sm" className="flex items-center gap-2 hover:!bg-gray-200">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
          <Button className="w-full !bg-gray-400 hover:!bg-primary hover:!text-white !text-white">
            <a href="#apply" onClick={(e) => { e.preventDefault(); const applySection = document.querySelector('#apply'); if (applySection) { applySection.scrollIntoView({ behavior: 'smooth' }); } }}>
              Quick Apply
            </a>
          </Button>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-2">
            </div>
            <div className="flex items-center gap-2">
              {/* Placeholder for future content */}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
