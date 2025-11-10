import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "../ui/card";
import TopAnimeGrid from "./TopAnimeGrid";
import { useAppSelector } from "../../state/hooks";
import {
  selectSearchCurrentQuery,
  selectSearchError,
  selectSearchLoading,
  selectSearchPagination,
  selectSearchResults,
  selectSearchStarted,
} from "../../state/selector/searchSelector";
import AnimeHoverCard from "./AnimeHoverCard";
import PaginationButton from "./PaginationButton";
import { Alert, AlertDescription } from "../ui/alert";

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
  const error = useAppSelector(selectSearchError);

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
      {error && (
        <Alert
          variant="destructive"
          className="bg-red-900/40 border-red-500/40 text-red-100 mt-8"
        >
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <h2 className="text-light text-2xl font-semibold mt-8 mb-4">
        {!isLoading && searchResults?.length === 0 ? "" : "Search results:"}
      </h2>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Card
                key={i}
                className="bg-transparent h-full border-0 w-full aspect-[2/3] bg-zinc-800 animate-pulse"
              />
            ))
          : searchResults?.length > 0 &&
            searchResults?.map((item: any, index: number) => (
              <AnimeHoverCard
                key={`${item.mal_id}-${index}`}
                item={item}
                index={index}
              />
            ))}
      </div>
      {searchResults?.length > 0 && (
        <PaginationButton nextPage={nextPage} prevPage={prevPage} />
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
