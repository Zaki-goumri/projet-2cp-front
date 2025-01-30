
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
// import { button } from '@/components/ui/button'
// import { ThemeToggle } from '@/components/theme-toggle'

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/', label: 'Q&A' },
    { href: '/', label: 'Contact us' },
  ]

  return (
    <nav className=" top-0 left-0 right-0 z-50 bg-background/80  mt-5">
      <div className="  px-4 sm:px-6 md:px-8  ">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold flex">
            <div className="flex flex-col ml-[1.137vw]">
                <img src="/assets/logo.svg" alt="logo" className="h-6 w-auto" />
            </div>            
            </a>
          </div>
          
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-7">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-2xl/70 hover:scale-110 px-3 py-2 rounded-md font-bold transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a className='text-2xl/70 text-primary hover:scale-110 px-3 py-2 rounded-md font-bold transition-colors'>Sign in</a>
              {/* <ThemeToggle /> */}
            </div>
          </div>
          
          <div className="lg:hidden flex items-center ">
            {/* <ThemeToggle /> */}
            <button
            //   variant="ghost"
            //   size="icon"
              onClick={() => {
                setIsOpen(!isOpen)
                document.body.style.overflow = isOpen ? 'auto' : 'hidden'
              }
              }
              className=" items-center"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden  bg-background/80">
          <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3 h-screen overflow-y-auto z-50 flex flex-col items-center justify-start gap-y-7 mt-4">
            {navItems.map((item) => (
             <li   key={item.href}>
                 <a
                href={item.href}
                className="text-foreground/70 block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/20 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
             </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}

