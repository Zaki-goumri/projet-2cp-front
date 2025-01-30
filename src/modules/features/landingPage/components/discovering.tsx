const Discovering = () => {
    return (
       <main className="flex flex-col items-center mt-10">
       <div className="flex justify-between items-center mt-10 mx-20">
        <aside className="w-[95%]">
        <h1 className="text-6xl/normal font-extrabold max-w-3/4"> That one <span className="text-primary">opportunity</span> feeling.<br/>
        <span className="text-primary">Opportunity</span>  Done.</h1>
        <p className="mt-10 max-w-1/2 text-2xl/relaxed">Discover internships that match your passion, skills, and future goals. Your next big opportunity is just a click away.</p>
        <button className="bg-primary text-white font-bold py-4 px-6 rounded-full text-center cursor-pointer mt-12">Get started!</button>
        </aside>
        <aside className="flex justify-center items-center ">
            <img src="/assets/discoveringHero.svg" alt="Discovering" className="mr-10"/>
        </aside>
        
        </div>
        <hr className="w-3/4 my-20 opacity-20 text-center"/>
        </main>
    );
    }
    export default Discovering;