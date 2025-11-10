import { InfoIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { useNavigate } from "react-router-dom";

interface AnimeHoverCardProps {
  item: any;
  index: number;
}

const AnimeHoverCard = ({ item, index }: AnimeHoverCardProps) => {
  const navigate = useNavigate();

  return (
    <HoverCard key={`${item.mal_id}-${index}`} openDelay={300}>
      <a href={`/anime/${item.mal_id}`}>
        <HoverCardTrigger asChild>
          <Card className="bg-transparent relative h-full flex flex-col justify-between border-0 hover:shadow-md gap-2 pt-0">
            {/* Fixed aspect-ratio image wrapper */}
            <div className="relative w-full aspect-[2/3] overflow-hidden rounded">
              <img
                src={item.images?.webp?.large_image_url}
                alt={item.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-all duration-300 ease-in-out"
              />
              <p className="absolute text-light bg-theme text-xs p-2 top-0 right-0 rounded-bl-sm">
                {item.type}
              </p>
            </div>
            <p className="text-light text-sm font-semibold truncate">
              {item.title}
            </p>
          </Card>
        </HoverCardTrigger>
      </a>
      <HoverCardContent
        align="start"
        side="right"
        className="bg-theme-secondary-dark flex flex-col justify-between border-0 shadow-md pr-4"
      >
        <p className="text-light text-sm font-semibold mb-2">{item.title}</p>
        <p className="text-light text-sm truncate-line-5 opacity-70 mb-2">
          {item.synopsis}
        </p>
        <p className="text-light text-xs font-semibold mb-2">
          Status: <span className="opacity-70">{item.status}</span>
        </p>
        <p className="text-light text-xs font-semibold text-wrap mb-2">
          Genres:&nbsp;
          {item.genres?.length > 0 &&
            item.genres?.map((genre: any, index: number) => (
              <span key={index} className="opacity-70">
                {genre.name}
                {index !== item.genres?.length - 1 && ", "}
              </span>
            ))}
        </p>
        <Button
          className="btn-theme btn-outline text-primary-foreground hover:bg-primary/90 w-full cursor-pointer px-8 mt-2"
          onClick={() => navigate(`/anime/${item.mal_id}`)}
        >
          <InfoIcon className="mr-2" /> More Details
        </Button>
      </HoverCardContent>
    </HoverCard>
  );
};

export default AnimeHoverCard;
