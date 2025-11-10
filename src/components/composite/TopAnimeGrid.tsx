import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchJikanApi } from "../../api/http";
import { TOP_ANIME_URL } from "../../api/constants";
import { Card } from "../ui/card";
import AnimeHoverCard from "./AnimeHoverCard";
import PaginationButton from "./PaginationButton";
import { Alert, AlertDescription } from "../ui/alert";

const TopAnimeGrid = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [topAnime, setTopAnime] = useState<Record<string, any>>();
  const [currentPage, setCurrentPage] = useState<Record<string, any>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const didFetch = useRef(false);

  const fetchTopAnime = async (pageNumber: number = 1) => {
    setLoading(true);
    setError(null);

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
      setError(
        "Oops! We receive an unexpected error at the moment... Please try again later."
      );
      setTopAnime([] as any);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Didfetch needed to avoid calling api twice during development that cause by StrictMode
    if (didFetch.current) return;
    didFetch.current = true;

    (async () => {
      await fetchTopAnime();
    })();
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
      {error && (
        <Alert
          variant="destructive"
          className="bg-red-900/40 border-red-500/40 text-red-100 mt-8"
        >
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
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
        ) : error ? null : (
          <>
            {topAnime?.length > 0 &&
              topAnime?.map((item: any, index: number) => (
                <AnimeHoverCard
                  key={`${item.mal_id}-${index}`}
                  item={item}
                  index={index}
                />
              ))}
          </>
        )}
      </div>
      {!error && topAnime?.length > 0 && (
        <PaginationButton nextPage={nextPage} prevPage={prevPage} />
      )}
    </>
  );
};

export default TopAnimeGrid;
