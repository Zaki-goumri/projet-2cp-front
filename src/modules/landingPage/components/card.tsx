'use client';

interface CardProps {
  title: string;
  description: string;
  image: string;
}

const Card = ({ title, description, image }: CardProps) => {
  return (
    <div className="bg-card hover:bg-accent/50 group min-h-80 rounded-xl p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <div className="flex flex-col space-y-4">
        <div className="bg-primary/10 group-hover:bg-primary/20 flex h-16 w-16 items-center justify-center rounded-full p-4 transition-colors hover:rotate-6">
          <img
            src={image || '/placeholder.svg'}
            alt={title}
            className="h-8 w-8"
          />
        </div>

        <h3 className="group-hover:text-primary text-xl font-bold transition-colors">
          {title}
        </h3>

        <p className="text-muted-foreground group-hover:text-primary transition-colors">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
