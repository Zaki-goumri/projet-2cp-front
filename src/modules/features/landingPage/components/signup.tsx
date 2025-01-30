const Signup = () => {
    const services = [
        {
        path: "/assets/servicesOfsignup/pc.svg",
        text:"Search for your domain"    
        },
        {
            path: "/assets/servicesOfsignup/company.svg",
            text:"Find the Perfect internship for you"    
        },
        {
            path: "/assets/servicesOfsignup/apply.svg",
            text:"Apply and find new opportunities"    
        }
    ];

    return (
        <main className="flex flex-col items-center  mx-20">
            <div className="flex mx-20 ">
            <aside className="w-[60%] mt-14">
                <h2 className="text-5xl/normal font-bold max-w-[95%]">Sign up to find new  <span className="text-primary">Opportunity</span> and  <span className="text-primary">internship</span></h2>
                <p className="mt-10 max-w-2/3 text-2xl/relaxed">Our powerful matching technology will send the right internship right to your inbox.</p>
            </aside>
            <aside  className="w-[40%] flex justify-center items-center"> 
                <img src="/assets/signupHero.svg" alt="Signup" className="w-auto"/>
            </aside>
        </div>
        <ul className="flex">
            {services.map((service, index) => (
                <li key={index} className="flex justify-between flex-col items-center mx-32 mt-10">
                        <img src={service.path} alt="Service" className="w-32 h-auto"/>
                        <p className="text-2xl/relaxed text-center">{service.text}</p>
                </li>
            ))}
        </ul>
        <hr className="w-3/4 my-10 opacity-20 text-center"/>

        </main>
    );
}
export default Signup;