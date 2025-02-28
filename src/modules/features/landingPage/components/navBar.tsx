"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router"
import {
  X,
  Bell,
  LayoutDashboard,
  User,
  Briefcase,
  Building2,
  Code,
  Users,
  Clock,
  CheckCircle2,
  Menu
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Notification = {
  id: number
  title: string
  description: string
  time: string
  unread: boolean
}

type NavBarProps = {
  isAuthenticated?: boolean
}

export default function NavBar({ isAuthenticated = false }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasUnread] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const publicNavItems = [
    { to: "/", label: "Home" },
    { to: "/qa", label: "Q&A" },
    { to: "/contact", label: "Contact us" },
  ]

  const privateNavItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/internships", label: "Internships", icon: Briefcase },
    { to: "/enterprises", label: "Enterprises", icon: Building2 },
    { to: "/problems", label: "Problems", icon: Code },
    { to: "/teams", label: "Teams", icon: Users },
  ]

  const notifications: Notification[] = [
    {
      id: 1,
      title: "New Problem Added",
      description: "A new coding challenge has been added to your queue.",
      time: "2 min ago",
      unread: false,
    },
    {
      id: 2,
      title: "Team Invitation",
      description: "You've been invited to join Team Alpha.",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: "Internship Update",
      description: "Your application status has been updated.",
      time: "3 hours ago",
      unread: false,
    },
  ]

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-background py-4 px-4 sm:px-6 md:px-8 shadow bg-white" >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold flex items-center">
              <img src="/assets/logo.svg" alt="logo" className="h-8 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          {isAuthenticated ? (
            <div className="hidden lg:flex lg:items-center lg:gap-6">
              {privateNavItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200"
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.label}
                </Link>
              ))}
            </div>
          ) : (
            <div className="hidden lg:block">
              <div className="ml-10 flex items-center space-x-8">
                {publicNavItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="text-base hover:text-primary hover:scale-105 px-3 py-2 rounded-md font-medium transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {/* Notification Bell */}
                <div className="flex items-center gap-4">
                  {/* Notification Bell */}
                  <div className="relative">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="focus:outline-none">
                        <div className="relative">
                          <Bell className="w-10 h-10 hover:bg-gray-100 p-2 rounded-full cursor-pointer transition-colors duration-200" />
                          {hasUnread && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />}
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="!w-80 !p-2 !max-w-[calc(100vw-2rem)] !sm:max-w-sm !bg-white !border-gray-100">
                        <DropdownMenuLabel className="!text-lg !text-black !font-semibold !px-2">Notifications</DropdownMenuLabel>
                        <DropdownMenuSeparator className="!bg-gray-200"/>
                        <div className="!max-h-[300px] !overflow-auto">
                          {notifications.length > 0 ? (
                            notifications.map((notification) => (
                              <DropdownMenuItem
                                key={notification.id}
                                className="!flex !flex-col !items-start !gap-1 !p-3 !cursor-pointer hover:!bg-gray-100 !rounded-lg"
                              >
                                <div className="!flex !items-start !justify-between !w-full">
                                  <span className="!font-medium !flex !items-center !gap-2 !text-black">
                                    {notification.unread && <span className="!w-2 !h-2 !bg-blue-500 !rounded-full" />}
                                    {notification.title}
                                  </span>
                                  <span className="!text-xs !text-gray-500 !flex !items-center !gap-1">
                                    <Clock className="!w-3 !h-3" />
                                    {notification.time}
                                  </span>
                                </div>
                                <p className="!text-sm !text-black">{notification.description}</p>
                              </DropdownMenuItem>
                            ))
                          ) : (
                            <div className="p-4 text-center text-gray-500">
                              No notifications at this time
                            </div>
                          )}
                        </div>
                        <DropdownMenuSeparator className="!bg-gray-200"/>
                        <DropdownMenuItem className="!flex !items-center !justify-center !gap-2 !text-blue-600 hover:!text-blue-700 hover:!bg-blue-50 !rounded-lg p-2">
                          <CheckCircle2 className="w-4 h-4" />
                          Mark all as read
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* User Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <Avatar className="cursor-pointer hover:bg-gray-100 rounded-full transition-colors duration-200">
                      <AvatarImage
                        src="https://media.licdn.com/dms/image/v2/D4D03AQHXpJebXN8V6g/profile-displayphoto-shrink_100_100/B4DZP3_UD_GUAU-/0/1735032392292?e=1745452800&v=beta&t=TYg-UNOHOVb41qEFarBT1yBdPnyj_RnwDGmesxbLcXg"
                        className="!bg-white"
                      />
                      <AvatarFallback className="!bg-neutral-200">CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="!w-56 !p-2 !max-w-[calc(100vw-2rem)] !bg-white !border-gray-100">
                    <DropdownMenuLabel className="!text-lg !text-black !font-semibold !px-2">My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="!bg-gray-200"/>
                    <DropdownMenuItem className="!flex !items-center !gap-2 !p-3 !cursor-pointer hover:!bg-gray-100 !rounded-lg !text-black">
                      <User className="w-4 h-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="!flex !items-center !gap-2 !p-3 !cursor-pointer hover:!bg-gray-100 !rounded-lg !text-black">
                      <Users className="w-4 h-4" />
                      Team Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="!bg-gray-200"/>
                    <DropdownMenuItem className="!flex !items-center !justify-center !gap-2 !text-red-600 hover:!text-red-700 hover:!bg-red-50 !rounded-lg !p-3">
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

              </>
            ) : (
              // Unauthenticated Right Section
              <div className="hidden lg:flex items-center space-x-4">
                <Link
                  to="/auth/signin"
                  className="text-base text-primary hover:text-primary/80 hover:scale-105 px-3 py-2 rounded-md font-medium transition-all duration-200"
                >
                  Sign in
                </Link>
                <Button asChild className="rounded-full">
                  <Link to="/auth/signup">Sign up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button onClick={() => setIsOpen(true)} variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </div>
            <div
              className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
              <div
                className={`absolute top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
                  isOpen ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <div className="p-4">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                  <div className="mt-8 space-y-3">
                    {isAuthenticated ? (
                      privateNavItems.map((item) => (
                        <a
                          key={item.to}
                          href={item.to}
                          className="flex items-center gap-3 px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                          onClick={() => setIsOpen(false)}
                        >
                          <item.icon className="w-5 h-5" />
                          {item.label}
                        </a>
                      ))
                    ) : (
                      <>
                        {publicNavItems.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            className="flex items-center gap-3 px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                        <a
                          href="/auth/signin"
                          className="flex items-center gap-3 px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                          onClick={() => setIsOpen(false)}
                        >
                          Sign in
                        </a>
                        <a
                          href="/auth/signup"
                          className="flex items-center gap-3 px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                          onClick={() => setIsOpen(false)}
                        >
                          Sign up
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
