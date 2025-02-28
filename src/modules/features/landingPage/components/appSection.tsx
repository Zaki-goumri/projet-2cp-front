"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Apple, SmartphoneIcon as Android } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
const Card = React.lazy(() => import("./card"));

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

const AppSection = () => {
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [qrCodeData, setQrCodeData] = useState("");

  // Detect the user's operating system
  const getOperatingSystem = () => {
    const userAgent = navigator.userAgent;

    if (/iphone|ipad|ipod/i.test(userAgent)) {
      return "ios";
    }
    if (/android/i.test(userAgent)) {
      return "android";
    }
    return "unknown";
  };

  const os = getOperatingSystem();

  const handleDownload = (platform: "ios" | "android") => {
    const appUrl =
      platform === "ios"
        ? "https://apps.apple.com/us/app/internhub/id123456789"
        : "https://play.google.com/store/apps/details?id=com.internhub.app";

    setQrCodeData(appUrl);
    setQrDialogOpen(true);
  };

  const cards = [
    {
      title: "Find the Best Opportunities",
      description: "Discover internships from top companies and organizations that match your skills and interests.",
      img: "/assets/cardPics/compass.svg",
    },
    {
      title: "Connect with Top Companies",
      description: "Connect with top companies and organizations that are looking for interns like you.",
      img: "/assets/cardPics/notification.svg",
    },
    {
      title: "Track Your Applications",
      description: "Keep track of all your applications in one place and never miss an opportunity.",
      img: "/assets/cardPics/bag.svg",
    },
    {
      title: "Kick-Start Your Career",
      description: "Get the experience you need to kick-start your career and land your dream job.",
      img: "/assets/cardPics/lock.svg",
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      <motion.div
        className="mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        <motion.div className="text-center max-w-3xl mx-auto mb-16" variants={fadeIn}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
            Land Your Dream <span className="text-primary">internship</span> with Our{" "}
            <span className="text-primary">App</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Find the best opportunities, connect with top companies, track your applications, and kick-start your career
            today!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="grid sm:grid-cols-2 gap-6">
            {cards.map((card, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card title={card.title} description={card.description} image={card.img} />
              </motion.div>
            ))}
          </div>

          <motion.div className="flex justify-center lg:justify-end" variants={fadeIn}>
            <img src="/assets/appMockup.svg" alt="App mockup" className="w-full max-w-sm" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        <motion.h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10" variants={fadeIn}>
          <span className="text-primary">Download</span> the app
        </motion.h2>

        <motion.div className="flex flex-wrap justify-center gap-6" variants={fadeIn}>
          {/* Show iOS button only if the OS is iOS or unknown */}
          {(os === "ios"  ) && (
            <a
              className="rounded-full gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg transform hover:scale-105 transition-all duration-300 px-6 py-3 flex items-center font-semibold hover:shadow-xl active:scale-95"
              href="https://apps.apple.com/us/app/internhub/id123456789"
            >
              <Apple className="h-6 w-6" />
              <span>Download for iOS</span>
            </a>
          )}

          {/* Show Android button only if the OS is Android or unknown */}
          {(os === "android") && (
            <a
              className="rounded-full gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg transform hover:scale-105 transition-all duration-300 px-6 py-3 flex items-center font-semibold hover:shadow-xl active:scale-95"
              href="https://play.google.com/store/apps/details?id=com.internhub.app"
            >
              <Android className="h-6 w-6" />
              <span>Download for Android</span>
            </a>
          )}
          {
            (os === "unknown") && (
              <>
                <Button
                  size="lg"
                  className="rounded-full gap-2 bg-black text-white hover:bg-gray-800 cursor-pointer"
                  onClick={() => handleDownload("ios")}
                >
                  <Apple className="h-5 w-5" />
                  Download for iOS
                </Button>
                <Button
                  size="lg"
                  className="rounded-full gap-2 bg-green-600 hover:bg-green-700 cursor-pointer"
                  onClick={() => handleDownload("android")}
                >
                  <Android className="h-5 w-5" />
                  Download for Android
                </Button>
              </>
            )
          }
        </motion.div>
      </motion.div>

      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent className="sm:!max-w-md !bg-white !rounded-lg !shadow-lg">
          <DialogHeader className="!border-b !border-gray-200 !pb-4">
            <DialogTitle className="!text-2xl !font-bold !text-gray-900">Scan QR Code to Download</DialogTitle>
            <DialogDescription className="!text-gray-600">
              Use your phone's camera to scan this QR code and download the InternHub app.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center p-6">
            <QRCodeSVG value={qrCodeData} size={200} />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default AppSection;