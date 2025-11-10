import { useEffect, useState } from "react";
import { fetchJikanApi } from "../../api/http";
import { TOP_ANIME_URL } from "../../api/constants";
import { Card } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import AnimeHoverCard from "./AnimeHoverCard";

type HomeAnimeGridProps = {
  title: string;
  anime_url: string;
};

const HomeAnimeGrid = ({ title, anime_url }: HomeAnimeGridProps) => {
  const [animeList, setAnimeList] = useState<Record<string, any>>();
  const [loading, setLoading] = useState(false);

  const fetchAnimeList = async (ANIME_URL: string = TOP_ANIME_URL) => {
    setLoading(true);

    try {
      const ac = new AbortController();
      const response: Record<string, any> = await fetchJikanApi(
        ANIME_URL,
        { limit: 12 },
        { signal: ac.signal }
      );
      setAnimeList(response?.data);
    } catch (error) {
      console.error();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimeList(anime_url);
  }, []);

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
