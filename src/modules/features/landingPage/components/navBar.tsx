const NavBar = () => {
   
    const navBarElements = [
    {element: "Home", path: "/"},
    {element: "Q&A", path: "/"},
    {element: "Contact us", path: "/"},
     ]

    return (
        <nav className="mt-8 mx-8 flex items-center justify-between">
        <div className="">
            <img src="/assets/logo.svg" alt="logo" className="w-40 mb-2"/>
        </div>
        <div className="flex gap-x-40 items-center"> 
            <ul className="flex gap-x-20 items-center">
                {navBarElements.map((link, index) => (
                    <li  key={index} className="mx-6 font-bold text-[1.2vw]">
                        <a href="">{link.element}</a>
                        </li>
                ))}

             </ul>
                <a href="" className="text-primary text-[1.2vw] font-bold">Sign in </a>
        </div>
        </nav>
    );
    }
   
 export default NavBar;