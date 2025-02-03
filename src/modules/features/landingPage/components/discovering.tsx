import { Link } from "react-router";
const Discovering = () => {
  return (
    <main className="flex flex-col items-center mt-10 md:mx-24 mx-1">
      <div className="flex  flex-col tems-center xl:mt-10  ">
        <aside className="flex xl:flex-row flex-col items-center ">
          <section className="flex flex-col xl:justify-between justify-center xl:items-start items-center">
            <h1 className="2xl:text-6xl/normal xl:text-5xl/normal font-extrabold xl:text-left text-center md:text-3xl/normal text-2xl/normal lg:text-4xl/normal ">
              {" "}
              That one <span className="text-primary">opportunity</span>{" "}
              feeling.
              <br />
              <span className="text-primary">Opportunity</span> Done.
            </h1>
            <p className="mt-10 md:text-2xl/relaxed xl:text-left text-center sm:text-96/normal text-80 max-w-[80%]">
              Discover internships that match your passion, skills, and future
              goals. Your next big opportunity is just a click away.
            </p>
          </section>
          <img
            src="/assets/discoveringHero.svg"
            alt="Discovering"
            className=" mt-5  lg:w-[55%] xs:p-0 p-[20%] "
          />
        </aside>
        <aside className="flex xl:justify-start justify-center w-full items-center ">
          <Link
            to="/home"
            className="bg-primary text-white font-bold py-4 px-6 rounded-full text-center cursor-pointer mt-12"
          >
            Get started!
          </Link>
        </aside>
      </div>
      <hr className="w-3/4 my-10 opacity-20 text-center" />
    </main>
  );
};
export default Discovering;
