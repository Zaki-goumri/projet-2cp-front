"use client"

interface CardProps {
  title: string
  description: string
  image: string
}

const Card = ({ title, description, image }: CardProps) => {
  return (
    <div className="bg-card hover:bg-accent/50 shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-lg group min-h-80 hover:scale-105">
      <div className="flex flex-col space-y-4">
        <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-primary/20 transition-colors hover:rotate-6">
          <img src={image || "/placeholder.svg"} alt={title} className="w-8 h-8" />
        </div>

        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{title}</h3>

        <p className="text-muted-foreground group-hover:text-primary transition-colors">{description}</p>
      </div>
    </div>
  )
}

export default Card

