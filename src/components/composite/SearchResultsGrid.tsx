import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "../ui/card";
import TopAnimeGrid from "./TopAnimeGrid";
import { useAppSelector } from "../../app/hooks";
import {
  selectSearchCurrentQuery,
  selectSearchLoading,
  selectSearchPagination,
  selectSearchResults,
  selectSearchStarted,
} from "../../app/selector/searchSelector";
import { Button } from "../ui/button";

type SearchResultsGridProps = {
  fetchSearchAnime: (searchParams: Record<string, any>) => void;
};

const SearchResultsGrid = ({ fetchSearchAnime }: SearchResultsGridProps) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const isLoading = useAppSelector(selectSearchLoading);
  const searchResults = useAppSelector(selectSearchResults);
  const searchStarted = useAppSelector(selectSearchStarted);
  const searchQuery = useAppSelector(selectSearchCurrentQuery);
  const currentPage = useAppSelector(selectSearchPagination);

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
    let tempParams = { ...searchQuery };
    tempParams.page = currentPage?.current_page + 1;
    fetchSearchAnime(tempParams);
    setURLParams(String(currentPage?.current_page + 1));
  };

  const prevPage = () => {
    if (currentPage?.current_page === 1) return;
    let tempParams = { ...searchQuery };
    tempParams.page = currentPage?.current_page - 1;
    fetchSearchAnime(tempParams);
    setURLParams(String(currentPage?.current_page - 1));
  };

  if (!searchStarted)
    return (
      <div className="mb-8">
        <TopAnimeGrid />
      </div>
    );

  return (
    <>
      <h2 className="text-light text-2xl font-semibold mt-8 mb-4">
        Search results:
      </h2>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card
              key={i}
              className="bg-transparent h-full border-0 w-full aspect-[2/3] bg-zinc-800 animate-pulse"
            />
          ))
        ) : searchResults?.length > 0 && (
          searchResults?.map((item: any, index: number) => (
            <a key={`${item.mal_id}-${index}`} href={item.url} target="_blank">
              <Card className="bg-transparent h-full flex flex-col justify-between border-0 hover:shadow-md gap-2 pt-0">
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
            </a>
          ))
        )}
      </div>
      {searchResults?.length > 0 && (
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
      {!isLoading && searchResults?.length === 0 && (
        <p className="text-light text-2xl font-semibold mt-8 mb-4">
          No results found.
        </p>
      )}
    </>
  );
};

export default SearchResultsGrid;
