import { fetchJikanApi } from "../api/http";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { MANGA_SEARCH_URL } from "../api/constants";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  resetMangaSearch,
  setMangaSearchCurrentQuery,
  setMangaSearchError,
  setMangaSearchLoading,
  setMangaSearchPagination,
  setMangaSearchResults,
} from "../state/slice/mangaSearchSlice";
import {
  selectMangaSearchCurrentQuery,
  selectMangaSearchError,
  selectMangaSearchLoading,
  selectMangaSearchPagination,
  selectMangaSearchResults,
} from "../state/selector/mangaSearchSelector";
import { Card } from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import Navbar from "../components/composite/Navbar";
import SearchBar from "../components/composite/Searchbar";
import AnimeHoverCard from "../components/composite/AnimeHoverCard";
import AnimerryFooter from "../components/composite/AnimerryFooter";
import PaginationButton from "../components/composite/PaginationButton";

const MangaPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const debounced = useDebounce(searchQuery, 250); // waits 250ms after typing stops
  const isLoading = useAppSelector(selectMangaSearchLoading);
  const mangaSearchResults = useAppSelector(selectMangaSearchResults);
  const currentPage = useAppSelector(selectMangaSearchPagination);
  const savedQuery = useAppSelector(selectMangaSearchCurrentQuery);
  const error = useAppSelector(selectMangaSearchError);

  const setURLParams = (pageNumber: string) => {
    const next = new URLSearchParams(params);
    next.set("page", pageNumber);
    navigate(
      { pathname: "/manga", search: next.toString() },
      { replace: false }
    );
  };

  useEffect(() => {
    dispatch(resetMangaSearch());
    setURLParams("1");
  }, [dispatch]);

  const fetchSearchManga = async (searchParams: Record<string, any>) => {
    dispatch(setMangaSearchLoading(true));
    dispatch(setMangaSearchError(null));
    try {
      const ac = new AbortController();
      const response: Record<string, any> = await fetchJikanApi(
        MANGA_SEARCH_URL,
        searchParams,
        { signal: ac.signal }
      );
      dispatch(setMangaSearchResults(response?.data));
      dispatch(setMangaSearchPagination(response?.pagination));
      dispatch(setMangaSearchCurrentQuery(searchParams));
      setURLParams(searchParams.page.toString());
    } catch (error) {
      dispatch(
        setMangaSearchError(
          "Oops! We receive an unexpected error at the moment... Please try again later."
        )
      );
      dispatch(setMangaSearchResults([]));
      console.error(error);
    } finally {
      dispatch(setMangaSearchLoading(false));
    }
  };

  useEffect(() => {
    const searchParams = {
      q: debounced.trim(),
      limit: 24,
      page: 1,
    };
    fetchSearchManga(searchParams);
  }, [debounced, dispatch]);

  const nextPage = () => {
    if (!currentPage?.has_next_page) return;
    let tempParams = { ...savedQuery };
    tempParams.page = currentPage?.current_page + 1;
    fetchSearchManga(tempParams);
    setURLParams(String(currentPage?.current_page + 1));
  };

  const prevPage = () => {
    if (currentPage?.current_page === 1) return;
    let tempParams = { ...savedQuery };
    tempParams.page = currentPage?.current_page - 1;
    fetchSearchManga(tempParams);
    setURLParams(String(currentPage?.current_page - 1));
  };

  return (
    <main className="bg-theme-dark min-h-screen w-full pt-[6rem] md:pt-[8rem] overflow-x-hidden p-4">
      <Navbar />

      <div className="container w-full max-w-7xl mx-auto">
        <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e)} />

        {error && (
          <Alert
            variant="destructive"
            className="bg-red-900/40 border-red-500/40 text-red-100 mt-8"
          >
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <h2 className="text-light text-2xl font-semibold mt-8 mb-4">
          {searchQuery === "" ? "" : "Search results:"}
        </h2>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Card
                  key={i}
                  className="bg-transparent h-full border-0 w-full aspect-[2/3] bg-zinc-800 animate-pulse"
                />
              ))
            : mangaSearchResults?.length > 0 &&
              mangaSearchResults?.map((item: any, index: number) => (
                <AnimeHoverCard
                  key={`${item.mal_id}-${index}`}
                  item={item}
                  index={index}
                  manga={true}
                />
              ))}
        </div>
        {mangaSearchResults?.length > 0 && (
          <PaginationButton nextPage={nextPage} prevPage={prevPage} />
        )}
        {!isLoading && mangaSearchResults?.length === 0 && (
          <p className="text-light text-2xl font-semibold mt-8 mb-4">
            No results found.
          </p>
        )}
      </div>

      <AnimerryFooter />
    </main>
  );
};

export default MangaPage;
