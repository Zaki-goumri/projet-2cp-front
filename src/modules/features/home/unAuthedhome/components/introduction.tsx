
import { Link } from "react-router";
const Introduction = () => {
  return (
    <main className="flex flex-col items-center  md:mx-24 mx-1">
      <div className="flex  flex-col items-start mt-4   ">
        <aside className="flex xl:justify-start xl:flex-row flex-col items-center ">
          <section className="flex flex-col xl:justify-between justify-center xl:items-start items-center">
            <h1 className="2xl:text-6xl/normal xl:text-5xl/normal font-extrabold xl:text-left text-center md:text-3xl/normal text-2xl/normal lg:text-4xl/normal ">
              Searching for a great  <span className="text-primary">opportunity</span>{" "}
              ?
            </h1>
            <p className="mt-10 md:text-2xl/relaxed xl:text-left text-center sm:text-96/normal text-80 max-w-[80%]">
              Explore tailored opportunities that match your skills and career goals—quickly and effortlessly!
            </p>
          </section>
          <img
            src="/assets/search.svg"
            alt= "Introduction"
            className="  lg:w-[55%] xs:p-0 p-[20%] "
          />
        </aside>
      </div>
      <hr className="w-3/4 my-10 opacity-20 text-center" />
    </main>
  );
};
export default Introduction;