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
        <main className="flex justify-around items-center md:mx-24 mx-1 flex-col">
            <div className="flex lg:flex-row flex-col lg:space-x-32 w-full gap-x-20 mb-10">
            <aside className="flex justify-center items-center "> 
            <img src="/assets/signupHero.svg" alt="Signup" className=""/>
            </aside>
            <aside className="flex justify-center items-center flex-col lg:items-start gap-10 ">
            <h2 className="2xl:text-5xl/normal xl:text-5xl/normal font-extrabold lg:text-left text-center md:text-3xl/normal text-2xl/normal lg:text-4xl/normal  ">Sign up to find new <br/> <span className="text-primary">Opportunity</span> and  <span className="text-primary">internship</span></h2>
            <p className="  xl:text-3xl/relaxed md:text-2xl/relaxed lg:text-left text-center sm:text-96/normaltext-80" >Our powerful matching technology will send the right internship right to your inbox.</p>
            </aside>
            
        </div>
        <ul className="flex flex-wrap justify-center mt-10">
            {services.map((service, index) => (
                <li key={index} className="flex justify-between flex-col items-center mt-10">
                        <img src={service.path} alt="Service" className="xl:w-32 h-auto lg:w-24 md:w-20 w-16"/>
                        <p className="xl:text-2xl/relaxed text-center w-2/3  ">{service.text}</p>
                </li>
            ))}
        </ul>
        <hr className="w-3/4 my-10 opacity-20 text-center"/>

        </main>
    );
}
export default Signup;