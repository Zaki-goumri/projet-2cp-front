import { useState } from "react";
import { Menu, X } from "lucide-react";
// import { button } from '@/components/ui/button'
// import { ThemeToggle } from '@/components/theme-toggle'
import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {Bell} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: "/Dashboard", label: "Dashboard" },
    { to: "/saved", label: "Saved" },
    { to: "/", label: "Contact us" },
  ];
  const navItemsPhone = [
      { to: "/", label: "Home" },
      { to: "/", label: "Q&A" },
      { to: "/", label: "Contact us" },
      { to: "/aut/signin", label: "Sign in" },
      {to: "/auth/signup", label: "Sign up"}
    ];
  return (
    <nav className=" top-0 left-0 right-0 z-50 bg-background/80 my-5">
      <div className="  px-4 sm:px-6 md:px-8  ">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold flex">
              <div className="flex flex-col ml-[1.137vw]">
                <img src="/assets/logo.svg" alt="logo" className="h-6 w-auto" />
              </div>
            </Link>
          </div>

          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-7">
              
            
              
              
              <Bell className="w-12 h-12 hover:bg-black/20 p-2 rounded-full" />


              <DropdownMenu>
                <DropdownMenuTrigger className="border-none outline-none ring-0 ring-offset-0 focus:border-none focus:outline-none focus:ring-0 focus:ring-offset-0">
                  <Avatar className="!border-none !outline-none">
                    <AvatarImage 
                      src="https://media.licdn.com/dms/image/v2/D4D03AQHXpJebXN8V6g/profile-displayphoto-shrink_100_100/B4DZP3_UD_GUAU-/0/1735032392292?e=1745452800&v=beta&t=TYg-UNOHOVb41qEFarBT1yBdPnyj_RnwDGmesxbLcXg"
                      className="!border-0 !bg-white"/>
                      <AvatarFallback className="!border-0 !bg-neutral-200">CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="!bg-white !shadow-none !border-none !text-black/70">
                  <DropdownMenuLabel className="">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="opacity-50" />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              

              {/* <ThemeToggle /> */}
            </div>
          </div>

          <div className="lg:hidden flex items-center ">
            {/* <ThemeToggle /> */}
            <button
              //   variant="ghost"
              //   size="icon"
              onClick={() => {
                setIsOpen(!isOpen);
                document.body.style.overflow = isOpen ? "auto" : "hidden";
              }}
              className=" items-center"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden  bg-background/80">
          <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3 h-screen overflow-y-auto z-50 flex flex-col items-center justify-start gap-y-7 mt-4">
            {navItemsPhone.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-foreground/70 block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/20 hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
