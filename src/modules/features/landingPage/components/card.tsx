interface CardProps {
  title: string;
  description: string;
  image: string;
}

const Card = ({ title, description, image }: CardProps) => {
  return (
    <div className="flex flex-col items-start border-gray-600 w-[80%] sm:h-72 h-fit rounded-4xl m-3 p-5 shadow-[0_5px_8px_rgba(0,0,0,0.4)] ">
      <img
        src={image}
        alt={title}
        className="bg-[#92E3A938] rounded-full p-2.5 mb-3"
      />
      <h3 className="font-bold text-xl mb-10">{title}</h3>
      <p className="text-">{description}</p>
    </div>
  );
};
export default Card;
