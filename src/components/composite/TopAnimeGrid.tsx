import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchJikanApi } from "../../api/http";
import { TOP_ANIME_URL } from "../../api/constants";
import { Card } from "../ui/card";
import AnimeHoverCard from "./AnimeHoverCard";
import PaginationButton from "./PaginationButton";

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
                <AnimeHoverCard key={`${item.mal_id}-${index}`} item={item} index={index} />
              ))}
          </>
        )}
      </div>
      {topAnime?.length > 0 && (
        <PaginationButton nextPage={nextPage} prevPage={prevPage} />
      )}
    </>
  );
};

export default TopAnimeGrid;
