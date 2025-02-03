import { useState } from "react";
import { Menu, X } from "lucide-react";
// import { button } from '@/components/ui/button'
// import { ThemeToggle } from '@/components/theme-toggle'
import { Link } from "react-router";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/", label: "Q&A" },
    { to: "/", label: "Contact us" },
  ];

  return (
    <nav className=" top-0 left-0 right-0 z-50 bg-background/80 mt-5">
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
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-2xl/70 hover:scale-110 px-3 py-2 rounded-md font-bold transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/signin"
                className="text-2xl/70 text-primary hover:scale-110 px-3 py-2 rounded-md font-bold transition-colors"
              >
                Sign in
              </Link>
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
            {navItems.map((item) => (
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
