import Card from "./card";

const AppSection = () => {
  const cards = [
    {
      title: "Find the Best Opportunities",
      description:
        "Discover internships from top companies and organizations that match your skills and interests.",
      img: "/assets/cardPics/compass.svg",
    },
    {
      title: "Connect with Top Companies",
      description:
        "Connect with top companies and organizations that are looking for interns like you.",
      img: "/assets/cardPics/notification.svg",
    },
    {
      title: "Track Your Applications",
      description:
        "Keep track of all your applications in one place and never miss an opportunity.",
      img: "/assets/cardPics/bag.svg",
    },
    {
      title: "Kick-Start Your Career",
      description:
        "Get the experience you need to kick-start your career and land your dream job.",
      img: "/assets/cardPics/lock.svg",
    },
  ];

  return (
    <main className="flex flex-col items-center ">
      <div className="flex gap-5">
        <aside className=" ">
          <section className="mt-14 xl:mx-20 xl:block flex justify-center items-center flex-col">
            <h2 className="2xl:text-6xl/normal xl:text-5xl/normal font-extrabold xl:text-left text-center md:text-3xl/normal text-2xl/normal lg:text-4xl/normal max-w-[70%]">
              Land Your Dream <span className="text-primary">internship</span>{" "}
              with Our <span className="text-primary">App</span>
            </h2>
            <p className="md:text-2xl/relaxed xl:text-left text-center sm:text-96/normaltext-80 max-w-[80%]">
              Find the best opportunities, connect with top companies, track
              your applications, and kick-start your career today!
            </p>
          </section>
          <aside className="flex xl:justify-between xl:flex-row justify-center items-center flex-col mt-10 sm:ml-20 lg:gap-10 ">
            <section className="sm:grid md:grid-cols-2  gap-8 xl:mb-16 flex flex-col items-center">
              {cards.map((card, index) => (
                <Card
                  key={index}
                  title={card.title}
                  description={card.description}
                  image={card.img}
                />
              ))}
            </section>
            <div className="flex x justify-center items-center">
              <img
                src="/assets/appMockup.svg"
                alt="Phone"
                className="w-auto h-min hidden md:block mt-10 "
              />
            </div>
          </aside>
        </aside>
      </div>
      <h1 className=" mt-10 2xl:text-6xl/normal xl:text-5xl/normal font-extrabold text-center md:text-3xl/normal text-2xl/normal lg:text-4xl/normal ">
        <span className="text-primary">Download</span> the app
      </h1>
      <div className="flex gap-10 mt-10 mb-20">
        <svg
          width="70"
          height="70"
          viewBox="0 0 70 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 35C0 15.67 15.67 0 35 0C54.33 0 70 15.67 70 35C70 54.33 54.33 70 35 70C15.67 70 0 54.33 0 35ZM40.6979 20.6521C42.0343 18.9271 43.0473 16.4888 42.6809 14C40.4968 14.1518 37.9438 15.5492 36.4542 17.3706C35.0963 19.021 33.9803 21.4761 34.4161 23.8589C36.8038 23.9336 39.2682 22.5025 40.6979 20.6521ZM51.3145 27.7476C44.4364 31.5399 45.55 41.4205 52.5 44.0635C51.5444 46.1933 51.0846 47.145 49.8536 49.0315C48.1365 51.6649 45.7153 54.944 42.7121 54.9681C41.4775 54.9815 40.6673 54.6078 39.7937 54.2048C38.7811 53.7377 37.6832 53.2314 35.7405 53.243C33.8092 53.2533 32.6937 53.7536 31.6675 54.2139C30.7708 54.616 29.9423 54.9877 28.6971 54.9753C25.6963 54.9488 23.402 51.9902 21.6849 49.3568C16.8807 41.9987 16.3754 33.3613 19.3379 28.7667C21.4454 25.5045 24.7695 23.5963 27.8924 23.5963C29.5563 23.5963 30.8972 24.0771 32.1749 24.5352C33.3377 24.9521 34.4482 25.3503 35.7022 25.3503C36.8626 25.3503 37.8167 24.9869 38.8576 24.5905C40.1066 24.1148 41.4804 23.5915 43.4856 23.5915C46.2685 23.5915 49.2166 25.1166 51.3145 27.7476Z"
            fill="#160E0E"
          />
        </svg>
        <svg
          width="70"
          height="70"
          viewBox="0 0 70 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M35 70C15.67 70 0 54.33 0 35C0 15.67 15.67 0 35 0C54.33 0 70 15.67 70 35C70 54.33 54.33 70 35 70ZM40.4781 18.5155L40.9227 17.8616L41.3674 17.2172L42.3581 15.7685C42.4814 15.5898 42.4306 15.3499 42.247 15.2323C42.0657 15.1123 41.8168 15.1617 41.6984 15.3405L40.1857 17.5441L39.7314 18.2074C38.2936 17.6641 36.6915 17.3607 35 17.3607C33.3109 17.3607 31.7064 17.6641 30.2686 18.2074L29.8167 17.5441L29.3696 16.8927L28.3064 15.3405C28.1832 15.1617 27.9367 15.1147 27.753 15.2323C27.5718 15.3499 27.5211 15.5898 27.6419 15.7685L28.6326 17.2172L29.0773 17.8616L29.5243 18.5155C26.1485 20.0465 23.865 22.9463 23.865 26.2648H46.135C46.135 22.9463 43.8515 20.0465 40.4781 18.5155ZM23.865 27.8123H24.0365H46.135V44.8444C46.135 46.1967 45.009 47.2974 43.6171 47.2974H41.7975C41.8603 47.502 41.8966 47.716 41.8966 47.9418V52.8454C41.8966 54.1272 40.8261 55.1667 39.5067 55.1667C38.1897 55.1667 37.1216 54.1272 37.1216 52.8454V47.9418C37.1216 47.716 37.1555 47.502 37.2159 47.2974H32.7841C32.8445 47.502 32.8808 47.716 32.8808 47.9418V52.8454C32.8808 54.1272 31.8103 55.1667 30.4933 55.1667C29.1763 55.1667 28.1058 54.1272 28.1058 52.8454V47.9418C28.1058 47.716 28.1397 47.502 28.2025 47.2974H26.3853C24.9934 47.2974 23.865 46.1967 23.865 44.8444V27.8123ZM19.8875 27.8123C18.5681 27.8123 17.5 28.8518 17.5 30.1336V40.0702C17.5 41.3519 18.5681 42.3914 19.8875 42.3914C21.2044 42.3914 22.2725 41.3519 22.2725 40.0702V30.1336C22.2725 28.8518 21.2044 27.8123 19.8875 27.8123ZM47.7275 30.1336C47.7275 28.8518 48.7956 27.8123 50.115 27.8123C51.4319 27.8123 52.5 28.8518 52.5 30.1336V40.0702C52.5 41.3519 51.4319 42.3914 50.115 42.3914C48.7956 42.3914 47.7275 41.3519 47.7275 40.0702V30.1336Z"
            fill="black"
          />
          <path
            d="M30.2274 23.1675C29.5677 23.1675 29.0337 22.6477 29.0337 22.0056C29.0337 21.3636 29.5677 20.8462 30.2274 20.8462C30.8871 20.8462 31.4212 21.3636 31.4212 22.0056C31.4212 22.6477 30.8871 23.1675 30.2274 23.1675Z"
            fill="black"
          />
          <path
            d="M39.7726 23.1675C39.1129 23.1675 38.5789 22.6477 38.5789 22.0056C38.5789 21.3636 39.1129 20.8462 39.7726 20.8462C40.4323 20.8462 40.9663 21.3636 40.9663 22.0056C40.9663 22.6477 40.4323 23.1675 39.7726 23.1675Z"
            fill="black"
          />
        </svg>
      </div>
    </main>
  );
};
export default AppSection;
