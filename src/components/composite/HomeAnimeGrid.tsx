import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card } from "../ui/card";
import AnimeHoverCard from "./AnimeHoverCard";

type HomeAnimeGridProps = {
  title: string;
  animeList: Record<string, any> | undefined;
};

const HomeAnimeGrid = ({ title, animeList }: HomeAnimeGridProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (animeList?.length > 0) setLoading(false);
  }, [animeList]);

  return (
    <>
      <h2 className="text-light text-2xl font-semibold mt-8 mb-4">{title}</h2>
      <Carousel className="w-full">
        <CarouselContent className="-ml-1 gap-2">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card
                key={i}
                className="bg-transparent h-full border-0 w-full aspect-[2/3] bg-zinc-800 animate-pulse"
              />
            ))
          ) : (
            <>
              {animeList?.length > 0 &&
                animeList?.map((item: any, index: number) => (
                  <CarouselItem
                    key={index}
                    className="pl-1 basis-1/2 md:basis-1/4 lg:basis-1/6"
                  >
                    <AnimeHoverCard
                      key={`${item.mal_id}-${index}`}
                      item={item}
                      index={index}
                    />
                  </CarouselItem>
                ))}
            </>
          )}
        </CarouselContent>
        <CarouselPrevious
          className="left-2 bg-[#1c1c1c91] text-light border-0 cursor-pointer hover:bg-[#1c1c1c] hover:text-light"
          style={{ borderRadius: 12 }}
        />
        <CarouselNext
          className="right-2 bg-[#1c1c1c91] text-light border-0 cursor-pointer hover:bg-[#1c1c1c] hover:text-light"
          style={{ borderRadius: 12 }}
        />
      </Carousel>
    </>
  );
};

export default HomeAnimeGrid;
