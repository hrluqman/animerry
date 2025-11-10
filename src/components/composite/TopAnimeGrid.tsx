import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchJikanApi } from "../../api/http";
import { TOP_ANIME_URL } from "../../api/constants";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { InfoIcon } from "lucide-react";

const TopAnimeGrid = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [topAnime, setTopAnime] = useState<Record<string, any>>();
  const [currentPage, setCurrentPage] = useState<Record<string, any>>();
  const [loading, setLoading] = useState(false);

  const fetchTopAnime = async (pageNumber: number = 1) => {
    setLoading(true);

    try {
      const ac = new AbortController();
      const response: Record<string, any> = await fetchJikanApi(
        TOP_ANIME_URL,
        { page: pageNumber },
        { signal: ac.signal }
      );
      setCurrentPage(response?.pagination);
      setTopAnime(response?.data);
    } catch (error) {
      console.error();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopAnime();
  }, []);

  const setURLParams = (pageNumber: string) => {
    const next = new URLSearchParams(params);
    next.set("page", pageNumber);
    navigate(
      { pathname: "/search", search: next.toString() },
      { replace: false }
    );
  };

  const nextPage = () => {
    if (!currentPage?.has_next_page) return;

    fetchTopAnime(currentPage?.current_page + 1);
    setURLParams(String(currentPage?.current_page + 1));
  };

  const prevPage = () => {
    if (currentPage?.current_page === 1) return;

    fetchTopAnime(currentPage?.current_page - 1);
    setURLParams(String(currentPage?.current_page - 1));
  };

  return (
    <>
      <h2 className="text-light text-2xl font-semibold mt-8 mb-4">
        Top Recommendations
      </h2>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card
              key={i}
              className="bg-transparent h-full border-0 w-full aspect-[2/3] bg-zinc-800 animate-pulse"
            />
          ))
        ) : (
          <>
            {topAnime?.length > 0 &&
              topAnime?.map((item: any, index: number) => (
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
                  <HoverCardContent align="start" side="right" className="bg-theme-secondary-dark flex flex-col justify-between border-0 shadow-md pr-4">
                    <p className="text-light text-sm font-semibold mb-2">{item.title}</p>
                    <p className="text-light text-sm truncate-line-5 opacity-70 mb-2">{item.synopsis}</p>
                    <p className="text-light text-xs font-semibold mb-2">Status: <span className="opacity-70">{item.status}</span></p>
                    <p className="text-light text-xs font-semibold text-wrap mb-2">Genres:&nbsp;
                    {item.genres?.length > 0 && item.genres?.map((genre: any, index: number) => (
                      <span key={index} className="opacity-70">{genre.name}{index !== item.genres?.length - 1 && ", "}</span>
                    ))}
                    </p>
                    <Button className="btn-theme btn-outline text-primary-foreground hover:bg-primary/90 w-full cursor-pointer px-8 mt-2" onClick={() => navigate(`/anime/${item.mal_id}`)}><InfoIcon className="mr-2" /> More Details</Button>
                  </HoverCardContent>
                </HoverCard>
              ))}
          </>
        )}
      </div>
      {topAnime?.length > 0 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <Button
            className="btn-theme text-primary-foreground hover:bg-primary/90 w-[8rem] cursor-pointer px-8"
            onClick={prevPage}
          >
            Previous
          </Button>
          <Button
            className="btn-theme text-primary-foreground hover:bg-primary/90 w-[8rem] cursor-pointer px-8"
            onClick={nextPage}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
};

export default TopAnimeGrid;
