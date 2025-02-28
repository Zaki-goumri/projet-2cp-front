"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Heart, Share2, Users } from "lucide-react"
import { Link } from "react-router"

const NavBar = React.lazy(() => import("@/modules/features/home/Authedhome/components/navBar"))

export default function InternshipListing() {
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6 bg-[#2D81940A]">
      <NavBar />

      <div className="rounded-lg p-6 relative mt-24 flex flex-col md:flex-row gap-10">
        {/* Left section with green line and content */}
        <div className="flex-1 flex flex-col md:flex-row gap-5">
          {/* Green line */}
          <div className="w-2 h-full rounded-full bg-primary " />

          <div className="flex justify-between flex-1 flex-col md:flex-row">
            {/* Logo and title section */}
            <div className="flex flex-col gap-10">
              <img
                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                alt="Google Logo"
                className="object-contain rounded-2xl bg-white p-3 w-32 h-32"
              />
              <div>
                <h1 className="text-xl font-semibold">Featured Internship Opportunity</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1 opacity-60">
                  <MapPin className="w-4 h-4" />
                  <span>Ben Aknoun Algiers, Algeria</span>
                </div>
              </div>
            </div>

            {/* Days left counter */}
            <div className="text-center bg-white p-4 rounded-2xl shadow-md h-fit mt-4 md:mt-0">
              <div className="text-2xl font-bold">7</div>
              <div className="text-sm text-muted-foreground">Days left</div>
            </div>
          </div>
        </div>

        {/* Right section - User card */}
        <Card className="max-w-sm p-4 space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">ABDERRAHMEN BENTALEB</h3>
              <Badge className="bg-[#16b440] hover:bg-[#45a049] text-white ml-3">Eligible</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Abderrohmenen@gmail.com</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>

          <Button className="w-full bg-gray-400 hover:bg-primary hover:text-white text-white">
            <a href="#apply" onClick={(e) => { e.preventDefault(); const applySection = document.querySelector('#apply'); if (applySection) { applySection.scrollIntoView({ behavior: 'smooth' }); } }}>
            Quick Apply
            </a>
          </Button>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-slate-100 rounded-md">
                <Users className="h-4 w-4 text-slate-600" />
              </div>
              <div>
                <div className="font-semibold">50</div>
                <div className="text-sm text-muted-foreground">Applied</div>
              </div>
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
